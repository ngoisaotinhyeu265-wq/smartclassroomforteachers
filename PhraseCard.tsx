import React, { useState } from "react";
import { SmartClassroomPhrase } from "../../types/smartClassroom";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Volume2,
  Snail,
  Star,
  Copy,
  Check,
  Search,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Lightbulb,
} from "lucide-react";

interface PhraseCardProps {
  phrase: SmartClassroomPhrase;
  isFavorite: boolean;
  onToggleFavorite: (phraseId: string) => void;
  onOpenTranslateModal: (phrase: SmartClassroomPhrase) => void;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  isFavorite,
  onToggleFavorite,
  onOpenTranslateModal,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showAlternatives, setShowAlternatives] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSpeak = (textToSpeak: string, rate: number = 0.95) => {
    playSound("click");
    setIsPlaying(true);
    speakText(textToSpeak, { rate });
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleCopy = () => {
    playSound("click");
    const copyContent = phrase.isCallResponse
      ? `Teacher: ${phrase.teacherCall}\nStudents: ${phrase.studentResponse}`
      : phrase.english;
    navigator.clipboard.writeText(copyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyBadge = (diff: SmartClassroomPhrase["difficulty"]) => {
    switch (diff) {
      case "Must Know":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          label: "⭐ Must Know",
        };
      case "Natural":
        return {
          bg: "bg-blue-100 text-blue-900 border-blue-300",
          label: "🔵 Natural",
        };
      case "Useful":
        return {
          bg: "bg-yellow-100 text-yellow-900 border-yellow-300",
          label: "🟡 Useful",
        };
      case "Easy":
      default:
        return {
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          label: "🟢 Easy",
        };
    }
  };

  const diffBadge = getDifficultyBadge(phrase.difficulty);

  return (
    <div
      id={`phrase-card-${phrase.id}`}
      className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB] hover:border-blue-400 hover:shadow-[0_6px_0_0_#93C5FD] transition-all flex flex-col justify-between group"
    >
      <div className="space-y-3.5">
        {/* Top Badges & Favorite Button */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${diffBadge.bg}`}
            >
              {diffBadge.label}
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              ⭐ Primary
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {phrase.subcategory || phrase.categoryTitle}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id={`fav-btn-${phrase.id}`}
              onClick={() => {
                playSound("star");
                onToggleFavorite(phrase.id);
              }}
              title={isFavorite ? "Bỏ lưu yêu thích" : "Lưu vào mục Yêu thích"}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isFavorite
                  ? "bg-amber-100 text-amber-500 hover:bg-amber-200"
                  : "bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50"
              }`}
            >
              <Star
                className={`w-4 h-4 ${isFavorite ? "fill-amber-400 text-amber-500" : ""}`}
              />
            </button>

            <button
              id={`copy-btn-${phrase.id}`}
              onClick={handleCopy}
              title="Copy câu tiếng Anh"
              className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-all cursor-pointer relative"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded-md whitespace-nowrap shadow-lg">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* English Text Content (Call & Response or Single Phrase) */}
        {phrase.isCallResponse ? (
          <div className="space-y-2.5 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-4 rounded-2xl border border-blue-200/60">
            {/* Teacher Call */}
            <div className="flex items-start gap-2.5">
              <span className="text-xs font-black px-2 py-1 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                Teacher
              </span>
              <div className="flex-1">
                <p className="text-base sm:text-lg font-black text-slate-900 font-display select-text">
                  {phrase.teacherCall}
                </p>
                {phrase.ipa && (
                  <span className="text-[11px] font-mono text-indigo-600/90 block">
                    {phrase.ipa.split("->")[0]?.trim()}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleSpeak(phrase.teacherCall || "", 0.9)}
                className="p-1.5 rounded-lg bg-white/90 hover:bg-blue-100 text-blue-600 transition-colors shadow-xs shrink-0 cursor-pointer"
                title="Nghe Teacher call"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Students Response */}
            <div className="flex items-start gap-2.5 pl-3 border-l-2 border-amber-400">
              <span className="text-xs font-black px-2 py-1 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
                Students
              </span>
              <div className="flex-1">
                <p className="text-base sm:text-lg font-black text-amber-950 font-display select-text">
                  {phrase.studentResponse}
                </p>
                {phrase.ipa && phrase.ipa.includes("->") && (
                  <span className="text-[11px] font-mono text-amber-700/90 block">
                    {phrase.ipa.split("->")[1]?.trim()}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleSpeak(phrase.studentResponse || "", 0.95)}
                className="p-1.5 rounded-lg bg-white/90 hover:bg-amber-100 text-amber-600 transition-colors shadow-xs shrink-0 cursor-pointer"
                title="Nghe Students response"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-display font-black text-[#1E293B] leading-snug select-text group-hover:text-blue-700 transition-colors">
              {phrase.english}
            </h3>
            {phrase.ipa && (
              <span className="text-xs font-mono text-blue-600 font-medium select-text">
                {phrase.ipa}
              </span>
            )}
          </div>
        )}

        {/* Vietnamese Translation */}
        <div className="text-sm font-bold text-slate-600 select-text flex items-start gap-1.5">
          <span className="text-base">🇻🇳</span>
          <p>{phrase.vietnamese}</p>
        </div>

        {/* Context Information */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 font-black text-slate-700">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Ngữ cảnh sử dụng:</span>
          </div>
          <p className="text-slate-600 leading-relaxed pl-5">{phrase.context}</p>
          {phrase.teacherNotes && (
            <p className="text-amber-800 text-[11px] font-medium bg-amber-50 p-1.5 rounded-lg border border-amber-200 mt-1">
              💡 {phrase.teacherNotes}
            </p>
          )}
        </div>

        {/* Alternative Phrases (if any) */}
        {phrase.alternatives && phrase.alternatives.length > 0 && (
          <div className="pt-1">
            <button
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Cách nói tương đương ({phrase.alternatives.length})</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  showAlternatives ? "rotate-180" : ""
                }`}
              />
            </button>

            {showAlternatives && (
              <div className="mt-2 pl-3 border-l-2 border-blue-300 space-y-1.5 text-xs text-slate-700 animate-in fade-in duration-150">
                {phrase.alternatives.map((alt, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 group/alt">
                    <span className="font-semibold select-text">👉 {alt}</span>
                    <button
                      onClick={() => handleSpeak(alt, 0.9)}
                      className="opacity-0 group-hover/alt:opacity-100 p-1 hover:text-blue-600 transition-opacity"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Listen Normal & Slow Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            id={`listen-normal-${phrase.id}`}
            onClick={() => handleSpeak(phrase.english, 0.95)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-black border border-blue-200 transition-all cursor-pointer active:scale-95"
            title="Phát âm chuẩn (Tốc độ thường)"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? "animate-pulse" : ""}`} />
            <span>Listen</span>
          </button>

          <button
            id={`listen-slow-${phrase.id}`}
            onClick={() => handleSpeak(phrase.english, 0.65)}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-black border border-amber-200 transition-all cursor-pointer active:scale-95"
            title="Phát âm chậm rõ từng âm (Slow Speed)"
          >
            <Snail className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Slow</span>
          </button>
        </div>

        {/* Deep Translate / Detail Modal Button */}
        <button
          id={`translate-modal-btn-${phrase.id}`}
          onClick={() => {
            playSound("click");
            onOpenTranslateModal(phrase);
          }}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black border border-indigo-200 transition-all cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Tra cứu chi tiết</span>
        </button>
      </div>
    </div>
  );
};
