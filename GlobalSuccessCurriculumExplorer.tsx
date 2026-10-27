import React, { useState, useEffect } from "react";
import { GradeLevel, AppSkill, UserProgress, GlobalSuccessUnit, VocabItem } from "../../types";
import {
  GLOBAL_SUCCESS_SYLLABUS_OVERVIEW,
  getUnitsByGrade,
} from "../../data/globalSuccessCurriculumUnits";
import { playSound } from "../../utils/audioEffects";
import { speakText } from "../../utils/speech";
import { fireConfetti } from "../../utils/confetti";
import { AIPronunciationModal } from "../pronunciation/AIPronunciationModal";
import {
  BookOpen,
  Volume2,
  Sparkles,
  Layers,
  MessageSquare,
  ChevronRight,
  Search,
  BookMarked,
  Mic,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  Star,
  Activity,
  Flame,
  Award,
} from "lucide-react";

interface CurriculumExplorerProps {
  progress: UserProgress;
  initialUnitNumber?: number;
  initialGrade?: GradeLevel;
  onGradeChange?: (grade: GradeLevel) => void;
  onUnitChange?: (unitNumber: number) => void;
  onSelectUnitPractice?: (skill: AppSkill, topic: string) => void;
  onUpdateProgress?: (progress: UserProgress) => void;
}

export const GlobalSuccessCurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  progress,
  initialUnitNumber,
  initialGrade,
  onGradeChange,
  onUnitChange,
  onSelectUnitPractice,
  onUpdateProgress,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(
    initialGrade || progress.grade || 1
  );
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(
    initialUnitNumber || 1
  );
  const [activeLessonTab, setActiveLessonTab] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Interactive modes: lesson content, 3D flashcards, dialogues, or AI pronunciation lab
  const [activePracticeMode, setActivePracticeMode] = useState<
    "lesson" | "flashcard" | "dialogue" | "ai_pronunciation"
  >("lesson");
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [mobileViewTab, setMobileViewTab] = useState<"units" | "studio">("studio");

  const unitStudioRef = React.useRef<HTMLDivElement>(null);

  // AI Pronunciation Modal Target
  const [aiPracticeTarget, setAiPracticeTarget] = useState<{
    text: string;
    phonetics?: string;
    meaningVi?: string;
    context?: string;
    type?: "sounds" | "minimal_pair" | "word_stress" | "sentence_stress" | "intonation";
    expectedIntonation?: "rising" | "falling";
  } | null>(null);

  // Sync when initialGrade / initialUnitNumber change from external navigation
  useEffect(() => {
    if (initialGrade !== undefined && initialGrade !== selectedGrade) {
      setSelectedGrade(initialGrade);
      setMobileViewTab("studio");
    }
  }, [initialGrade]);

  useEffect(() => {
    if (initialUnitNumber !== undefined && initialUnitNumber !== selectedUnitNumber) {
      setSelectedUnitNumber(initialUnitNumber);
      setActiveLessonTab(1);
      setActivePracticeMode("lesson");
      setMobileViewTab("studio");
    }
  }, [initialUnitNumber]);

  const gradeUnits = React.useMemo(() => {
    return getUnitsByGrade(selectedGrade);
  }, [selectedGrade]);

  // Ensure selectedUnitNumber is valid in current grade
  useEffect(() => {
    if (gradeUnits.length > 0 && !gradeUnits.some((u) => u.unitNumber === selectedUnitNumber)) {
      setSelectedUnitNumber(gradeUnits[0].unitNumber);
      setActiveLessonTab(1);
    }
  }, [gradeUnits, selectedUnitNumber]);

  // Find active unit with defensive fallback
  const activeUnit: GlobalSuccessUnit = React.useMemo(() => {
    const found = gradeUnits.find((u) => u.unitNumber === selectedUnitNumber);
    return found || gradeUnits[0] || {
      grade: selectedGrade,
      unitNumber: 1,
      unitTitle: "Hello",
      unitTitleVi: "Xin chào",
      theme: "School & Friends",
      icon: "🏫",
      semester: 1,
      lessons: [],
    };
  }, [gradeUnits, selectedUnitNumber, selectedGrade]);

  const activeLesson = React.useMemo(() => {
    if (!activeUnit || !activeUnit.lessons || activeUnit.lessons.length === 0) return undefined;
    return activeUnit.lessons.find((l) => l.lessonNumber === activeLessonTab) || activeUnit.lessons[0];
  }, [activeUnit, activeLessonTab]);

  const filteredUnits = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return gradeUnits;
    return gradeUnits.filter((u) => {
      return (
        u.unitTitle.toLowerCase().includes(q) ||
        u.unitTitleVi.toLowerCase().includes(q) ||
        u.theme.toLowerCase().includes(q) ||
        `unit ${u.unitNumber}`.includes(q) ||
        `bài ${u.unitNumber}`.includes(q) ||
        u.lessons.some((l) =>
          l.vocabulary?.some(
            (v) =>
              v.word.toLowerCase().includes(q) ||
              v.vietnameseMeaning.toLowerCase().includes(q)
          )
        )
      );
    });
  }, [gradeUnits, searchQuery]);

  const allUnitVocab = React.useMemo(() => {
    const vocabMap = new Map<string, VocabItem>();
    activeUnit.lessons?.forEach((l) => {
      l.vocabulary?.forEach((v) => {
        if (!vocabMap.has(v.word.toLowerCase())) {
          vocabMap.set(v.word.toLowerCase(), v);
        }
      });
    });
    return Array.from(vocabMap.values());
  }, [activeUnit]);

  // Handler for selecting a unit
  const handleSelectUnit = (unitNum: number, targetLesson?: number) => {
    playSound("click");
    setSelectedUnitNumber(unitNum);
    setActiveLessonTab(targetLesson || 1);
    setActivePracticeMode("lesson");
    setFlashcardIndex(0);
    setIsFlipped(false);
    setMobileViewTab("studio");
    onUnitChange?.(unitNum);

    // Scroll into studio view smoothly
    if (typeof window !== "undefined") {
      setTimeout(() => {
        unitStudioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handleGradeTabClick = (g: GradeLevel) => {
    playSound("click");
    setSelectedGrade(g);
    setSelectedUnitNumber(1);
    setActiveLessonTab(1);
    setActivePracticeMode("lesson");
    setFlashcardIndex(0);
    setIsFlipped(false);
    setMobileViewTab("studio");
    onGradeChange?.(g);
    onUnitChange?.(1);
  };

  const handleSpeak = (text: string) => {
    playSound("click");
    speakText(text, { rate: 0.85 });
  };

  const openAIPronunciation = (
    text: string,
    phonetics?: string,
    meaningVi?: string,
    context?: string,
    type: "sounds" | "word_stress" | "sentence_stress" | "intonation" = "sounds",
    expectedIntonation: "rising" | "falling" = "falling"
  ) => {
    setAiPracticeTarget({
      text,
      phonetics,
      meaningVi,
      context,
      type,
      expectedIntonation,
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_8px_0_0_#D1E0FB] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Sách Giáo Khoa Chuẩn GDPT 2018
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3 py-1 rounded-full">
                Global Success 2026 (Hoàng Văn Vân)
              </span>
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black px-3 py-1 rounded-full">
                Trọn bộ 92 Unit (Khối 1 - 5)
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#1E293B] tracking-tight">
              Khám Phá Sách Giáo Khoa Global Success
            </h1>
            <p className="text-sm font-medium text-slate-600 max-w-2xl leading-relaxed">
              Nhấn vào từng Unit để xem từ vựng có phát âm IPA chuẩn, luyện mẫu câu giao tiếp, đọc truyện song ngữ và chấm điểm phát âm AI với độ chính xác cao!
            </p>
          </div>

          {/* Grade Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1.5 rounded-2xl border border-slate-200 shrink-0">
            {([1, 2, 3, 4, 5] as GradeLevel[]).map((g) => (
              <button
                key={g}
                id={`curriculum-grade-${g}`}
                onClick={() => handleGradeTabClick(g)}
                className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedGrade === g
                    ? "bg-blue-600 text-white shadow-[0_3px_0_0_#1D4ED8] scale-105"
                    : "text-slate-700 hover:text-blue-600 hover:bg-white/80"
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Screen View Switcher */}
      <div className="lg:hidden flex items-center gap-2 bg-white p-1.5 rounded-2xl border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB]">
        <button
          id="mobile-tab-units"
          onClick={() => {
            playSound("click");
            setMobileViewTab("units");
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mobileViewTab === "units"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 bg-slate-50"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>📋 Chọn Unit ({gradeUnits.length})</span>
        </button>
        <button
          id="mobile-tab-studio"
          onClick={() => {
            playSound("click");
            setMobileViewTab("studio");
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mobileViewTab === "studio"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 bg-slate-50"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>📖 Unit {activeUnit.unitNumber}: {activeUnit.unitTitle}</span>
        </button>
      </div>

      {/* Main Grid: Left Sidebar (Units List) & Right Content (Active Unit Studio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Units Navigation (4 cols) */}
        <div
          className={`lg:col-span-4 bg-white rounded-3xl p-5 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-4 sticky top-24 ${
            mobileViewTab === "studio" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="font-display font-black text-base text-slate-800">
                Danh Sách Unit (Lớp {selectedGrade})
              </h2>
            </div>
            <span className="text-[11px] font-black bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
              {gradeUnits.length} Bài Học
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm Unit, từ vựng..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Units Scroll List */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredUnits.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">
                Không tìm thấy bài học nào với từ khóa này.
              </p>
            ) : (
              filteredUnits.map((unit) => {
                const isSelected = activeUnit?.unitNumber === unit.unitNumber;

                return (
                  <div
                    key={unit.unitNumber}
                    id={`unit-card-${unit.unitNumber}`}
                    onClick={() => handleSelectUnit(unit.unitNumber)}
                    className={`p-3.5 rounded-2xl border-2 text-xs font-bold transition-all group cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-700 shadow-[0_4px_0_0_#1D4ED8]"
                        : "bg-slate-50 text-slate-700 hover:bg-blue-50/90 border-slate-200 hover:border-blue-300 active:translate-y-0.5"
                    }`}
                  >
                    <div className="w-full text-left flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 mt-0.5 ${
                            isSelected ? "bg-white/20" : "bg-white border border-slate-200 shadow-xs"
                          }`}
                        >
                          {unit.icon || "📖"}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                isSelected ? "bg-white text-blue-800" : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              Unit {unit.unitNumber}
                            </span>
                            <span className={`text-[10px] ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                              HK {unit.semester}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-black bg-emerald-500 text-white px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> Đang học
                              </span>
                            )}
                          </div>
                          <p className={`font-black text-xs sm:text-sm mt-1 ${isSelected ? "text-white" : "text-slate-800"}`}>
                            {unit.unitTitle}
                          </p>
                          {unit.unitTitleVi && (
                            <p className={`text-[11px] font-medium line-clamp-1 mt-0.5 ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                              {unit.unitTitleVi}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0 mt-1 ${
                          isSelected ? "text-white" : "text-slate-400"
                        }`}
                      />
                    </div>

                    {/* Direct Quick Lesson Chips */}
                    {unit.lessons && unit.lessons.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-black/10 overflow-x-auto scrollbar-none">
                        {unit.lessons.map((ls) => (
                          <button
                            key={ls.lessonNumber}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectUnit(unit.unitNumber, ls.lessonNumber);
                            }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer whitespace-nowrap ${
                              isSelected && activeLessonTab === ls.lessonNumber
                                ? "bg-white text-blue-700 shadow-xs scale-105"
                                : isSelected
                                ? "bg-blue-700/60 hover:bg-blue-700 text-white border border-white/20"
                                : "bg-white hover:bg-blue-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            L{ls.lessonNumber}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
            <span>NXB Giáo Dục Việt Nam</span>
            <a
              href="https://hoclieu.vn/kho-hoc-lieu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>hoclieu.vn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Active Unit Studio (8 cols) */}
        <div
          ref={unitStudioRef}
          className={`lg:col-span-8 space-y-5 ${
            mobileViewTab === "units" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Top Quick Unit Switcher Carousel (Available on all screens) */}
          <div className="bg-white rounded-2xl p-3 border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB]">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚡ Chọn nhanh Unit (Lớp {selectedGrade}):</span>
              </span>
              <span className="text-[10px] font-bold text-blue-600">
                Unit {activeUnit.unitNumber}/{gradeUnits.length}
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {gradeUnits.map((u) => {
                const isCur = u.unitNumber === activeUnit.unitNumber;
                return (
                  <button
                    key={u.unitNumber}
                    id={`quick-unit-btn-${u.unitNumber}`}
                    onClick={() => handleSelectUnit(u.unitNumber)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                      isCur
                        ? "bg-blue-600 text-white shadow-[0_2px_0_0_#1D4ED8] scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
                    }`}
                  >
                    <span>{u.icon || "📖"}</span>
                    <span>U{u.unitNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeUnit ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
              {/* Active Unit Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-3xl shadow-inner shrink-0">
                    {activeUnit.icon || "📖"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase">
                        Lớp {selectedGrade} • Unit {activeUnit.unitNumber}
                      </span>
                      <span className="text-slate-500 font-bold text-xs bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Học kỳ {activeUnit.semester}
                      </span>
                    </div>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-slate-800 mt-1">
                      {activeUnit.unitTitle}
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-blue-700 mt-0.5">
                      {activeUnit.unitTitleVi} • <span className="text-slate-500 font-medium">Chủ đề: {activeUnit.theme}</span>
                    </p>
                  </div>
                </div>

                {/* Direct Action Hub */}
                {onSelectUnitPractice && (
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => {
                        playSound("star");
                        onSelectUnitPractice("vocabulary", activeUnit.theme);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-[0_3px_0_0_#D97706] active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Luyện Từ Vựng</span>
                    </button>
                    <button
                      onClick={() => {
                        playSound("star");
                        onSelectUnitPractice("speaking", activeUnit.theme);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-[0_3px_0_0_#059669] active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Luyện Nói</span>
                    </button>
                  </div>
                )}
              </div>

              {/* In-Unit Practice Mode Selector */}
              <div className="flex items-center gap-2 bg-[#F1F5F9] p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
                <button
                  onClick={() => {
                    playSound("click");
                    setActivePracticeMode("lesson");
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activePracticeMode === "lesson"
                      ? "bg-white text-blue-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Bài Học SGK</span>
                </button>

                <button
                  onClick={() => {
                    playSound("click");
                    setActivePracticeMode("ai_pronunciation");
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activePracticeMode === "ai_pronunciation"
                      ? "bg-white text-emerald-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Mic className="w-4 h-4 text-emerald-600" />
                  <span>Phát Âm AI 🎙️</span>
                </button>

                <button
                  onClick={() => {
                    playSound("click");
                    setActivePracticeMode("flashcard");
                    setIsFlipped(false);
                    setFlashcardIndex(0);
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activePracticeMode === "flashcard"
                      ? "bg-white text-purple-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>Flashcard ({allUnitVocab.length})</span>
                </button>

                <button
                  onClick={() => {
                    playSound("click");
                    setActivePracticeMode("dialogue");
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activePracticeMode === "dialogue"
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Hội Thoại</span>
                </button>
              </div>

              {/* Mode 1: SGK Lesson Tabs & Content */}
              {activePracticeMode === "lesson" && (
                <div className="space-y-6">
                  {/* Lesson 1, 2, 3 Sub-Tabs */}
                  {activeUnit.lessons && activeUnit.lessons.length > 0 && (
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto">
                      {activeUnit.lessons.map((lesson) => (
                        <button
                          key={lesson.lessonNumber}
                          onClick={() => {
                            playSound("click");
                            setActiveLessonTab(lesson.lessonNumber);
                          }}
                          className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                            activeLessonTab === lesson.lessonNumber
                              ? "bg-blue-100 text-blue-800 border-2 border-blue-300 shadow-xs"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                          }`}
                        >
                          <span>{lesson.lessonTitle}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {activeLesson && (
                    <div className="space-y-6">
                      {/* Phonics Focus Sound */}
                      {activeLesson.phonicsSound && (
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0 font-display font-black">
                              🔤
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
                                Ngữ âm trọng tâm (Phonics)
                              </span>
                              <p className="font-black text-sm text-slate-800">
                                {activeLesson.phonicsSound}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSpeak(activeLesson.phonicsSound || "")}
                              className="p-2.5 rounded-xl bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 transition-all shadow-xs cursor-pointer active:scale-95"
                              title="Nghe phát âm chuẩn"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                openAIPronunciation(
                                  activeLesson.phonicsSound || "",
                                  activeLesson.phonicsSound,
                                  "Âm trọng tâm bài học",
                                  "",
                                  "sounds"
                                )
                              }
                              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1 text-xs font-black"
                              title="Luyện phát âm với AI"
                            >
                              <Mic className="w-4 h-4" />
                              <span className="hidden sm:inline">Luyện Nói</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Vocabulary Cards with Audio & AI Pronunciation */}
                      {activeLesson.vocabulary && activeLesson.vocabulary.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-display font-black text-sm text-slate-800 flex items-center gap-2">
                              <BookMarked className="w-4 h-4 text-blue-600" />
                              <span>Từ Vựng Trọng Tâm Bài Học</span>
                            </h3>
                            <span className="text-xs text-slate-500 font-bold">
                              {activeLesson.vocabulary.length} từ
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {activeLesson.vocabulary.map((vocab) => (
                              <div
                                key={vocab.id}
                                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border-2 border-slate-200 hover:border-blue-300 transition-all flex items-start justify-between gap-3 group"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs shrink-0 group-hover:scale-110 transition-transform">
                                    {vocab.emoji || "📝"}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-black text-sm sm:text-base text-slate-800">
                                        {vocab.word}
                                      </h4>
                                      {vocab.phonics && (
                                        <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-100 px-1.5 py-0.2 rounded-md">
                                          {vocab.phonics}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs font-bold text-emerald-700 mt-0.5">
                                      {vocab.vietnameseMeaning}
                                    </p>
                                    {vocab.clue && (
                                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                                        {vocab.clue}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() => handleSpeak(vocab.word)}
                                    className="p-2 rounded-xl bg-white hover:bg-blue-100 border border-slate-200 text-blue-600 transition-all shadow-xs cursor-pointer active:scale-95"
                                    title="Nghe phát âm"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      openAIPronunciation(
                                        vocab.word,
                                        vocab.phonics,
                                        vocab.vietnameseMeaning,
                                        vocab.exampleSentence,
                                        "word_stress"
                                      )
                                    }
                                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 transition-all shadow-xs cursor-pointer active:scale-95"
                                    title="Chấm điểm phát âm AI"
                                  >
                                    <Mic className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sentence Structures & Pattern */}
                      {activeLesson.sentenceStructures && activeLesson.sentenceStructures.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="font-display font-black text-sm text-slate-800 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-emerald-600" />
                            <span>Mẫu Câu & Hội Thoại SGK (Sentence Patterns)</span>
                          </h3>

                          {activeLesson.sentenceStructures.map((struct, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 space-y-3.5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                                    Cấu trúc mẫu
                                  </span>
                                  <p className="font-black text-sm text-slate-800 mt-0.5">
                                    {struct.pattern}
                                  </p>
                                  {struct.vietnameseMeaning && (
                                    <p className="text-xs font-bold text-emerald-700 mt-0.5">
                                      {struct.vietnameseMeaning}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() => handleSpeak(struct.pattern)}
                                    className="p-2 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition-all shadow-xs cursor-pointer"
                                    title="Nghe mẫu câu"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      openAIPronunciation(
                                        struct.pattern,
                                        "",
                                        struct.vietnameseMeaning,
                                        "",
                                        "sentence_stress",
                                        struct.pattern.includes("?") ? "rising" : "falling"
                                      )
                                    }
                                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                                    title="Luyện nói câu này với AI"
                                  >
                                    <Mic className="w-4 h-4" />
                                    <span className="hidden sm:inline">Luyện Đọc</span>
                                  </button>
                                </div>
                              </div>

                              {/* Sample Dialogue */}
                              {struct.sampleDialogue && struct.sampleDialogue.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-emerald-200/60">
                                  <span className="text-[11px] font-black text-emerald-900">
                                    Đối thoại mẫu:
                                  </span>
                                  <div className="space-y-1.5">
                                    {struct.sampleDialogue.map((dia, dIdx) => (
                                      <div
                                        key={dIdx}
                                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/90 border border-emerald-200 text-xs"
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                            {dia.speaker}:
                                          </span>
                                          <span className="font-bold text-slate-800">
                                            "{dia.text}"
                                          </span>
                                          <span className="text-slate-500 font-medium hidden sm:inline">
                                            ({dia.textVi})
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                          <button
                                            onClick={() => handleSpeak(dia.text)}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 cursor-pointer"
                                            title="Nghe câu"
                                          >
                                            <Volume2 className="w-3.5 h-3.5" />
                                          </button>
                                          <button
                                            onClick={() =>
                                              openAIPronunciation(
                                                dia.text,
                                                "",
                                                dia.textVi,
                                                `Đối thoại giữa ${dia.speaker}`,
                                                "sentence_stress",
                                                dia.text.includes("?") ? "rising" : "falling"
                                              )
                                            }
                                            className="p-1.5 text-emerald-600 hover:text-emerald-700 cursor-pointer"
                                            title="Luyện đọc câu này"
                                          >
                                            <Mic className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Mini Reading / Chant */}
                      {activeLesson.readingMiniStory && (
                        <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📖</span>
                              <h4 className="font-display font-black text-sm text-amber-950">
                                {activeLesson.readingMiniStory.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSpeak(activeLesson.readingMiniStory?.text || "")}
                                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black shadow-xs cursor-pointer"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                                <span>Nghe Bài Đọc</span>
                              </button>
                              <button
                                onClick={() =>
                                  openAIPronunciation(
                                    activeLesson.readingMiniStory?.text || "",
                                    "",
                                    activeLesson.readingMiniStory?.translationVi || "",
                                    activeLesson.readingMiniStory?.title || "",
                                    "sentence_stress",
                                    "falling"
                                  )
                                }
                                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-xs font-black shadow-xs cursor-pointer"
                              >
                                <Mic className="w-3.5 h-3.5" />
                                <span>Luyện Đọc AI</span>
                              </button>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-amber-200">
                            {activeLesson.readingMiniStory.text}
                          </p>

                          {activeLesson.readingMiniStory.translationVi && (
                            <p className="text-xs text-amber-900 font-bold bg-amber-100/60 p-3 rounded-xl">
                              💡 {activeLesson.readingMiniStory.translationVi}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Mode 2: AI Pronunciation Lab Hub */}
              {activePracticeMode === "ai_pronunciation" && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎙️</span>
                        <h3 className="font-display font-black text-sm text-emerald-950">
                          Trung Tâm Luyện Phát Âm AI - Unit {activeUnit.unitNumber}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        Chọn bất kỳ từ vựng hoặc câu bên dưới để mở AI Phân Tích & Chấm Điểm âm đuôi, trọng âm và ngữ điệu!
                      </p>
                    </div>

                    <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-xs shrink-0 self-start sm:self-center">
                      AI Powered
                    </span>
                  </div>

                  {/* Vocabulary Pronunciation List */}
                  <div className="space-y-3">
                    <h4 className="font-display font-black text-xs uppercase text-slate-500 tracking-wider">
                      Từ Vựng Unit ({allUnitVocab.length} từ)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {allUnitVocab.map((v) => (
                        <div
                          key={v.id}
                          className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-2 shadow-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{v.emoji || "✨"}</span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-black text-sm text-slate-800">
                                  {v.word}
                                </span>
                                {v.phonics && (
                                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded-md">
                                    {v.phonics}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-emerald-700 font-bold">
                                {v.vietnameseMeaning}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleSpeak(v.word)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                              title="Nghe mẫu"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                openAIPronunciation(
                                  v.word,
                                  v.phonics,
                                  v.vietnameseMeaning,
                                  v.exampleSentence,
                                  "word_stress"
                                )
                              }
                              className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Mic className="w-3.5 h-3.5" />
                              <span>Luyện Nói</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sentences Pronunciation List */}
                  {activeUnit.lessons.some((l) => l.sentenceStructures && l.sentenceStructures.length > 0) && (
                    <div className="space-y-3 pt-2">
                      <h4 className="font-display font-black text-xs uppercase text-slate-500 tracking-wider">
                        Mẫu Câu & Đối Thoại Giao Tiếp
                      </h4>
                      <div className="space-y-2">
                        {activeUnit.lessons.flatMap((l) => l.sentenceStructures || []).map((s, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-black uppercase text-emerald-700">
                                Mẫu câu:
                              </span>
                              <p className="font-black text-xs sm:text-sm text-slate-800">
                                "{s.pattern}"
                              </p>
                              <p className="text-xs text-slate-500 font-medium">
                                {s.vietnameseMeaning}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleSpeak(s.pattern)}
                                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  openAIPronunciation(
                                    s.pattern,
                                    "",
                                    s.vietnameseMeaning,
                                    "",
                                    "sentence_stress",
                                    s.pattern.includes("?") ? "rising" : "falling"
                                  )
                                }
                                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                              >
                                <Mic className="w-3.5 h-3.5" />
                                <span>Chấm Điểm Ngữ Điệu</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 3: Flashcard 3D */}
              {activePracticeMode === "flashcard" && (
                <div className="space-y-6 py-4">
                  {allUnitVocab.length === 0 ? (
                    <p className="text-center py-8 text-slate-500 font-bold">
                      Chưa có từ vựng cho phần này.
                    </p>
                  ) : (
                    <div className="flex flex-col items-center space-y-6">
                      <div className="flex items-center justify-between w-full max-w-md">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                          Thẻ {flashcardIndex + 1} / {allUnitVocab.length}
                        </span>
                        <button
                          onClick={() => {
                            playSound("click");
                            setIsFlipped(!isFlipped);
                          }}
                          className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Lật Thẻ</span>
                        </button>
                      </div>

                      {/* 3D Interactive Flip Card */}
                      <div
                        onClick={() => {
                          playSound("click");
                          setIsFlipped(!isFlipped);
                        }}
                        className="w-full max-w-md h-64 cursor-pointer perspective-1000 select-none group"
                      >
                        <div
                          className={`relative w-full h-full rounded-3xl p-8 transition-transform duration-500 transform-style-3d shadow-[0_8px_0_0_#CBD5E1] border-2 border-slate-300 flex flex-col items-center justify-center text-center ${
                            isFlipped
                              ? "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300"
                              : "bg-white border-blue-300 hover:border-blue-400"
                          }`}
                        >
                          {!isFlipped ? (
                            <div className="space-y-3">
                              <span className="text-5xl group-hover:scale-110 transition-transform inline-block">
                                {allUnitVocab[flashcardIndex]?.emoji || "📖"}
                              </span>
                              <h3 className="text-3xl font-display font-black text-slate-800">
                                {allUnitVocab[flashcardIndex]?.word}
                              </h3>
                              {allUnitVocab[flashcardIndex]?.phonics && (
                                <p className="text-sm font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
                                  {allUnitVocab[flashcardIndex]?.phonics}
                                </p>
                              )}
                              <p className="text-xs text-slate-400 font-bold pt-2">
                                (Nhấn để lật xem nghĩa tiếng Việt)
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <span className="text-xs font-black uppercase text-purple-700 tracking-wider">
                                Nghĩa tiếng Việt
                              </span>
                              <h3 className="text-2xl font-display font-black text-purple-900">
                                {allUnitVocab[flashcardIndex]?.vietnameseMeaning}
                              </h3>
                              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                                {allUnitVocab[flashcardIndex]?.clue}
                              </p>
                              {allUnitVocab[flashcardIndex]?.exampleSentence && (
                                <p className="text-xs font-medium italic text-purple-800 bg-white/80 p-2.5 rounded-xl border border-purple-200">
                                  "{allUnitVocab[flashcardIndex]?.exampleSentence}"
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Audio, AI Mic & Navigation Buttons */}
                      <div className="flex items-center gap-3 flex-wrap justify-center">
                        <button
                          disabled={flashcardIndex === 0}
                          onClick={() => {
                            playSound("click");
                            setFlashcardIndex((prev) => Math.max(0, prev - 1));
                            setIsFlipped(false);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-black text-xs transition-all cursor-pointer"
                        >
                          ◀ Thẻ trước
                        </button>

                        <button
                          onClick={() => handleSpeak(allUnitVocab[flashcardIndex]?.word || "")}
                          className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-[0_3px_0_0_#1D4ED8] active:translate-y-0.5 transition-all cursor-pointer"
                          title="Nghe phát âm từ này"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => {
                            const v = allUnitVocab[flashcardIndex];
                            if (v) {
                              openAIPronunciation(
                                v.word,
                                v.phonics,
                                v.vietnameseMeaning,
                                v.exampleSentence,
                                "word_stress"
                              );
                            }
                          }}
                          className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_3px_0_0_#059669] active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs"
                          title="Luyện nói từ này với AI"
                        >
                          <Mic className="w-5 h-5" />
                          <span>Luyện Nói AI</span>
                        </button>

                        <button
                          disabled={flashcardIndex === allUnitVocab.length - 1}
                          onClick={() => {
                            playSound("click");
                            setFlashcardIndex((prev) => Math.min(allUnitVocab.length - 1, prev + 1));
                            setIsFlipped(false);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs transition-all cursor-pointer shadow-[0_3px_0_0_#1D4ED8]"
                        >
                          Thẻ tiếp theo ▶
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 4: Dialogue Studio */}
              {activePracticeMode === "dialogue" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-black text-sm text-slate-800 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Thực Hành Hội Thoại Trọng Tâm (Unit {activeUnit.unitNumber})</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {activeUnit.lessons.flatMap((l) => l.sentenceStructures || []).map((struct, sIdx) => (
                      <div key={sIdx} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-blue-700 uppercase tracking-wider">
                            Mẫu câu: {struct.pattern}
                          </span>
                          <span className="text-xs text-emerald-700 font-bold">
                            {struct.vietnameseMeaning}
                          </span>
                        </div>

                        {struct.sampleDialogue?.map((dia, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[11px] font-black text-indigo-700 uppercase">
                                {dia.speaker}
                              </span>
                              <p className="font-black text-xs sm:text-sm text-slate-800">
                                "{dia.text}"
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {dia.textVi}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleSpeak(dia.text)}
                                className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all cursor-pointer"
                                title="Nghe câu thoại"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  openAIPronunciation(
                                    dia.text,
                                    "",
                                    dia.textVi,
                                    `Đối thoại với ${dia.speaker}`,
                                    "sentence_stress",
                                    dia.text.includes("?") ? "rising" : "falling"
                                  )
                                }
                                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 transition-all cursor-pointer"
                                title="Luyện đọc câu thoại này"
                              >
                                <Mic className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500 font-bold border-2 border-slate-200">
              Vui lòng chọn một Unit từ danh sách bên trái để bắt đầu học.
            </div>
          )}
        </div>
      </div>

      {/* AI Pronunciation Assessment Popup Modal */}
      {aiPracticeTarget && (
        <AIPronunciationModal
          isOpen={!!aiPracticeTarget}
          onClose={() => setAiPracticeTarget(null)}
          targetText={aiPracticeTarget.text}
          phoneticPattern={aiPracticeTarget.phonetics}
          meaningVi={aiPracticeTarget.meaningVi}
          contextSentence={aiPracticeTarget.context}
          pronunciationType={aiPracticeTarget.type}
          expectedIntonation={aiPracticeTarget.expectedIntonation}
          grade={selectedGrade}
          onScoreEarned={(score, xp) => {
            if (onUpdateProgress && progress) {
              onUpdateProgress({
                ...progress,
                xp: (progress.xp || 0) + xp,
              });
            }
          }}
        />
      )}
    </div>
  );
};
