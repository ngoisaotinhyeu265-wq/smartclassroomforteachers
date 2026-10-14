import React, { useState, useEffect } from "react";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { Clock, Play, Pause, RotateCcw, X, Volume2, Sparkles, Bell } from "lucide-react";

interface ClassroomTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassroomTimerModal: React.FC<ClassroomTimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(180); // 3 mins default
  const [remainingSeconds, setRemainingSeconds] = useState<number>(180);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [voicePromptEnabled, setVoicePromptEnabled] = useState<boolean>(true);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          const next = prev - 1;

          // Checkpoint voice announcements
          if (voicePromptEnabled) {
            if (next === 120) {
              speakText("You have two minutes left.", { rate: 0.95 });
            } else if (next === 60) {
              speakText("You have one minute left.", { rate: 0.95 });
            } else if (next === 30) {
              speakText("You have thirty seconds left.", { rate: 0.95 });
            } else if (next === 0) {
              playSound("levelup");
              setTimeout(() => {
                speakText("Time's up! Pens down, please.", { rate: 0.95 });
              }, 600);
            }
          }

          return next;
        });
      }, 1000);
    } else if (remainingSeconds === 0 && isRunning) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, voicePromptEnabled]);

  if (!isOpen) return null;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressPercent = Math.max(0, Math.min(100, (remainingSeconds / totalSeconds) * 100));

  const setPreset = (sec: number, label: string) => {
    playSound("click");
    setIsRunning(false);
    setTotalSeconds(sec);
    setRemainingSeconds(sec);
    if (voicePromptEnabled) {
      speakText(`You have ${label}.`, { rate: 0.95 });
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-2xl space-y-6 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-slate-800">
                Classroom Countdown Timer
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                Tự động phát khẩu lệnh tiếng Anh lúc hết giờ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Digital Display */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-3 shadow-inner relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-blue-600/30 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />

          <div className="relative z-10">
            <span className="font-mono font-black text-5xl sm:text-6xl tracking-wider text-amber-300">
              {formattedTime}
            </span>
            <p className="text-xs font-bold text-slate-300 mt-2">
              {remainingSeconds === 0
                ? "🔔 Time's up! Pens down, please."
                : isRunning
                ? "⏳ Hoạt động đang diễn ra..."
                : "Tạm dừng"}
            </p>
          </div>
        </div>

        {/* Preset Duration Buttons */}
        <div className="space-y-1.5">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
            Cài đặt thời gian nhanh:
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[
              { sec: 300, label: "5 phút", speech: "five minutes" },
              { sec: 180, label: "3 phút", speech: "three minutes" },
              { sec: 60, label: "1 phút", speech: "one minute" },
              { sec: 30, label: "30 giây", speech: "thirty seconds" },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => setPreset(p.sec, p.speech)}
                className={`py-2 px-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                  totalSeconds === p.sec
                    ? "bg-amber-400 text-amber-950 border-amber-500 shadow-xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls: Play / Pause / Reset */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              playSound("click");
              setIsRunning(!isRunning);
            }}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm text-white shadow-md transition-all cursor-pointer ${
              isRunning
                ? "bg-amber-500 hover:bg-amber-600 shadow-[0_4px_0_0_#B45309]"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-[0_4px_0_0_#065F46]"
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{isRunning ? "Tạm Dừng" : "Bắt Đầu Tính Giờ"}</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setIsRunning(false);
              setRemainingSeconds(totalSeconds);
            }}
            title="Đặt lại từ đầu"
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Announcement Toggle */}
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="font-bold">Nhắc nhở bằng giọng nói tiếng Anh</span>
          </div>
          <button
            onClick={() => setVoicePromptEnabled(!voicePromptEnabled)}
            className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
              voicePromptEnabled ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                voicePromptEnabled ? "left-5" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
