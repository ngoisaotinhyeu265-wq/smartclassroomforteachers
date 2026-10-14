import React, { useEffect, useRef } from "react";

interface PitchWaveformVisualizerProps {
  isRecording: boolean;
  audioStream?: MediaStream | null;
  targetIntonation?: "rising" | "falling" | "flat";
  studentIntonation?: "rising" | "falling" | "flat" | null;
  syllables?: Array<{ syllable: string; isStressedTarget: boolean; isStressedStudent?: boolean }>;
  overallScore?: number;
}

export const PitchWaveformVisualizer: React.FC<PitchWaveformVisualizerProps> = ({
  isRecording,
  audioStream,
  targetIntonation = "rising",
  studentIntonation,
  syllables = [],
  overallScore,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Live microphone waveform animation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isRecording && audioStream) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioCtx.createMediaStreamSource(audioStream);
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const drawWave = () => {
          animationFrameRef.current = requestAnimationFrame(drawWave);
          analyser.getByteTimeDomainData(dataArray);

          ctx.fillStyle = "#0F172A";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.lineWidth = 3;
          ctx.strokeStyle = "#38BDF8";
          ctx.beginPath();

          const sliceWidth = (canvas.width * 1.0) / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }

          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.stroke();

          // Overlay sound level glow
          ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
          ctx.fill();
        };

        drawWave();
      } catch (err) {
        console.error("Audio Context setup error:", err);
      }
    } else {
      // Idle animated standby wave
      let phase = 0;
      const drawIdleWave = () => {
        animationFrameRef.current = requestAnimationFrame(drawIdleWave);
        phase += 0.05;

        ctx.fillStyle = "#0F172A";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center line
        ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Idle sine wave
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = isRecording ? "#EF4444" : "#818CF8";
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
          const amplitude = isRecording ? 25 : 10;
          const frequency = 0.03;
          const y = canvas.height / 2 + Math.sin(x * frequency + phase) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      drawIdleWave();
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, [isRecording, audioStream]);

  return (
    <div className="bg-slate-900 rounded-3xl p-5 border-2 border-slate-700 shadow-[0_6px_0_0_#0F172A] text-white space-y-4">
      {/* Visualizer Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌊</span>
          <span className="font-display font-black text-sm text-cyan-300 uppercase tracking-wide">
            Biểu Đồ Sóng Âm & Cao Độ Ngữ Điệu (Pitch Contour)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isRecording ? (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500 text-xs font-black animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Đang thu âm...
            </span>
          ) : (
            <span className="text-xs text-slate-400 font-bold">Mic sẵn sàng</span>
          )}
        </div>
      </div>

      {/* Live Waveform Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 h-24 sm:h-28 flex items-center justify-center">
        <canvas ref={canvasRef} width={500} height={120} className="w-full h-full" />

        {/* Dynamic Intonation Overlay Hint */}
        <div className="absolute top-2 right-3 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] font-bold text-cyan-300">
          Target: {targetIntonation === "rising" ? "↗ Lên giọng (Rising)" : "↘ Xuống giọng (Falling)"}
        </div>
      </div>

      {/* Intonation Contour Curve & Syllable Heights */}
      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3">
        <div className="flex items-center justify-between text-xs font-black">
          <span className="text-slate-300 flex items-center gap-1.5">
            <span>🎯 So sánh đường cong cao độ (Pitch Contour):</span>
          </span>
          {overallScore && (
            <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-700">
              Độ chuẩn: {overallScore}%
            </span>
          )}
        </div>

        {/* Syllable Stress Heights Bar Grid */}
        {syllables.length > 0 && (
          <div className="pt-1">
            <span className="text-[11px] text-slate-400 font-bold block mb-2">
              Trọng âm từng âm tiết (Độ cao & âm lượng):
            </span>
            <div className="flex items-end justify-center gap-3 sm:gap-6 bg-slate-900/90 py-4 px-3 rounded-xl border border-slate-700">
              {syllables.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 sm:w-16 rounded-t-xl transition-all duration-300 flex items-center justify-center font-black text-xs shadow-inner ${
                      s.isStressedTarget
                        ? "h-16 bg-gradient-to-t from-amber-500 to-yellow-400 text-slate-950 border-t-2 border-yellow-200"
                        : "h-8 bg-slate-700 text-slate-300 border-t border-slate-500"
                    }`}
                  >
                    {s.isStressedTarget ? "STRESSED" : "soft"}
                  </div>
                  <span className={`text-xs font-black uppercase ${s.isStressedTarget ? "text-amber-400 text-sm" : "text-slate-400"}`}>
                    {s.syllable}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Intonation Comparison Vector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Target Pitch Curve */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Mẫu chuẩn bản ngữ
              </span>
              <span className="text-xs font-black text-cyan-400">
                {targetIntonation === "rising" ? "Ngữ điệu đi lên ↗ (Yes/No Q)" : "Ngữ điệu đi xuống ↘ (Câu trần thuật)"}
              </span>
            </div>
            <div className="text-2xl text-cyan-400 font-black">
              {targetIntonation === "rising" ? "📈" : "📉"}
            </div>
          </div>

          {/* Student Pitch Feedback */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Giọng đọc của học sinh
              </span>
              <span className="text-xs font-black text-amber-400">
                {studentIntonation
                  ? studentIntonation === "rising"
                    ? "↗ Đã phát hiện lên giọng"
                    : "↘ Đã phát hiện xuống giọng"
                  : "Chờ bạn thu âm để phân tích"}
              </span>
            </div>
            <div className="text-2xl">
              {studentIntonation === targetIntonation ? "✅" : studentIntonation ? "⚠️" : "🎙️"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
