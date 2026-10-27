import React, { useState, useRef, useEffect } from "react";
import { UserProgress, MiloChatMessage, GradeLevel } from "../../types";
import { speakText, createSpeechRecognizer, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { addXpAndRecord } from "../../utils/storage";
import { matchMiloCurriculumKnowledge } from "../../data/miloKnowledgeBase";
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  RotateCcw,
  User,
  Heart,
  Zap,
  BookOpen,
  Clock,
  Compass,
  CheckCircle2,
  Copy,
  Check,
  Globe,
} from "lucide-react";

interface MiloTutorProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const MiloTutor: React.FC<MiloTutorProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(progress.grade || 3);
  const [messages, setMessages] = useState<MiloChatMessage[]>([
    {
      id: "milo-welcome",
      sender: "milo",
      text: `Hello ${progress.studentName || "Friend"}! I am Milo, your 24/7 English Buddy! 🐶✨\nAsk me anything about English: tenses (các thì), sentence patterns (mẫu câu), vocabulary (từ vựng), or grammar (ngữ pháp). I will answer instantly and accurately!`,
      vietnameseHint: `Xin chào ${progress.studentName || "Bạn"}! Tớ là Milo, gia sư tiếng Anh 24/7 của bạn! Cứ hỏi tớ bất cứ câu hỏi nào về các thì, mẫu câu, từ vựng hay ngữ pháp SGK Global Success nhé! Tớ sẽ trả lời siêu nhanh và chuẩn xác!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceLang, setVoiceLang] = useState<"vi-VN" | "en-US">("vi-VN");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategoryTab, setActiveCategoryTab] = useState<"tenses" | "patterns" | "vocab" | "grammar">("tenses");
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<any>(null);
  const latestTranscriptRef = useRef<string>("");

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    playSound("click");
    const userMsg: MiloChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === "milo" ? "model" : "user",
        text: m.text,
      }));

      const response = await fetch("/api/gemini/milo-tutor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: progress.studentName || "Friend",
          grade: selectedGrade,
          studentGrade: selectedGrade,
          message: query,
          conversationHistory: history,
        }),
      });

      if (!response.ok) {
        throw new Error(`Milo API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.reply) {
        throw new Error("Invalid response format");
      }

      const miloReply: MiloChatMessage = {
        id: "milo-" + Date.now(),
        sender: "milo",
        text: data.reply,
        vietnameseHint: data.vietnameseHint || "Milo luôn ở đây giải đáp mọi thắc mắc tiếng Anh cho bạn nhé!",
        suggestedFollowUps: data.suggestedFollowUps || [
          "Thì hiện tại đơn là gì? ⏳",
          "Mẫu câu hỏi sở thích lớp 3? 🎨",
          "Từ vựng chủ đề gia đình? 👨‍👩‍👧",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, miloReply]);
      playSound("star");

      const { updatedProgress } = addXpAndRecord("speaking", 10, true);
      onUpdateProgress(updatedProgress);
    } catch (e) {
      console.warn("Milo chat error, using local intelligent curriculum engine:", e);
      // Smart offline / fallback knowledge lookup
      const matched = matchMiloCurriculumKnowledge(query, selectedGrade);
      const fallbackReply: MiloChatMessage = {
        id: "milo-" + Date.now(),
        sender: "milo",
        text: matched
          ? `Hi ${progress.studentName || "Friend"}! 🐶✨ Here is everything you need to know about **${matched.topicTitle}**:\n\n${matched.reply}`
          : `Hello ${progress.studentName || "Friend"}! 🐶✨ Great question about "${query}"!\n\nIn Grade ${selectedGrade} English, always remember to use the right words and sentence structures. Practice reading out loud every day to speak naturally and confidently! 🌟`,
        vietnameseHint: matched
          ? matched.vietnameseHint
          : `Về câu hỏi "${query}", bạn hãy nắm vững từ vựng và mẫu câu tương ứng trong SGK Global Success Lớp ${selectedGrade} nhé!`,
        suggestedFollowUps: matched?.suggestedFollowUps || [
          "Thì hiện tại đơn là gì? ⏳",
          "Mẫu câu hỏi sở thích lớp 3? 🎨",
          "Từ vựng chủ đề gia đình? 👨‍👩‍👧",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
      playSound("star");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsRecording(false);
      const textToSend = (latestTranscriptRef.current || inputText).trim();
      if (textToSend) {
        handleSendMessage(textToSend);
      }
      return;
    }

    setIsRecording(true);
    playSound("click");
    latestTranscriptRef.current = "";

    const recognizer = createSpeechRecognizer(
      (transcript, isFinal) => {
        if (transcript) {
          setInputText(transcript);
          latestTranscriptRef.current = transcript;
        }
        if (isFinal && transcript.trim().length > 1) {
          setIsRecording(false);
          handleSendMessage(transcript);
        }
      },
      (listening) => setIsRecording(listening),
      () => setIsRecording(false),
      voiceLang
    );

    recognizerRef.current = recognizer;
    recognizer.start();
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playSound("click");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Structured Knowledge Topics for 1-click exploration
  const CURRICULUM_QUICK_TOPICS = {
    tenses: [
      { label: "⏳ Hiện tại đơn (Present Simple)", query: "Thì hiện tại đơn là gì và dùng như thế nào?" },
      { label: "⚡ Hiện tại tiếp diễn (Continuous)", query: "Thì hiện tại tiếp diễn là gì và dùng khi nào?" },
      { label: "🕰️ Quá khứ đơn (Past Simple)", query: "Thì quá khứ đơn là gì và các động từ bất quy tắc?" },
      { label: "🚀 Tương lai đơn (Future Simple)", query: "Thì tương lai đơn (will và be going to)?" },
    ],
    patterns: [
      { label: "👨‍👩‍👧 Mẫu câu My Family (Lớp 3)", query: "Mẫu câu hỏi về gia đình lớp 3 (Who's that, How old is your father)?" },
      { label: "🎨 Mẫu câu hỏi sở thích", query: "Mẫu câu hỏi sở thích tiếng Anh lớp 3 (What's your hobby)?" },
      { label: "⏰ Mẫu câu hỏi & nói giờ", query: "Cách hỏi và nói giờ trong tiếng Anh (What time is it)?" },
      { label: "🏷️ Mẫu câu hỏi giá tiền", query: "Cách hỏi giá tiền trong tiếng Anh (How much is it)?" },
      { label: "☀️ Mẫu câu hỏi thời tiết", query: "Mẫu câu hỏi thời tiết hôm nay (What's the weather like)?" },
      { label: "👷 Mẫu câu hỏi nghề nghiệp", query: "Mẫu câu hỏi nghề nghiệp của bố mẹ (What does your father do)?" },
    ],
    vocab: [
      { label: "👨‍👩‍👧‍👦 Từ vựng chủ đề gia đình", query: "Từ vựng chủ đề gia đình lớp 3 chuẩn SGK Global Success" },
      { label: "🎨 Từ vựng các màu sắc", query: "Từ vựng màu sắc tiếng Anh và cách hỏi màu (What color is it)?" },
      { label: "🔢 Số đếm từ 1 đến 100", query: "Bảng số đếm tiếng Anh từ 1 đến 100 và cách hỏi số lượng" },
      { label: "🐶 Từ vựng con vật & thú cưng", query: "Từ vựng các con vật tiếng Anh chuẩn tiểu học" },
      { label: "🎒 Từ vựng đồ dùng học tập", query: "Từ vựng đồ dùng học tập trường học lớp 3" },
      { label: "🍕 Từ vựng đồ ăn thức uống", query: "Từ vựng các món ăn và đồ uống tiếng Anh" },
      { label: "🧍 Bộ phận cơ thể", query: "Từ vựng bộ phận cơ thể tiếng Anh (My Body)" },
    ],
    grammar: [
      { label: "🗣️ Phát âm đuôi -ed chuẩn xác", query: "Quy tắc phát âm đuôi -ed chuẩn nhất (/t/, /d/, /ɪd/)" },
      { label: "🔊 Phát âm đuôi -s và -es", query: "Quy tắc phát âm đuôi -s và -es chuẩn xác nhất" },
      { label: "⚖️ Phân biệt Make và Do", query: "Khi nào dùng make và khi nào dùng do?" },
      { label: "👀 Phân biệt Look, See & Watch", query: "Phân biệt cách dùng của look, see và watch" },
      { label: "📍 Phân biệt IN - ON - AT", query: "Phân biệt in, on, at chỉ thời gian và nơi chốn" },
      { label: "💡 Cách dùng mạo từ A và AN", query: "Cách dùng mạo từ a và an chuẩn xác" },
      { label: "📐 Động từ To Be (am, is, are)", query: "Cách dùng động từ to be am, is, are" },
      { label: "🏊 Khả năng: Can và Can't", query: "Cách dùng động từ khiếm khuyết can và can't" },
    ],
  };

  // Get follow ups from the last Milo message if available
  const lastMiloMsg = [...messages].reverse().find((m) => m.sender === "milo");
  const activeFollowUps =
    lastMiloMsg?.suggestedFollowUps && lastMiloMsg.suggestedFollowUps.length > 0
      ? lastMiloMsg.suggestedFollowUps
      : [
          "Thì hiện tại đơn là gì? ⏳",
          "Mẫu câu hỏi sở thích lớp 3? 🎨",
          "Phân biệt in, on, at? 📍",
          "Từ vựng chủ đề gia đình? 👨‍👩‍👧",
        ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12">
      {/* Milo Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-violet-200 shadow-[0_4px_0_0_#DDD6FE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 text-white flex items-center justify-center text-3xl font-black shadow-md shadow-violet-500/25">
            🐶
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-black text-lg sm:text-xl text-slate-800">
                Milo AI Tutor 24/7 – Trợ Lý Tiếng Anh Toàn Diện
              </h1>
              <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ⚡ Phản hồi siêu tốc 24/7
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Giải đáp chuẩn xác 100% từ vựng, mẫu câu, các thì & ngữ pháp SGK Global Success Lớp 1-5
            </p>
          </div>
        </div>

        {/* Grade selector & reset */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
            <span className="text-xs font-black text-slate-600">Khối:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(Number(e.target.value) as GradeLevel)}
              className="bg-transparent font-black text-xs text-violet-700 focus:outline-none"
            >
              <option value={1}>Lớp 1</option>
              <option value={2}>Lớp 2</option>
              <option value={3}>Lớp 3 (Global Success)</option>
              <option value={4}>Lớp 4 (Global Success)</option>
              <option value={5}>Lớp 5 (Global Success)</option>
            </select>
          </div>

          <button
            onClick={() => {
              playSound("click");
              setMessages([
                {
                  id: "milo-reset",
                  sender: "milo",
                  text: `Fresh chat started for Grade ${selectedGrade}, ${progress.studentName}! What English knowledge can I help you master right now? 🐶✨`,
                  vietnameseHint: `Đã làm mới cuộc trò chuyện cho học sinh Lớp ${selectedGrade}! Bạn muốn Milo giải đáp kiến thức tiếng Anh nào ngay bây giờ?`,
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
            }}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Knowledge Explorer Bar (Instant 1-Click Learning) */}
      <div className="bg-gradient-to-r from-violet-50 via-indigo-50 to-purple-50 p-4 rounded-3xl border-2 border-violet-200 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-black text-violet-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-violet-600" />
            Khám phá kiến thức trọng tâm SGK (Nhấn để hỏi Milo ngay lập tức):
          </span>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-violet-200 text-xs font-black">
            <button
              onClick={() => setActiveCategoryTab("tenses")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeCategoryTab === "tenses"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-violet-700"
              }`}
            >
              ⏳ Các Thì
            </button>
            <button
              onClick={() => setActiveCategoryTab("patterns")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeCategoryTab === "patterns"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-violet-700"
              }`}
            >
              📐 Mẫu Câu
            </button>
            <button
              onClick={() => setActiveCategoryTab("vocab")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeCategoryTab === "vocab"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-violet-700"
              }`}
            >
              📚 Từ Vựng
            </button>
            <button
              onClick={() => setActiveCategoryTab("grammar")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeCategoryTab === "grammar"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-violet-700"
              }`}
            >
              ❓ Ngữ Pháp
            </button>
          </div>
        </div>

        {/* Quick Question Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CURRICULUM_QUICK_TOPICS[activeCategoryTab].map((topic, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(topic.query)}
              className="p-2.5 rounded-2xl bg-white hover:bg-violet-100/70 border border-violet-200 text-left text-xs font-bold text-violet-950 transition-all flex items-center justify-between shadow-xs hover:border-violet-400 group"
            >
              <span>{topic.label}</span>
              <Send className="w-3.5 h-3.5 text-violet-400 group-hover:text-violet-700 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Arena */}
      <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 border-2 border-slate-200 min-h-[460px] max-h-[580px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center text-base font-black shrink-0 shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gradient-to-tr from-violet-600 to-indigo-600 text-white"
              }`}
            >
              {msg.sender === "user" ? <User className="w-5 h-5" /> : "🐶"}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] rounded-3xl p-4 sm:p-5 space-y-3 shadow-xs ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white font-medium rounded-tr-xs"
                  : "bg-white text-slate-800 border-2 border-slate-200 rounded-tl-xs"
              }`}
            >
              {/* Formatted Message Text */}
              <div className="leading-relaxed whitespace-pre-wrap text-xs sm:text-sm">
                {msg.text}
              </div>

              {/* Vietnamese Hint if Milo */}
              {msg.vietnameseHint && (
                <div className="p-3 rounded-2xl bg-violet-50 text-xs text-violet-950 border border-violet-200 font-medium leading-relaxed">
                  <span className="font-black text-violet-800 flex items-center gap-1.5 mb-1">
                    🇻🇳 Hướng dẫn & Dịch nghĩa tiếng Việt:
                  </span>
                  <span>{msg.vietnameseHint}</span>
                </div>
              )}

              {/* Action Buttons for Milo message */}
              {msg.sender === "milo" && (
                <div className="flex items-center gap-2 pt-1 border-t border-slate-100 flex-wrap">
                  <button
                    onClick={() => speakText(msg.text, { rate: 0.95 })}
                    className="flex items-center gap-1 text-[11px] font-bold text-violet-700 hover:text-violet-800 bg-violet-50 px-2.5 py-1 rounded-xl border border-violet-200 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe Milo đọc</span>
                  </button>

                  <button
                    onClick={() => handleCopyMessage(msg.id, msg.text)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs font-bold text-violet-700 p-3 bg-violet-50 rounded-2xl border border-violet-200 w-fit animate-pulse">
            <span className="text-xl">🐶</span>
            <span>Milo đang tra cứu SGK và chuẩn bị câu trả lời siêu tốc...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Follow up Prompts */}
      <div className="space-y-1">
        <span className="text-[11px] font-black text-slate-500 uppercase tracking-wide">
          Gợi ý câu hỏi tiếp theo:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {activeFollowUps.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-900 text-xs font-bold border border-slate-200 whitespace-nowrap shadow-xs hover:border-violet-300 transition-all shrink-0"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        {/* Language Selector for Voice */}
        <button
          type="button"
          onClick={() => {
            playSound("click");
            setVoiceLang((prev) => (prev === "vi-VN" ? "en-US" : "vi-VN"));
          }}
          className="px-2.5 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-xs font-black text-slate-700 flex items-center gap-1 shadow-xs transition-all"
          title="Chuyển đổi ngôn ngữ giọng nói: Tiếng Việt / Tiếng Anh"
        >
          <span>{voiceLang === "vi-VN" ? "🇻🇳 VI" : "🇬🇧 EN"}</span>
        </button>

        {/* Mic Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-3.5 rounded-2xl border-2 transition-all ${
            isRecording
              ? "bg-rose-500 text-white animate-pulse border-rose-600 shadow-md"
              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
          }`}
          title={isRecording ? "Dừng nói và gửi" : `Nói với Milo bằng giọng nói (${voiceLang === "vi-VN" ? "Tiếng Việt" : "Tiếng Anh"})`}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-violet-600" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Hỏi Milo bất kỳ câu hỏi nào (${voiceLang === "vi-VN" ? "Nói/gõ Tiếng Việt hoặc Tiếng Anh" : "Speak/type in English"})...`}
          className="flex-1 px-4 py-3.5 rounded-2xl bg-white border-2 border-slate-200 font-bold text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-violet-500 shadow-xs"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-black shadow-[0_3px_0_0_#4C1D95] transition-transform active:scale-95 shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
