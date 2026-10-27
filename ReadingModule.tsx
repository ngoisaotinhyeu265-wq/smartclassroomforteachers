import React, { useState } from "react";
import { ReadingPassage, UserProgress, GradeLevel } from "../../types";
import { GLOBAL_SUCCESS_READING } from "../../data/globalSuccessCurriculum";
import { speakText, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import { InteractiveStorytelling } from "./InteractiveStorytelling";
import {
  BookMarked,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Globe,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Compass,
} from "lucide-react";

interface ReadingModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

const DEFAULT_FALLBACK_PASSAGE: ReadingPassage = {
  id: "rd-fallback-default",
  grade: 3,
  unit: 11,
  topic: "My Family",
  title: "A Happy Sunday with My Family",
  passage: "Hello, my name is Nam. I am eight years old. There are four people in my family: my father, my mother, my younger sister Mai, and me. On Sundays, my family visits the green park and eats delicious ice cream together. I love my family very much!",
  passageText: "Hello, my name is Nam. I am eight years old. There are four people in my family: my father, my mother, my younger sister Mai, and me. On Sundays, my family visits the green park and eats delicious ice cream together. I love my family very much!",
  vietnameseTranslation: "Xin chào, mình tên là Nam. Mình tám tuổi. Gia đình mình có bốn người: bố, mẹ, em gái Mai và mình. Vào các ngày Chủ Nhật, gia đình mình cùng đi công viên xanh và ăn kem ngon tuyệt. Mình yêu gia đình mình rất nhiều!",
  vocabularyHighlights: ["family", "park", "together", "Sunday"],
  keyVocabulary: [
    { word: "family", meaning: "gia đình" },
    { word: "together", meaning: "cùng nhau" },
  ],
  questions: [
    {
      id: 1,
      question: "How many people are there in Nam's family?",
      options: ["Three", "Four", "Five", "Six"],
      correctAnswer: "Four",
      explanation: "Nam says: 'There are four people in my family: my father, my mother, my younger sister Mai, and me.'",
    },
    {
      id: 2,
      question: "Where does the family go on Sundays?",
      options: ["To the green park", "To the cinema", "To the hospital", "To the zoo"],
      correctAnswer: "To the green park",
      explanation: "The story states: 'On Sundays, my family visits the green park...'",
    },
  ],
};

export const ReadingModule: React.FC<ReadingModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [readingMode, setReadingMode] = useState<"passages" | "interactive_story">("passages");
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(progress.grade || 3);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showVietnamese, setShowVietnamese] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // AI Passage Generator
  const [customTopic, setCustomTopic] = useState<string>("");
  const [isGeneratingPassage, setIsGeneratingPassage] = useState<boolean>(false);
  const [customPassageList, setCustomPassageList] = useState<ReadingPassage[]>([]);

  const passages = React.useMemo(() => {
    const list = [...GLOBAL_SUCCESS_READING, ...customPassageList];
    const filtered = list.filter((p) => p.grade === selectedGrade);
    if (filtered.length > 0) return filtered;
    return [DEFAULT_FALLBACK_PASSAGE];
  }, [selectedGrade, customPassageList]);

  const currentPassage: ReadingPassage =
    passages[currentIndex] || passages[0] || DEFAULT_FALLBACK_PASSAGE;

  const handleReadAloud = () => {
    const textToRead = currentPassage.passage || currentPassage.passageText || "";
    if (!textToRead) return;
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    playSound("click");
    speakText(textToRead, {
      rate: 0.9,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleSelectAnswer = (qIndex: number, option: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: option }));
    playSound("click");
  };

  const handleSubmitQuiz = () => {
    if (!currentPassage || isSubmitted) return;

    const questions = currentPassage.questions || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    setIsSubmitted(true);
    if (correctCount >= Math.ceil(questions.length * 0.7)) {
      playSound("star");
      fireConfetti();
    } else {
      playSound("wrong");
    }

    const xpEarned = correctCount * 5;
    const { updatedProgress } = addXpAndRecord("reading", xpEarned, correctCount > 0, currentPassage.id);
    onUpdateProgress(updatedProgress);
  };

  const handleGenerateAIPassage = async () => {
    if (!customTopic.trim()) return;
    setIsGeneratingPassage(true);
    playSound("click");

    try {
      const response = await fetch("/api/gemini/generate-reading-passage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: customTopic,
          grade: selectedGrade,
        }),
      });
      const data = await response.json();
      const newPassage: ReadingPassage = {
        id: "custom-" + Date.now(),
        grade: selectedGrade,
        title: data.title || `Reading: ${customTopic}`,
        topic: customTopic,
        passage: data.passage,
        vietnameseTranslation: data.vietnameseTranslation,
        vocabularyHighlights: data.vocabularyHighlights || [],
        questions: data.questions || [],
      };

      setCustomPassageList((prev) => [newPassage, ...prev]);
      setCurrentIndex(0);
      setUserAnswers({});
      setIsSubmitted(false);
      playSound("star");
    } catch (e) {
      // Fallback
    } finally {
      setIsGeneratingPassage(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-[0_6px_0_0_#A7F3D0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-emerald-500/25">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                  Reading & Storytelling Lab
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                  +15 - 35 XP
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Đọc đoạn văn Global Success • Truyện tương tác phân nhánh AI • Luyện đọc hiểu đa tầng
              </p>
            </div>
          </div>

          {/* Grade Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Grade:</span>
            <select
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(Number(e.target.value) as GradeLevel);
                setCurrentIndex(0);
                setUserAnswers({});
                setIsSubmitted(false);
              }}
              className="bg-slate-50 font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none"
            >
              <option value={1}>Grade 1</option>
              <option value={2}>Grade 2</option>
              <option value={3}>Grade 3 (Global Success)</option>
              <option value={4}>Grade 4 (Global Success)</option>
              <option value={5}>Grade 5 (Global Success)</option>
            </select>
          </div>
        </div>

        {/* Tab Switcher: Passages vs Interactive Story */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              playSound("click");
              setReadingMode("passages");
            }}
            className={`py-2.5 px-4 rounded-2xl text-xs font-black border-2 transition-all flex items-center justify-center gap-2 ${
              readingMode === "passages"
                ? "bg-emerald-600 text-white border-emerald-800 shadow-[0_3px_0_0_#065F46]"
                : "bg-slate-50 text-slate-700 hover:bg-emerald-50 border-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Bài Đọc Global Success</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setReadingMode("interactive_story");
            }}
            className={`py-2.5 px-4 rounded-2xl text-xs font-black border-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              readingMode === "interactive_story"
                ? "bg-indigo-600 text-white border-indigo-800 shadow-[0_3px_0_0_#3730A3]"
                : "bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border-indigo-200"
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-500" />
            <span>2. ✨ Truyện Tương Tác Phân Nhánh</span>
            <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-[10px] font-black shadow-xs">
              Lớp 3: My Family ⭐
            </span>
          </button>
        </div>

        {/* AI Generator Bar for Passages */}
        {readingMode === "passages" && (
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Tạo bài đọc AI (VD: My Trip to Ha Long Bay, The Friendly Cat)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleGenerateAIPassage}
              disabled={!customTopic.trim() || isGeneratingPassage}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingPassage ? "AI Đang Soạn..." : "Tạo Bài Đọc AI"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Render Mode */}
      {readingMode === "interactive_story" ? (
        <InteractiveStorytelling
          grade={selectedGrade}
          progress={progress}
          onUpdateProgress={onUpdateProgress}
        />
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                {currentPassage?.topic || "Global Success Reading"} {currentPassage?.unit ? `• Unit ${currentPassage.unit}` : ""}
              </span>
              <h2 className="font-display font-bold text-xl text-slate-800 mt-2">
                {currentPassage?.title || "Reading Passage"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="reading-read-aloud-btn"
                onClick={handleReadAloud}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border shadow-xs transition-all ${
                  isPlayingAudio
                    ? "bg-rose-500 text-white border-rose-600"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-300"
                }`}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingAudio ? "Stop Reading" : "Read Aloud"}</span>
              </button>

              <button
                id="reading-toggle-translation-btn"
                onClick={() => setShowVietnamese(!showVietnamese)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200"
              >
                <Globe className="w-4 h-4 text-slate-600" />
                <span>{showVietnamese ? "Hide Vietnamese" : "Translate 🇻🇳"}</span>
              </button>
            </div>
          </div>

          {/* Reading Passage Body */}
          <div className="p-6 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-4">
            <p className="font-display text-base sm:text-lg text-slate-800 leading-relaxed">
              {currentPassage?.passage || currentPassage?.passageText || "No text available for this passage."}
            </p>

            {/* Vietnamese Translation Toggle */}
            {showVietnamese && currentPassage?.vietnameseTranslation && (
              <div className="p-4 rounded-xl bg-white border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed animate-fade-in">
                <span className="font-bold text-emerald-800 block mb-1">🇻🇳 Bản dịch tiếng Việt:</span>
                {currentPassage.vietnameseTranslation}
              </div>
            )}
          </div>

          {/* Key Vocabulary Pills */}
          {((currentPassage?.vocabularyHighlights && currentPassage.vocabularyHighlights.length > 0) ||
            (currentPassage?.keyVocabulary && currentPassage.keyVocabulary.length > 0)) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Key Words:</span>
              {(
                currentPassage.vocabularyHighlights ||
                currentPassage.keyVocabulary?.map((k) => k.word) ||
                []
              ).map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => speakText(w, { rate: 0.9 })}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold border border-slate-200 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3 text-emerald-600" />
                  <span>{w}</span>
                </button>
              ))}
            </div>
          )}

          {/* Comprehension Quiz */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Comprehension Questions ({(currentPassage?.questions || []).length})</span>
            </h3>

            <div className="space-y-4">
              {(currentPassage?.questions || []).map((q, qIdx) => {
                const userAns = userAnswers[qIdx];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <p className="font-display font-bold text-sm text-slate-800">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => {
                        let btnStyle = "bg-white hover:bg-emerald-50 border-slate-200 text-slate-800";
                        if (userAns === opt) {
                          btnStyle = "bg-blue-500 text-white border-blue-600";
                        }
                        if (isSubmitted) {
                          if (opt === q.correctAnswer) {
                            btnStyle = "bg-emerald-500 text-white border-emerald-600";
                          } else if (userAns === opt) {
                            btnStyle = "bg-rose-500 text-white border-rose-600";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isSubmitted}
                            onClick={() => handleSelectAnswer(qIdx, opt)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="text-xs pt-1">
                        {isCorrect ? (
                          <span className="text-emerald-700 font-bold">✓ Correct!</span>
                        ) : (
                          <span className="text-rose-600 font-bold">
                            ✗ Answer: {q.correctAnswer} {q.explanation && `(${q.explanation})`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit / Next Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  playSound("click");
                  if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                    setUserAnswers({});
                    setIsSubmitted(false);
                  }
                }}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-40"
              >
                Previous Story
              </button>

              {!isSubmitted ? (
                <button
                  id="reading-submit-quiz-btn"
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Submit Answers ✨
                </button>
              ) : (
                <button
                  onClick={() => {
                    playSound("click");
                    if (currentIndex < passages.length - 1) {
                      setCurrentIndex((prev) => prev + 1);
                    } else {
                      setCurrentIndex(0);
                    }
                    setUserAnswers({});
                    setIsSubmitted(false);
                  }}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
                >
                  <span>Next Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
