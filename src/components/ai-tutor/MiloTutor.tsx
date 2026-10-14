import React, { useState, useRef, useEffect } from "react";
import { UserProgress, MiloChatMessage } from "../../types";
import { speakText, createSpeechRecognizer, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { addXpAndRecord } from "../../utils/storage";
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
} from "lucide-react";

interface MiloTutorProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const MiloTutor: React.FC<MiloTutorProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [messages, setMessages] = useState<MiloChatMessage[]>([
    {
      id: "milo-welcome",
      sender: "milo",
      text: `Hello ${progress.studentName}! I am Milo, your friendly English Buddy! 🐶✨ How can I help you today? We can chat, practice speaking, or learn new words!`,
      vietnameseHint: `Xin chào ${progress.studentName}! Tớ là Milo, bạn học tiếng Anh của cậu! Chúng mình có thể trò chuyện, luyện nói hoặc học từ mới nhé!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

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
          studentName: progress.studentName,
          grade: progress.grade,
          studentGrade: progress.grade,
          message: query,
          conversationHistory: history,
        }),
      });

      const data = await response.json();
      const miloReply: MiloChatMessage = {
        id: "milo-" + Date.now(),
        sender: "milo",
        text: data.reply || "That's great! Let's keep learning together! 🌟",
        vietnameseHint: data.vietnameseHint,
        suggestedFollowUps: data.suggestedFollowUps,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, miloReply]);
      playSound("star");
      speakText(miloReply.text, { rate: 0.95 });

      const { updatedProgress } = addXpAndRecord("speaking", 10, true);
      onUpdateProgress(updatedProgress);
    } catch (e) {
      console.error("Milo chat error:", e);
      const fallbackReply: MiloChatMessage = {
        id: "milo-" + Date.now(),
        sender: "milo",
        text: "I am right here with you! Could you ask that again or choose one of the fun topics below? 🐶✨",
        vietnameseHint: "Milo luôn ở đây cùng bạn! Bạn có thể hỏi lại hoặc chọn một chủ đề thú vị bên dưới nhé!",
        suggestedFollowUps: [
          "How to use 'am', 'is', 'are'? 📐",
          "Tell me a funny English joke! 🤣",
          "Practice school words 🎒",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    playSound("click");

    const recognizer = createSpeechRecognizer(
      (transcript, isFinal) => {
        setInputText(transcript);
        if (isFinal) {
          setIsRecording(false);
          handleSendMessage(transcript);
        }
      },
      (listening) => setIsRecording(listening),
      () => setIsRecording(false)
    );

    recognizer.start();
  };

  const defaultQuickPrompts = [
    "Tell me a funny English joke! 🤣",
    "How to use 'am', 'is', 'are'? 📐",
    "What is your favourite animal? 🐼",
    "How to say 'Xin chào' and 'Tạm biệt'? 👋",
    "Give me 3 words for Grade " + progress.grade + " 🎒",
  ];

  // Get follow ups from the last Milo message if available
  const lastMiloMsg = [...messages].reverse().find((m) => m.sender === "milo");
  const activeFollowUps = (lastMiloMsg?.suggestedFollowUps && lastMiloMsg.suggestedFollowUps.length > 0)
    ? lastMiloMsg.suggestedFollowUps
    : defaultQuickPrompts;

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-12">
      {/* Milo Header */}
      <div className="bg-white rounded-3xl p-5 border border-violet-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-violet-500/20">
            🐶
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg sm:text-xl text-slate-800">
                Milo – Your English Buddy
              </h1>
              <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Grade {progress.grade} AI Tutor • Encouraging & Patient
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound("click");
            setMessages([
              {
                id: "milo-reset",
                sender: "milo",
                text: `Let's start a fresh chat, ${progress.studentName}! What would you like to talk about?`,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ]);
          }}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
          title="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Arena */}
      <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 border border-slate-200 min-h-[420px] max-h-[500px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gradient-to-tr from-violet-600 to-indigo-500 text-white"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : "🐶"}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-3xl p-4 space-y-2 text-sm shadow-xs ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white font-medium rounded-tr-xs"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs"
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>

              {/* Vietnamese Hint if Milo */}
              {msg.vietnameseHint && (
                <div className="p-2 rounded-xl bg-violet-50 text-[11px] text-violet-900 border border-violet-100">
                  <span className="font-bold block mb-0.5">🇻🇳 Gợi ý tiếng Việt:</span>
                  <span>{msg.vietnameseHint}</span>
                </div>
              )}

              {/* Milo Audio Listen */}
              {msg.sender === "milo" && (
                <button
                  onClick={() => speakText(msg.text, { rate: 0.95 })}
                  className="flex items-center gap-1 text-[11px] font-bold text-violet-700 hover:text-violet-800"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen to Milo</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <span className="animate-spin">🐶</span>
            <span>Milo is thinking...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Follow up Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {activeFollowUps.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-800 text-xs font-bold border border-slate-200 whitespace-nowrap shadow-xs hover:border-violet-300 transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-3.5 rounded-2xl border transition-all ${
            isRecording
              ? "bg-rose-500 text-white animate-pulse border-rose-600 shadow-md"
              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
          }`}
          title="Speak to Milo"
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-violet-600" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Milo anything in English or Vietnamese..."
          className="flex-1 px-4 py-3.5 rounded-2xl bg-white border border-slate-200 font-bold text-sm text-slate-800 focus:outline-none focus:border-violet-500 shadow-xs"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white shadow-md transition-transform active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
