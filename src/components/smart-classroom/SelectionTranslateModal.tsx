import React, { useState, useEffect, useRef } from "react";
import { SelectionTranslateResult } from "../../types/smartClassroom";
import { CLASSROOM_DICTIONARY } from "../../data/smartClassroomData";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Volume2,
  Snail,
  Star,
  Copy,
  Check,
  X,
  Sparkles,
  BookOpen,
  Info,
  Lightbulb,
  ExternalLink,
} from "lucide-react";

interface SelectionTranslateModalProps {
  onSaveFavoriteText?: (text: string, vi: string) => void;
  savedFavorites?: string[];
}

export const SelectionTranslateModal: React.FC<SelectionTranslateModalProps> = ({
  onSaveFavoriteText,
  savedFavorites = [],
}) => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [pillPosition, setPillPosition] = useState<{ x: number; y: number } | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translateResult, setTranslateResult] = useState<SelectionTranslateResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor mouseup / selection
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Don't intercept if clicking inside our own modal or pill
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        return;
      }

      const selection = window.getSelection();
      const text = selection ? selection.toString().trim() : "";

      if (text && text.length >= 2 && text.length <= 250) {
        const range = selection?.getRangeAt(0);
        if (range) {
          const rect = range.getBoundingClientRect();
          setPillPosition({
            x: Math.max(10, Math.min(window.innerWidth - 220, rect.left + rect.width / 2 - 80)),
            y: Math.max(10, rect.top - 46),
          });
          setSelectedText(text);
        }
      } else {
        if (!isOpenModal) {
          setPillPosition(null);
          setSelectedText("");
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpenModal(false);
        setPillPosition(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keyup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenModal]);

  const handleTranslateSelection = async (textToTranslate: string) => {
    playSound("click");
    setIsOpenModal(true);
    setPillPosition(null);
    setIsLoading(true);
    setTranslateResult(null);

    // 1. Check local classroom dictionary first for instant exact match
    const cleanLower = textToTranslate.toLowerCase().replace(/[.,!?]/g, "").trim();
    const localMatch = CLASSROOM_DICTIONARY.find(
      (d) => d.wordOrPhrase.toLowerCase() === cleanLower
    );

    if (localMatch) {
      setTranslateResult({
        text: textToTranslate,
        type: localMatch.type,
        ipa: localMatch.ipa,
        partOfSpeech: localMatch.partOfSpeech,
        vietnamese: localMatch.vietnamese,
        usageOrContext: localMatch.classroomContext,
        exampleSentence: localMatch.example,
        exampleSentenceVi: localMatch.exampleVi,
        usefulNotes: localMatch.notes,
      });
      setIsLoading(false);
      playSound("star");
      return;
    }

    // 2. Fetch from backend /api/smart-classroom/translate
    try {
      const res = await fetch("/api/smart-classroom/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToTranslate }),
      });
      const data = await res.json();
      setTranslateResult(data);
      playSound("star");
    } catch (err) {
      // Fallback
      const isSingle = !textToTranslate.includes(" ");
      setTranslateResult({
        text: textToTranslate,
        type: isSingle ? "word" : "phrase",
        ipa: isSingle ? "/.../" : "",
        partOfSpeech: isSingle ? "Từ vựng" : "Cụm từ lớp học",
        vietnamese: `Nghĩa của: "${textToTranslate}"`,
        usageOrContext: "Sử dụng trong giao tiếp sư phạm tiếng Anh tiểu học.",
        exampleSentence: `Teacher: "${textToTranslate}."`,
        exampleSentenceVi: `Giáo viên nói: "${textToTranslate}."`,
        usefulNotes: "Phát âm rõ ràng, nhịp nhàng và kết hợp ngôn ngữ cơ thể thân thiện.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string, rate: number = 0.95) => {
    playSound("click");
    speakText(text, { rate });
  };

  const handleCopy = (text: string) => {
    playSound("click");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveFavorite = () => {
    playSound("star");
    if (onSaveFavoriteText && selectedText) {
      onSaveFavoriteText(selectedText, translateResult?.vietnamese || "");
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div ref={containerRef} className="z-50 select-none">
      {/* 1. Floating Mini Action Pill near highlighted text */}
      {pillPosition && selectedText && !isOpenModal && (
        <div
          id="smart-classroom-highlight-pill"
          style={{
            position: "fixed",
            left: `${pillPosition.x}px`,
            top: `${pillPosition.y}px`,
            zIndex: 99999,
          }}
          className="animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-1.5 bg-slate-900/95 text-white px-3 py-1.5 rounded-full shadow-2xl border border-amber-400/50 backdrop-blur-md">
            {/* Translate Button */}
            <button
              onClick={() => handleTranslateSelection(selectedText)}
              className="flex items-center gap-1 text-xs font-black text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Translate</span>
            </button>

            <div className="w-[1px] h-3.5 bg-slate-700 mx-0.5" />

            {/* Listen Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSpeak(selectedText, 0.9);
              }}
              title="Nghe phát âm"
              className="flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-cyan-100 p-1 rounded-md transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Listen</span>
            </button>

            <div className="w-[1px] h-3.5 bg-slate-700 mx-0.5" />

            {/* Save / Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSaveFavorite();
              }}
              title="Lưu câu vào yêu thích"
              className="flex items-center gap-1 text-xs font-bold text-rose-300 hover:text-rose-100 p-1 rounded-md transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Modal Popup with Detailed Pedagogical Translation */}
      {isOpenModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-2 border-[#D1E0FB] shadow-2xl space-y-5 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  🔍
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-slate-800">
                    Tra Nghĩa & Ngữ Cảnh Sư Phạm
                  </h3>
                  <p className="text-[11px] text-slate-500 font-bold">
                    Smart Classroom English • Primary Primary
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpenModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
                <div className="w-9 h-9 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-black text-slate-600 animate-pulse">
                  Đang phân tích nghĩa sư phạm chuẩn lớp học...
                </p>
              </div>
            ) : translateResult ? (
              <div className="space-y-4">
                {/* Highlighted text banner */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 rounded-2xl border border-amber-200">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 uppercase">
                      {translateResult.type.toUpperCase()} • {translateResult.partOfSpeech || "Phát ngôn"}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeak(translateResult.text, 0.95)}
                        className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-800 transition-colors shadow-xs"
                        title="Nghe tốc độ chuẩn"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSpeak(translateResult.text, 0.65)}
                        className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-800 transition-colors shadow-xs"
                        title="Nghe tốc độ chậm"
                      >
                        <Snail className="w-4 h-4 text-amber-600" />
                      </button>
                      <button
                        onClick={() => handleCopy(translateResult.text)}
                        className="p-1.5 rounded-lg bg-white hover:bg-blue-100 text-blue-700 transition-colors shadow-xs"
                        title="Sao chép"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 leading-snug">
                    {translateResult.text}
                  </h2>
                  {translateResult.ipa && (
                    <span className="text-xs font-mono text-indigo-700 font-bold block mt-0.5">
                      {translateResult.ipa}
                    </span>
                  )}
                </div>

                {/* Meaning & Context Sections */}
                <div className="space-y-3 text-sm">
                  {/* Vietnamese Meaning */}
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
                    <span className="text-xs font-black text-emerald-800 block mb-1 uppercase tracking-wider">
                      🇻🇳 Nghĩa Tiếng Việt (Chuẩn sư phạm)
                    </span>
                    <p className="text-emerald-950 font-black text-base">
                      {translateResult.vietnamese}
                    </p>
                  </div>

                  {/* Context / Usage */}
                  {translateResult.usageOrContext && (
                    <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200">
                      <span className="text-xs font-black text-blue-800 block mb-1 uppercase tracking-wider flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        <span>Ngữ Cảnh Trong Lớp Học (Context)</span>
                      </span>
                      <p className="text-blue-950 text-xs leading-relaxed font-medium">
                        {translateResult.usageOrContext}
                      </p>
                    </div>
                  )}

                  {/* Example */}
                  {translateResult.exampleSentence && (
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
                      <span className="font-black text-slate-700 block uppercase tracking-wider">
                        Ví Dụ Thực Tế Trong Tiết Học:
                      </span>
                      <p className="font-bold text-slate-800 italic">
                        "{translateResult.exampleSentence}"
                      </p>
                      {translateResult.exampleSentenceVi && (
                        <p className="text-slate-500">
                          → {translateResult.exampleSentenceVi}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Useful Notes */}
                  {translateResult.usefulNotes && (
                    <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="font-black">Lưu ý sư phạm:</strong> {translateResult.usefulNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={handleSaveFavorite}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black transition-colors cursor-pointer"
              >
                <Star className={`w-3.5 h-3.5 ${isSaved ? "fill-amber-600 text-amber-600" : ""}`} />
                <span>{isSaved ? "Đã lưu vào Yêu thích!" : "Lưu vào Yêu thích"}</span>
              </button>

              <button
                onClick={() => setIsOpenModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
