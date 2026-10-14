import React, { useState } from "react";
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
} from "lucide-react";

interface ListeningModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const ListeningModule: React.FC<ListeningModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(progress.grade);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const gradeItems = GLOBAL_SUCCESS_LISTENING.filter((item) => item.grade === selectedGrade);
  const currentItem: ListeningItem | undefined = gradeItems[currentIndex] || gradeItems[0] || GLOBAL_SUCCESS_LISTENING[0];

  const handlePlayAudio = (speed: number = playbackSpeed) => {
    if (!currentItem) return;
    playSound("click");
    speakText(currentItem.audioScript, {
      rate: speed,
      pitch: 1.1,
    });
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered || !currentItem) return;
    setSelectedOption(opt);
    const correct = opt === currentItem.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      playSound("correct");
      fireConfetti();
      const { updatedProgress } = addXpAndRecord("listening", 15, true, currentItem.id);
      onUpdateProgress(updatedProgress);
    } else {
      playSound("wrong");
      const { updatedProgress } = addXpAndRecord("listening", 5, false, currentItem.id);
      onUpdateProgress(updatedProgress);
    }
  };

  const handleNext = () => {
    playSound("click");
    stopSpeech();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    if (currentIndex < gradeItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cyan-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-cyan-500/20">
              🎧
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800">
                  Listening Arena
                </h1>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-300">
                  +15 XP
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Nghe các câu hội thoại chuẩn bản ngữ, chỉnh tốc độ chậm 🐢 & chọn đáp án chính xác
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
                setIsAnswered(false);
                setSelectedOption(null);
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
      </div>

      {/* Main Listening Challenge Card */}
      {currentItem && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 text-center">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span className="px-3 py-1 rounded-xl bg-cyan-50 text-cyan-800 border border-cyan-200">
              {currentItem.type.replace("_", " ").toUpperCase()} • {currentItem.topic}
            </span>
            <span>
              Question {currentIndex + 1} of {gradeItems.length}
            </span>
          </div>

          {/* Prompt */}
          <h2 className="font-display font-bold text-lg sm:text-xl text-slate-800">
            {currentItem.prompt}
          </h2>

          {/* Big Audio Player Controls */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-50/80 to-blue-50/50 border border-cyan-100 max-w-md mx-auto space-y-4">
            <button
              id="listening-play-audio-btn"
              onClick={() => handlePlayAudio(playbackSpeed)}
              className="w-20 h-20 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30 transition-transform active:scale-95"
            >
              <Volume2 className="w-9 h-9" />
            </button>

            {/* Speed Buttons */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setPlaybackSpeed(0.75);
                  handlePlayAudio(0.75);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  playbackSpeed === 0.75
                    ? "bg-amber-400 text-amber-950 border-amber-500"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                <Snail className="w-3.5 h-3.5" />
                <span>Slow 0.75x 🐢</span>
              </button>

              <button
                onClick={() => {
                  setPlaybackSpeed(1.0);
                  handlePlayAudio(1.0);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  playbackSpeed === 1.0
                    ? "bg-cyan-500 text-white border-cyan-600"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Normal 1.0x ⚡</span>
              </button>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {currentItem.options.map((opt) => {
              let btnStyle = "bg-slate-50 hover:bg-cyan-50 border-slate-200 text-slate-800";
              if (isAnswered) {
                if (opt === currentItem.correctAnswer) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md";
                } else if (selectedOption === opt) {
                  btnStyle = "bg-rose-500 text-white border-rose-600";
                }
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`py-3.5 px-4 rounded-2xl border-2 font-display font-bold text-base transition-all active:scale-95 ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback & Script Reveal */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl mx-auto space-y-2 animate-fade-in">
              <div className="flex items-center justify-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <span className="text-emerald-700">⭐ Excellent! Correct Answer!</span>
                ) : (
                  <span className="text-rose-700">💡 Good try! The correct answer is: {currentItem.correctAnswer}</span>
                )}
              </div>
              <p className="text-xs text-slate-600">
                <span className="font-bold text-slate-500">Audio Script: </span>
                “{currentItem.audioScript}”
              </p>
            </div>
          )}

          {/* Bottom Nav */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              <span>Next Audio Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
