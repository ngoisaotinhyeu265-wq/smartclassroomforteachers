import React from "react";
import { UserProgress } from "../../types";
import { ALL_BADGES } from "../../utils/storage";
import { playSound } from "../../utils/audioEffects";
import {
  Trophy,
  Flame,
  Star,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";

interface ProgressDashboardProps {
  progress: UserProgress;
  onSelectReviewMode: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onSelectReviewMode,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-teal-500/20">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800">
                  {progress.studentName}'s Learning Journey
                </h1>
              </div>
              <p className="text-xs text-slate-500">
                Level: <span className="font-bold text-teal-700">{progress.levelTitle}</span> • Grade {progress.grade} Global Success
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{progress.streakDays}-Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{progress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Skill Mastery Progress Bars */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span>English Skills Competency</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.entries(progress.skillStats) as [string, { score: number; attempts: number }][]).map(([skillKey, stat]) => (
              <div key={skillKey} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="capitalize text-slate-700">{skillKey}</span>
                  <span className="text-teal-700">{stat.score}% Accuracy</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${stat.score}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-600 block">{stat.attempts} exercises completed</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spaced Repetition Review Queue */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-rose-500" />
            <h2 className="font-display font-bold text-base text-slate-800">
              Spaced Repetition Queue ({progress.missedWords.length} words to review)
            </h2>
          </div>

          {progress.missedWords.length > 0 && (
            <button
              onClick={() => {
                playSound("click");
                onSelectReviewMode();
              }}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-xs"
            >
              Start Spaced Review Now 🚀
            </button>
          )}
        </div>

        {progress.missedWords.length === 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center text-xs text-emerald-800 font-bold">
            🎉 Amazing! You have mastered all practiced words. Keep up the great work!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {progress.missedWords.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-rose-900">{item.word}</span>
                  <span className="bg-rose-200 text-rose-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    Wrong {item.wrongCount}x
                  </span>
                </div>
                <p className="text-slate-600 line-clamp-1 italic">“{item.clue}”</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="font-display font-bold text-base text-slate-800">
              Huy hiệu danh giá (Badges Collection)
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            {progress.badges.length} / {ALL_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = progress.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between transition-all ${
                  isUnlocked
                    ? "bg-amber-50/50 border-amber-300 shadow-xs"
                    : "bg-slate-50 border-slate-200 opacity-40 grayscale"
                }`}
              >
                <span className="text-3xl mb-1">{badge.icon}</span>
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-800 leading-tight">
                    {badge.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{badge.nameVi}</p>
                </div>
                <span className="text-[9px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded mt-2">
                  {isUnlocked ? "✓ Unlocked" : `${badge.requiredXp} XP`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
