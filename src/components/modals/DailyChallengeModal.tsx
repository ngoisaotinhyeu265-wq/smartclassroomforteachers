import React, { useEffect } from "react";
import { UserProgress, AppSkill } from "../../types";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import {
  Sparkles,
  X,
  CheckCircle2,
  Circle,
  ArrowRight,
  Trophy,
  Flame,
} from "lucide-react";

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onStartSkill: (skill: AppSkill) => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  progress,
  onStartSkill,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const challenges = [
    {
      id: "vocab",
      skill: "vocabulary" as AppSkill,
      title: "1. Đố vui Từ Vựng (Vocabulary Hub)",
      titleEn: "Guess 1 Word in Vocabulary Hub",
      isDone: progress.dailyChallenge?.completedVocab ?? false,
      reward: "+10 XP",
      icon: "📚",
    },
    {
      id: "listening",
      skill: "listening" as AppSkill,
      title: "2. Luyện Nghe & Chọn Tranh (Listening Studio)",
      titleEn: "Listen & Answer 1 Audio Challenge",
      isDone: progress.dailyChallenge?.completedListening ?? false,
      reward: "+15 XP",
      icon: "🎧",
    },
    {
      id: "reading",
      skill: "reading" as AppSkill,
      title: "3. Đọc Truyện & Trả Lời Câu Hỏi (Reading Room)",
      titleEn: "Read 1 Story & Answer Questions",
      isDone: progress.dailyChallenge?.completedReading ?? false,
      reward: "+15 XP",
      icon: "📖",
    },
    {
      id: "grammar",
      skill: "grammar" as AppSkill,
      title: "4. Phòng Thí Nghiệm Ngữ Pháp (Grammar Lab)",
      titleEn: "Complete 1 Grammar Lab Exercise",
      isDone: progress.dailyChallenge?.completedGrammar ?? false,
      reward: "+15 XP",
      icon: "🔤",
    },
    {
      id: "speaking",
      skill: "speaking" as AppSkill,
      title: "5. Luyện Phát Âm Với Micro (Speaking Coach)",
      titleEn: "Speak 1 Sentence into Microphone",
      isDone: progress.dailyChallenge?.completedSpeaking ?? false,
      reward: "+20 XP",
      icon: "🗣️",
    },
    {
      id: "writing",
      skill: "writing" as AppSkill,
      title: "6. Viết Đoạn Văn Tiếng Anh (Writing Studio)",
      titleEn: "Write 1 Sentence in Writing Studio",
      isDone: progress.dailyChallenge?.completedWriting ?? false,
      reward: "+20 XP",
      icon: "✍️",
    },
  ];

  const completedCount = challenges.filter((c) => c.isDone).length;
  const isAllDone = completedCount === challenges.length;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col border-2 border-[#D1E0FB] shadow-[0_12px_32px_rgba(0,0,0,0.25)] overflow-hidden relative">
        {/* Sticky Top Header with Prominent Close Button */}
        <div className="sticky top-0 z-30 p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-amber-500/20 shrink-0">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-base sm:text-lg text-slate-800">
                  Nhiệm Vụ Hằng Ngày
                </h2>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                  Daily Quests
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Hoàn thành để bảo vệ chuỗi Streak rực lửa! 🔥
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            aria-label="Đóng nhiệm vụ"
            className="w-10 h-10 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center transition-all active:scale-90 shrink-0 cursor-pointer shadow-xs"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Progress Tracker */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-amber-950">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Tiến độ hôm nay:</span>
              </span>
              <span className="bg-white px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xs">
                {completedCount} / 6 Hoàn thành
              </span>
            </div>
            <div className="w-full h-3 bg-amber-200/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${(completedCount / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenges List */}
          <div className="space-y-2">
            {challenges.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  playSound("click");
                  onClose();
                  onStartSkill(c.skill);
                }}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer group ${
                  c.isDone
                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-900 shadow-xs"
                    : "bg-slate-50 hover:bg-amber-50/80 border-slate-200 hover:border-amber-300 text-slate-800 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>
                  <div>
                    <h4 className="font-display font-black text-xs text-slate-800 group-hover:text-blue-600">
                      {c.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-md">
                        {c.reward}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                        {c.titleEn}
                      </span>
                    </div>
                  </div>
                </div>

                {c.isDone ? (
                  <div className="flex items-center gap-1 text-emerald-600 font-black text-xs shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 group-hover:bg-amber-400 group-hover:border-amber-500 group-hover:text-amber-950 flex items-center justify-center text-slate-400 transition-all shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Bottom Footer with Extra Close Button */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center gap-3">
          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-black text-xs border border-slate-200 shadow-xs transition-all active:scale-95 text-center cursor-pointer"
          >
            Đóng cửa sổ
          </button>

          {isAllDone ? (
            <div className="flex-2 py-2.5 px-4 rounded-2xl bg-emerald-500 text-white text-center font-display font-black text-xs shadow-md flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Đã Xong 100%! +100 XP Thưởng</span>
            </div>
          ) : (
            <button
              onClick={() => {
                playSound("star");
                onClose();
                onStartSkill("vocabulary");
              }}
              className="flex-2 py-2.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-[0_3px_0_0_#D97706] active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bắt Đầu Nhiệm Vụ ✨</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
