import React, { useState } from "react";
import {
  SMART_CLASSROOM_PHRASES,
  TOP_20_MUST_KNOW_IDS,
  PHRASE_OF_THE_DAY,
} from "../../data/smartClassroomData";
import { SmartClassroomPhrase, SmartClassroomTab } from "../../types/smartClassroom";
import { PhraseCard } from "./PhraseCard";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Sparkles,
  Volume2,
  Dice5,
  Star,
  ArrowRight,
  Clock,
  Search,
  BookOpen,
  MessageCircle,
  Lightbulb,
  CheckCircle2,
  Users,
  Smile,
  Bell,
  Heart,
} from "lucide-react";

interface SmartClassroomHomeProps {
  onSelectTab: (tab: SmartClassroomTab) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenTranslateModal: (phrase: SmartClassroomPhrase) => void;
  onOpenTimerModal: () => void;
}

export const SmartClassroomHome: React.FC<SmartClassroomHomeProps> = ({
  onSelectTab,
  favorites,
  onToggleFavorite,
  onOpenTranslateModal,
  onOpenTimerModal,
}) => {
  // Random Phrase State (Section XXII)
  const [randomPhraseIndex, setRandomPhraseIndex] = useState<number>(() =>
    Math.floor(Math.random() * SMART_CLASSROOM_PHRASES.length)
  );

  const randomPhrase = SMART_CLASSROOM_PHRASES[randomPhraseIndex] || SMART_CLASSROOM_PHRASES[0];

  const handleNextRandomPhrase = () => {
    playSound("click");
    let nextIdx = Math.floor(Math.random() * SMART_CLASSROOM_PHRASES.length);
    if (nextIdx === randomPhraseIndex) {
      nextIdx = (nextIdx + 1) % SMART_CLASSROOM_PHRASES.length;
    }
    setRandomPhraseIndex(nextIdx);
  };

  // Top 20 Must-Know Phrases
  const top20Phrases = SMART_CLASSROOM_PHRASES.filter((p) =>
    TOP_20_MUST_KNOW_IDS.includes(p.id)
  );

  const categoryCards = [
    {
      tab: "greetings" as SmartClassroomTab,
      icon: "👋",
      title: "Greetings & Opening",
      desc: "Chào đầu giờ, điểm danh chuẩn bản ngữ (Is anyone absent today?)",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 border-blue-200 text-blue-900",
    },
    {
      tab: "attention" as SmartClassroomTab,
      icon: "👀",
      title: "Attention Signals",
      desc: "Call & Response 7 mẫu kinh điển (One two three -> Eyes on me)",
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 border-amber-200 text-amber-900",
    },
    {
      tab: "instructions" as SmartClassroomTab,
      icon: "📝",
      title: "Classroom Instructions",
      desc: "Chuẩn bị sách vở, khẩu lệnh nghe, đọc, viết nắn nót",
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 border-emerald-200 text-emerald-900",
    },
    {
      tab: "teaching" as SmartClassroomTab,
      icon: "📚",
      title: "Teaching & Explaining",
      desc: "Dẫn dắt tranh ảnh, làm mẫu, chuyển lượt (Now it's your turn)",
      color: "from-purple-500 to-violet-600",
      bgLight: "bg-purple-50 border-purple-200 text-purple-900",
    },
    {
      tab: "checking" as SmartClassroomTab,
      icon: "🎯",
      title: "Checking Understanding",
      desc: "Kiểm tra hiểu bài, gợi mở tư duy (Can you explain your answer?)",
      color: "from-sky-500 to-cyan-600",
      bgLight: "bg-sky-50 border-sky-200 text-sky-900",
    },
    {
      tab: "praise" as SmartClassroomTab,
      icon: "👍",
      title: "Praise & Motivation",
      desc: "Small remarks, Big motivation (Keep up the good work!)",
      color: "from-pink-500 to-rose-600",
      bgLight: "bg-pink-50 border-pink-200 text-pink-900",
    },
    {
      tab: "feedback" as SmartClassroomTab,
      icon: "💡",
      title: "Correction & Feedback",
      desc: "Sửa lỗi không xấu hổ (Almost correct, You're on the right track)",
      color: "from-yellow-500 to-amber-600",
      bgLight: "bg-yellow-50 border-yellow-200 text-yellow-900",
    },
    {
      tab: "management" as SmartClassroomTab,
      icon: "🔔",
      title: "Classroom Management",
      desc: "Quản lý trật tự, tư thế ngồi ngay ngắn, một người phát biểu",
      color: "from-orange-500 to-red-600",
      bgLight: "bg-orange-50 border-orange-200 text-orange-900",
    },
    {
      tab: "transitions" as SmartClassroomTab,
      icon: "🔄",
      title: "Transitions & Time",
      desc: "Chuyển bài, chữa bài chung, quản lý thời gian làm bài",
      color: "from-teal-500 to-emerald-600",
      bgLight: "bg-teal-50 border-teal-200 text-teal-900",
    },
    {
      tab: "ending" as SmartClassroomTab,
      icon: "🏁",
      title: "Ending the Lesson",
      desc: "Dặn dò bài tập, dọn đồ dùng và lời chào tràn đầy năng lượng",
      color: "from-slate-600 to-slate-800",
      bgLight: "bg-slate-50 border-slate-200 text-slate-900",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Top Hero Section with Brand & Core Buttons (Section XXI) */}
      <div className="relative overflow-hidden rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#4F46E5] text-white p-7 sm:p-10 shadow-[0_10px_0_0_#172554] border-2 border-blue-400">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-yellow-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-5 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-yellow-300 text-xs font-black uppercase tracking-wider border border-white/30">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>English Classroom Language for Primary Teachers</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
              SMART CLASSROOM ENGLISH
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-bold">
              “Small phrases. Better classroom. More confident teaching.”
            </p>
            <p className="text-blue-200 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              Kho câu lệnh, cụm từ và nhận xét tiếng Anh sử dụng trực tiếp trong lớp học tiểu học. Speak English naturally. Teach confidently.
            </p>
          </div>

          {/* Core Action Buttons (Section XXI) */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => {
                playSound("click");
                onSelectTab("teacher-mode");
              }}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm shadow-[0_4px_0_0_#B45309] active:translate-y-1 active:shadow-none transition-all cursor-pointer uppercase tracking-wide flex items-center gap-2 ring-2 ring-amber-300/60"
            >
              <span>⚡ TEACHER MODE (GÕ TIẾNG VIỆT)</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                onSelectTab("classroom-script");
              }}
              className="px-5 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs sm:text-sm shadow-[0_4px_0_0_#065F46] active:translate-y-1 active:shadow-none transition-all cursor-pointer uppercase tracking-wide flex items-center gap-2"
            >
              <span>📑 CLASSROOM SCRIPT (7 CHẶNG)</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                onSelectTab("report-comments");
              }}
              className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_0_#312E81] active:translate-y-1 active:shadow-none transition-all cursor-pointer uppercase tracking-wide flex items-center gap-2 ring-2 ring-indigo-300/60"
            >
              <span>📝 NHẬN XÉT CUỐI NĂM (TT 27)</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                onSelectTab("greetings");
              }}
              className="px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/40 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer uppercase tracking-wide flex items-center gap-1.5"
            >
              <span>🚀 START TEACHING</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                onSelectTab("attention");
              }}
              className="px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/40 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer uppercase tracking-wide"
            >
              👀 ATTENTION SIGNALS
            </button>

            <button
              onClick={() => {
                playSound("click");
                onSelectTab("praise");
              }}
              className="px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/40 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer uppercase tracking-wide"
            >
              👍 PRAISE & MOTIVATION
            </button>

            <button
              onClick={() => {
                playSound("click");
                onOpenTimerModal();
              }}
              className="px-4 py-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900 text-amber-300 border border-amber-400/40 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>⏱️ CLASSROOM TIMER</span>
            </button>
          </div>
        </div>
      </div>

      {/* NEW SPOTLIGHT: 3 FEATURE HIGHLIGHT CARDS (Teacher Mode, Classroom Script & End-of-Year Comments) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Teacher Mode */}
        <div
          onClick={() => {
            playSound("click");
            onSelectTab("teacher-mode");
          }}
          className="group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md border-2 border-blue-400 hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wide shadow-sm">
                ⚡ CHẾ ĐỘ TRỢ LÝ
              </span>
              <span className="text-blue-200 text-xs font-bold">Nhanh 0s</span>
            </div>

            <h2 className="text-xl font-display font-black tracking-tight text-white group-hover:text-yellow-300 transition-colors">
              Teacher Mode: Gõ Tiếng Việt → Ra Câu Tiếng Anh
            </h2>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 space-y-1">
              <div className="text-xs text-blue-200 font-medium">Cô gõ:</div>
              <div className="font-bold text-amber-300 text-xs italic">“Các em lấy vở ra.”</div>
              <div className="text-xs text-white pt-1">
                👉 <span className="font-black bg-blue-900/80 px-2 py-0.5 rounded">
                  Please take out your notebooks. 🔊
                </span>
              </div>
            </div>

            <p className="text-blue-100 text-xs leading-relaxed">
              Cung cấp các cách nói tự nhiên khác, phát âm chuẩn 2 tốc độ, tra cứu nghĩa và lưu câu yêu thích.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-black text-amber-300">
            <span>MỞ TEACHER MODE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Teacher's Classroom Script */}
        <div
          onClick={() => {
            playSound("click");
            onSelectTab("classroom-script");
          }}
          className="group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md border-2 border-emerald-400 hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-300 text-emerald-950 font-black text-xs uppercase tracking-wide shadow-sm">
                📑 7 CHẶNG TIẾT DẠY
              </span>
              <span className="text-emerald-200 text-xs font-bold">35–40 phút</span>
            </div>

            <h2 className="text-xl font-display font-black tracking-tight text-white group-hover:text-emerald-200 transition-colors">
              Classroom Script: Kịch Bản Tiết Học
            </h2>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-emerald-100 leading-relaxed space-y-1">
              <div className="font-bold text-amber-300">🔄 7 chặng kết nối:</div>
              <p className="font-medium text-[11px] text-white/90">
                Opening → Warm-up → Presentation → Practice → Production → Review → Homework
              </p>
            </div>

            <p className="text-emerald-100 text-xs leading-relaxed">
              Ghép các khẩu lệnh thành kịch bản tiếng Anh hoàn chỉnh, nghe liên tục và tạo bằng AI theo bài dạy.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-black text-emerald-200">
            <span>XEM & TẠO KỊCH BẢN</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: End-of-Year Student Comments */}
        <div
          onClick={() => {
            playSound("click");
            onSelectTab("report-comments");
          }}
          className="group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-800 text-white shadow-md border-2 border-indigo-400 hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wide shadow-sm">
                📝 CHUẨN THÔNG TƯ 27
              </span>
              <span className="text-indigo-200 text-xs font-bold">Học Bạ / Sổ Liên Lạc</span>
            </div>

            <h2 className="text-xl font-display font-black tracking-tight text-white group-hover:text-amber-200 transition-colors">
              Student Comments: Nhận Xét Cuối Năm
            </h2>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-indigo-100 leading-relaxed space-y-1">
              <div className="font-bold text-amber-300">✨ Triết lý giáo dục:</div>
              <p className="font-bold text-[11px] text-yellow-200 italic">
                “Recognize progress – Encourage effort – Support growth”
              </p>
            </div>

            <p className="text-indigo-100 text-xs leading-relaxed">
              Ghép nhận xét tự động theo năng lực, thái độ, kỹ năng; chống lặp từ cho 30-40 học sinh; không dán nhãn tiêu cực.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-black text-amber-300">
            <span>TẠO NHẬN XÉT HỌC SINH</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side: Phrase of the Day (Section XXIII) & Random Phrase (Section XXII) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 🌟 PHRASE OF THE DAY */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wide">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>🌟 PHRASE OF THE DAY</span>
              </span>
              <span className="text-[11px] font-black text-slate-400 uppercase">
                {PHRASE_OF_THE_DAY.category}
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 p-5 rounded-2xl border border-amber-200/80 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 select-text">
                "{PHRASE_OF_THE_DAY.english}"
              </h3>
              {PHRASE_OF_THE_DAY.ipa && (
                <span className="text-xs font-mono text-indigo-700 font-bold block select-text">
                  {PHRASE_OF_THE_DAY.ipa}
                </span>
              )}
              <p className="text-base font-bold text-emerald-800 select-text">
                🇻🇳 {PHRASE_OF_THE_DAY.vietnamese}
              </p>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <p>
                <strong className="text-slate-800">📌 Meaning & Context:</strong> {PHRASE_OF_THE_DAY.context}
              </p>
              <p className="text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200">
                💡 {PHRASE_OF_THE_DAY.teacherNotes}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound("click");
                  speakText(PHRASE_OF_THE_DAY.english, { rate: 0.95 });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-black border border-blue-200 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen</span>
              </button>
              <button
                onClick={() => {
                  playSound("click");
                  speakText(PHRASE_OF_THE_DAY.english, { rate: 0.65 });
                }}
                className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-black border border-amber-200 cursor-pointer"
              >
                🐢 Slow
              </button>
            </div>

            <button
              onClick={() => onToggleFavorite(PHRASE_OF_THE_DAY.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                favorites.includes(PHRASE_OF_THE_DAY.id)
                  ? "bg-amber-100 text-amber-500"
                  : "bg-slate-100 text-slate-400 hover:text-amber-500"
              }`}
              title="Lưu câu hôm nay"
            >
              <Star
                className={`w-4 h-4 ${
                  favorites.includes(PHRASE_OF_THE_DAY.id) ? "fill-amber-400" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* 🎲 RANDOM PHRASE (Section XXII) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 uppercase tracking-wide">
                <Dice5 className="w-3.5 h-3.5 text-purple-600" />
                <span>🎲 RANDOM CLASSROOM PHRASE</span>
              </span>
              <span className="text-[11px] font-black text-slate-400 uppercase">
                {randomPhrase.categoryTitle}
              </span>
            </div>

            <div className="bg-gradient-to-br from-purple-50/60 to-indigo-50/40 p-5 rounded-2xl border border-purple-200/80 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 select-text">
                "{randomPhrase.english}"
              </h3>
              {randomPhrase.ipa && (
                <span className="text-xs font-mono text-purple-700 font-bold block select-text">
                  {randomPhrase.ipa}
                </span>
              )}
              <p className="text-base font-bold text-indigo-900 select-text">
                🇻🇳 {randomPhrase.vietnamese}
              </p>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <p>
                <strong className="text-slate-800">📌 Ngữ cảnh:</strong> {randomPhrase.context}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound("click");
                  speakText(randomPhrase.english, { rate: 0.95 });
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-black border border-purple-200 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen</span>
              </button>

              <button
                onClick={() => onToggleFavorite(randomPhrase.id)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  favorites.includes(randomPhrase.id)
                    ? "bg-amber-100 text-amber-500"
                    : "bg-slate-100 text-slate-400 hover:text-amber-500"
                }`}
                title="Lưu câu yêu thích"
              >
                <Star
                  className={`w-4 h-4 ${
                    favorites.includes(randomPhrase.id) ? "fill-amber-400" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => onOpenTranslateModal(randomPhrase)}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Tra nghĩa chi tiết
              </button>
            </div>

            <button
              onClick={handleNextRandomPhrase}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-[0_3px_0_0_#581C87] transition-all cursor-pointer active:scale-95"
            >
              <span>Next Phrase ➡️</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 10 Core Teaching Moment Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900">
              📂 Các Tình Huống Giảng Dạy Trong Lớp (10 Danh Mục)
            </h2>
            <p className="text-xs text-slate-500 font-bold">
              Nhấp vào bất kỳ danh mục nào để xem trọn bộ câu lệnh và nhận xét chuyên sâu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categoryCards.map((cat, i) => (
            <div
              key={i}
              onClick={() => {
                playSound("click");
                onSelectTab(cat.tab);
              }}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${cat.bgLight}`}
            >
              <div className="space-y-2">
                <span className="text-3xl block">{cat.icon}</span>
                <h3 className="font-display font-black text-base leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[11px] opacity-80 leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-3 mt-2 flex items-center justify-between text-xs font-black">
                <span>Khám phá</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ⭐ TOP 20 MUST-KNOW CLASSROOM PHRASES (Section XV) */}
      <div id="top-20-section" className="space-y-4 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200">
          <div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
              <span>⭐ TOP 20 MUST-KNOW CLASSROOM PHRASES</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold">
              20 câu khẩu lệnh cốt lõi giáo viên tiểu học dùng ngay trong mọi tiết học
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            20 / 20 Câu Cốt Lõi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {top20Phrases.map((phrase) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              isFavorite={favorites.includes(phrase.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenTranslateModal={onOpenTranslateModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
