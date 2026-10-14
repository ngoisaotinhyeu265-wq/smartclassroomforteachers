import React, { useState } from "react";
import { GrammarLesson, UserProgress, GradeLevel } from "../../types";
import { GLOBAL_SUCCESS_GRAMMAR } from "../../data/globalSuccessCurriculum";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  FileCode2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  HelpCircle,
  RotateCcw,
} from "lucide-react";

interface GrammarModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const GrammarModule: React.FC<GrammarModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [studentPracticeSentence, setStudentPracticeSentence] = useState<string>("");

  const currentLesson: GrammarLesson = GLOBAL_SUCCESS_GRAMMAR[selectedLessonIndex] || GLOBAL_SUCCESS_GRAMMAR[0];

  const handleSelectQuizAnswer = (qIdx: number, opt: string) => {
    if (isQuizSubmitted) return;
    playSound("click");
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: opt }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    setIsQuizSubmitted(true);
    if (correctCount >= Math.ceil(currentLesson.quiz.length * 0.7)) {
      playSound("star");
      fireConfetti();
    } else {
      playSound("wrong");
    }

    const { updatedProgress } = addXpAndRecord("grammar", correctCount * 5 + 10, correctCount > 0, currentLesson.id);
    onUpdateProgress(updatedProgress);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-purple-500/20">
              🔤
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800">
                  Grammar Lab (6-Step Discovery)
                </h1>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full border border-purple-300">
                  +25 XP
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Khám phá ngữ pháp tiếng Anh qua 6 bước tự nhiên & dễ hiểu dành cho học sinh tiểu học
              </p>
            </div>
          </div>

          {/* Lesson Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Topic:</span>
            <select
              value={selectedLessonIndex}
              onChange={(e) => {
                playSound("click");
                setSelectedLessonIndex(Number(e.target.value));
                setCurrentStep(1);
                setQuizAnswers({});
                setIsQuizSubmitted(false);
              }}
              className="bg-slate-50 font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none"
            >
              {GLOBAL_SUCCESS_GRAMMAR.map((lesson, idx) => (
                <option key={lesson.id} value={idx}>
                  {lesson.title} (Grade {lesson.grade})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 6 Step Navigation Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-2 border-t border-slate-100">
          {[
            { step: 1, title: "1. Example" },
            { step: 2, title: "2. Discovery" },
            { step: 3, title: "3. Formula" },
            { step: 4, title: "4. Practice" },
            { step: 5, title: "5. Produce" },
            { step: 6, title: "6. Challenge" },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => {
                playSound("click");
                setCurrentStep(item.step);
              }}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center ${
                currentStep === item.step
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-purple-50"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        {/* STEP 1: Example */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                Step 1: Read the Context
              </span>
            </div>
            <h2 className="font-display font-bold text-lg text-slate-800">
              Read and notice the bold words:
            </h2>
            <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 text-base sm:text-lg text-slate-800 leading-relaxed font-display">
              {currentLesson.exampleContext}
            </div>
          </div>
        )}

        {/* STEP 2: Discovery */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                Step 2: Grammar Discovery
              </span>
            </div>
            <h2 className="font-display font-bold text-lg text-slate-800">
              What do you observe?
            </h2>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-slate-800">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Quy luật ngữ pháp:</span>
              </div>
              <p className="text-sm leading-relaxed">{currentLesson.discoveryExplanation}</p>
            </div>
          </div>
        )}

        {/* STEP 3: Formula */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                Step 3: Formula & Structure
              </span>
            </div>
            <h2 className="font-display font-bold text-lg text-slate-800">
              {currentLesson.title}
            </h2>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white space-y-3 shadow-md">
              <span className="text-xs font-bold text-purple-200 uppercase tracking-wide">
                Key Structure Formula
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl tracking-wide">
                {currentLesson.structureFormula}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-500 block mb-1">Vietnamese Note:</span>
              <span>{currentLesson.vietnameseExplanation}</span>
            </div>
          </div>
        )}

        {/* STEP 4: Guided Practice */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                Step 4: Guided Practice
              </span>
            </div>
            <h2 className="font-display font-bold text-lg text-slate-800">
              Fill in the correct form:
            </h2>
            <div className="space-y-3">
              {currentLesson.guidedPractice.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-display font-bold text-sm text-slate-800">
                    {idx + 1}. {ex.question}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-500">Correct:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {ex.answer}
                    </span>
                    <span className="text-slate-500 italic">({ex.hint})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Free Produce */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                Step 5: Make Your Own Sentence
              </span>
            </div>
            <h2 className="font-display font-bold text-lg text-slate-800">
              Apply what you learned:
            </h2>
            <p className="text-xs text-slate-600">
              Write a sentence using the formula: <span className="font-bold text-purple-700">{currentLesson.structureFormula}</span>
            </p>
            <input
              type="text"
              value={studentPracticeSentence}
              onChange={(e) => setStudentPracticeSentence(e.target.value)}
              placeholder="e.g. My father is a doctor. / I like apples."
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-purple-200 font-display font-bold text-base focus:outline-none focus:border-purple-500"
            />
            {studentPracticeSentence.trim().length > 3 && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                ✨ Great sentence! You're ready for the step 6 challenge!
              </div>
            )}
          </div>
        )}

        {/* STEP 6: Challenge Quiz */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                Step 6: Grammar Challenge Quiz
              </span>
              <span className="text-xs font-bold text-purple-600">
                {currentLesson.quiz.length} Questions
              </span>
            </div>

            <div className="space-y-3">
              {currentLesson.quiz.map((q, idx) => {
                const ans = quizAnswers[idx];
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <p className="font-display font-bold text-sm text-slate-800">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => {
                        let style = "bg-white hover:bg-purple-50 border-slate-200 text-slate-800";
                        if (ans === opt) style = "bg-purple-600 text-white border-purple-700";
                        if (isQuizSubmitted) {
                          if (opt === q.correctAnswer) style = "bg-emerald-500 text-white border-emerald-600";
                          else if (ans === opt) style = "bg-rose-500 text-white border-rose-600";
                        }
                        return (
                          <button
                            key={opt}
                            disabled={isQuizSubmitted}
                            onClick={() => handleSelectQuizAnswer(idx, opt)}
                            className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {!isQuizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                Submit Grammar Quiz ✨
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-800">
                ⭐ Grammar Lab completed! You earned XP points!
              </div>
            )}
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              playSound("click");
              if (currentStep > 1) setCurrentStep((prev) => prev - 1);
            }}
            disabled={currentStep === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              if (currentStep < 6) setCurrentStep((prev) => prev + 1);
            }}
            disabled={currentStep === 6}
            className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-xs disabled:opacity-40"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
