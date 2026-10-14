import React, { useState, useEffect, useRef } from "react";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { Volume2, Sparkles, X, BookOpen, ExternalLink, Check, Copy } from "lucide-react";

interface TextSelectionTranslatorProps {
  onOpenFullLookup?: (query: string) => void;
}

interface SelectionTranslationResult {
  text: string;
  translationVi: string;
  ipa?: string;
  endingSounds?: string;
  partOfSpeech?: string;
  simpleExplanation?: string;
  exampleSentence?: string;
  exampleSentenceVi?: string;
}

export const TextSelectionTranslator: React.FC<TextSelectionTranslatorProps> = ({
  onOpenFullLookup,
}) => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [buttonPos, setButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translationResult, setTranslationResult] = useState<SelectionTranslationResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Don't trigger if clicking inside our own popup
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        return;
      }

      const selection = window.getSelection();
      const text = selection ? selection.toString().trim() : "";

      if (text && text.length >= 2 && text.length <= 150) {
        // Position button near selection
        const range = selection?.getRangeAt(0);
        if (range) {
          const rect = range.getBoundingClientRect();
          setButtonPos({
            x: Math.max(10, Math.min(window.innerWidth - 180, rect.left + rect.width / 2 - 70)),
            y: Math.max(10, rect.top - 44),
          });
          setSelectedText(text);
        }
      } else {
        if (!isOpenModal) {
          setButtonPos(null);
          setSelectedText("");
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpenModal(false);
        setButtonPos(null);
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
    setButtonPos(null);
    setIsLoading(true);
    setTranslationResult(null);

    try {
      const response = await fetch("/api/gemini/translate-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
          grade: 3,
        }),
      });
      const data = await response.json();
      setTranslationResult(data);
      playSound("star");
    } catch (e) {
      setTranslationResult({
        text: textToTranslate,
        translationVi: `Nghĩa của: "${textToTranslate}"`,
        ipa: "/.../",
        endingSounds: "Phát âm rõ ràng và chú ý bật hơi âm cuối",
        partOfSpeech: "Từ vựng / Cụm từ",
        simpleExplanation: "Bản dịch tra cứu tức thì từ văn bản",
        exampleSentence: `Let's learn: ${textToTranslate}.`,
        exampleSentenceVi: `Hãy cùng học: ${textToTranslate}.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={containerRef} className="z-50 select-none">
      {/* Floating Mini Action Pill near highlighted text */}
      {buttonPos && selectedText && !isOpenModal && (
        <div
          id="text-highlight-action-pill"
          style={{
            position: "fixed",
            left: `${buttonPos.x}px`,
            top: `${buttonPos.y}px`,
            zIndex: 9999,
          }}
          className="animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-1 bg-slate-900/95 text-white px-3 py-1.5 rounded-full shadow-2xl border border-indigo-400/40 backdrop-blur-md">
            <button
              onClick={() => handleTranslateSelection(selectedText)}
              className="flex items-center gap-1.5 hover:text-amber-300 font-bold text-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Tra nghĩa: <span className="text-amber-300 font-extrabold max-w-[90px] truncate inline-block align-bottom">{selectedText}</span></span>
            </button>

            <div className="w-[1px] h-3.5 bg-slate-700 mx-1" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                playSound("click");
                speakText(selectedText, { rate: 0.9 });
              }}
              title="Phát âm chuẩn bản ngữ"
              className="hover:text-cyan-300 p-0.5 rounded-full transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Instant Translation Card Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            id="text-translation-result-card"
            className="bg-white w-full max-w-md rounded-3xl p-6 border-2 border-indigo-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 relative"
          >
            {/* Close button */}
            <button
              onClick={() => {
                playSound("click");
                setIsOpenModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Query */}
            <div className="flex items-start gap-3 pr-8">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
                📖
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-black text-xl text-slate-900">{selectedText}</h3>
                  <button
                    onClick={() => speakText(selectedText, { rate: 0.88 })}
                    className="p-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopyText(selectedText)}
                    className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors"
                    title="Sao chép"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {translationResult?.ipa && (
                  <span className="text-xs font-mono font-bold text-slate-500">{translationResult.ipa}</span>
                )}
              </div>
            </div>

            {/* Content / Loading State */}
            {isLoading ? (
              <div className="py-8 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-600">Đang tra nghĩa & phân tích âm đuôi...</p>
              </div>
            ) : translationResult ? (
              <div className="space-y-3.5 text-xs">
                {/* Vietnamese Meaning Box */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-indigo-900 uppercase text-[10px] tracking-wider">
                      🇻🇳 Nghĩa Tiếng Việt
                    </span>
                    {translationResult.partOfSpeech && (
                      <span className="px-2 py-0.5 rounded-md bg-white text-indigo-800 text-[10px] font-bold border border-indigo-200">
                        {translationResult.partOfSpeech}
                      </span>
                    )}
                  </div>
                  <p className="font-display font-black text-base text-indigo-950">
                    {translationResult.translationVi}
                  </p>
                </div>

                {/* Ending Sound Notice */}
                {translationResult.endingSounds && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-amber-900">
                    <span className="text-base">💨</span>
                    <div>
                      <span className="font-black block text-[11px]">Lưu ý bật hơi âm đuôi:</span>
                      <p className="text-[11px] leading-relaxed font-medium">{translationResult.endingSounds}</p>
                    </div>
                  </div>
                )}

                {/* Example sentence */}
                {translationResult.exampleSentence && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-500 text-[10px] uppercase">Câu ví dụ:</span>
                      <button
                        onClick={() => speakText(translationResult.exampleSentence || "", { rate: 0.9 })}
                        className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px] font-bold"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Nghe</span>
                      </button>
                    </div>
                    <p className="font-medium text-slate-800 italic">“{translationResult.exampleSentence}”</p>
                    {translationResult.exampleSentenceVi && (
                      <p className="text-slate-500 font-normal">{translationResult.exampleSentenceVi}</p>
                    )}
                  </div>
                )}

                {/* Action footer */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  {onOpenFullLookup && (
                    <button
                      onClick={() => {
                        setIsOpenModal(false);
                        onOpenFullLookup(selectedText);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Tra Cứu Chi Tiết SGK & Mở Rộng</span>
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
