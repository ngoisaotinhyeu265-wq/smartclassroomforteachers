import React, { useState, useEffect } from "react";
import { ListeningItem, UserProgress, GradeLevel } from "../../types";
import { GLOBAL_SUCCESS_LISTENING } from "../../data/globalSuccessCurriculum";
import { speakText, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  Headphones,
  Volume2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Snail,
  Zap,
  BookOpen,
  Eye,
  EyeOff,
  HelpCircle,
  ChevronRight,
  Award,
} from "lucide-react";

interface ListeningModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const ListeningModule: React.FC<ListeningModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(progress.grade || 3);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showScript, setShowScript] = useState<boolean>(false);

  // Per-question answered state: { [qId: number]: { selectedOption: string; isCorrect: boolean } }
  const [answersState, setAnswersState] = useState<{
    [qId: number]: { selectedOption: string; isCorrect: boolean };
  }>({});

  // Filter items for current grade, with safe fallback to all items if grade has no items
  const gradeItems = GLOBAL_SUCCESS_LISTENING.filter((item) => item.grade === selectedGrade);
  const availableItems = gradeItems.length > 0 ? gradeItems : GLOBAL_SUCCESS_LISTENING;
  const currentItem: ListeningItem = availableItems[currentIndex] || availableItems[0] || GLOBAL_SUCCESS_LISTENING[0];

  // Resolve questions for the current item
  const questions = currentItem.questions && currentItem.questions.length > 0
    ? currentItem.questions
    : [
        {
          id: 1,
          question: currentItem.prompt || "Listen and choose the correct answer:",
          options: currentItem.options && currentItem.options.length > 0 ? currentItem.options : ["Option A", "Option B", "Option C"],
          correctAnswer: currentItem.correctAnswer || (currentItem.options ? currentItem.options[0] : "Option A"),
          explanation: currentItem.explanation || "Hãy chú ý lắng nghe kỹ từ khóa trong đoạn băng.",
        },
      ];

  const currentQuestion = questions[activeQuestionIndex] || questions[0];
  const activeAnswer = answersState[currentQuestion.id];
  const isQuestionAnswered = !!activeAnswer;

  // Reset state when changing item or grade
  useEffect(() => {
    setActiveQuestionIndex(0);
    setAnswersState({});
    setShowScript(false);
    stopSpeech();
    setIsPlayingAudio(false);
  }, [currentIndex, selectedGrade]);

  const handlePlayAudio = (speed: number = playbackSpeed) => {
    if (!currentItem?.audioScript) return;
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(true);
    speakText(currentItem.audioScript, {
      rate: speed,
      pitch: 1.05,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleStopAudio = () => {
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);
  };

  const handleSelectOption = (opt: string) => {
    if (isQuestionAnswered || !currentQuestion) return;

    const correct = opt === currentQuestion.correctAnswer;
    setAnswersState((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedOption: opt,
        isCorrect: correct,
      },
    }));

    if (correct) {
      playSound("correct");
      fireConfetti();
      const { updatedProgress } = addXpAndRecord("listening", 15, true, `${currentItem.id}-q${currentQuestion.id}`);
      onUpdateProgress(updatedProgress);
    } else {
      playSound("wrong");
      const { updatedProgress } = addXpAndRecord("listening", 5, false, `${currentItem.id}-q${currentQuestion.id}`);
      onUpdateProgress(updatedProgress);
    }
  };

  const handleNextChallenge = () => {
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);
    if (currentIndex < availableItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevChallenge = () => {
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(availableItems.length - 1);
    }
  };

  // Calculate score summary for current passage
  const answeredCount = Object.keys(answersState).length;
  const correctCount = Object.values(answersState).filter((a: { selectedOption: string; isCorrect: boolean }) => a.isCorrect).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-cyan-200 shadow-[0_6px_0_0_#A5F3FC] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-cyan-500/25">
              🎧
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                  Listening Arena (Phòng Luyện Nghe)
                </h1>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-cyan-300">
                  +15 XP
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Nghe giọng đọc bản ngữ chuẩn SGK Global Success, chỉnh tốc độ & chọn đáp án chính xác
              </p>
            </div>
          </div>

          {/* Grade Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-cyan-50/70 p-1.5 rounded-2xl border border-cyan-200">
            <span className="text-xs font-black text-cyan-900 pl-2">Khối:</span>
            <select
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(Number(e.target.value) as GradeLevel);
                setCurrentIndex(0);
              }}
              className="bg-white font-bold text-xs px-3 py-1.5 rounded-xl border border-cyan-300 text-cyan-950 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value={1}>Khối 1 (Grade 1)</option>
              <option value={2}>Khối 2 (Grade 2)</option>
              <option value={3}>Khối 3 (Grade 3 - GS)</option>
              <option value={4}>Khối 4 (Grade 4 - GS)</option>
              <option value={5}>Khối 5 (Grade 5 - GS)</option>
            </select>
          </div>
        </div>

        {/* Tracks Carousel Header */}
        <div className="flex items-center justify-between pt-2 border-t border-cyan-100 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-cyan-100/70 text-cyan-800 border border-cyan-200 font-bold">
              Chủ đề: {currentItem.topic}
            </span>
            {currentItem.unit && (
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                Unit {currentItem.unit}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevChallenge}
              className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              ← Bài trước
            </button>
            <span className="text-slate-500">
              Bài {currentIndex + 1} / {availableItems.length}
            </span>
            <button
              onClick={handleNextChallenge}
              className="px-3 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-xs"
            >
              Bài sau →
            </button>
          </div>
        </div>
      </div>

      {/* Main Listening Challenge Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-6">
        {/* Title & Passage Prompt */}
        <div className="text-center space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-black border border-cyan-200">
            {currentItem.type.replace(/_/g, " ").toUpperCase()}
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-slate-800">
            {currentItem.title || currentItem.topic}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Nhấn nút tròn để nghe đoạn ghi âm, sau đó trả lời các câu hỏi bên dưới.
          </p>
        </div>

        {/* Interactive Audio Player Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border-2 border-cyan-200 max-w-lg mx-auto space-y-5 text-center shadow-xs">
          {/* Waveform / Visualizer pulses */}
          <div className="flex items-center justify-center gap-1.5 h-10">
            {[40, 70, 95, 60, 85, 100, 50, 80, 90, 65, 45].map((height, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isPlayingAudio ? "bg-cyan-500 animate-pulse" : "bg-cyan-200"
                }`}
                style={{
                  height: isPlayingAudio ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.8)))}%` : "25%",
                  animationDelay: `${i * 80}ms`,
                }}
              />
            ))}
          </div>

          {/* Main Play / Stop Button */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                if (isPlayingAudio) {
                  handleStopAudio();
                } else {
                  handlePlayAudio(playbackSpeed);
                }
              }}
              id="listening-play-audio-btn"
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-95 border-4 ${
                isPlayingAudio
                  ? "bg-rose-500 hover:bg-rose-400 border-rose-200 shadow-rose-500/30 animate-pulse"
                  : "bg-cyan-500 hover:bg-cyan-400 border-cyan-200 shadow-cyan-500/30"
              }`}
            >
              {isPlayingAudio ? (
                <RotateCcw className="w-8 h-8" />
              ) : (
                <Volume2 className="w-9 h-9" />
              )}
            </button>
          </div>

          <div className="text-xs font-bold text-slate-600">
            {isPlayingAudio ? "Đang phát âm thanh... (Nhấn lại để dừng)" : "Nhấn để bắt đầu nghe"}
          </div>

          {/* Playback Speed Selectors */}
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-cyan-200/60">
            <button
              onClick={() => {
                setPlaybackSpeed(0.75);
                handlePlayAudio(0.75);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                playbackSpeed === 0.75
                  ? "bg-amber-400 text-amber-950 border-amber-500 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Snail className="w-3.5 h-3.5" />
              <span>Chậm 0.75x 🐢</span>
            </button>

            <button
              onClick={() => {
                setPlaybackSpeed(1.0);
                handlePlayAudio(1.0);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                playbackSpeed === 1.0
                  ? "bg-cyan-500 text-white border-cyan-600 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Chuẩn 1.0x ⚡</span>
            </button>

            <button
              onClick={() => {
                setPlaybackSpeed(1.25);
                handlePlayAudio(1.25);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                playbackSpeed === 1.25
                  ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>Nhanh 1.25x 🚀</span>
            </button>
          </div>

          {/* Transcript Toggle */}
          <div className="pt-1">
            <button
              onClick={() => setShowScript(!showScript)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-800 hover:text-cyan-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-xl border border-cyan-200 transition-colors"
            >
              {showScript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showScript ? "Ẩn lời thoại (Script)" : "Xem lời thoại bài nghe (Script)"}</span>
            </button>
          </div>

          {/* Audio Script Reveal Box */}
          {showScript && (
            <div className="p-4 rounded-2xl bg-white border border-cyan-200 text-left space-y-2 animate-in fade-in">
              <span className="text-[11px] font-black uppercase text-cyan-800 tracking-wider block">
                📜 Lời Thoại Bài Nghe (Nhấn vào từ để nghe đọc từng chữ):
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentItem.audioScript.split(" ").map((word, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={() => speakText(word.replace(/[.,!?"]/g, ""), { rate: 0.85 })}
                    className="cursor-pointer hover:bg-cyan-100 hover:text-cyan-900 rounded px-0.5 transition-colors"
                    title="Nhấn để nghe từ này"
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        {/* Multi-Question Selector Tabs */}
        {questions.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-black text-slate-500 mr-1">Các câu hỏi:</span>
            {questions.map((q, idx) => {
              const qAns = answersState[q.id];
              let tabBg = "bg-slate-100 text-slate-700 border-slate-200";
              if (qAns) {
                tabBg = qAns.isCorrect
                  ? "bg-emerald-500 text-white border-emerald-600 font-bold"
                  : "bg-rose-500 text-white border-rose-600 font-bold";
              } else if (idx === activeQuestionIndex) {
                tabBg = "bg-cyan-500 text-white border-cyan-600 font-black shadow-xs";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${tabBg}`}
                >
                  Câu {idx + 1}
                  {qAns && (qAns.isCorrect ? " ✓" : " ✗")}
                </button>
              );
            })}
          </div>
        )}

        {/* Current Question Block */}
        <div className="space-y-4 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1 text-cyan-700">
              <HelpCircle className="w-4 h-4" />
              <span>Câu hỏi {activeQuestionIndex + 1} / {questions.length}</span>
            </span>
            {isQuestionAnswered && (
              <span className={activeAnswer.isCorrect ? "text-emerald-600 font-black" : "text-rose-600 font-black"}>
                {activeAnswer.isCorrect ? "✓ Chính xác (+15 XP)" : "✗ Chưa đúng (+5 XP)"}
              </span>
            )}
          </div>

          <h3 className="font-display font-black text-base sm:text-lg text-slate-800 text-center">
            {currentQuestion.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(currentQuestion.options || ["Option A", "Option B", "Option C", "Option D"]).map((opt, optIdx) => {
              const optionLetter = String.fromCharCode(65 + optIdx);
              let btnStyle = "bg-slate-50 hover:bg-cyan-50 border-slate-200 text-slate-800";
              let badgeStyle = "bg-slate-200 text-slate-700";

              if (isQuestionAnswered) {
                if (opt === currentQuestion.correctAnswer) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md font-black";
                  badgeStyle = "bg-emerald-700 text-white";
                } else if (activeAnswer.selectedOption === opt) {
                  btnStyle = "bg-rose-500 text-white border-rose-600 font-black";
                  badgeStyle = "bg-rose-700 text-white";
                } else {
                  btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isQuestionAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-3.5 rounded-2xl border-2 font-display text-left flex items-center gap-3 transition-all active:scale-95 ${btnStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${badgeStyle}`}>
                    {optionLetter}
                  </span>
                  <span className="font-bold text-sm leading-tight flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Pedagogical Feedback Box */}
          {isQuestionAnswered && (
            <div
              className={`p-4 rounded-2xl border-2 space-y-2 animate-in fade-in duration-200 ${
                activeAnswer.isCorrect
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                  : "bg-rose-50 border-rose-300 text-rose-950"
              }`}
            >
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                {activeAnswer.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Xuất sắc! Em đã nghe và chọn chính xác! ⭐</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>Đáp án đúng là: {currentQuestion.correctAnswer}</span>
                  </>
                )}
              </div>

              {currentQuestion.explanation && (
                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white/80 p-2.5 rounded-xl border border-slate-200">
                  💡 <span className="font-bold">Giải thích:</span> {currentQuestion.explanation}
                </p>
              )}

              {/* Next Question / Next Passage Button */}
              <div className="pt-2 flex items-center justify-end">
                {activeQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={() => {
                      playSound("click");
                      setActiveQuestionIndex((prev) => prev + 1);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs shadow-xs"
                  >
                    <span>Câu hỏi tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md"
                  >
                    <Award className="w-4 h-4" />
                    <span>Hoàn thành bài & Sang bài tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
