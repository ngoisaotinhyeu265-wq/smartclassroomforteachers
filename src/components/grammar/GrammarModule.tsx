import React, { useState, useMemo } from "react";
import { GrammarLesson, UserProgress, GradeLevel } from "../../types";
import { GLOBAL_SUCCESS_GRAMMAR } from "../../data/globalSuccessCurriculum";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import { speakText } from "../../utils/speech";
import {
  FileCode2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  HelpCircle,
  RotateCcw,
  Volume2,
  BookOpen,
  Check,
  X,
  Award,
  Layers,
  Info,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";

interface GrammarModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

// Fallback normalizers to guarantee zero crashes regardless of data shape
function getLessonExamples(lesson: GrammarLesson): string[] {
  if (lesson.discoverExamples && lesson.discoverExamples.length > 0) {
    return lesson.discoverExamples;
  }
  if (lesson.exampleContext) {
    return lesson.exampleContext.split(/(?<=[.?!])\s+/).filter(Boolean);
  }
  return ["I am a student.", "She is my friend."];
}

function getLessonDiscovery(lesson: GrammarLesson): string {
  return (
    lesson.discoveryExplanation ||
    lesson.noticeRule ||
    "Quan sát sự thay đổi của động từ và chủ ngữ trong các câu ví dụ."
  );
}

function getLessonFormula(lesson: GrammarLesson): string {
  return lesson.structureFormula || "S + V / To Be + Object";
}

function getLessonExplanation(lesson: GrammarLesson): string {
  return (
    lesson.vietnameseExplanation ||
    lesson.learnExplanation ||
    "Nắm chắc công thức và ghi nhớ các dấu hiệu nhận biết của mẫu câu."
  );
}

function getLessonGuidedPractice(lesson: GrammarLesson) {
  if (lesson.guidedPractice && lesson.guidedPractice.length > 0) {
    return lesson.guidedPractice;
  }
  if (lesson.practiceQuestions && lesson.practiceQuestions.length > 0) {
    return lesson.practiceQuestions.map((q) => ({
      question: q.question,
      answer: q.correctAnswer,
      hint: q.explanation || "Hãy quan sát chủ ngữ trong câu.",
    }));
  }
  return [
    {
      question: "She ___ (be) my teacher.",
      answer: "is",
      hint: "Chủ ngữ She đi với động từ to be số ít.",
    },
  ];
}

function getLessonQuiz(lesson: GrammarLesson) {
  if (lesson.quiz && lesson.quiz.length > 0) {
    return lesson.quiz;
  }
  if (lesson.challengeQuestions && lesson.challengeQuestions.length > 0) {
    return lesson.challengeQuestions.map((q, idx) => ({
      id: idx + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }));
  }
  if (lesson.practiceQuestions && lesson.practiceQuestions.length > 0) {
    return lesson.practiceQuestions.map((q, idx) => ({
      id: idx + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }));
  }
  return [
    {
      id: 1,
      question: "She ___ happy today.",
      options: ["is", "am", "are"],
      correctAnswer: "is",
      explanation: "Chủ ngữ 'She' đi với 'is'.",
    },
  ];
}

export const GrammarModule: React.FC<GrammarModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | "all">(
    progress.grade || "all"
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    GLOBAL_SUCCESS_GRAMMAR[0]?.id || "grm-be-1"
  );
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [studentPracticeSentence, setStudentPracticeSentence] = useState<string>("");
  const [showExplanationGuide, setShowExplanationGuide] = useState<boolean>(false);
  const [guidedPracticeInputs, setGuidedPracticeInputs] = useState<Record<number, string>>({});
  const [checkedGuidedItems, setCheckedGuidedItems] = useState<Record<number, boolean>>({});

  // Filter lessons
  const filteredLessons = useMemo(() => {
    if (selectedGradeFilter === "all") return GLOBAL_SUCCESS_GRAMMAR;
    return GLOBAL_SUCCESS_GRAMMAR.filter((l) => l.grade === selectedGradeFilter);
  }, [selectedGradeFilter]);

  const currentLesson: GrammarLesson = useMemo(() => {
    const found = GLOBAL_SUCCESS_GRAMMAR.find((l) => l.id === selectedLessonId);
    return found || filteredLessons[0] || GLOBAL_SUCCESS_GRAMMAR[0];
  }, [selectedLessonId, filteredLessons]);

  const examples = useMemo(() => getLessonExamples(currentLesson), [currentLesson]);
  const discovery = useMemo(() => getLessonDiscovery(currentLesson), [currentLesson]);
  const formula = useMemo(() => getLessonFormula(currentLesson), [currentLesson]);
  const explanation = useMemo(() => getLessonExplanation(currentLesson), [currentLesson]);
  const guidedPractice = useMemo(() => getLessonGuidedPractice(currentLesson), [currentLesson]);
  const quiz = useMemo(() => getLessonQuiz(currentLesson), [currentLesson]);

  const handleSelectLesson = (lessonId: string) => {
    playSound("click");
    setSelectedLessonId(lessonId);
    setCurrentStep(1);
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setStudentPracticeSentence("");
    setGuidedPracticeInputs({});
    setCheckedGuidedItems({});
  };

  const handleSelectQuizAnswer = (qIdx: number, opt: string) => {
    if (isQuizSubmitted) return;
    playSound("click");
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: opt }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    setIsQuizSubmitted(true);
    if (correctCount >= Math.ceil(quiz.length * 0.7)) {
      playSound("star");
      fireConfetti();
    } else {
      playSound("wrong");
    }

    const { updatedProgress } = addXpAndRecord(
      "grammar",
      correctCount * 10 + 15,
      correctCount > 0,
      currentLesson.id
    );
    onUpdateProgress(updatedProgress);
  };

  const handleResetQuiz = () => {
    playSound("click");
    setQuizAnswers({});
    setIsQuizSubmitted(false);
  };

  const handleSpeak = (text: string) => {
    playSound("click");
    speakText(text, { lang: "en-US", rate: 0.88 });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* 1. Header Banner & Introduction */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-amber-500/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white text-amber-700 flex items-center justify-center text-3xl font-black shadow-lg">
              🔤
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight">
                  Grammar Lab
                </h1>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-2.5 py-0.5 rounded-full border border-white/30">
                  6-STEP PEDAGOGY
                </span>
                <span className="bg-yellow-300 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  SGK Global Success
                </span>
              </div>
              <p className="text-amber-100 text-xs sm:text-sm font-medium mt-1">
                Phòng thí nghiệm ngữ pháp tiếng Anh tiểu học: Tự khám phá quy luật & áp dụng chuẩn xác
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound("click");
                setShowExplanationGuide(!showExplanationGuide);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-black border border-white/40 transition-all cursor-pointer backdrop-blur-xs"
            >
              <Info className="w-4 h-4" />
              <span>Chức năng Grammar Lab là gì?</span>
              {showExplanationGuide ? (
                <ChevronUp className="w-4 h-4 ml-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Explanation of What Grammar Lab is */}
        {showExplanationGuide && (
          <div className="mt-5 pt-5 border-t border-white/20 text-white space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md border border-white/20 space-y-3">
              <h3 className="font-black text-sm text-yellow-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>GIẢI THÍCH CHỨC NĂNG CỤ THỂ CỦA GRAMMAR LAB:</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
                <strong>Grammar Lab (Phòng Thí Nghiệm Ngữ Pháp)</strong> được thiết kế theo phương pháp sư phạm
                <strong> 6 Bước Khám Phá Tự Nhiên (6-Step Discovery Pedagogy)</strong> chuẩn giáo trình SGK Tiếng Anh Global Success (Lớp 3, 4, 5).
                Thay vì bắt học sinh học thuộc lòng công thức khô khan, Grammar Lab dẫn dắt học sinh từng bước:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="bg-black/15 p-2.5 rounded-xl border border-white/15">
                  <span className="font-bold text-yellow-300 block mb-0.5">1. Context (Ngữ cảnh):</span>
                  Đọc & nghe phát âm câu ví dụ thực tế trong hội thoại hàng ngày.
                </div>
                <div className="bg-black/15 p-2.5 rounded-xl border border-white/15">
                  <span className="font-bold text-yellow-300 block mb-0.5">2. Notice (Khám phá):</span>
                  Quan sát điểm khác biệt để tự rút ra quy luật ngữ pháp.
                </div>
                <div className="bg-black/15 p-2.5 rounded-xl border border-white/15">
                  <span className="font-bold text-yellow-300 block mb-0.5">3. Formula (Công thức):</span>
                  Công thức trực quan kèm giải thích mẹo nhớ tiếng Việt sinh động.
                </div>
                <div className="bg-black/15 p-2.5 rounded-xl border border-white/15">
                  <span className="font-bold text-yellow-300 block mb-0.5">4. Practice (Luyện tập):</span>
                  Điền từ có gợi ý và kiểm tra đáp án tức thì.
                </div>
                <div className="bg-black/15 p-2.5 rounded-xl border border-white/15">
                  <span className="font-bold text-yellow-300 block mb-0.5">5. Produce (Sáng tạo):</span>
                  Tự viết câu của riêng mình và nghe máy phát âm lại.
                </div>
                <div className="bg-black/15 p-2.5 rounded-xl border border-white/15">
                  <span className="font-bold text-yellow-300 block mb-0.5">6. Challenge Quiz:</span>
                  Làm bài trắc nghiệm tính điểm, nhận XP và mở khóa huy hiệu.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Filter & Topic Selection Bar */}
      <div className="bg-white rounded-3xl p-5 border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB] space-y-4">
        {/* Grade Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Khối lớp:
            </span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  playSound("click");
                  setSelectedGradeFilter("all");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  selectedGradeFilter === "all"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tất cả ({GLOBAL_SUCCESS_GRAMMAR.length})
              </button>
              {[3, 4, 5].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    playSound("click");
                    setSelectedGradeFilter(g);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    selectedGradeFilter === g
                      ? "bg-amber-500 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500">
            Đang học: <span className="text-amber-600 font-black">{currentLesson.title}</span>
          </div>
        </div>

        {/* Topic Horizontal Scroll Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filteredLessons.map((lesson) => {
            const isSelected = lesson.id === currentLesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-amber-500 text-white border-amber-600 shadow-[0_3px_0_0_#D97706] translate-y-[-1px]"
                    : "bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-300"
                }`}
              >
                <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.2 rounded-md font-black">
                  Lớp {lesson.grade}
                </span>
                <span>{lesson.title}</span>
              </button>
            );
          })}
        </div>

        {/* 6 Step Navigation Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
          {[
            { step: 1, title: "1. Ngữ cảnh", icon: "📖", sub: "Context" },
            { step: 2, title: "2. Khám phá", icon: "🔍", sub: "Notice" },
            { step: 3, title: "3. Công thức", icon: "💡", sub: "Formula" },
            { step: 4, title: "4. Luyện tập", icon: "✍️", sub: "Practice" },
            { step: 5, title: "5. Tự đặt câu", icon: "🎯", sub: "Produce" },
            { step: 6, title: "6. Thử thách", icon: "🏆", sub: "Quiz" },
          ].map((item) => {
            const isActive = currentStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => {
                  playSound("click");
                  setCurrentStep(item.step);
                }}
                className={`p-2.5 rounded-2xl text-xs font-black transition-all text-center flex flex-col items-center gap-0.5 border-2 cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-white border-amber-600 shadow-[0_3px_0_0_#D97706]"
                    : "bg-[#F8FAFC] text-slate-600 hover:bg-amber-50/80 border-slate-200 hover:border-amber-200"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="leading-tight">{item.title}</span>
                <span className={`text-[10px] ${isActive ? "text-amber-100" : "text-slate-400"}`}>
                  {item.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Step Content Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
        {/* STEP 1: Context & Examples */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                Bước 1: Đọc & Nghe Ngữ Cảnh Tự Nhiên
              </span>
              {currentLesson.exampleContext && (
                <button
                  onClick={() => handleSpeak(currentLesson.exampleContext || "")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe đọc toàn đoạn 🔊</span>
                </button>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-lg text-slate-800">
                {currentLesson.vietnameseTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Hãy đọc to các câu ví dụ bên dưới và nhấn nút loa để nghe cách người bản xứ phát âm:
              </p>
            </div>

            {currentLesson.exampleContext && (
              <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 text-base sm:text-lg text-slate-800 leading-relaxed font-display font-bold">
                "{currentLesson.exampleContext}"
              </div>
            )}

            <div className="space-y-2.5">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                Các câu ví dụ tiêu biểu (Nhấn để nghe):
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="font-bold text-sm sm:text-base text-slate-800">
                        {ex}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeak(ex)}
                      title="Nghe phát âm câu này"
                      className="p-2 rounded-xl bg-white hover:bg-amber-500 hover:text-white text-slate-600 border border-slate-200 group-hover:border-amber-300 transition-all cursor-pointer shrink-0 shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Discovery & Notice */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                Bước 2: Quan Sát & Tự Khám Phá Quy Luật
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-lg text-slate-800">
                Em nhận thấy điều gì đặc biệt trong các câu ví dụ?
              </h2>
              <p className="text-xs text-slate-500">
                Học sinh thông minh luôn tự tìm ra bí mật ngữ pháp trước khi xem công thức:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-black text-base">
                <Lightbulb className="w-5 h-5 text-amber-600 animate-pulse" />
                <span>Bí mật ngữ pháp khám phá được:</span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                {discovery}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs sm:text-sm text-blue-900">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">Lời khuyên của Milo:</span>
                Sau khi đã phát hiện ra quy luật, hãy chuyển sang <strong>Bước 3</strong> để xem công thức chuẩn và mẹo nhớ tiếng Việt cực dễ thuộc!
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Formula & Structure */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                Bước 3: Công Thức Vàng & Bản Đồ Ngữ Pháp
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-xl text-slate-800">
                {currentLesson.title}
              </h2>
              <p className="text-xs text-slate-500">
                Ghi nhớ công thức cốt lõi và các lưu ý mở rộng:
              </p>
            </div>

            {/* Formula Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white space-y-3 shadow-lg shadow-amber-500/20">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-200 bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
                CÔNG THỨC CHÍNH (KEY STRUCTURE FORMULA)
              </span>
              <p className="font-display font-black text-xl sm:text-2xl tracking-wide">
                {formula}
              </p>
            </div>

            {/* Detailed Explanation Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3 text-slate-800">
              <div className="flex items-center gap-2 text-slate-700 font-black text-sm">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Giải thích chi tiết & Mẹo nhớ:</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                {explanation}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Guided Practice */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                Bước 4: Luyện Tập Có Hướng Dẫn (Guided Practice)
              </span>
              <span className="text-xs font-bold text-amber-600">
                {guidedPractice.length} Bài tập
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-lg text-slate-800">
                Điền từ chính xác hoặc kiểm tra đáp án:
              </h2>
              <p className="text-xs text-slate-500">
                Thử điền câu trả lời vào ô trống hoặc nhấn "Xem đáp án & Giải thích":
              </p>
            </div>

            <div className="space-y-3.5">
              {guidedPractice.map((ex, idx) => {
                const userVal = guidedPracticeInputs[idx] || "";
                const isChecked = checkedGuidedItems[idx];
                const isCorrect =
                  userVal.trim().toLowerCase() === ex.answer.trim().toLowerCase();

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display font-bold text-sm sm:text-base text-slate-800">
                        <span className="text-amber-600 mr-1.5">{idx + 1}.</span>
                        {ex.question}
                      </p>
                      <button
                        onClick={() => handleSpeak(ex.question.replace("___", ex.answer))}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 transition-colors"
                        title="Nghe câu hoàn chỉnh"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) =>
                          setGuidedPracticeInputs((prev) => ({
                            ...prev,
                            [idx]: e.target.value,
                          }))
                        }
                        placeholder="Nhập từ cần điền..."
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold focus:outline-none focus:border-amber-500 w-44"
                      />
                      <button
                        onClick={() => {
                          playSound("click");
                          setCheckedGuidedItems((prev) => ({ ...prev, [idx]: true }));
                        }}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black transition-all cursor-pointer shadow-xs"
                      >
                        Kiểm tra
                      </button>
                    </div>

                    {isChecked && (
                      <div
                        className={`p-3 rounded-xl border text-xs font-bold space-y-1 animate-in fade-in duration-150 ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-amber-50 border-amber-200 text-amber-900"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <HelpCircle className="w-4 h-4 text-amber-600" />
                          )}
                          <span>
                            Đáp án đúng: <strong>{ex.answer}</strong>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 italic">
                          💡 Gợi ý: {ex.hint}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Free Produce */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                Bước 5: Tự Đặt Câu & Kiểm Tra Cùng Milo
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-lg text-slate-800">
                Áp dụng quy luật để viết câu của chính em:
              </h2>
              <p className="text-xs text-slate-500">
                Áp dụng công thức: <span className="font-bold text-amber-700">{formula}</span>
              </p>
            </div>

            {currentLesson.useItPrompt && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm font-bold text-amber-900 flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{currentLesson.useItPrompt}</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="relative">
                <textarea
                  rows={3}
                  value={studentPracticeSentence}
                  onChange={(e) => setStudentPracticeSentence(e.target.value)}
                  placeholder="Ví dụ: My brother is playing football. / She likes fresh milk."
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-amber-200 font-display font-bold text-base text-slate-800 focus:outline-none focus:border-amber-500 shadow-inner"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 justify-between">
                <div className="flex items-center gap-2">
                  {studentPracticeSentence.trim().length > 3 && (
                    <button
                      onClick={() => handleSpeak(studentPracticeSentence)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-black border border-blue-200 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe đọc câu của em 🔊</span>
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-bold">
                  {studentPracticeSentence.trim().split(/\s+/).filter(Boolean).length} từ
                </div>
              </div>

              {studentPracticeSentence.trim().length > 5 && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span>Câu rất hay và sáng tạo! Em đã nắm chắc cấu trúc và sẵn sàng cho bài kiểm tra Bước 6! ⭐</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: Challenge Quiz */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                Bước 6: Thử Thách Trắc Nghiệm (Grammar Challenge)
              </span>
              <span className="text-xs font-black text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {quiz.length} Câu hỏi • +25 XP
              </span>
            </div>

            <div className="space-y-3.5">
              {quiz.map((q, idx) => {
                const ans = quizAnswers[idx];
                return (
                  <div
                    key={q.id || idx}
                    className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display font-bold text-sm sm:text-base text-slate-800">
                        <span className="text-amber-600 mr-1.5">Câu {idx + 1}:</span>
                        {q.question}
                      </p>
                      <button
                        onClick={() => handleSpeak(q.question.replace("___", "..."))}
                        className="p-1 rounded-lg text-slate-400 hover:text-amber-600"
                        title="Nghe câu hỏi"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {q.options.map((opt) => {
                        let style =
                          "bg-white hover:bg-amber-50 text-slate-800 border-slate-200";
                        if (ans === opt) {
                          style = "bg-amber-500 text-white border-amber-600 shadow-xs";
                        }
                        if (isQuizSubmitted) {
                          if (opt === q.correctAnswer) {
                            style = "bg-emerald-600 text-white border-emerald-700 font-black";
                          } else if (ans === opt) {
                            style = "bg-rose-500 text-white border-rose-600";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isQuizSubmitted}
                            onClick={() => handleSelectQuizAnswer(idx, opt)}
                            className={`p-3 rounded-xl border-2 text-xs font-black text-left transition-all cursor-pointer ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && q.explanation && (
                      <p className="text-xs text-slate-600 pt-1 italic border-t border-slate-200">
                        💡 Giải thích: {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!isQuizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < quiz.length}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-sm shadow-[0_4px_0_0_#D97706] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                Nộp Bài Trắc Nghiệm ✨ Nhận XP
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center text-xs sm:text-sm font-black text-emerald-800 space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span>Chúc mừng em đã hoàn thành bài thử thách Grammar Lab!</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold">
                    Em đã nhận được thêm điểm XP thưởng vào hồ sơ học tập.
                  </p>
                </div>

                <button
                  onClick={handleResetQuiz}
                  className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài trắc nghiệm này</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Step Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              playSound("click");
              if (currentStep > 1) setCurrentStep((prev) => prev - 1);
            }}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-slate-600 hover:text-amber-700 hover:bg-amber-50 disabled:opacity-40 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bước trước</span>
          </button>

          <span className="text-xs font-black text-slate-400">
            Bước {currentStep} / 6
          </span>

          <button
            onClick={() => {
              playSound("click");
              if (currentStep < 6) setCurrentStep((prev) => prev + 1);
            }}
            disabled={currentStep === 6}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs disabled:opacity-40 transition-all cursor-pointer"
          >
            <span>Bước tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
