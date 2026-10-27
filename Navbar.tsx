import React from "react";
import { UserProgress, GradeLevel, AppSkill } from "../types";
import { Sparkles, Flame, Volume2, VolumeX, GraduationCap, Trophy, BookOpen, Rocket, Search, ShieldCheck, Bot } from "lucide-react";
import { playSound } from "../utils/audioEffects";

interface NavbarProps {
  currentSkill: AppSkill;
  onSelectSkill: (skill: AppSkill) => void;
  progress: UserProgress;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLearningPack: () => void;
  onOpenDailyChallenge: () => void;
  onOpenKnowledgeSearch?: () => void;
  onChangeGrade: (grade: GradeLevel) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSkill,
  onSelectSkill,
  progress,
  isTeacherMode,
  onToggleTeacherMode,
  soundEnabled,
  onToggleSound,
  onOpenLearningPack,
  onOpenDailyChallenge,
  onOpenKnowledgeSearch,
  onChangeGrade,
}) => {
  const xpPercent = Math.min(100, Math.round((progress.xp % 500) / 5));

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2 bg-[#F0F7FF]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto bg-white px-4 sm:px-7 py-3 sm:py-3.5 rounded-[28px] sm:rounded-[36px] shadow-[0_8px_0_0_#D1E0FB] border-2 border-[#D1E0FB]">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Title with Author Copyright */}
          <div
            id="brand-logo"
            onClick={() => {
              playSound("click");
              onSelectSkill("dashboard");
            }}
            className="flex items-center gap-3 sm:gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl sm:text-3xl shadow-inner border-2 border-white/60 group-hover:rotate-6 transition-transform">
              🦁
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg sm:text-xl text-[#1E293B] leading-none uppercase tracking-tight">
                  English Primary Hub
                </span>
                <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-[11px] font-black px-2 py-0.5 rounded-full border border-blue-200">
                  GLOBAL SUCCESS
                </span>
                <span
                  title="Bản quyền tác giả Thanh Nguyễn (Không được tự ý chỉnh sửa app)"
                  className="hidden md:inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs"
                >
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  Bản quyền: Thanh Nguyễn
                </span>
              </div>
              <p className="text-[#64748B] font-bold text-[11px] sm:text-xs uppercase tracking-widest mt-1">
                Lớp {progress.grade} • {progress.levelTitle}
              </p>
            </div>
          </div>

          {/* Center Navigation / Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              id="nav-ai-assistant-btn"
              onClick={() => {
                playSound("star");
                onSelectSkill("ai-assistant");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border-2 font-black text-xs transition-all shadow-[0_3px_0_0_#D97706] active:translate-y-0.5 active:shadow-none cursor-pointer ${
                currentSkill === "ai-assistant"
                  ? "bg-amber-500 text-white border-amber-600 shadow-none"
                  : "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900"
              }`}
            >
              <Bot className="w-4 h-4 text-amber-600" />
              <span>Trợ Lý AI Thanh Nguyễn</span>
              <span className="bg-rose-500 text-white px-1.5 py-0.2 rounded-full text-[9px] font-black">
                MỚI
              </span>
            </button>

            {onOpenKnowledgeSearch && (
              <button
                id="nav-knowledge-search-btn"
                onClick={() => {
                  playSound("click");
                  onOpenKnowledgeSearch();
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-indigo-900 text-xs font-black transition-all shadow-[0_3px_0_0_#818CF8] active:translate-y-0.5 active:shadow-none"
              >
                <Search className="w-4 h-4 text-indigo-600" />
                <span>Tra cứu SGK & Mở rộng</span>
              </button>
            )}

            <button
              id="nav-daily-challenge-btn"
              onClick={() => {
                playSound("star");
                onOpenDailyChallenge();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FEF3C7] hover:bg-[#FDE68A] border-2 border-[#FCD34D] text-[#92400E] text-xs font-black transition-all shadow-[0_3px_0_0_#F59E0B] active:translate-y-0.5 active:shadow-none"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>Thử thách ngày</span>
              <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-[10px] font-black">
                {progress.dailyChallenge.allDone ? "100%" : "3/6"}
              </span>
            </button>

            <button
              id="nav-smart-classroom-btn"
              onClick={() => {
                playSound("click");
                onSelectSkill("smart-classroom");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border-2 font-black text-xs transition-all shadow-[0_3px_0_0_#2563EB] active:translate-y-0.5 active:shadow-none cursor-pointer ${
                currentSkill === "smart-classroom"
                  ? "bg-blue-600 text-white border-blue-700 shadow-none"
                  : "bg-[#EFF6FF] hover:bg-[#DBEAFE] border-[#93C5FD] text-[#1D4ED8]"
              }`}
            >
              <span>🏫</span>
              <span>Smart Classroom</span>
              <span className="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full text-[9px] font-black">
                MỚI
              </span>
            </button>

            <button
              id="nav-learning-pack-btn"
              onClick={() => {
                playSound("click");
                onOpenLearningPack();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#EDE9FE] hover:bg-[#DDD6FE] border-2 border-[#C4B5FD] text-[#5B21B6] text-xs font-black transition-all shadow-[0_3px_0_0_#8B5CF6] active:translate-y-0.5 active:shadow-none"
            >
              <Rocket className="w-4 h-4 text-purple-600" />
              <span>Gói bài học 1-Click</span>
            </button>
          </div>

          {/* Right Stats & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Grade Selector */}
            <div className="flex items-center bg-[#F1F5F9] px-2 py-1 rounded-2xl border-2 border-white shadow-xs">
              <span className="text-[11px] font-black text-slate-500 pl-1 pr-1.5 hidden md:inline uppercase">Lớp:</span>
              <select
                id="grade-selector"
                value={progress.grade}
                onChange={(e) => {
                  playSound("click");
                  onChangeGrade(Number(e.target.value) as GradeLevel);
                }}
                aria-label="Select Grade Level"
                className="bg-white text-slate-800 text-xs font-black px-2 py-1 rounded-xl border border-slate-200 shadow-xs focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer"
              >
                <option value={1}>Lớp 1</option>
                <option value={2}>Lớp 2</option>
                <option value={3}>Lớp 3</option>
                <option value={4}>Lớp 4</option>
                <option value={5}>Lớp 5</option>
              </select>
            </div>

            {/* Streak Badge */}
            <div
              id="nav-streak-badge"
              title={`${progress.streakDays} ngày học liên tiếp!`}
              className="flex items-center gap-1.5 bg-[#F1F5F9] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white font-black text-slate-700 text-xs shadow-xs"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{progress.streakDays} Ngày</span>
            </div>

            {/* XP Level Progress Bar */}
            <div className="hidden sm:flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-[11px] font-black text-blue-600 uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>{progress.xp} XP</span>
              </div>
              <div className="w-24 sm:w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(10, xpPercent)}%` }}
                />
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={() => {
                onToggleSound();
                if (!soundEnabled) playSound("click");
              }}
              title={soundEnabled ? "Mute audio" : "Enable audio"}
              className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F1F5F9] hover:bg-slate-200 border-2 border-white text-slate-700 transition-colors shadow-xs"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Teacher Mode Switcher */}
            <button
              id="teacher-mode-toggle-btn"
              onClick={() => {
                playSound("click");
                onToggleTeacherMode();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black border-2 transition-all active:translate-y-0.5 ${
                isTeacherMode
                  ? "bg-[#FFE4E6] text-[#BE123C] border-[#FDA4AF] shadow-[0_3px_0_0_#F43F5E]"
                  : "bg-[#F1F5F9] text-slate-700 hover:bg-slate-200 border-white shadow-xs"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden md:inline">{isTeacherMode ? "Đóng Giáo Viên" : "Giáo Viên"}</span>
              <span className="md:hidden">GV</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
