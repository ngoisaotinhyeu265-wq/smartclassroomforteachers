import React, { useState } from "react";
import { SmartClassroomPhrase } from "../../types/smartClassroom";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Sparkles,
  Volume2,
  Users,
  Play,
  RotateCcw,
  Star,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";

interface AttentionSignalsStudioProps {
  signals: SmartClassroomPhrase[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const AttentionSignalsStudio: React.FC<AttentionSignalsStudioProps> = ({
  signals,
  favorites,
  onToggleFavorite,
}) => {
  const [activeSignalIndex, setActiveSignalIndex] = useState<number>(0);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<"idle" | "teacher" | "students">("idle");

  const currentSignal = signals[activeSignalIndex] || signals[0];

  const handlePlaySimulation = (signal: SmartClassroomPhrase) => {
    if (isPlayingSimulation) return;
    playSound("click");
    setIsPlayingSimulation(true);
    setSimulationStep("teacher");

    // 1. Teacher speaks call
    speakText(signal.teacherCall || signal.english, { rate: 0.9 });

    // 2. After 1.8s, students cheer and respond
    setTimeout(() => {
      setSimulationStep("students");
      playSound("correct");
      speakText(signal.studentResponse || "Yes, yes!", { rate: 1.05, pitch: 1.2 });

      // 3. Reset
      setTimeout(() => {
        setIsPlayingSimulation(false);
        setSimulationStep("idle");
        playSound("star");
      }, 2200);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_0_#C2410C] border-2 border-amber-300 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-yellow-100 text-xs font-black uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phần 2 • Call & Response Master</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black">
            👀 Attention Signals – Hiệu Lệnh Thu Hút Tập Trung
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm font-medium leading-relaxed">
            Các khẩu lệnh nhịp điệu ngắn, vui nhộn và tràn ngập năng lượng giúp giáo viên ổn định lớp học chỉ trong 3 giây mà không cần quát to hay gõ bảng!
          </p>
        </div>
      </div>

      {/* Main Interactive Stage: Simulation Carousel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
              Chọn hiệu lệnh thực hành ({signals.length} mẫu):
            </span>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Signal {activeSignalIndex + 1} / {signals.length}
          </span>
        </div>

        {/* Signal Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {signals.map((sig, idx) => {
            const isActive = idx === activeSignalIndex;
            return (
              <button
                key={sig.id}
                onClick={() => {
                  playSound("click");
                  setActiveSignalIndex(idx);
                  setSimulationStep("idle");
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-amber-500 text-white shadow-[0_3px_0_0_#B45309] scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800 border border-slate-200"
                }`}
              >
                <span>Signal {sig.signalNumber || idx + 1}</span>
                <span className="opacity-80">({sig.teacherCall?.slice(0, 10)}...)</span>
              </button>
            );
          })}
        </div>

        {/* Active Signal Interactive Arena */}
        {currentSignal && (
          <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-inner space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-300 uppercase tracking-wider">
                🌟 Hiệu lệnh số {currentSignal.signalNumber || activeSignalIndex + 1}
              </span>

              <button
                onClick={() => onToggleFavorite(currentSignal.id)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  favorites.includes(currentSignal.id)
                    ? "bg-amber-400 text-white"
                    : "bg-white text-slate-400 hover:text-amber-500 border border-slate-200"
                }`}
                title="Lưu hiệu lệnh yêu thích"
              >
                <Star
                  className={`w-4 h-4 ${
                    favorites.includes(currentSignal.id) ? "fill-white" : ""
                  }`}
                />
              </button>
            </div>

            {/* Two Dialogue Balloons: Teacher vs Students */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Teacher Call Box */}
              <div
                className={`p-5 rounded-3xl border-2 transition-all duration-300 ${
                  simulationStep === "teacher"
                    ? "bg-blue-600 text-white border-blue-700 shadow-[0_8px_0_0_#1D4ED8] scale-102"
                    : "bg-white text-slate-800 border-blue-200 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${
                      simulationStep === "teacher"
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    👩‍🏫 Lời Giáo Viên (Call)
                  </span>
                  <button
                    onClick={() => speakText(currentSignal.teacherCall || "", { rate: 0.9 })}
                    className={`p-2 rounded-xl cursor-pointer ${
                      simulationStep === "teacher"
                        ? "bg-white/20 text-white"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                    title="Nghe Teacher call"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display">
                  "{currentSignal.teacherCall}"
                </h3>
                <p
                  className={`text-xs mt-2 font-medium ${
                    simulationStep === "teacher" ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  🇻🇳 {currentSignal.vietnamese.split("->")[0]?.trim()}
                </p>
              </div>

              {/* Students Response Box */}
              <div
                className={`p-5 rounded-3xl border-2 transition-all duration-300 ${
                  simulationStep === "students"
                    ? "bg-amber-500 text-white border-amber-600 shadow-[0_8px_0_0_#B45309] scale-102"
                    : "bg-white text-slate-800 border-amber-200 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${
                      simulationStep === "students"
                        ? "bg-white/20 text-white"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    👧👦 Học Sinh Đồng Thanh (Response)
                  </span>
                  <button
                    onClick={() =>
                      speakText(currentSignal.studentResponse || "", { rate: 1.05, pitch: 1.2 })
                    }
                    className={`p-2 rounded-xl cursor-pointer ${
                      simulationStep === "students"
                        ? "bg-white/20 text-white"
                        : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                    }`}
                    title="Nghe Students response"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display">
                  "{currentSignal.studentResponse}"
                </h3>
                <p
                  className={`text-xs mt-2 font-medium ${
                    simulationStep === "students" ? "text-amber-100" : "text-slate-500"
                  }`}
                >
                  🇻🇳 {currentSignal.vietnamese.split("->")[1]?.trim()}
                </p>
              </div>
            </div>

            {/* Simulation Controller Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="btn-simulate-call-response"
                onClick={() => handlePlaySimulation(currentSignal)}
                disabled={isPlayingSimulation}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-[0_4px_0_0_#B45309] active:translate-y-1 active:shadow-none transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>
                  {isPlayingSimulation ? "Đang mô phỏng lớp học..." : "Mô phỏng cả lớp đối đáp (Simulation)"}
                </span>
              </button>

              <button
                onClick={() => {
                  const nextIdx = (activeSignalIndex + 1) % signals.length;
                  setActiveSignalIndex(nextIdx);
                  playSound("click");
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-black text-sm border-2 border-slate-200 transition-all cursor-pointer"
              >
                <span>Hiệu lệnh tiếp theo ➡️</span>
              </button>
            </div>

            {/* Teacher Tips Box */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-amber-800 font-black">
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>Mẹo đứng lớp của giáo viên bản ngữ:</span>
              </div>
              <p className="text-slate-600 leading-relaxed pl-6">
                {currentSignal.teacherNotes || currentSignal.context}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
