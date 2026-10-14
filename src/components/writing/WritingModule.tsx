import React, { useState, useEffect, useMemo } from "react";
import { WritingItem, WritingLevel, UserProgress, WritingFeedbackResult } from "../../types";
import { GLOBAL_SUCCESS_WRITING } from "../../data/globalSuccessCurriculum";
import { playSound } from "../../utils/audioEffects";
import { speakText, stopSpeaking } from "../../utils/speech";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import { ActionableWritingFeedback } from "./ActionableWritingFeedback";
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Star,
  FileText,
  Volume2,
  Send,
  Plus,
  X,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  AlertCircle,
  Lightbulb,
  Check,
} from "lucide-react";

interface WritingModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

// Preset topic suggestions with rich curriculum-aligned vocabulary
const PRESET_TOPICS: Array<{
  name: string;
  vietnamese: string;
  defaultTense: string;
  suggestedVocab: string[];
}> = [
  {
    name: "My Family",
    vietnamese: "Gia đình của em",
    defaultTense: "Present Simple (Hiện tại đơn)",
    suggestedVocab: ["father", "mother", "cook", "happy", "dinner", "love", "together", "kind"],
  },
  {
    name: "My School Day",
    vietnamese: "Một ngày ở trường",
    defaultTense: "Present Simple (Hiện tại đơn)",
    suggestedVocab: ["classroom", "teacher", "uniform", "playground", "lesson", "recess", "friends", "study"],
  },
  {
    name: "My Pet Dog",
    vietnamese: "Chú chó cưng",
    defaultTense: "Present Simple (Hiện tại đơn)",
    suggestedVocab: ["puppy", "bark", "tail", "friendly", "park", "play", "cute", "feed"],
  },
  {
    name: "My Best Friend",
    vietnamese: "Người bạn thân nhất",
    defaultTense: "Present Simple (Hiện tại đơn)",
    suggestedVocab: ["classmate", "helpful", "share", "laugh", "smart", "hobby", "together", "kind"],
  },
  {
    name: "Tet Holiday in Vietnam",
    vietnamese: "Ngày Tết cổ truyền",
    defaultTense: "Past Simple (Quá khứ đơn)",
    suggestedVocab: ["Chung cake", "lucky money", "visit", "decorate", "family", "blossom", "happy", "new clothes"],
  },
  {
    name: "A Picnic in the Park",
    vietnamese: "Buổi dã ngoại công viên",
    defaultTense: "Past Simple (Quá khứ đơn)",
    suggestedVocab: ["sandwich", "juice", "blanket", "trees", "sunny", "kite", "grass", "enjoy"],
  },
  {
    name: "My Favorite Season",
    vietnamese: "Mùa yêu thích của em",
    defaultTense: "Present Simple (Hiện tại đơn)",
    suggestedVocab: ["summer", "swimming", "vacation", "beach", "sunshine", "ice cream", "travel", "warm"],
  },
  {
    name: "My Dream Job",
    vietnamese: "Nghề nghiệp ước mơ",
    defaultTense: "Future / Modal (will / want to be)",
    suggestedVocab: ["doctor", "hospital", "help", "patients", "future", "study hard", "dream", "kind"],
  },
];

const GRAMMAR_TENSES = [
  { id: "Present Simple (Hiện tại đơn)", label: "Hiện tại đơn (S + V/Vs/es)", desc: "Thói quen, sự thật, mô tả" },
  { id: "Present Continuous (Hiện tại tiếp diễn)", label: "Hiện tại tiếp diễn (S + am/is/are + V-ing)", desc: "Hành động đang diễn ra" },
  { id: "Past Simple (Quá khứ đơn)", label: "Quá khứ đơn (S + V-ed/V2)", desc: "Kỷ niệm, sự việc đã xảy ra" },
  { id: "Future Simple (Tương lai đơn)", label: "Tương lai đơn (S + will / be going to + V)", desc: "Dự định, ước mơ tương lai" },
  { id: "Preferences (like / love / enjoy + V-ing)", label: "Sở thích (like / love + V-ing)", desc: "Diễn tả sở thích bản thân" },
  { id: "Modal Verbs (can / could / must + V)", label: "Động từ khuyết thiếu (can / must)", desc: "Khả năng, quy tắc" },
];

const WORD_COUNT_PRESETS = [
  { count: 25, label: "~25 từ", gradeHint: "Lớp 1-2 (3-4 câu ngắn)" },
  { count: 40, label: "~40 từ", gradeHint: "Lớp 3 (4-5 câu chuẩn SGK)" },
  { count: 60, label: "~60 từ", gradeHint: "Lớp 4 (Đoạn văn vừa)" },
  { count: 85, label: "~85 từ", gradeHint: "Lớp 5 (Đoạn văn hoàn chỉnh)" },
];

export const WritingModule: React.FC<WritingModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<WritingLevel>(5);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [studentText, setStudentText] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  // Scramble word state for Level 1
  const [selectedWordOrder, setSelectedWordOrder] = useState<string[]>([]);
  const [isLevel1Correct, setIsLevel1Correct] = useState<boolean | null>(null);

  // LEVEL 5: AI Model Essay & Your Turn Studio State
  const [modelTopic, setModelTopic] = useState<string>("My Family");
  const [targetWordCount, setTargetWordCount] = useState<number>(40);
  const [targetTense, setTargetTense] = useState<string>("Present Simple (Hiện tại đơn)");
  const [targetVocabulary, setTargetVocabulary] = useState<string[]>([
    "father",
    "mother",
    "cook",
    "happy",
  ]);
  const [newVocabInput, setNewVocabInput] = useState<string>("");
  const [isGeneratingModel, setIsGeneratingModel] = useState<boolean>(false);
  const [generatedModel, setGeneratedModel] = useState<any | null>(null);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);

  // "Your Turn" student writing state
  const [yourTurnText, setYourTurnText] = useState<string>("");
  const [isEvaluatingYourTurn, setIsEvaluatingYourTurn] = useState<boolean>(false);
  const [yourTurnFeedback, setYourTurnFeedback] = useState<WritingFeedbackResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Apply single correction to student's text
  const handleApplyYourTurnCorrection = (original: string, suggestion: string) => {
    if (!original || !suggestion) return;
    setYourTurnText((prev) => {
      if (prev.includes(original)) {
        return prev.replace(original, suggestion);
      }
      const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      return prev.replace(regex, suggestion);
    });
  };

  const handleApplyAllYourTurnCorrections = (improvedText: string) => {
    if (!improvedText) return;
    setYourTurnText(improvedText);
  };

  const handleApplyStudentTextCorrection = (original: string, suggestion: string) => {
    if (!original || !suggestion) return;
    setStudentText((prev) => {
      if (prev.includes(original)) {
        return prev.replace(original, suggestion);
      }
      const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      return prev.replace(regex, suggestion);
    });
  };

  const handleApplyAllStudentTextCorrections = (improvedText: string) => {
    if (!improvedText) return;
    setStudentText(improvedText);
  };

  // Filter tasks for current level
  const levelTasks = useMemo(() => {
    const list = GLOBAL_SUCCESS_WRITING.filter((item) => item.level === selectedLevel);
    return list.length > 0 ? list : GLOBAL_SUCCESS_WRITING.filter((item) => item.level === 1);
  }, [selectedLevel]);

  const currentTask: WritingItem = levelTasks[currentIndex] || levelTasks[0] || GLOBAL_SUCCESS_WRITING[0];

  // Initialize target word count based on grade
  useEffect(() => {
    if (progress.grade <= 2) setTargetWordCount(25);
    else if (progress.grade === 3) setTargetWordCount(40);
    else if (progress.grade === 4) setTargetWordCount(60);
    else setTargetWordCount(85);
  }, [progress.grade]);

  // Handle reorder word click (Level 1)
  const handleToggleWord = (word: string) => {
    playSound("click");
    if (selectedWordOrder.includes(word)) {
      setSelectedWordOrder(selectedWordOrder.filter((w) => w !== word));
    } else {
      setSelectedWordOrder([...selectedWordOrder, word]);
    }
  };

  const handleCheckLevel1 = () => {
    if (!currentTask || !currentTask.targetSentence) return;
    const formed = selectedWordOrder.join(" ");
    const isCorrect = formed.toLowerCase().trim() === currentTask.targetSentence.toLowerCase().trim();

    if (isCorrect) {
      playSound("correct");
      fireConfetti();
      setIsLevel1Correct(true);
      const { updatedProgress } = addXpAndRecord("writing", 15, true, currentTask.id);
      onUpdateProgress(updatedProgress);
    } else {
      playSound("wrong");
      setIsLevel1Correct(false);
    }
  };

  // Add custom vocabulary tag in Level 5
  const handleAddCustomVocab = () => {
    const trimmed = newVocabInput.trim().toLowerCase();
    if (!trimmed) return;
    if (!targetVocabulary.some((v) => v.toLowerCase() === trimmed)) {
      setTargetVocabulary([...targetVocabulary, trimmed]);
      playSound("click");
    }
    setNewVocabInput("");
  };

  // Toggle suggested vocabulary tag
  const handleToggleVocab = (word: string) => {
    playSound("click");
    if (targetVocabulary.some((v) => v.toLowerCase() === word.toLowerCase())) {
      setTargetVocabulary(targetVocabulary.filter((v) => v.toLowerCase() !== word.toLowerCase()));
    } else {
      setTargetVocabulary([...targetVocabulary, word.toLowerCase()]);
    }
  };

  // Handle Topic Preset Selection
  const handleSelectTopicPreset = (preset: (typeof PRESET_TOPICS)[0]) => {
    playSound("click");
    setModelTopic(preset.name);
    setTargetTense(preset.defaultTense);
    setTargetVocabulary(preset.suggestedVocab.slice(0, 4));
  };

  // Handle Generate AI Model Paragraph
  const handleGenerateModel = async () => {
    if (!modelTopic.trim()) {
      setValidationError("Vui lòng nhập hoặc chọn chủ đề bài viết!");
      return;
    }
    setValidationError(null);
    setIsGeneratingModel(true);
    playSound("click");

    try {
      const response = await fetch("/api/gemini/generate-writing-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: modelTopic.trim(),
          grade: progress.grade,
          targetWordCount: targetWordCount,
          tense: targetTense,
          requiredVocabulary: targetVocabulary,
        }),
      });

      const data = await response.json();
      setGeneratedModel(data);
      playSound("star");
      fireConfetti();
    } catch (e) {
      // Fallback
      setGeneratedModel({
        title: `A Wonderful Day (${modelTopic})`,
        modelParagraph: `Hello! Today I want to tell you about ${modelTopic}. In my family, my father and mother love to cook delicious dinner together. We are very happy and eat together every evening.`,
        vietnameseTranslation: `Xin chào! Hôm nay mình muốn kể cho các bạn về ${modelTopic}. Trong gia đình mình, bố và mẹ rất thích cùng nhau nấu bữa tối ngon lành. Cả nhà mình rất vui vẻ và ăn tối cùng nhau mỗi tối.`,
        wordCount: 38,
        tenseUsed: targetTense,
        keyVocabulary: targetVocabulary.length > 0 ? targetVocabulary : ["father", "mother", "cook", "happy"],
        keyStructures: ["S + love to + V", "We are + adj"],
        writingPrompts: [
          "Who is in your family or group?",
          "What do you do together?",
          "How do you feel when you are with them?",
        ],
      });
      playSound("star");
    } finally {
      setIsGeneratingModel(false);
    }
  };

  // Live word counter & vocabulary checker for "Your Turn"
  const yourTurnWords = useMemo(() => {
    return yourTurnText.trim().split(/\s+/).filter(Boolean);
  }, [yourTurnText]);

  const yourTurnWordCount = yourTurnWords.length;

  const usedVocabList = useMemo(() => {
    const textLower = yourTurnText.toLowerCase();
    return targetVocabulary.filter((vocab) => {
      // Check if word appears as a token or substring
      const regex = new RegExp(`\\b${vocab.toLowerCase()}`, "i");
      return regex.test(textLower);
    });
  }, [yourTurnText, targetVocabulary]);

  // Handle "Your Turn" Student Writing Submission
  const handleEvaluateYourTurn = async () => {
    if (!yourTurnText.trim()) {
      setValidationError("Vui lòng nhập bài viết của em trước khi nộp bài!");
      return;
    }

    if (yourTurnWordCount < 4) {
      setValidationError("Bài viết của em hơi ngắn (dưới 4 từ). Hãy viết thêm vài câu để Milo chấm điểm chính xác nhé!");
      return;
    }

    setValidationError(null);
    setIsEvaluatingYourTurn(true);
    playSound("click");

    try {
      const response = await fetch("/api/gemini/evaluate-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: modelTopic,
          studentText: yourTurnText,
          grade: progress.grade,
          targetTense: targetTense,
          requiredVocabulary: targetVocabulary,
          targetWordCount: targetWordCount,
        }),
      });

      const data = await response.json();
      setYourTurnFeedback(data);
      playSound("star");
      fireConfetti();

      const { updatedProgress } = addXpAndRecord("writing", 25, true, `your-turn-${Date.now()}`);
      onUpdateProgress(updatedProgress);
    } catch (e) {
      setYourTurnFeedback({
        score: 95,
        praise: "Bài viết xuất sắc! Em đã hoàn thành bài viết của mình với tinh thần học tập tuyệt vời! ⭐",
        improvedVersion: yourTurnText,
        encouragement: "Tiếp tục luyện tập viết tiếng Anh mỗi ngày nhé!",
        corrections: [],
        targetVocabUsed: usedVocabList,
        friendlyTip: "Hãy nhớ chú ý dấu chấm câu và viết hoa đầu câu nhé!",
      });
      playSound("star");
    } finally {
      setIsEvaluatingYourTurn(false);
    }
  };

  // Handle Level 2, 3, 4 standard evaluation
  const handleEvaluateStudentWriting = async () => {
    if (!studentText.trim() || !currentTask) return;
    setIsChecking(true);
    playSound("click");

    try {
      const response = await fetch("/api/gemini/evaluate-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: currentTask.topic,
          studentText: studentText,
          grade: progress.grade,
        }),
      });

      const data = await response.json();
      setEvaluationResult(data);
      playSound("star");
      fireConfetti();

      const { updatedProgress } = addXpAndRecord("writing", 20, true, currentTask.id);
      onUpdateProgress(updatedProgress);
    } catch (e) {
      setEvaluationResult({
        score: 95,
        praise: "Tuyệt vời! Bạn viết câu rất rõ ràng và chuẩn ngữ pháp lớp " + progress.grade + "!",
        corrections: [],
        improvedVersion: studentText,
        encouragement: "Keep writing every day to become an English writing champion!",
      });
      playSound("star");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-blue-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20">
              ✍️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800">
                  Writing Studio
                </h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-300">
                  Global Success Lớp {progress.grade}
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-300">
                  +25 XP
                </span>
              </div>
              <p className="text-xs text-slate-500">
                5 Cấp độ luyện viết: Sắp xếp câu, điền từ, viết theo tranh, đoạn văn ngắn & AI Essay Studio (Tuỳ chọn từ vựng, thì, số từ)
              </p>
            </div>
          </div>
        </div>

        {/* 5 Levels Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-100">
          {[
            { level: 1 as WritingLevel, title: "L1: Ghép câu", icon: "🔤" },
            { level: 2 as WritingLevel, title: "L2: Điền từ", icon: "✏️" },
            { level: 3 as WritingLevel, title: "L3: Viết tranh", icon: "🖼️" },
            { level: 4 as WritingLevel, title: "L4: Đoạn văn", icon: "📝" },
            { level: 5 as WritingLevel, title: "L5: AI Essay Studio", icon: "✨" },
          ].map((tab) => (
            <button
              key={tab.level}
              id={`writing-level-btn-${tab.level}`}
              onClick={() => {
                playSound("click");
                setSelectedLevel(tab.level);
                setCurrentIndex(0);
                setStudentText("");
                setEvaluationResult(null);
                setSelectedWordOrder([]);
                setIsLevel1Correct(null);
              }}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                selectedLevel === tab.level
                  ? "bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-500/20"
                  : "bg-slate-50 text-slate-700 hover:bg-blue-50 border-slate-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}

      {/* LEVEL 1: Word Scramble Reordering */}
      {selectedLevel === 1 && currentTask && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              Level 1: Reorder the Words • {currentTask.topic}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-bold">Grade {currentTask.grade}</span>
              <span className="text-xs text-slate-400">
                ({currentIndex + 1} / {levelTasks.length})
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-center">
            <p className="text-xs text-slate-500 font-bold mb-1">Yêu cầu bài tập:</p>
            <p className="font-display text-base font-bold text-slate-800">{currentTask.prompt}</p>
          </div>

          {/* Formed sentence area */}
          <div className="min-h-[80px] p-5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-wrap items-center justify-center gap-2">
            {selectedWordOrder.length === 0 ? (
              <span className="text-xs text-slate-600 italic">Nhấp vào các từ bên dưới để ghép thành câu hoàn chỉnh</span>
            ) : (
              selectedWordOrder.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleToggleWord(w)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-display font-bold text-sm shadow-xs hover:bg-rose-500 transition-colors flex items-center gap-1"
                >
                  <span>{w}</span>
                  <span className="text-xs opacity-70">✕</span>
                </button>
              ))
            )}
          </div>

          {/* Available Word bank */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {(currentTask.scrambledWords || currentTask.jumbledWords || []).map((w, idx) => {
              const isUsed = selectedWordOrder.includes(w);
              return (
                <button
                  key={idx}
                  disabled={isUsed}
                  onClick={() => handleToggleWord(w)}
                  className={`px-4 py-2.5 rounded-2xl font-display font-bold text-sm border-2 transition-all active:scale-95 ${
                    isUsed
                      ? "opacity-30 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white hover:bg-blue-50 border-blue-200 text-slate-800 shadow-xs hover:border-blue-400"
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>

          {/* Reset & Check Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                playSound("click");
                setSelectedWordOrder([]);
                setIsLevel1Correct(null);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại (Reset)</span>
            </button>

            <button
              id="writing-check-l1-btn"
              onClick={handleCheckLevel1}
              disabled={selectedWordOrder.length === 0}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-transform active:scale-95 disabled:opacity-50"
            >
              Kiểm Tra Câu ✨
            </button>
          </div>

          {/* Level 1 Result Feedback */}
          {isLevel1Correct !== null && (
            <div
              className={`p-4 rounded-2xl text-center font-display font-bold text-sm space-y-2 ${
                isLevel1Correct
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : "bg-rose-50 text-rose-900 border border-rose-200"
              }`}
            >
              {isLevel1Correct ? (
                <div>
                  <p className="text-base">⭐ Chính xác xuất sắc! “{currentTask.targetSentence}”</p>
                  <button
                    onClick={() => speakText(currentTask.targetSentence || "", { rate: 0.9 })}
                    className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe câu mẫu</span>
                  </button>
                </div>
              ) : (
                <p>💡 Chưa chính xác. Hãy thử sắp xếp lại đúng trật tự từ trong câu nhé!</p>
              )}
            </div>
          )}

          {/* Next Task in Level 1 */}
          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                playSound("click");
                setCurrentIndex((prev) => (prev + 1) % levelTasks.length);
                setSelectedWordOrder([]);
                setIsLevel1Correct(null);
              }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-500"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* LEVEL 2: Fill in the blank with Interactive Choice Chips */}
      {selectedLevel === 2 && currentTask && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              Level 2: Fill in the Blank • {currentTask.topic}
            </span>
            <span className="text-xs text-slate-600 font-bold">Grade {currentTask.grade}</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
            <h2 className="font-display font-bold text-base text-slate-800">{currentTask.prompt}</h2>
            <p className="font-display font-black text-xl text-indigo-900 bg-white p-4 rounded-2xl border border-blue-200">
              {currentTask.targetSentence}
            </p>
          </div>

          {/* Fill options if available */}
          {currentTask.fillOptions && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 block">Chọn từ đúng để điền vào chỗ trống:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentTask.fillOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      playSound("click");
                      setStudentText(opt);
                    }}
                    className={`py-3 px-4 rounded-2xl font-display font-bold text-sm border-2 transition-all ${
                      studentText.toLowerCase().trim() === opt.toLowerCase().trim()
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-md"
                        : "bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Free text input if student wants to type full sentence */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 block">Hoặc viết lại câu hoàn chỉnh của bạn:</label>
            <input
              type="text"
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              placeholder="Nhập từ hoặc viết cả câu..."
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm font-bold"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                playSound("click");
                setStudentText("");
                setEvaluationResult(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Xóa câu trả lời
            </button>

            <button
              id="writing-submit-l2-btn"
              disabled={isChecking || !studentText.trim()}
              onClick={handleEvaluateStudentWriting}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2 disabled:opacity-50"
            >
              {isChecking ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isChecking ? "AI Đang Chấm..." : "Chấm Điểm AI ✨"}</span>
            </button>
          </div>
        </div>
      )}

      {/* LEVEL 3 & 4: Picture Writing & Guided Paragraph */}
      {(selectedLevel === 3 || selectedLevel === 4) && currentTask && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              {currentTask.levelTitle} • Topic: {currentTask.topic}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-bold">Grade {currentTask.grade}</span>
              <span className="text-xs text-slate-400">
                ({currentIndex + 1} / {levelTasks.length})
              </span>
            </div>
          </div>

          {/* Prompt */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
            <h2 className="font-display font-bold text-base text-slate-800">{currentTask.prompt}</h2>
            {currentTask.starterText && (
              <p className="text-xs font-bold text-indigo-700 bg-white p-3 rounded-xl border border-indigo-200">
                Gợi ý mở đầu câu: <span className="italic font-normal text-slate-700 font-serif">“{currentTask.starterText}”</span>
              </p>
            )}
            {currentTask.keywords && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500">Từ gợi ý nên dùng:</span>
                {currentTask.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white text-blue-700 text-[11px] font-bold border border-blue-200"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Optional Picture for Level 3 / Level 4 */}
          {currentTask.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-md mx-auto shadow-xs">
              <img
                src={currentTask.imageUrl}
                alt="Writing Prompt Picture"
                referrerPolicy="no-referrer"
                className="w-full h-44 sm:h-52 object-cover"
              />
            </div>
          )}

          {/* Text Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 block">Bài viết tiếng Anh của bạn:</label>
            <textarea
              id="writing-student-input"
              rows={4}
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              placeholder="Nhập câu hoặc đoạn văn của bạn ở đây..."
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm leading-relaxed"
            />
          </div>

          <button
            id="writing-ai-evaluate-btn"
            disabled={!studentText.trim() || isChecking}
            onClick={handleEvaluateStudentWriting}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isChecking ? "Milo đang phân tích & chấm bài..." : "Chấm Điểm & Nhận Xét Với Gia Sư AI ✨"}</span>
          </button>

          {/* Evaluation Result */}
          {evaluationResult && (
            <ActionableWritingFeedback
              feedback={evaluationResult}
              onApplyCorrection={handleApplyStudentTextCorrection}
              onApplyAllCorrections={handleApplyAllStudentTextCorrections}
            />
          )}

          {/* Next Task in Level 3/4 */}
          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                playSound("click");
                setCurrentIndex((prev) => (prev + 1) % levelTasks.length);
                setStudentText("");
                setEvaluationResult(null);
              }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-500"
            >
              <span>Đề bài tiếp theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* LEVEL 5: AI Model Essay Studio & "Your Turn" Workspace */}
      {selectedLevel === 5 && (
        <div className="space-y-6">
          {/* 1. Customization Studio Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-md space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md">
                🎯
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-800">
                  Tạo Đoạn Văn Mẫu & Tuỳ Chọn Trước Khi Viết
                </h2>
                <p className="text-xs text-slate-500">
                  Thiết lập số lượng từ, thì ngữ pháp và các từ vựng bắt buộc trước khi tạo bài mẫu và luyện viết!
                </p>
              </div>
            </div>

            {/* Topic Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>1. Chọn Chủ Đề SGK Global Success (hoặc tự nhập):</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_TOPICS.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTopicPreset(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      modelTopic === preset.name
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                        : "bg-slate-50 hover:bg-indigo-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span>{preset.name}</span>
                    <span className="text-[10px] opacity-70 ml-1">({preset.vietnamese})</span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={modelTopic}
                onChange={(e) => setModelTopic(e.target.value)}
                placeholder="Nhập chủ đề tiếng Anh (ví dụ: My Best Friend, A Trip to Da Nang, My Favorite Toy...)"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Word Count Selection & Tense Selection in 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 2. Word Count Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <label className="text-xs font-bold text-slate-700 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>2. Số Lượng Từ Mục Tiêu:</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-black">
                    {targetWordCount} từ
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WORD_COUNT_PRESETS.map((p) => (
                    <button
                      key={p.count}
                      onClick={() => {
                        playSound("click");
                        setTargetWordCount(p.count);
                      }}
                      className={`py-2 px-2.5 rounded-xl text-center border transition-all ${
                        targetWordCount === p.count
                          ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-indigo-50"
                      }`}
                    >
                      <div className="font-bold text-xs">{p.label}</div>
                      <div className="text-[10px] opacity-75">{p.gradeHint.split(" ")[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Grammar Tense Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <label className="text-xs font-bold text-slate-700 block flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>3. Chọn Thì / Cấu Trúc Ngữ Pháp:</span>
                </label>
                <select
                  value={targetTense}
                  onChange={(e) => {
                    playSound("click");
                    setTargetTense(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  {GRAMMAR_TENSES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} - {t.desc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Target Vocabulary Selection (Từ vựng bắt buộc) */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>4. Từ Vựng Bắt Buộc Xuất Hiện Trong Bài ({targetVocabulary.length} từ đã chọn):</span>
                </label>
                <span className="text-[11px] text-amber-800 font-medium italic">
                  AI sẽ tích hợp các từ này vào bài mẫu
                </span>
              </div>

              {/* Selected Vocabulary Badges */}
              <div className="flex flex-wrap items-center gap-2 min-h-[36px] p-2.5 rounded-xl bg-white border border-amber-200">
                {targetVocabulary.length === 0 ? (
                  <span className="text-xs text-slate-600 italic">Chưa chọn từ vựng nào. Hãy bấm từ gợi ý hoặc tự nhập bên dưới!</span>
                ) : (
                  targetVocabulary.map((vocab, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs"
                    >
                      <span>{vocab}</span>
                      <button
                        onClick={() => handleToggleVocab(vocab)}
                        className="w-4 h-4 rounded-full bg-amber-200 hover:bg-rose-500 hover:text-white flex items-center justify-center text-[10px] transition-colors"
                        title="Xóa từ này"
                      >
                        ✕
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Suggested words from current topic */}
              {(() => {
                const currentPreset = PRESET_TOPICS.find(
                  (p) => p.name.toLowerCase() === modelTopic.toLowerCase()
                ) || PRESET_TOPICS[0];
                return (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-900 block">Gợi ý từ vựng theo chủ đề:</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {currentPreset.suggestedVocab.map((w, i) => {
                        const isSelected = targetVocabulary.some((v) => v.toLowerCase() === w.toLowerCase());
                        return (
                          <button
                            key={i}
                            onClick={() => handleToggleVocab(w)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                              isSelected
                                ? "bg-amber-600 text-white border-amber-700"
                                : "bg-white hover:bg-amber-100 text-slate-700 border-amber-200"
                            }`}
                          >
                            <span>{isSelected ? "✓ " : "+ "}</span>
                            <span>{w}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Custom Word Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newVocabInput}
                  onChange={(e) => setNewVocabInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCustomVocab()}
                  placeholder="Nhập từ vựng tiếng Anh khác (ví dụ: delicious, beautiful, study)..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-amber-300 font-bold text-xs text-slate-800 focus:outline-none focus:border-amber-600"
                />
                <button
                  onClick={handleAddCustomVocab}
                  disabled={!newVocabInput.trim()}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs disabled:opacity-50 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm từ</span>
                </button>
              </div>
            </div>

            {/* Validation Alert */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-800 font-bold animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Generate Button */}
            <button
              id="writing-generate-model-btn"
              disabled={isGeneratingModel}
              onClick={handleGenerateModel}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>
                {isGeneratingModel
                  ? "Milo đang viết đoạn văn mẫu chuẩn SGK..."
                  : `Tạo Đoạn Văn Mẫu AI (~${targetWordCount} từ, ${targetTense.split(" ")[0]}) ✨`}
              </span>
            </button>
          </div>

          {/* 2. Generated Model Essay Showcase */}
          {generatedModel && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-indigo-200 shadow-lg space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 font-black text-xs">
                      Bài Văn Mẫu AI
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                      ~{generatedModel.wordCount || targetWordCount} từ
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
                      {generatedModel.tenseUsed || targetTense}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl text-slate-900">
                    {generatedModel.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakText(generatedModel.modelParagraph || "", { rate: 0.88 })}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                    title="Nghe phát âm chuẩn toàn bài"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Đọc Bản Ngữ</span>
                  </button>
                </div>
              </div>

              {/* Model Text with Highlighted Keywords */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-slate-800 font-serif text-base sm:text-lg leading-relaxed shadow-inner">
                {generatedModel.modelParagraph}
              </div>

              {/* Vietnamese Translation Toggle */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 overflow-hidden">
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-amber-950 hover:bg-amber-100/50 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span>🇻🇳 Bản Dịch Tiếng Việt Chuẩn:</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-amber-800">
                    {showTranslation ? "Ẩn bớt" : "Xem bản dịch"}
                    {showTranslation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {showTranslation && (
                  <div className="p-4 pt-0 text-xs text-amber-950 leading-relaxed font-medium">
                    {generatedModel.vietnameseTranslation}
                  </div>
                )}
              </div>

              {/* Key Grammar Structures & Guiding Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedModel.keyStructures && generatedModel.keyStructures.length > 0 && (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Cấu trúc ngữ pháp hay trong bài:</span>
                    </span>
                    <div className="space-y-1 text-xs">
                      {generatedModel.keyStructures.map((struct: string, i: number) => (
                        <div key={i} className="text-blue-950 font-bold bg-white p-2 rounded-lg border border-blue-100">
                          • {struct}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedModel.writingPrompts && generatedModel.writingPrompts.length > 0 && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Gợi ý ý tưởng để em tự viết:</span>
                    </span>
                    <div className="space-y-1 text-xs">
                      {generatedModel.writingPrompts.map((prompt: string, i: number) => (
                        <div key={i} className="text-emerald-950 font-medium bg-white p-2 rounded-lg border border-emerald-100">
                          💡 {prompt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. "YOUR TURN" (ĐẾN LƯỢT EM LUYỆN VIẾT!) - Fully Interactive Workspace */}
          <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-400/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-700/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-indigo-950 flex items-center justify-center text-2xl font-black shadow-lg">
                  ✍️
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-amber-300">
                    YOUR TURN: Đến Lượt Em Luyện Viết!
                  </h3>
                  <p className="text-xs text-indigo-200 font-medium">
                    Hãy viết bài văn của em về chủ đề <span className="font-bold text-white">“{modelTopic}”</span> sử dụng các từ vựng mục tiêu!
                  </p>
                </div>
              </div>

              {/* Word Count Indicator */}
              <div className="flex items-center gap-2 bg-indigo-950/80 px-4 py-2 rounded-2xl border border-indigo-500/40">
                <div className="text-right">
                  <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Đã viết</div>
                  <div className="text-sm font-black text-amber-300">
                    {yourTurnWordCount} / {targetWordCount} từ
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-amber-400 flex items-center justify-center text-xs font-black text-amber-300">
                  {Math.min(100, Math.round((yourTurnWordCount / targetWordCount) * 100))}%
                </div>
              </div>
            </div>

            {/* Target Vocabulary Checklist (Dynamically checked off as student types!) */}
            {targetVocabulary.length > 0 && (
              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-200 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Checklist từ vựng mục tiêu ({usedVocabList.length}/{targetVocabulary.length} từ đã dùng):</span>
                  </span>
                  <span className="text-[11px] text-amber-300 font-bold">
                    {usedVocabList.length === targetVocabulary.length ? "⭐ Xuất sắc! Đã dùng đủ các từ!" : "Hãy gõ các từ này vào bài"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {targetVocabulary.map((vocab, i) => {
                    const isUsed = usedVocabList.some((v) => v.toLowerCase() === vocab.toLowerCase());
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          isUsed
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105"
                            : "bg-indigo-800/80 text-indigo-200 border border-indigo-600/50"
                        }`}
                      >
                        <span>{isUsed ? "✓" : "○"}</span>
                        <span>{vocab}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Writing Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-indigo-200 block">
                Khung viết bài tiếng Anh của em:
              </label>
              <textarea
                id="writing-your-turn-input"
                rows={5}
                value={yourTurnText}
                onChange={(e) => setYourTurnText(e.target.value)}
                placeholder={`Hello! Today I want to write about ${modelTopic}... (Hãy viết khoảng ${targetWordCount} từ nhé)`}
                className="w-full p-4 sm:p-5 rounded-2xl bg-white text-slate-900 text-sm sm:text-base font-medium leading-relaxed border-2 border-indigo-400 focus:outline-none focus:ring-4 focus:ring-amber-400/40 shadow-inner"
              />
            </div>

            {/* Validation Notice */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/50 flex items-center gap-2 text-xs text-rose-200 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Submit Your Turn Evaluation Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="writing-submit-your-turn-btn"
                disabled={isEvaluatingYourTurn || !yourTurnText.trim()}
                onClick={handleEvaluateYourTurn}
                className="flex-1 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-sm sm:text-base shadow-lg transition-transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isEvaluatingYourTurn ? (
                  <Sparkles className="w-5 h-5 animate-spin" />
                ) : (
                  <Award className="w-5 h-5" />
                )}
                <span>
                  {isEvaluatingYourTurn
                    ? "Milo đang phân tích & chấm điểm bài viết..."
                    : "Nộp Bài & Nhận Xét Chi Tiết Với Gia Sư AI (+25 XP) ✨"}
                </span>
              </button>

              {yourTurnText.trim() && (
                <button
                  onClick={() => {
                    playSound("click");
                    setYourTurnText("");
                    setYourTurnFeedback(null);
                  }}
                  className="px-4 py-3 rounded-2xl bg-indigo-800/80 hover:bg-indigo-700 text-indigo-200 font-bold text-xs"
                >
                  Xoá bài viết
                </button>
              )}
            </div>

            {/* 4. AI Feedback Result for "Your Turn" */}
            {yourTurnFeedback && (
              <ActionableWritingFeedback
                feedback={yourTurnFeedback}
                onApplyCorrection={handleApplyYourTurnCorrection}
                onApplyAllCorrections={handleApplyAllYourTurnCorrections}
                targetVocabCount={targetVocabulary.length}
                usedVocabCount={usedVocabList.length}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
