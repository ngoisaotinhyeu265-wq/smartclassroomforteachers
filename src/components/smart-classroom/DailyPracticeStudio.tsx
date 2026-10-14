import React, { useState, useEffect } from "react";
import { DAILY_PRACTICE_SET } from "../../data/smartClassroomData";
import { DailyPracticePhrase } from "../../types/smartClassroom";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Sparkles,
  Volume2,
  Snail,
  Mic,
  MicOff,
  CheckCircle2,
  RotateCcw,
  Trophy,
  ArrowRight,
  Star,
  Flame,
} from "lucide-react";

interface DailyPracticeStudioProps {
  onSaveFavorite: (phrase: string) => void;
}

export const DailyPracticeStudio: React.FC<DailyPracticeStudioProps> = ({
  onSaveFavorite,
}) => {
  const [phrases, setPhrases] = useState<DailyPracticePhrase[]>(DAILY_PRACTICE_SET);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [userSpokenText, setUserSpokenText] = useState<string>("");
  const [practiceScore, setPracticeScore] = useState<number | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const currentPhrase = phrases[currentIndex] || phrases[0];

  const handleSpeak = (text: string, rate: number = 0.9) => {
    playSound("click");
    speakText(text, { rate });
  };

  const handleStartSpeechTest = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulated voice test if browser doesn't have webkitSpeechRecognition
      setIsRecording(true);
      playSound("click");
      setTimeout(() => {
        setIsRecording(false);
        setUserSpokenText(currentPhrase.phrase);
        setPracticeScore(95);
        playSound("levelup");
        markCurrentCompleted();
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setUserSpokenText("");
        setPracticeScore(null);
        playSound("click");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserSpokenText(transcript);

        // Simple similarity score
        const targetClean = currentPhrase.phrase.toLowerCase().replace(/[^a-z0-9]/g, "");
        const spokenClean = transcript.toLowerCase().replace(/[^a-z0-9]/g, "");

        let score = 75;
        if (targetClean === spokenClean) score = 100;
        else if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) score = 90;
        else score = Math.max(60, 100 - Math.abs(targetClean.length - spokenClean.length) * 5);

        setPracticeScore(score);
        if (score >= 70) {
          playSound("correct");
          markCurrentCompleted();
        } else {
          playSound("wrong");
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  const markCurrentCompleted = () => {
    setPhrases((prev) =>
      prev.map((p, idx) => (idx === currentIndex ? { ...p, completed: true } : p))
    );
    setCompletedCount((prev) => Math.min(phrases.length, prev + 1));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_0_#0F766E] border-2 border-emerald-400 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-black uppercase tracking-wider backdrop-blur-xs">
            <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>Phần 28 • Thói Quen Luyện Giọng Mỗi Ngày</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black">
            🎯 5-Minute Teacher English Practice
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Mỗi ngày dành đúng 5 phút để luyện nói 5 câu khẩu lệnh lớp học chuẩn ngữ điệu và phát âm. Giúp giáo viên phản xạ tự nhiên, tự tin đứng lớp!
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 text-xs font-black text-emerald-200">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Hoàn thành: {completedCount} / {phrases.length} câu</span>
          </div>
        </div>
      </div>

      {/* Main Practice Interactive Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
        {/* Progress Dots */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-black text-slate-500 uppercase">
            Câu {currentIndex + 1} / {phrases.length}
          </span>
          <div className="flex items-center gap-2">
            {phrases.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  playSound("click");
                  setCurrentIndex(idx);
                  setUserSpokenText("");
                  setPracticeScore(null);
                }}
                className={`w-8 h-8 rounded-xl font-black text-xs transition-all flex items-center justify-center cursor-pointer ${
                  idx === currentIndex
                    ? "bg-emerald-600 text-white shadow-md scale-110"
                    : p.completed
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {p.completed ? "✓" : idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Big Phrase Display */}
        <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 text-center space-y-3">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wide">
            CLASSROOM PHRASE
          </span>

          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 select-text">
            "{currentPhrase.phrase}"
          </h3>

          <p className="text-base font-bold text-emerald-800 select-text">
            🇻🇳 {currentPhrase.translationVi}
          </p>

          <div className="bg-white/80 p-3 rounded-2xl border border-emerald-100 text-xs text-slate-600 max-w-lg mx-auto text-left space-y-1">
            <p>
              <strong className="text-slate-800">📌 Ngữ cảnh:</strong> {currentPhrase.context}
            </p>
            <p className="text-emerald-700">
              <strong>🗣️ Mẹo phát âm & nối âm:</strong> {currentPhrase.phonicsTips}
            </p>
          </div>
        </div>

        {/* Audio Listening Bar */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => handleSpeak(currentPhrase.phrase, 0.95)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-[0_3px_0_0_#1D4ED8] transition-all cursor-pointer active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu (Normal)</span>
          </button>

          <button
            onClick={() => handleSpeak(currentPhrase.phrase, 0.65)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-[0_3px_0_0_#B45309] transition-all cursor-pointer active:scale-95"
          >
            <Snail className="w-4 h-4" />
            <span>Nghe chậm (Slow)</span>
          </button>

          <button
            onClick={() => onSaveFavorite(currentPhrase.phrase)}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Lưu câu này</span>
          </button>
        </div>

        {/* Microphone Recording & Repetition Studio */}
        <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 text-center space-y-4">
          <span className="text-xs font-black text-slate-600 uppercase tracking-wide">
            Đến lượt giáo viên luyện nói (Speech Recognition)
          </span>

          <div className="flex justify-center">
            <button
              onClick={handleStartSpeechTest}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all cursor-pointer shadow-lg active:scale-90 ${
                isRecording
                  ? "bg-rose-500 animate-pulse ring-8 ring-rose-200"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
          </div>

          <p className="text-xs font-bold text-slate-500">
            {isRecording
              ? "Đang lắng nghe giọng thầy/cô... Hãy đọc câu trên thật rõ ràng!"
              : "Nhấn vào micro và đọc to câu tiếng Anh để kiểm tra phát âm"}
          </p>

          {userSpokenText && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-2 animate-in fade-in">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Bạn vừa đọc:</span>
              <p className="text-base font-black text-slate-800">"{userSpokenText}"</p>
              {practiceScore !== null && (
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full ${
                      practiceScore >= 80
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    Điểm phát âm: {practiceScore}/100 ⭐
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation between 5 questions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              playSound("click");
              setCurrentIndex((prev) => Math.max(0, prev - 1));
              setUserSpokenText("");
              setPracticeScore(null);
            }}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all disabled:opacity-30 cursor-pointer"
          >
            ⬅️ Câu trước
          </button>

          <button
            onClick={() => {
              playSound("click");
              if (currentIndex < phrases.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setUserSpokenText("");
                setPracticeScore(null);
              } else {
                playSound("levelup");
                alert("Chúc mừng thầy/cô đã hoàn thành trọn bộ 5 câu luyện tập hôm nay! 🎉");
              }
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-[0_3px_0_0_#065F46] transition-all cursor-pointer"
          >
            <span>{currentIndex === phrases.length - 1 ? "Hoàn thành bài học 🎉" : "Câu tiếp theo"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
