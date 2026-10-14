import React, { useState, useEffect, useMemo } from "react";
import {
  SmartClassroomTab,
  SmartClassroomPhrase,
} from "../../types/smartClassroom";
import {
  SMART_CLASSROOM_PHRASES,
  CLASSROOM_CATEGORIES,
} from "../../data/smartClassroomData";
import { SmartClassroomHome } from "./SmartClassroomHome";
import { PhraseCard } from "./PhraseCard";
import { AttentionSignalsStudio } from "./AttentionSignalsStudio";
import { DailyPracticeStudio } from "./DailyPracticeStudio";
import { DictionarySearchView } from "./DictionarySearchView";
import { SelectionTranslateModal } from "./SelectionTranslateModal";
import { ClassroomTimerModal } from "./ClassroomTimerModal";
import { TeacherModeStudio } from "./TeacherModeStudio";
import { ClassroomScriptBuilder } from "./ClassroomScriptBuilder";
import { EndOfYearCommentsStudio } from "./EndOfYearCommentsStudio";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Sparkles,
  Search,
  Star,
  Clock,
  Volume2,
  Filter,
  Layers,
  Heart,
  BookOpen,
  ArrowLeft,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface SmartClassroomAppProps {
  onBackToApp?: () => void;
}

export const SmartClassroomApp: React.FC<SmartClassroomAppProps> = ({
  onBackToApp,
}) => {
  const [currentTab, setCurrentTab] = useState<SmartClassroomTab>("home");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [selectedPhraseForModal, setSelectedPhraseForModal] =
    useState<SmartClassroomPhrase | null>(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("smart_classroom_favorites");
      return saved ? JSON.parse(saved) : ["att-01", "praise-01", "inst-01"];
    } catch {
      return ["att-01", "praise-01", "inst-01"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "smart_classroom_favorites",
        JSON.stringify(favorites)
      );
    } catch {}
  }, [favorites]);

  const handleToggleFavorite = (phraseId: string) => {
    setFavorites((prev) => {
      if (prev.includes(phraseId)) {
        return prev.filter((id) => id !== phraseId);
      } else {
        return [...prev, phraseId];
      }
    });
  };

  // 14+ Primary Navigation Items
  const navItems = [
    { id: "home" as SmartClassroomTab, label: "Home", icon: "🏠" },
    {
      id: "teacher-mode" as SmartClassroomTab,
      label: "Teacher Mode (Cần Nói Gì - Có Đó)",
      icon: "⚡",
    },
    {
      id: "classroom-script" as SmartClassroomTab,
      label: "Classroom Script (7 Chặng)",
      icon: "📑",
    },
    {
      id: "report-comments" as SmartClassroomTab,
      label: "Student Comments (Nhận Xét Cuối Năm)",
      icon: "📝",
    },
    {
      id: "greetings" as SmartClassroomTab,
      label: "Greetings & Opening",
      icon: "👋",
    },
    {
      id: "attention" as SmartClassroomTab,
      label: "Attention Signals",
      icon: "👀",
    },
    {
      id: "instructions" as SmartClassroomTab,
      label: "Instructions",
      icon: "📝",
    },
    {
      id: "teaching" as SmartClassroomTab,
      label: "Teaching & Explaining",
      icon: "📚",
    },
    {
      id: "checking" as SmartClassroomTab,
      label: "Checking Understanding",
      icon: "🎯",
    },
    {
      id: "praise" as SmartClassroomTab,
      label: "Praise & Motivation",
      icon: "👍",
    },
    {
      id: "feedback" as SmartClassroomTab,
      label: "Correction & Feedback",
      icon: "💡",
    },
    {
      id: "transitions" as SmartClassroomTab,
      label: "Transitions",
      icon: "🔄",
    },
    {
      id: "management" as SmartClassroomTab,
      label: "Classroom Management",
      icon: "🔔",
    },
    {
      id: "ending" as SmartClassroomTab,
      label: "Ending the Lesson",
      icon: "🏁",
    },
    {
      id: "dictionary" as SmartClassroomTab,
      label: "Smart Dictionary",
      icon: "🔍",
    },
    {
      id: "favorites" as SmartClassroomTab,
      label: `Favorites (${favorites.length})`,
      icon: "⭐",
    },
    {
      id: "pronunciation" as SmartClassroomTab,
      label: "5-Min Practice",
      icon: "🎯",
    },
  ];

  // Map tabs to category IDs in SMART_CLASSROOM_PHRASES
  const tabToCategoryIdMap: Partial<Record<SmartClassroomTab, string>> = {
    greetings: "greetings",
    attention: "attention",
    instructions: "instructions",
    teaching: "teaching",
    checking: "checking",
    praise: "praise",
    feedback: "feedback",
    transitions: "transitions",
    management: "management",
    ending: "ending",
  };

  const currentCategoryData = useMemo(() => {
    const catId = tabToCategoryIdMap[currentTab];
    if (!catId) return null;
    return CLASSROOM_CATEGORIES.find((c) => c.id === catId);
  }, [currentTab]);

  // Filtered phrases for active category & favorites
  const filteredPhrases = useMemo(() => {
    if (currentTab === "favorites") {
      const byId = SMART_CLASSROOM_PHRASES.filter((p) => favorites.includes(p.id));
      const customPhrases: SmartClassroomPhrase[] = favorites
        .filter((f) => !SMART_CLASSROOM_PHRASES.some((p) => p.id === f))
        .map((f, idx) => ({
          id: `fav-custom-${idx}`,
          english: f,
          vietnamese: "Câu đã lưu từ Teacher Mode / Tra cứu",
          category: "instructions",
          categoryTitle: "Mục đã lưu",
          context: "Lớp học tiếng Anh tiểu học",
          level: "Primary",
          difficulty: "Useful",
          tone: "friendly",
          tags: ["Saved", "Teacher Mode"],
        }));
      return [...byId, ...customPhrases];
    }

    const catId = tabToCategoryIdMap[currentTab];
    if (!catId) return [];

    return SMART_CLASSROOM_PHRASES.filter((p) => {
      const matchCat = p.category === catId;
      const matchSub =
        selectedSubcategory === "all" || p.subcategory === selectedSubcategory;
      const matchDiff =
        difficultyFilter === "all" || p.difficulty === difficultyFilter;
      return matchCat && matchSub && matchDiff;
    });
  }, [currentTab, selectedSubcategory, difficultyFilter, favorites]);

  const attentionSignalsList = useMemo(() => {
    return SMART_CLASSROOM_PHRASES.filter((p) => p.category === "attention");
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* 1. Global Selection Floating Pill & Modal */}
      <SelectionTranslateModal
        savedFavorites={favorites}
        onSaveFavoriteText={(txt, vi) => {
          // Add custom text to favorites
          const customId = `custom-${Date.now()}`;
          setFavorites((prev) => [...prev, customId]);
        }}
      />

      {/* 2. Classroom Countdown Timer Modal */}
      <ClassroomTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* 3. Detailed Translation / Context Modal from Card Click */}
      {selectedPhraseForModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border-2 border-[#D1E0FB] shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase">
                {selectedPhraseForModal.categoryTitle} •{" "}
                {selectedPhraseForModal.difficulty}
              </span>
              <button
                onClick={() => setSelectedPhraseForModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black font-display text-slate-900">
                "{selectedPhraseForModal.english}"
              </h3>
              {selectedPhraseForModal.ipa && (
                <span className="text-xs font-mono text-indigo-700 font-bold block">
                  {selectedPhraseForModal.ipa}
                </span>
              )}
              <p className="text-base font-bold text-emerald-800">
                🇻🇳 {selectedPhraseForModal.vietnamese}
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p>
                <strong className="text-slate-800">📌 Ngữ cảnh đứng lớp:</strong>{" "}
                {selectedPhraseForModal.context}
              </p>
              {selectedPhraseForModal.teacherNotes && (
                <p className="text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200">
                  💡 {selectedPhraseForModal.teacherNotes}
                </p>
              )}
            </div>

            {selectedPhraseForModal.alternatives &&
              selectedPhraseForModal.alternatives.length > 0 && (
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-slate-700 block">
                    Cách diễn đạt thay thế:
                  </span>
                  {selectedPhraseForModal.alternatives.map((alt, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-xl bg-blue-50/60 border border-blue-100 font-medium text-slate-800"
                    >
                      <span>👉 {alt}</span>
                      <button
                        onClick={() => speakText(alt, { rate: 0.9 })}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() =>
                  speakText(selectedPhraseForModal.english, { rate: 0.95 })
                }
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black shadow-xs cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen</span>
              </button>
              <button
                onClick={() => setSelectedPhraseForModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-black cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Top Header & App Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBackToApp && (
              <button
                onClick={onBackToApp}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer flex items-center gap-1 text-xs font-black"
                title="Trở về Trang Chủ Tổng"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Quay lại</span>
              </button>
            )}

            <div
              onClick={() => {
                playSound("click");
                setCurrentTab("home");
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-xl shadow-[0_3px_0_0_#1E3A8A]">
                🏫
              </div>
              <div>
                <h1 className="font-display font-black text-base sm:text-lg text-slate-900 leading-tight">
                  SMART CLASSROOM ENGLISH
                </h1>
                <p className="text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  English Classroom Language for Primary Teachers
                </p>
              </div>
            </div>
          </div>

          {/* Quick Utility Tools on Header */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound("click");
                setCurrentTab("teacher-mode");
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-[0_2px_0_0_#B45309] transition-all cursor-pointer"
              title="Chế độ Trợ lý Cô giáo (Gõ tiếng Việt ra tiếng Anh)"
            >
              <span>⚡ Teacher Mode</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setCurrentTab("classroom-script");
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 text-xs font-black transition-all cursor-pointer"
              title="Kịch bản 7 chặng cả tiết dạy"
            >
              <span>📑 Kịch Bản 7 Chặng</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setCurrentTab("report-comments");
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-[0_2px_0_0_#312E81] transition-all cursor-pointer"
              title="Nhận xét học bạ cuối năm (TT 27)"
            >
              <span>📝 Nhận Xét Cuối Năm</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setIsTimerOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black transition-all cursor-pointer"
              title="Đồng hồ đếm ngược lớp học"
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">Timer</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setCurrentTab("dictionary");
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-black transition-all cursor-pointer"
              title="Tra cứu thông minh"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Tìm kiếm</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setCurrentTab("favorites");
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black transition-all cursor-pointer"
              title="Danh sách yêu thích"
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{favorites.length}</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Menu (14 Items from Prompt Section I) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none pb-2 pt-1 flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playSound("click");
                  setCurrentTab(item.id);
                  setSelectedSubcategory("all");
                  setDifficultyFilter("all");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black shrink-0 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_3px_0_0_#1E40AF] scale-102"
                    : "bg-slate-100/90 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 5. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: HOME */}
        {currentTab === "home" && (
          <SmartClassroomHome
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              setSelectedSubcategory("all");
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenTranslateModal={(p) => setSelectedPhraseForModal(p)}
            onOpenTimerModal={() => setIsTimerOpen(true)}
          />
        )}

        {/* TEACHER MODE (Trợ lý trực tiếp: gõ/nói tiếng Việt ra tiếng Anh + các cách nói tự nhiên) */}
        {currentTab === "teacher-mode" && (
          <TeacherModeStudio
            favorites={favorites}
            onToggleFavorite={(phraseText) => {
              const matched = SMART_CLASSROOM_PHRASES.find(
                (p) => p.english.toLowerCase() === phraseText.toLowerCase()
              );
              if (matched) {
                handleToggleFavorite(matched.id);
              } else {
                setFavorites((prev) => {
                  if (prev.includes(phraseText)) {
                    return prev.filter((t) => t !== phraseText);
                  }
                  return [...prev, phraseText];
                });
              }
            }}
          />
        )}

        {/* TEACHER'S CLASSROOM SCRIPT (7 Stages Full Lesson Script) */}
        {currentTab === "classroom-script" && (
          <ClassroomScriptBuilder />
        )}

        {/* END-OF-YEAR STUDENT COMMENTS (English Comments for School Records / Report Cards theo TT 27) */}
        {currentTab === "report-comments" && (
          <EndOfYearCommentsStudio
            onSaveFavorite={(commentText) => {
              setFavorites((prev) => [...prev, commentText]);
            }}
          />
        )}

        {/* TAB 3: ATTENTION SIGNALS STUDIO */}
        {currentTab === "attention" && (
          <AttentionSignalsStudio
            signals={attentionSignalsList}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* TAB 12: SMART DICTIONARY & INTENT SEARCH */}
        {currentTab === "dictionary" && (
          <DictionarySearchView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenTranslateModal={(p) => setSelectedPhraseForModal(p)}
          />
        )}

        {/* TAB 14: 5-MIN PRONUNCIATION PRACTICE */}
        {currentTab === "pronunciation" && (
          <DailyPracticeStudio
            onSaveFavorite={(txt) => {
              const customId = `custom-${Date.now()}`;
              setFavorites((prev) => [...prev, customId]);
            }}
          />
        )}

        {/* TAB 13: FAVORITES VIEW */}
        {currentTab === "favorites" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_0_#B45309] border-2 border-amber-300">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-yellow-100 text-xs font-black uppercase">
                  <Star className="w-3.5 h-3.5 fill-yellow-200" />
                  <span>Mục Đã Lưu • Favorites</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black">
                  ⭐ Kho Khẩu Lệnh Yêu Thích Của Thầy/Cô ({filteredPhrases.length} câu)
                </h2>
                <p className="text-amber-100 text-xs sm:text-sm font-medium">
                  Những câu khẩu lệnh, lời khen và hiệu lệnh thầy cô thường xuyên sử dụng nhất trong tiết học.
                </p>
              </div>
            </div>

            {filteredPhrases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhrases.map((phrase) => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    isFavorite={true}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenTranslateModal={(p) => setSelectedPhraseForModal(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-slate-200 text-center space-y-3">
                <span className="text-4xl block">⭐</span>
                <h3 className="font-display font-black text-lg text-slate-800">
                  Chưa có câu nào trong danh sách yêu thích
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Hãy nhấp vào biểu tượng ngôi sao ở các thẻ câu lệnh để lưu nhanh vào đây nhé!
                </p>
              </div>
            )}
          </div>
        )}

        {/* TABS 2, 4, 5, 6, 7, 8, 9, 10, 11: STANDARD CATEGORY VIEWS */}
        {currentCategoryData &&
          currentTab !== "home" &&
          currentTab !== "attention" &&
          currentTab !== "dictionary" &&
          currentTab !== "favorites" &&
          currentTab !== "pronunciation" && (
            <div className="space-y-6">
              {/* Category Header Banner */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_0_#1E3A8A] border-2 border-blue-400 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{currentCategoryData.icon}</span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-white/20 uppercase tracking-wide">
                    {currentCategoryData.title}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black">
                  {currentCategoryData.titleVi}
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                  {currentCategoryData.description}
                </p>
              </div>

              {/* Subcategories & Difficulty Filters */}
              <div className="bg-white p-4 rounded-3xl border-2 border-[#D1E0FB] shadow-xs space-y-3">
                {/* Subcategory Pills */}
                {currentCategoryData.subcategories &&
                  currentCategoryData.subcategories.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-wide shrink-0">
                        Chủ đề nhỏ:
                      </span>
                      <button
                        onClick={() => {
                          playSound("click");
                          setSelectedSubcategory("all");
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                          selectedSubcategory === "all"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Tất cả ({currentCategoryData.count})
                      </button>
                      {currentCategoryData.subcategories.map((sub, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            playSound("click");
                            setSelectedSubcategory(sub);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                            selectedSubcategory === sub
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}

                {/* Difficulty Filters */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
                    Độ ưu tiên:
                  </span>
                  {[
                    { id: "all", label: "Tất cả" },
                    { id: "Must Know", label: "⭐ Must Know" },
                    { id: "Natural", label: "🔵 Natural" },
                    { id: "Useful", label: "🟡 Useful" },
                    { id: "Easy", label: "🟢 Easy" },
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => {
                        playSound("click");
                        setDifficultyFilter(diff.id);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        difficultyFilter === diff.id
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-auto font-bold">
                    Hiển thị {filteredPhrases.length} câu
                  </span>
                </div>
              </div>

              {/* Phrases Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhrases.map((phrase) => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    isFavorite={favorites.includes(phrase.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenTranslateModal={(p) => setSelectedPhraseForModal(p)}
                  />
                ))}
              </div>
            </div>
          )}
      </main>

      {/* 6. Footer Note */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p className="font-bold text-slate-700">
          Smart Classroom English • English Classroom Language for Primary Teachers
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          💡 Mẹo: Bôi đen (highlight) bất kỳ từ, cụm từ hoặc câu tiếng Anh nào trên màn hình để nghe và dịch sư phạm tức thì!
        </p>
      </footer>
    </div>
  );
};
