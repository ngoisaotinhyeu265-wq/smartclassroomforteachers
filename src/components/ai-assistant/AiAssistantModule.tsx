import React, { useState } from "react";
import { UserProgress, GradeLevel, AiAssistantResponse } from "../../types";
import { speakText, createSpeechRecognizer, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  Bot,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  BookOpen,
  HelpCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  ShieldCheck,
  RotateCcw,
  Clock,
  Layers,
  ArrowRight,
  Flame,
} from "lucide-react";

interface AiAssistantModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

const POPULAR_QUESTIONS = [
  { label: "Phân biệt look, see & watch", query: "Phân biệt cách dùng của look, see và watch trong tiếng Anh", category: "vocabulary" },
  { label: "Quy tắc phát âm đuôi -ed", query: "Quy tắc phát âm đuôi -ed chuẩn nhất (/t/, /d/, /ɪd/)", category: "phonics" },
  { label: "Hiện tại đơn vs Tiếp diễn", query: "Cách phân biệt thì Hiện tại đơn và Hiện tại tiếp diễn", category: "grammar" },
  { label: "Phân biệt many, much & a lot of", query: "Khi nào dùng many, much và a lot of?", category: "grammar" },
  { label: "Giới từ in, on, at chỉ thời gian", query: "Cách dùng giới từ in, on, at chỉ thời gian và nơi chốn", category: "grammar" },
  { label: "Quy tắc phát âm đuôi -s/es", query: "Quy tắc phát âm đuôi -s và -es chuẩn xác nhất", category: "phonics" },
  { label: "Cấu trúc 'How often...?'", query: "Cách đặt câu hỏi và trả lời với How often trong tiếng Anh", category: "sentence" },
  { label: "Phân biệt make & do", query: "Khi nào dùng make và khi nào dùng do?", category: "vocabulary" },
];

export const AiAssistantModule: React.FC<AiAssistantModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [query, setQuery] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(progress.grade || 3);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AiAssistantResponse | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{ q: string; ans: AiAssistantResponse }>>([]);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleAsk = async (questionToAsk?: string) => {
    const q = (questionToAsk || query).trim();
    if (!q || isLoading) return;

    playSound("click");
    setIsLoading(true);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);

    try {
      const res = await fetch("/api/gemini/ai-assistant-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          grade: selectedGrade,
          category: selectedCategory,
        }),
      });

      const data: AiAssistantResponse = await res.json();
      setResult(data);
      setHistory((prev) => [{ q, ans: data }, ...prev.filter((h) => h.q !== q).slice(0, 7)]);
      playSound("star");

      // Award XP
      const { updatedProgress } = addXpAndRecord("grammar", 15, true);
      onUpdateProgress(updatedProgress);

      if (data.speechText) {
        setTimeout(() => {
          speakText(data.speechText || "", { rate: 0.95 });
        }, 500);
      }
    } catch (e) {
      console.error("Assistant ask error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    playSound("click");
    setIsRecording(true);
    const recognizer = createSpeechRecognizer(
      (text, isFinal) => {
        setQuery(text);
        if (isFinal && text.trim().length > 3) {
          setIsRecording(false);
          handleAsk(text);
        }
      },
      (listening) => setIsRecording(listening),
      (err) => {
        setIsRecording(false);
      }
    );
    recognizer.start();
  };

  const handleSelectQuiz = (option: string) => {
    if (quizSubmitted) return;
    playSound("click");
    setQuizSelectedOption(option);
    setQuizSubmitted(true);

    if (result?.quickQuiz) {
      const isRight = option.startsWith(result.quickQuiz.correctAnswer) || option === result.quickQuiz.correctAnswer;
      if (isRight) {
        playSound("correct");
        fireConfetti();
        const { updatedProgress } = addXpAndRecord("grammar", 10, true);
        onUpdateProgress(updatedProgress);
      } else {
        playSound("wrong");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Copyright & Author Protection Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-md shadow-amber-400/20 shrink-0">
              🤖
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Trợ Lý Ảo AI Sư Phạm Tiếng Anh
                </h1>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Bản quyền: Thanh Nguyễn
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1">
                Giải đáp thắc mắc mọi câu hỏi về Từ vựng, Ngữ pháp, Phonics, Mẫu câu & Bài tập • Trả lời tức thì, chuẩn xác 100%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15 text-xs text-amber-300 font-semibold shrink-0">
            <span>🔒 Không được tự ý chỉnh sửa app</span>
          </div>
        </div>
      </div>

      {/* Main Search & Ask Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-4">
        {/* Filter Controls: Grade & Category */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Khối lớp:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(Number(e.target.value) as GradeLevel)}
              className="bg-blue-50 text-blue-900 font-extrabold px-3 py-1.5 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Khối 1 (Grade 1)</option>
              <option value={2}>Khối 2 (Grade 2)</option>
              <option value={3}>Khối 3 (Global Success)</option>
              <option value={4}>Khối 4 (Global Success)</option>
              <option value={5}>Khối 5 (Global Success)</option>
            </select>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {[
              { id: "all", label: "🌟 Tất cả" },
              { id: "grammar", label: "📐 Ngữ pháp" },
              { id: "vocabulary", label: "📖 Từ vựng" },
              { id: "phonics", label: "🔊 Phát âm" },
              { id: "sentence", label: "💬 Mẫu câu" },
              { id: "exercise", label: "📝 Giải bài tập" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Voice & Submit */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hỏi bất kỳ điều gì: 'Phân biệt must và have to', 'Cách dùng thì quá khứ đơn', 'Phát âm từ island'... "
            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-2xl pl-4 pr-28 py-3.5 text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {/* Microphone Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              title={isRecording ? "Dừng ghi âm" : "Nói câu hỏi bằng giọng nói"}
              className={`p-2.5 rounded-xl font-bold transition-all ${
                isRecording
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_3px_0_0_#1D4ED8] active:translate-y-0.5 transition-all"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Hỏi ngay</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Prompt Suggestions */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Câu hỏi phổ biến học sinh hay thắc mắc (Bấm vào để xem giải đáp nhanh):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_QUESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(item.query);
                  handleAsk(item.query);
                }}
                className="text-xs bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 font-semibold px-2.5 py-1 rounded-xl transition-all border border-slate-200/80 hover:border-blue-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-8 border-2 border-[#D1E0FB] shadow-md text-center space-y-4 animate-pulse">
          <div className="w-14 h-14 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-blue-600 text-2xl animate-spin">
            🤖
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-slate-800 text-lg">
              Trợ lý AI Thanh Nguyễn đang biên soạn giải đáp sư phạm...
            </h3>
            <p className="text-xs text-slate-500">
              Kiểm tra quy tắc chuẩn SGK, ví dụ song ngữ và câu hỏi kiểm tra nhanh!
            </p>
          </div>
        </div>
      )}

      {/* Answer Presentation Card */}
      {result && !isLoading && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-xl space-y-6 animate-fadeIn">
          {/* Header & Direct Answer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-blue-100 text-blue-800 text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Giải Đáp Nhanh & Trực Diện
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Lớp {selectedGrade} • Chuẩn SGK Bộ GD&ĐT
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-5">
              <p className="text-base sm:text-lg font-bold text-blue-950 leading-relaxed">
                {result.directAnswer}
              </p>
            </div>
          </div>

          {/* Formula or Core Rule (if available) */}
          {result.formula && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Công Thức / Quy Tắc Cốt Lõi Cần Nhớ:</span>
              </div>
              <div className="font-mono text-sm sm:text-base font-extrabold text-amber-950 bg-white px-3 py-2 rounded-xl border border-amber-300 inline-block">
                {result.formula}
              </div>
            </div>
          )}

          {/* Detailed Explanation */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Diễn Giải Chi Tiết Sư Phạm:
            </h4>
            <div className="text-sm text-slate-700 leading-relaxed space-y-2 bg-slate-50 rounded-2xl p-5 border border-slate-200">
              {result.detailedExplanation.split("\n").map((line, idx) => {
                if (!line.trim()) return null;
                return (
                  <p key={idx} className="font-medium">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Bilingual Examples */}
          {result.examples && result.examples.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Ví Dụ Thực Tế Trong Câu:
                </h4>
                {result.speechText && (
                  <button
                    onClick={() => speakText(result.speechText || "", { rate: 0.95 })}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-xl"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe phát âm chuẩn</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 shadow-xs space-y-1.5 group transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-extrabold text-blue-900 group-hover:text-blue-600 transition-colors">
                        “{ex.english}”
                      </p>
                      <button
                        onClick={() => speakText(ex.english, { rate: 0.95 })}
                        className="opacity-70 hover:opacity-100 text-blue-600 p-1 rounded-lg"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      👉 {ex.vietnamese}
                    </p>
                    {ex.note && (
                      <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {ex.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {result.commonMistakes && result.commonMistakes.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-rose-800 uppercase">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Lỗi Sai Học Sinh Hay Gặp & Cần Tránh:</span>
              </div>
              <ul className="space-y-1 text-xs text-rose-900 font-medium">
                {result.commonMistakes.map((err, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Quiz Check */}
          {result.quickQuiz && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Thử Tài Nhanh: Bạn Đã Hiểu Bài Chưa?
                </span>
                <span className="text-[11px] text-slate-400 font-bold">+10 XP</span>
              </div>

              <p className="text-sm font-bold text-slate-100">
                {result.quickQuiz.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {result.quickQuiz.options.map((opt, i) => {
                  const isSelected = quizSelectedOption === opt;
                  const isCorrect =
                    opt.startsWith(result.quickQuiz?.correctAnswer || "") ||
                    opt === result.quickQuiz?.correctAnswer;

                  let btnStyle = "bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-600 text-white border-emerald-400 font-bold";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-600 text-white border-rose-400 font-bold";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={quizSubmitted}
                      onClick={() => handleSelectQuiz(opt)}
                      className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-200 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="bg-slate-800/80 rounded-xl p-3 text-xs text-slate-200 space-y-1 border border-slate-700">
                  <p className="font-bold text-amber-300">
                    💡 Giải thích đáp án:
                  </p>
                  <p>{result.quickQuiz.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* History List */}
      {history.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#D1E0FB] space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Các Câu Hỏi Bạn Vừa Tra Cứu:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(h.q);
                  setResult(h.ans);
                  setQuizSelectedOption(null);
                  setQuizSubmitted(false);
                }}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold px-3 py-1.5 rounded-xl border border-blue-200 transition-all flex items-center gap-1.5"
              >
                <span>{h.q}</span>
                <ArrowRight className="w-3 h-3 text-blue-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
