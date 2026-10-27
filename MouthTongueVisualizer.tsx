import React from "react";
import { PhonemeFeedback } from "../../types";

interface MouthTongueVisualizerProps {
  phonemeFeedback?: PhonemeFeedback | null;
  selectedSound?: string;
  isVoiced?: boolean;
}

export const MouthTongueVisualizer: React.FC<MouthTongueVisualizerProps> = ({
  phonemeFeedback,
  selectedSound = "/iː/",
  isVoiced = true,
}) => {
  const guide = phonemeFeedback?.articulationGuide || {
    lipPosition: "spread",
    tonguePosition: "front_high",
    voicing: isVoiced ? "voiced" : "voiceless",
    airflow: "continuous",
  };

  const sound = selectedSound || phonemeFeedback?.targetSound || "/iː/";

  // Derive SVG articulation coordinates based on phoneme / sound
  const getArticulationParams = () => {
    if (sound.includes("θ") || sound.includes("ð")) {
      return {
        tongueTipX: 108,
        tongueTipY: 108,
        tongueBackY: 130,
        lipTopY: 96,
        lipBottomY: 122,
        lipOpening: "open-slit",
        airflowType: "fricative",
        voicing: sound.includes("ð"),
        labelVi: "Đầu lưỡi đặt nhẹ giữa 2 hàm răng, thổi luồng hơi êm",
        labelEn: "Tongue tip placed between teeth",
      };
    }
    if (sound.includes("ʃ") || sound.includes("tʃ") || sound.includes("dʒ")) {
      return {
        tongueTipX: 125,
        tongueTipY: 98,
        tongueBackY: 125,
        lipTopY: 92,
        lipBottomY: 128,
        lipOpening: "rounded-protruded",
        airflowType: "fricative",
        voicing: sound.includes("dʒ"),
        labelVi: "Chu tròn môi, nâng đầu lưỡi gần vòm miệng trên",
        labelEn: "Lips rounded, tongue blade raised near palate",
      };
    }
    if (sound.includes("iː")) {
      return {
        tongueTipX: 120,
        tongueTipY: 100,
        tongueBackY: 110,
        lipTopY: 98,
        lipBottomY: 116,
        lipOpening: "wide-spread",
        airflowType: "continuous",
        voicing: true,
        labelVi: "Môi kéo bè sang 2 bên như đang cười tươi, cuống lưỡi nâng cao",
        labelEn: "Lips spread wide, high front tongue",
      };
    }
    if (sound.includes("ɪ")) {
      return {
        tongueTipX: 125,
        tongueTipY: 112,
        tongueBackY: 125,
        lipTopY: 96,
        lipBottomY: 120,
        lipOpening: "relaxed-neutral",
        airflowType: "continuous",
        voicing: true,
        labelVi: "Môi thả lỏng, phát âm ngắn dứt khoát nửa i nửa ê",
        labelEn: "Relaxed lips, mid-high tongue, short sound",
      };
    }
    if (sound.includes("æ")) {
      return {
        tongueTipX: 120,
        tongueTipY: 130,
        tongueBackY: 135,
        lipTopY: 88,
        lipBottomY: 134,
        lipOpening: "wide-open",
        airflowType: "continuous",
        voicing: true,
        labelVi: "Hạ quai hàm rộng, miệng mở to như chữ A nhưng phát âm chữ E",
        labelEn: "Jaw dropped wide, tongue flat and low",
      };
    }
    if (sound.includes("p") || sound.includes("b") || sound.includes("m")) {
      return {
        tongueTipX: 130,
        tongueTipY: 120,
        tongueBackY: 130,
        lipTopY: 106,
        lipBottomY: 108,
        lipOpening: "closed-tight",
        airflowType: sound.includes("m") ? "nasal" : "plosive",
        voicing: !sound.includes("p"),
        labelVi: sound.includes("p")
          ? "Mím chặt 2 môi rồi bật mạnh luồng hơi (không rung dây thanh)"
          : "Hai môi mím lại, rung thanh quản bật âm /b/ hoặc thoát khí qua mũi /m/",
        labelEn: "Lips pressed together firmly, burst airflow",
      };
    }
    if (sound.includes("r")) {
      return {
        tongueTipX: 135,
        tongueTipY: 96,
        tongueBackY: 120,
        lipTopY: 94,
        lipBottomY: 124,
        lipOpening: "rounded",
        airflowType: "continuous",
        voicing: true,
        labelVi: "Môi hơi chu, đầu lưỡi uốn cong về phía sau vòm họng (không chạm)",
        labelEn: "Curled back tongue tip, rounded lips",
      };
    }
    if (sound.includes("l")) {
      return {
        tongueTipX: 114,
        tongueTipY: 92,
        tongueBackY: 125,
        lipTopY: 96,
        lipBottomY: 120,
        lipOpening: "neutral",
        airflowType: "continuous",
        voicing: true,
        labelVi: "Đầu lưỡi chạm chắc vào chân răng cửa trên, luồng khí thoát 2 bên",
        labelEn: "Tongue tip firmly on alveolar ridge",
      };
    }
    // Default fallback
    return {
      tongueTipX: 122,
      tongueTipY: 110,
      tongueBackY: 125,
      lipTopY: 95,
      lipBottomY: 120,
      lipOpening: guide.lipPosition,
      airflowType: guide.airflow,
      voicing: guide.voicing === "voiced",
      labelVi: "Khẩu hình tự nhiên, phát âm rõ ràng, tròn vành rõ chữ",
      labelEn: "Standard articulation position",
    };
  };

  const params = getArticulationParams();

  return (
    <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 shadow-[0_6px_0_0_#C7D2FE] flex flex-col items-center">
      {/* Header Badge */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">👄</span>
          <span className="font-display font-black text-sm text-indigo-900 uppercase">
            Mô Hình Khẩu Hình Miệng & Lưỡi AI
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
              params.voicing
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : "bg-slate-100 text-slate-700 border-slate-300"
            }`}
          >
            {params.voicing ? "🟢 Voiced (Hữu thanh - Rung cổ)" : "⚪ Voiceless (Vô thanh - Bật hơi)"}
          </span>
        </div>
      </div>

      {/* SVG Oral Cavity Cross-section Diagram */}
      <div className="relative w-full max-w-sm aspect-[4/3] bg-gradient-to-b from-indigo-50/60 to-blue-50/80 rounded-2xl border-2 border-indigo-100 overflow-hidden flex items-center justify-center p-2">
        <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-xs">
          <defs>
            {/* Soft Palate & Oral Skin Gradients */}
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
            <linearGradient id="tongueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="airflowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Background Head Profile Silhouette */}
          <path
            d="M 60 20 Q 140 15 180 50 Q 210 80 200 130 L 190 170 L 60 170 Z"
            fill="#EEF2FF"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Nasal Cavity & Hard Palate */}
          <path
            d="M 80 50 Q 130 45 160 70 L 160 85 Q 130 75 95 85 Z"
            fill="#FCE7F3"
            stroke="#F472B6"
            strokeWidth="1.5"
          />
          <text x="135" y="60" fontSize="7" fill="#BE185D" fontWeight="bold">
            Hard Palate (Vòm họng)
          </text>

          {/* Upper Teeth & Gum (Alveolar Ridge) */}
          <path
            d="M 95 85 L 105 85 L 108 95 L 102 96 Z"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <text x="75" y="80" fontSize="7" fill="#64748B" fontWeight="bold">
            Upper Teeth (Răng trên)
          </text>

          {/* Lower Teeth */}
          <path
            d="M 98 120 L 106 120 L 104 112 L 96 112 Z"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <text x="65" y="145" fontSize="7" fill="#64748B" fontWeight="bold">
            Lower Teeth (Răng dưới)
          </text>

          {/* Upper Lip */}
          <path
            d={`M 70 85 Q 85 ${params.lipTopY - 10} 100 ${params.lipTopY} Q 90 ${params.lipTopY + 8} 75 95 Z`}
            fill="url(#skinGrad)"
            stroke="#DB2777"
            strokeWidth="2"
          />

          {/* Lower Lip */}
          <path
            d={`M 75 125 Q 90 ${params.lipBottomY - 8} 100 ${params.lipBottomY} Q 85 ${params.lipBottomY + 12} 70 135 Z`}
            fill="url(#skinGrad)"
            stroke="#DB2777"
            strokeWidth="2"
          />

          {/* Airflow Animation Vector */}
          <path
            d={`M 180 150 Q 150 120 ${params.tongueTipX} ${params.tongueTipY - 5} Q 95 105 50 108`}
            fill="none"
            stroke="url(#airflowGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Dynamic Interactive Tongue */}
          <path
            d={`M 180 155 Q 165 ${params.tongueBackY} ${params.tongueTipX + 15} ${params.tongueTipY + 10} Q ${params.tongueTipX} ${params.tongueTipY} ${params.tongueTipX - 10} ${params.tongueTipY + 15} Q 130 160 180 170 Z`}
            fill="url(#tongueGrad)"
            stroke="#BE123C"
            strokeWidth="2.5"
            className="transition-all duration-300"
          />
          <circle
            cx={params.tongueTipX}
            cy={params.tongueTipY}
            r="4"
            fill="#FFE4E6"
            stroke="#BE123C"
            strokeWidth="1.5"
          />

          {/* Vocal Cords Vibration Indicator */}
          <g transform="translate(180, 155)">
            <ellipse
              cx="0"
              cy="0"
              rx={params.voicing ? 7 : 4}
              ry={params.voicing ? 10 : 6}
              fill={params.voicing ? "#22C55E" : "#94A3B8"}
              className={params.voicing ? "animate-ping opacity-75" : ""}
            />
            <ellipse
              cx="0"
              cy="0"
              rx="5"
              ry="7"
              fill={params.voicing ? "#16A34A" : "#64748B"}
            />
            <text x="-15" y="16" fontSize="6" fill="#1E293B" fontWeight="bold">
              {params.voicing ? "Vocal Cords (Rung)" : "No Vibration"}
            </text>
          </g>

          {/* Target Phoneme Badge */}
          <rect x="15" y="15" width="45" height="24" rx="8" fill="#1E1B4B" />
          <text x="37" y="31" fontSize="11" fill="#FEF08A" fontWeight="black" textAnchor="middle">
            {sound}
          </text>
        </svg>

        {/* Floating Lip Shape Tag */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-indigo-200 text-[10px] font-black text-indigo-900 shadow-xs">
          Khẩu hình: <span className="text-pink-600 capitalize">{params.lipOpening.replace("-", " ")}</span>
        </div>
      </div>

      {/* Articulation Coaching Tip */}
      <div className="mt-3 w-full bg-indigo-50/80 rounded-2xl p-3 border border-indigo-200 text-center space-y-1">
        <p className="text-xs font-black text-indigo-950 flex items-center justify-center gap-1.5">
          <span>💡 Mẹo đặt khẩu hình:</span>
          <span className="text-indigo-800">{params.labelVi}</span>
        </p>
        <p className="text-[11px] text-indigo-600/90 font-semibold">
          English: {params.labelEn}
        </p>
      </div>
    </div>
  );
};
