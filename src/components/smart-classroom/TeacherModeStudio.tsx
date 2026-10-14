import React, { useState, useEffect, useRef } from "react";
import { TeacherCopilotResult } from "../../types/smartClassroom";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Star,
  Check,
  Send,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Maximize2,
  Minimize2,
  Info,
  Clock,
  ThumbsUp,
  Smile,
  Zap,
} from "lucide-react";

interface TeacherModeStudioProps {
  favorites: string[];
  onToggleFavorite: (phraseText: string) => void;
  onOpenSelectionTranslate?: (text: string) => void;
}

// Pre-compiled instant instant offline responses for instant 0ms responses
const PRESET_COPILOT_QUERIES: Record<string, TeacherCopilotResult> = {
  "các em lấy vở ra": {
    primaryEnglish: "Please take out your notebooks.",
    ipa: "/pliːz teɪk aʊt jɔːr ˈnəʊtbʊks/",
    vietnamese: "Các em lấy vở ra.",
    alternativePhrases: [
      { phrase: "Please get your notebooks out.", tone: "Thân thiện, tự nhiên", note: "Cách dùng thông dụng nhất trong lớp" },
      { phrase: "Take out your notebooks, please.", tone: "Lịch sự, trực tiếp", note: "Đặt please ở cuối tạo sự dứt khoát" },
      { phrase: "Notebooks out, everyone!", tone: "Nhanh gọn, năng lượng", note: "Phù hợp khi cần chuyển hoạt động nhanh" },
    ],
    keyWords: [
      { word: "take out", ipa: "/teɪk aʊt/", meaning: "lấy ra, rút ra (từ trong cặp hoặc ngăn bàn)" },
      { word: "notebook", ipa: "/ˈnəʊtbʊk/", meaning: "vở ghi chép học sinh" },
    ],
    teachingTip: "Cô giơ cao cuốn vở và làm động tác mở cặp để các em học sinh lớp 1-3 lập tức bắt chước theo phản xạ mà không cần giải thích bằng tiếng Việt.",
  },
  "lấy vở ra": {
    primaryEnglish: "Please take out your notebooks.",
    ipa: "/pliːz teɪk aʊt jɔːr ˈnəʊtbʊks/",
    vietnamese: "Lấy vở ra.",
    alternativePhrases: [
      { phrase: "Please get your notebooks out.", tone: "Thân thiện, tự nhiên" },
      { phrase: "Take out your notebooks, please.", tone: "Lịch sự, dứt khoát" },
      { phrase: "Notebooks out, everyone!", tone: "Nhanh gọn" },
    ],
    keyWords: [
      { word: "take out", ipa: "/teɪk aʊt/", meaning: "lấy ra" },
      { word: "notebook", ipa: "/ˈnəʊtbʊk/", meaning: "vở ghi" },
    ],
    teachingTip: "Giơ cuốn vở lên ngang ngực làm mẫu cho học sinh.",
  },
  "mở sách trang": {
    primaryEnglish: "Please open your books to page 15.",
    ipa: "/pliːz ˈəʊpən jɔː bʊks tuː peɪdʒ fɪfˈtiːn/",
    vietnamese: "Mở sách trang...",
    alternativePhrases: [
      { phrase: "Open your books to page 15, please.", tone: "Rõ ràng, dứt khoát" },
      { phrase: "Turn to page 15, everyone.", tone: "Tự nhiên, bản ngữ" },
      { phrase: "Let's open page 15.", tone: "Thân thiện, khích lệ" },
    ],
    keyWords: [
      { word: "open", ipa: "/ˈəʊpən/", meaning: "mở ra" },
      { word: "turn to", ipa: "/tɜːn tuː/", meaning: "lật sang, chuyển sang trang" },
      { word: "page", ipa: "/peɪdʒ/", meaning: "trang sách" },
    ],
    teachingTip: "Viết số trang to rõ ràng lên góc trên bảng để các em chưa kịp nghe nhìn số là lật được ngay.",
  },
  "nhìn lên bảng": {
    primaryEnglish: "Please look at the board.",
    ipa: "/pliːz lʊk æt ðə bɔːd/",
    vietnamese: "Nhìn lên bảng nào các em.",
    alternativePhrases: [
      { phrase: "Eyes on the board, please.", tone: "Thu hút tập trung cao" },
      { phrase: "Look up here, everyone.", tone: "Thân thiện, gần gũi" },
      { phrase: "All eyes up front!", tone: "Dứt khoát, sôi nổi" },
    ],
    keyWords: [
      { word: "look at", ipa: "/lʊk æt/", meaning: "nhìn vào, hướng mắt về" },
      { word: "board", ipa: "/bɔːd/", meaning: "bảng lớp" },
    ],
    teachingTip: "Chỉ tay rõ ràng vào điểm cô muốn học sinh tập trung trên bảng.",
  },
  "cả lớp trật tự": {
    primaryEnglish: "Quiet, please.",
    ipa: "/ˈkwaɪət pliːz/",
    vietnamese: "Cả lớp trật tự nào.",
    alternativePhrases: [
      { phrase: "Silence, please. Listen carefully.", tone: "Nghiêm túc, dứt khoát" },
      { phrase: "Zip your lips, lock the key!", tone: "Vui vẻ (Call & Response)", note: "Học sinh sẽ đáp: Mmm-mmm!" },
      { phrase: "Voices off, ears on!", tone: "Tự nhiên, giàu hình ảnh" },
    ],
    keyWords: [
      { word: "quiet", ipa: "/ˈkwaɪət/", meaning: "yên lặng, trật tự" },
      { word: "silence", ipa: "/ˈsaɪləns/", meaning: "sự im lặng" },
    ],
    teachingTip: "Đưa ngón trỏ lên môi làm cử chỉ 'Shh' nhẹ nhàng thay vì quát to.",
  },
  "làm việc theo cặp": {
    primaryEnglish: "Please work in pairs.",
    ipa: "/pliːz wɜːk ɪn peəz/",
    vietnamese: "Các em làm việc theo cặp với bạn bên cạnh nhé.",
    alternativePhrases: [
      { phrase: "Turn to your partner, please.", tone: "Thân thiện, cụ thể" },
      { phrase: "Practice with your seatmate.", tone: "Rõ ràng, dễ hiểu" },
      { phrase: "Two by two, let's talk together!", tone: "Vui tươi, khích lệ" },
    ],
    keyWords: [
      { word: "in pairs", ipa: "/ɪn peəz/", meaning: "theo cặp, từng nhóm 2 người" },
      { word: "partner", ipa: "/ˈpɑːtnə/", meaning: "bạn cặp cùng thực hành" },
    ],
    teachingTip: "Đưa 2 bàn tay hướng về nhau như đối thoại để diễn tả khái niệm 'in pairs'.",
  },
  "giơ tay phát biểu": {
    primaryEnglish: "Raise your hand, please.",
    ipa: "/reɪz jɔː hænd pliːz/",
    vietnamese: "Các em giơ tay phát biểu nhé.",
    alternativePhrases: [
      { phrase: "Hands up if you know the answer!", tone: "Hào hứng, sôi nổi" },
      { phrase: "Put your hand up, please.", tone: "Tự nhiên, nhẹ nhàng" },
      { phrase: "Raise your hand, don't shout out.", tone: "Nhắc nhở nề nếp" },
    ],
    keyWords: [
      { word: "raise your hand", ipa: "/reɪz jɔː hænd/", meaning: "giơ tay lên" },
      { word: "shout out", ipa: "/ʃaʊt aʊt/", meaning: "nói leo, hô to không xin phép" },
    ],
    teachingTip: "Cô giơ một tay lên cao làm mẫu và mỉm cười khuyến khích.",
  },
};

const QUICK_SITUATIONS = [
  { label: "Lấy vở ra", query: "Các em lấy vở ra." },
  { label: "Mở sách trang...", query: "Các em mở sách trang 15." },
  { label: "Nhìn lên bảng", query: "Cả lớp nhìn lên bảng." },
  { label: "Trật tự nào", query: "Cả lớp trật tự." },
  { label: "Làm việc theo cặp", query: "Các em làm việc theo cặp." },
  { label: "Giơ tay phát biểu", query: "Ai biết giơ tay phát biểu." },
  { label: "Đọc to theo cô", query: "Cả lớp đọc to theo cô." },
  { label: "Còn 1 phút nữa", query: "Các em còn một phút nữa để hoàn thành." },
  { label: "Cất sách vào cặp", query: "Các em cất sách vở vào cặp." },
  { label: "Khen ngợi học sinh", query: "Em làm rất tốt, cả lớp khen bạn nào." },
];

export const TeacherModeStudio: React.FC<TeacherModeStudioProps> = ({
  favorites,
  onToggleFavorite,
  onOpenSelectionTranslate,
}) => {
  const [inputText, setInputText] = useState<string>("Các em lấy vở ra.");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TeacherCopilotResult | null>(
    PRESET_COPILOT_QUERIES["các em lấy vở ra"]
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isLargeProjection, setIsLargeProjection] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([
    "Các em lấy vở ra.",
    "Cả lớp nhìn lên bảng.",
    "Làm việc theo cặp.",
  ]);

  // Speech recognition ref
  const recognitionRef = useRef<any>(null);

  // Setup Web Speech Recognition for Vietnamese Voice Input
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "vi-VN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSearchQuery(transcript);
        }
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleToggleRecord = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói tiếng Việt trực tiếp.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      playSound("click");
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  };

  const handleSearchQuery = async (queryToSearch?: string) => {
    const text = (queryToSearch !== undefined ? queryToSearch : inputText).trim();
    if (!text) return;

    playSound("click");
    // Add to recent queries
    setRecentQueries((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== text.toLowerCase());
      return [text, ...filtered].slice(0, 8);
    });

    // 1. Check local preset
    const normalized = text.toLowerCase().replace(/[.,?!]/g, "").trim();
    const matchedKey = Object.keys(PRESET_COPILOT_QUERIES).find(
      (k) => normalized.includes(k) || k.includes(normalized)
    );

    if (matchedKey) {
      setResult(PRESET_COPILOT_QUERIES[matchedKey]);
      return;
    }

    // 2. Call server-side Gemini Teacher Copilot endpoint
    setIsLoading(true);
    try {
      const res = await fetch("/api/smart-classroom/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vietnameseInput: text, grade: 3 }),
      });
      if (res.ok) {
        const data: TeacherCopilotResult = await res.json();
        setResult(data);
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      console.error("Copilot error:", err);
      // Fallback response
      setResult({
        primaryEnglish: "Please follow my instructions, class.",
        ipa: "/pliːz ˈfɒləʊ maɪ ɪnˈstrʌkʃənz klɑːs/",
        vietnamese: text,
        alternativePhrases: [
          { phrase: "Everyone, please look and listen.", tone: "Thân thiện" },
          { phrase: "Let's do this together, please.", tone: "Khích lệ" },
        ],
        keyWords: [{ word: "instructions", ipa: "/ɪnˈstrʌkʃənz/", meaning: "lời hướng dẫn" }],
        teachingTip: "Kết hợp chỉ tay hoặc làm mẫu hành động (TPR) để học sinh dễ hiểu ngay.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (phraseText: string, keyId: string) => {
    playSound("click");
    navigator.clipboard.writeText(phraseText);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-blue-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Chế độ Trợ Lý Lớp Học Trực Tiếp (Live Classroom Copilot)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Teacher Mode: Cần Nói Gì - Có Ngay Đó!
            </h1>
            <p className="text-blue-100 text-sm sm:text-base mt-1 max-w-2xl font-medium">
              Cô gõ hoặc nói tiếng Việt (ví dụ: <span className="text-amber-300 font-bold">"Các em lấy vở ra"</span>) → App lập tức đưa ra câu tiếng Anh chuẩn bản ngữ cùng các biến thể tự nhiên và mẹo sư phạm.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound("click");
                setIsLargeProjection(!isLargeProjection);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                isLargeProjection
                  ? "bg-amber-400 text-amber-950 border-amber-500 shadow-md"
                  : "bg-white/20 hover:bg-white/30 text-white border-white/30"
              }`}
            >
              {isLargeProjection ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Thu nhỏ</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span>Chế độ Chiếu Bảng</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Instant Input Form (Voice + Text) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-4">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
          Cô muốn nói gì với học sinh lúc này? (Nhập hoặc bấm Micro nói tiếng Việt):
        </label>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchQuery();
                }
              }}
              placeholder="Ví dụ: Các em lấy vở ra / Cả lớp nhìn lên bảng / Mở sách trang 20..."
              className="w-full px-4 py-3.5 pl-4 pr-12 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
            />
            {inputText && (
              <button
                onClick={() => setInputText("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title="Xóa chữ"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Input Button */}
            <button
              onClick={handleToggleRecord}
              title={isRecording ? "Đang lắng nghe cô nói..." : "Nói tiếng Việt để tra câu"}
              className={`p-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm border ${
                isRecording
                  ? "bg-red-600 text-white border-red-700 animate-pulse ring-4 ring-red-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-blue-600" />}
              <span className="text-xs sm:hidden">{isRecording ? "Đang nghe..." : "Giọng nói"}</span>
            </button>

            {/* Submit Button */}
            <button
              onClick={() => handleSearchQuery()}
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-[0_4px_0_0_#1D4ED8] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Chuyển Sang Tiếng Anh</span>
            </button>
          </div>
        </div>

        {/* Quick Click Situations */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>⚡ Tình huống cô thường gặp khi đứng lớp:</span>
            <span className="text-[11px] text-blue-600">Bấm để xem ngay</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {QUICK_SITUATIONS.map((sit, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(sit.query);
                  handleSearchQuery(sit.query);
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-all cursor-pointer hover:border-blue-400"
              >
                {sit.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Queries pills */}
        {recentQueries.length > 0 && (
          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 flex-wrap">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium">Vừa tìm:</span>
            {recentQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(q);
                  handleSearchQuery(q);
                }}
                className="text-slate-600 hover:text-blue-700 underline text-xs cursor-pointer font-medium"
              >
                "{q}"
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Output Classroom Result Card */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Main Primary English Card */}
          <div
            className={`rounded-3xl bg-gradient-to-b from-amber-50/80 to-white border-2 border-amber-300 shadow-md transition-all ${
              isLargeProjection ? "p-8 sm:p-12 text-center" : "p-6 sm:p-8"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider shadow-sm">
                  ⭐ Câu chuẩn bản ngữ
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Ý định của cô: <span className="text-slate-800 italic">"{result.vietnamese}"</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Normal Listen */}
                <button
                  onClick={() => {
                    playSound("click");
                    speakText(result.primaryEnglish, { rate: 0.95 });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  title="Phát âm tốc độ tự nhiên"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe (0.95x)</span>
                </button>

                {/* Slow Listen */}
                <button
                  onClick={() => {
                    playSound("click");
                    speakText(result.primaryEnglish, { rate: 0.65 });
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 border border-slate-200 transition-all cursor-pointer"
                  title="Phát âm chậm rãi để luyện theo"
                >
                  <span>🐢 Chậm</span>
                </button>

                {/* Copy */}
                <button
                  onClick={() => handleCopy(result.primaryEnglish, "primary")}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                  title="Sao chép câu"
                >
                  {copiedKey === "primary" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {/* Favorite */}
                <button
                  onClick={() => {
                    playSound("star");
                    onToggleFavorite(result.primaryEnglish);
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    favorites.some((f) => f.toLowerCase() === result.primaryEnglish.toLowerCase())
                      ? "bg-amber-100 border-amber-400 text-amber-600"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                  }`}
                  title="Lưu vào Favorites"
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* The Big Phrase Text (Selectable for floating translation) */}
            <div className="space-y-2">
              <h2
                className={`font-black text-slate-900 tracking-tight leading-snug select-text cursor-text ${
                  isLargeProjection
                    ? "text-3xl sm:text-5xl lg:text-6xl text-blue-900"
                    : "text-2xl sm:text-3xl lg:text-4xl"
                }`}
              >
                {result.primaryEnglish}
              </h2>

              {result.ipa && (
                <div className="font-mono text-sm sm:text-base text-blue-700 font-semibold select-text">
                  {result.ipa}
                </div>
              )}
            </div>

            {/* Highlight selection tip */}
            <div className="mt-4 p-3 rounded-2xl bg-blue-50/90 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Mẹo sư phạm tương tác: </span>
                Thầy/cô có thể dùng chuột bôi đen bất kỳ từ hoặc cụm từ nào ở trên (ví dụ bôi đen{" "}
                <span className="bg-amber-200 font-bold px-1 rounded">"take out"</span> hoặc{" "}
                <span className="bg-amber-200 font-bold px-1 rounded">"notebooks"</span>) để xem
                thanh công cụ tra nghĩa và phân tích sư phạm tức thì!
              </div>
            </div>
          </div>

          {/* Alternative Natural Ways to Say It (Section: Các cách nói tự nhiên tương đương) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-base">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3>Các cách nói tự nhiên tương đương (Natural Variations)</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Tùy tình huống và bầu không khí lớp học, cô có thể linh hoạt thay đổi cách diễn đạt dưới đây:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {result.alternativePhrases.map((alt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase">
                        {alt.tone || `Cách ${idx + 1}`}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            playSound("click");
                            speakText(alt.phrase, { rate: 0.95 });
                          }}
                          className="p-1.5 rounded-lg bg-white hover:bg-blue-100 text-blue-700 shadow-sm border border-slate-200 cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(alt.phrase, `alt-${idx}`)}
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 shadow-sm border border-slate-200 cursor-pointer"
                          title="Sao chép"
                        >
                          {copiedKey === `alt-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            playSound("star");
                            onToggleFavorite(alt.phrase);
                          }}
                          className={`p-1.5 rounded-lg shadow-sm border cursor-pointer ${
                            favorites.some((f) => f.toLowerCase() === alt.phrase.toLowerCase())
                              ? "bg-amber-100 border-amber-400 text-amber-600"
                              : "bg-white hover:bg-slate-100 text-slate-400 border-slate-200"
                          }`}
                          title="Lưu vào Favorites"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>

                    <p className="font-bold text-slate-900 text-sm leading-snug select-text">
                      {alt.phrase}
                    </p>
                  </div>

                  {alt.note && (
                    <p className="text-[11px] text-slate-500 italic">
                      💡 {alt.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Words Breakdown & Teaching Gesture Tip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Key Words */}
            {result.keyWords && result.keyWords.length > 0 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <h4>Từ vựng & Cụm từ trọng tâm (Key Words)</h4>
                </div>

                <div className="space-y-2.5">
                  {result.keyWords.map((kw, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-blue-800 text-sm select-text">
                            {kw.word}
                          </span>
                          {kw.ipa && (
                            <span className="text-xs font-mono text-slate-500 font-semibold">
                              {kw.ipa}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          {kw.meaning}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          playSound("click");
                          speakText(kw.word, { rate: 0.9 });
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 shadow-sm cursor-pointer shrink-0"
                        title="Nghe từ này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teaching Tip & Body Language */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-3xl p-5 sm:p-6 border border-emerald-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
                <Smile className="w-5 h-5 text-emerald-600" />
                <h4>Ngôn ngữ cơ thể & Mẹo sư phạm (Teacher Tips)</h4>
              </div>

              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                {result.teachingTip ||
                  "Kết hợp làm mẫu hành động (TPR) và giơ đồ dùng trực quan để học sinh tiểu học bắt chước ngay lập tức mà không cần dùng đến tiếng mẹ đẻ."}
              </p>

              <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Phương pháp phản xạ ngôn ngữ tự nhiên (TPR - Total Physical Response)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
