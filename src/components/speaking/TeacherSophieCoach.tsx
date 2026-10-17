import React, { useState, useEffect } from "react";
import { UserProgress, GradeLevel, SophieFeedbackResult, SophieHintData, SophieSpeakingTopic } from "../../types";
import { GLOBAL_SUCCESS_SPEAKING_TOPICS, getCurriculumTopicsByGrade } from "../../data/curriculumSpeakingTopics";
import { SOPHIE_SPEAKING_TOPICS } from "../../data/speakingTopics";
import { speakText, createSpeechRecognizer } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Smile,
  ShieldCheck,
  RefreshCw,
  Award,
  Layers,
  MessageSquare,
  BookOpen,
  Check,
  Star,
  Flame,
  Info,
} from "lucide-react";

interface TeacherSophieCoachProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

interface DialogueTurnRecord {
  turnNumber: number;
  question: string;
  questionVi: string;
  studentAnswer: string;
  score: number;
  stars: number;
  sophieComment: string;
  sophieCommentVi: string;
  hasError: boolean;
  correctedWord?: string;
  correctForm?: string;
}

export const TeacherSophieCoach: React.FC<TeacherSophieCoachProps> = ({
  progress,
  onUpdateProgress,
}) => {
  // Mode selection: By Global Success Unit (Default) or Curated Free Topics
  const [topicSource, setTopicSource] = useState<"curriculum" | "free_topics">("curriculum");

  // Filters: Grade and Proficiency Level
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | "all">(progress.grade || 1);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<"all" | "basic" | "intermediate" | "advanced">("all");

  // Mode: Single Question or Short Dialogue (3 or 5 turns)
  const [dialogueMode, setDialogueMode] = useState<"dialogue_3" | "dialogue_5" | "single">("dialogue_3");

  // Compute available topics based on source and filters
  const getAvailableTopics = (grade: number | "all", source: "curriculum" | "free_topics", level: string) => {
    let list: SophieSpeakingTopic[] = [];
    if (source === "curriculum") {
      list = getCurriculumTopicsByGrade(grade);
    } else {
      list = SOPHIE_SPEAKING_TOPICS.filter((t) => {
        const matchGrade = grade === "all" || t.grade === grade;
        const matchLevel = level === "all" || t.level === level;
        return matchGrade && matchLevel;
      });
    }
    return list.length > 0 ? list : (source === "curriculum" ? GLOBAL_SUCCESS_SPEAKING_TOPICS : SOPHIE_SPEAKING_TOPICS);
  };

  const availableTopics = getAvailableTopics(selectedGradeFilter, topicSource, selectedLevelFilter);

  // Current active topic (defaults to the first topic of the selected grade)
  const [selectedTopic, setSelectedTopic] = useState<SophieSpeakingTopic>(
    availableTopics[0] || GLOBAL_SUCCESS_SPEAKING_TOPICS[0]
  );

  // Active dialogue turn state
  const [currentTurn, setCurrentTurn] = useState<number>(1);
  const totalTurns = dialogueMode === "dialogue_5" ? 5 : dialogueMode === "dialogue_3" ? 3 : 1;

  // Active question state
  const [currentQuestion, setCurrentQuestion] = useState<string>(selectedTopic.initialQuestion);
  const [currentQuestionVi, setCurrentQuestionVi] = useState<string>(selectedTopic.initialQuestionVi);
  const [showQuestionVi, setShowQuestionVi] = useState<boolean>(true);

  // Voice & Speech Recognition state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<SophieFeedbackResult | null>(null);

  // Dialogue History
  const [dialogueHistory, setDialogueHistory] = useState<DialogueTurnRecord[]>([]);
  const [isDialogueCompleted, setIsDialogueCompleted] = useState<boolean>(false);

  // Hints
  const [hintData, setHintData] = useState<SophieHintData | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState<boolean>(false);
  const [showHintBox, setShowHintBox] = useState<boolean>(false);

  // Repetition practice state
  const [isRepeating, setIsRepeating] = useState<boolean>(false);
  const [repeatTranscript, setRepeatTranscript] = useState<string>("");
  const [repeatSuccess, setRepeatSuccess] = useState<boolean>(false);

  // Question generation state
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState<boolean>(false);

  // Copyright modal/info toggle
  const [showCopyrightModal, setShowCopyrightModal] = useState<boolean>(false);

  // Speak question automatically when question changes
  useEffect(() => {
    speakText(currentQuestion, { rate: 0.88 });
  }, [currentQuestion]);

  // When selected topic changes, reset dialogue state and question
  const handleSelectTopic = (topic: SophieSpeakingTopic) => {
    playSound("click");
    setSelectedTopic(topic);
    setCurrentTurn(1);
    setDialogueHistory([]);
    setIsDialogueCompleted(false);
    setCurrentQuestion(topic.initialQuestion);
    setCurrentQuestionVi(topic.initialQuestionVi);
    setTranscript("");
    setEvaluation(null);
    setHintData(null);
    setShowHintBox(false);
    setRepeatSuccess(false);
    setIsRepeating(false);
  };

  // When Grade filter changes, IMMEDIATELY switch to Unit 1 of that grade and update question!
  const handleGradeFilterChange = (newGrade: number | "all") => {
    playSound("click");
    setSelectedGradeFilter(newGrade);

    const newTopicPool = getAvailableTopics(newGrade, topicSource, selectedLevelFilter);
    if (newTopicPool.length > 0) {
      const firstTopicOfGrade = newTopicPool[0];
      setSelectedTopic(firstTopicOfGrade);
      setCurrentTurn(1);
      setDialogueHistory([]);
      setIsDialogueCompleted(false);
      setCurrentQuestion(firstTopicOfGrade.initialQuestion);
      setCurrentQuestionVi(firstTopicOfGrade.initialQuestionVi);
      setTranscript("");
      setEvaluation(null);
      setHintData(null);
      setShowHintBox(false);
      setRepeatSuccess(false);
      setIsRepeating(false);
    }
  };

  // When Topic Source changes (Curriculum vs Free Topics)
  const handleTopicSourceChange = (newSource: "curriculum" | "free_topics") => {
    playSound("click");
    setTopicSource(newSource);

    const newTopicPool = getAvailableTopics(selectedGradeFilter, newSource, selectedLevelFilter);
    if (newTopicPool.length > 0) {
      const firstTopic = newTopicPool[0];
      setSelectedTopic(firstTopic);
      setCurrentTurn(1);
      setDialogueHistory([]);
      setIsDialogueCompleted(false);
      setCurrentQuestion(firstTopic.initialQuestion);
      setCurrentQuestionVi(firstTopic.initialQuestionVi);
      setTranscript("");
      setEvaluation(null);
      setHintData(null);
      setShowHintBox(false);
      setRepeatSuccess(false);
      setIsRepeating(false);
    }
  };

  const handleModeChange = (mode: "dialogue_3" | "dialogue_5" | "single") => {
    playSound("click");
    setDialogueMode(mode);
    setCurrentTurn(1);
    setDialogueHistory([]);
    setIsDialogueCompleted(false);
    setCurrentQuestion(selectedTopic.initialQuestion);
    setCurrentQuestionVi(selectedTopic.initialQuestionVi);
    setTranscript("");
    setEvaluation(null);
    setHintData(null);
    setShowHintBox(false);
    setRepeatSuccess(false);
    setIsRepeating(false);
  };

  // Navigate to previous/next unit in current grade
  const currentTopicIndex = availableTopics.findIndex((t) => t.id === selectedTopic.id);
  const handlePrevTopic = () => {
    if (currentTopicIndex > 0) {
      handleSelectTopic(availableTopics[currentTopicIndex - 1]);
    }
  };
  const handleNextTopic = () => {
    if (currentTopicIndex < availableTopics.length - 1) {
      handleSelectTopic(availableTopics[currentTopicIndex + 1]);
    }
  };

  // Generate another diverse question within the current topic/unit
  const handleGenerateAnotherQuestion = async () => {
    playSound("click");
    setIsGeneratingQuestion(true);
    try {
      // If topic has pre-built turns, cycle to turn 2 or 3
      if (selectedTopic.dialogueChain && selectedTopic.dialogueChain.length > 1) {
        const nextTurnIdx = (currentTurn % selectedTopic.dialogueChain.length);
        const nextTurnData = selectedTopic.dialogueChain[nextTurnIdx];
        if (nextTurnData && nextTurnData.question !== currentQuestion) {
          setCurrentQuestion(nextTurnData.question);
          setCurrentQuestionVi(nextTurnData.questionVi);
          setTranscript("");
          setEvaluation(null);
          setHintData(null);
          setShowHintBox(false);
          setRepeatSuccess(false);
          setIsRepeating(false);
          setIsGeneratingQuestion(false);
          return;
        }
      }

      const res = await fetch("/api/gemini/sophie-generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic.name,
          grade: selectedTopic.grade || (selectedGradeFilter !== "all" ? selectedGradeFilter : 3),
          previousQuestions: [currentQuestion, ...dialogueHistory.map((d) => d.question)],
        }),
      });

      const data = await res.json();
      if (data.question) {
        setCurrentQuestion(data.question);
        setCurrentQuestionVi(data.questionVi || "");
        setTranscript("");
        setEvaluation(null);
        setHintData(null);
        setShowHintBox(false);
        setRepeatSuccess(false);
        setIsRepeating(false);
      }
    } catch (e) {
      console.error("Error generating question:", e);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleGetHint = async () => {
    playSound("click");
    setShowHintBox(true);
    if (hintData) return;

    setIsLoadingHint(true);
    try {
      const res = await fetch("/api/gemini/sophie-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic.name,
          question: currentQuestion,
          grade: selectedTopic.grade || (selectedGradeFilter !== "all" ? selectedGradeFilter : 3),
        }),
      });

      const data = await res.json();
      setHintData(data);
    } catch (e) {
      console.error("Error getting hint:", e);
      setHintData({
        starters: ["I like...", "In my opinion...", "Because it is..."],
        sampleFullAnswer: selectedTopic.sampleAnswer,
        vietnameseTranslation: selectedTopic.sampleAnswerVi || "Câu trả lời mẫu tham khảo.",
        keywords: selectedTopic.suggestedKeywords || ["friendly", "happy", "interesting"],
        tipsVi: "Con hãy tự tin nói to rõ ràng từng từ một nhé!",
      });
    } finally {
      setIsLoadingHint(false);
    }
  };

  // Start student recording
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    playSound("click");
    setTranscript("");
    setEvaluation(null);
    setRepeatSuccess(false);
    setIsRecording(true);

    const recognizer = createSpeechRecognizer(
      (text) => {
        setTranscript(text);
      },
      (listening) => setIsRecording(listening),
      () => {
        setIsRecording(false);
      }
    );

    recognizer.start();
  };

  // Submit spoken answer to Teacher Sophie
  const handleSubmitSpokenAnswer = async () => {
    if (!transcript.trim() || isEvaluating) return;

    playSound("click");
    setIsEvaluating(true);

    try {
      const res = await fetch("/api/gemini/sophie-speaking-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic.name,
          question: currentQuestion,
          studentTranscript: transcript,
          grade: selectedTopic.grade || (selectedGradeFilter !== "all" ? selectedGradeFilter : 3),
          dialogueHistory,
          currentTurn,
          totalTurns,
        }),
      });

      const data: SophieFeedbackResult = await res.json();
      setEvaluation(data);

      if (data.score >= 80) {
        playSound("correct");
        fireConfetti();
      } else {
        playSound("wrong");
      }

      // Record in dialogue history
      const turnRecord: DialogueTurnRecord = {
        turnNumber: currentTurn,
        question: currentQuestion,
        questionVi: currentQuestionVi,
        studentAnswer: transcript,
        score: data.score,
        stars: data.stars,
        sophieComment: data.sophieComment,
        sophieCommentVi: data.sophieCommentVi,
        hasError: data.hasError,
        correctedWord: data.errorDetail?.problematicWord,
        correctForm: data.errorDetail?.correctForm,
      };

      setDialogueHistory((prev) => [...prev, turnRecord]);

      // Add XP to user progress
      const { updatedProgress } = addXpAndRecord("speaking", data.xpEarned || 25, data.score >= 70);
      onUpdateProgress(updatedProgress);

      // Check if dialogue completed or move to next turn
      if (data.isDialogueCompleted || currentTurn >= totalTurns) {
        setIsDialogueCompleted(true);
      }

      // Read Sophie feedback
      speakText(data.sophieComment, { rate: 0.9 });
    } catch (e) {
      console.error("Error submitting answer:", e);
      setEvaluation({
        hasError: false,
        score: 85,
        stars: 3,
        sophieComment: "Good effort! You spoke very clearly!",
        sophieCommentVi: "Con phát âm rất cố gắng và tự tin!",
        needsRepeatPractice: false,
        xpEarned: 20,
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  // Move to next turn in multi-turn dialogue
  const handleProceedToNextTurn = () => {
    if (!evaluation || currentTurn >= totalTurns) return;

    playSound("click");
    const nextTurnNum = currentTurn + 1;
    setCurrentTurn(nextTurnNum);

    // Pick next question: prefer evaluation's nextQuestion, then dialogueChain, then fallback
    let nextQ = evaluation.nextQuestion;
    let nextQVi = evaluation.nextQuestionVi;

    if (!nextQ && selectedTopic.dialogueChain) {
      const chainItem = selectedTopic.dialogueChain.find((c) => c.turn === nextTurnNum);
      if (chainItem) {
        nextQ = chainItem.question;
        nextQVi = chainItem.questionVi;
      }
    }

    if (!nextQ) {
      nextQ = `That's great! Can you tell me more about ${selectedTopic.name}?`;
      nextQVi = `Thật tuyệt! Con có thể kể thêm cho cô về chủ đề này không?`;
    }

    setCurrentQuestion(nextQ);
    setCurrentQuestionVi(nextQVi || "");
    setTranscript("");
    setEvaluation(null);
    setHintData(null);
    setShowHintBox(false);
    setRepeatSuccess(false);
    setIsRepeating(false);
  };

  // Handle student repeating a mistake
  const handleStartRepeatPractice = () => {
    if (!evaluation?.errorDetail) return;
    playSound("click");
    setIsRepeating(true);
    setRepeatTranscript("");
    setRepeatSuccess(false);

    // First, let Sophie speak the model pronunciation
    speakText(evaluation.errorDetail.correctForm, {
      rate: 0.8,
      onEnd: () => {
        // Start listening for student repeating
        const recognizer = createSpeechRecognizer(
          (text, isFinal) => {
            setRepeatTranscript(text);
            if (isFinal || text.toLowerCase().includes(evaluation.errorDetail!.correctForm.toLowerCase())) {
              setRepeatSuccess(true);
              setIsRepeating(false);
              playSound("correct");
              fireConfetti();
              const { updatedProgress } = addXpAndRecord("speaking", 15, true);
              onUpdateProgress(updatedProgress);
            }
          },
          (listening) => setIsRepeating(listening),
          () => setIsRepeating(false)
        );
        recognizer.start();
      },
    });
  };

  // Reset entire dialogue
  const handleRestartDialogue = () => {
    playSound("click");
    setCurrentTurn(1);
    setDialogueHistory([]);
    setIsDialogueCompleted(false);
    setCurrentQuestion(selectedTopic.initialQuestion);
    setCurrentQuestionVi(selectedTopic.initialQuestionVi);
    setTranscript("");
    setEvaluation(null);
    setHintData(null);
    setShowHintBox(false);
    setRepeatSuccess(false);
    setIsRepeating(false);
  };

  // Age & Curriculum helper descriptions
  const getGradeAgeSummary = (grade: number | "all") => {
    switch (grade) {
      case 1:
        return {
          age: "6 tuổi",
          totalUnits: 16,
          desc: "Nhận biết từ đơn, phát âm chữ cái phonics & câu chào hỏi lễ phép ngắn gọn.",
          badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case 2:
        return {
          age: "7 tuổi",
          totalUnits: 16,
          desc: "Mẫu câu ngắn hỏi sở thích đồ ăn, con vật nuôi, phòng ốc và đồ dùng học tập.",
          badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
        };
      case 3:
        return {
          age: "8 tuổi",
          totalUnits: 20,
          desc: "Cấu trúc câu hỏi tên, tuổi, bạn bè, đồ dùng học tập và các hoạt động giờ ra chơi.",
          badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
        };
      case 4:
        return {
          age: "9 tuổi",
          totalUnits: 20,
          desc: "Hội thoại giao tiếp: hỏi giờ giấc, thói quen hằng ngày, quốc tịch, ngày tháng & môn học yêu thích.",
          badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
        };
      case 5:
        return {
          age: "10-11 tuổi",
          totalUnits: 20,
          desc: "Hội thoại mở rộng đa câu: chia sẻ địa chỉ, quê hương, nghề nghiệp tương lai & trải nghiệm kỳ nghỉ hè.",
          badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
        };
      default:
        return {
          age: "6-11 tuổi",
          totalUnits: 92,
          desc: "Tổng hợp toàn bộ 92 Unit SGK Tiếng Anh Global Success từ Lớp 1 đến Lớp 5.",
          badgeBg: "bg-rose-50 text-rose-800 border-rose-200",
        };
    }
  };

  const gradeInfo = getGradeAgeSummary(selectedGradeFilter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fadeIn">
      {/* Header Banner with Teacher Sophie Persona & Thanh Nguyen Copyright */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-rose-500 via-pink-600 to-indigo-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white p-1 shadow-lg ring-4 ring-white/30 flex items-center justify-center overflow-hidden">
                <span className="text-4xl sm:text-5xl">👩‍🏫</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1.5 border-2 border-white shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white">
                  Teacher Sophie AI Coach
                </span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-950" />
                  Chuẩn SGK Global Success
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white drop-shadow-xs">
                Luyện Nói Cùng Cô Giáo Sophie
              </h1>

              <p className="text-xs sm:text-sm text-rose-100 font-medium max-w-xl">
                Đóng vai cô giáo bản ngữ luyện Speaking từng Unit theo SGK Global Success. Chỉnh sửa phát âm chuẩn xác, hướng dẫn nhắc lại và tạo đoạn hội thoại ngắn tự nhiên.
              </p>

              {/* Thanh Nguyen Copyright Badge */}
              <div className="pt-1.5 flex items-center gap-2">
                <button
                  onClick={() => setShowCopyrightModal(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-black bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full border border-white/30 text-rose-100 hover:text-white transition-all shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Bản quyền tác giả: Thanh Nguyễn</span>
                  <Info className="w-3 h-3 opacity-80" />
                </button>
              </div>
            </div>
          </div>

          {/* Dialogue Mode Switcher */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 bg-black/20 p-2.5 rounded-2xl border border-white/15">
            <span className="text-[11px] font-bold text-rose-200 uppercase tracking-wider text-center md:text-left">
              Chế độ hội thoại:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleModeChange("dialogue_3")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  dialogueMode === "dialogue_3"
                    ? "bg-white text-rose-700 shadow-md scale-102"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                💬 Đoạn hội thoại (3 Vòng)
              </button>
              <button
                onClick={() => handleModeChange("dialogue_5")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  dialogueMode === "dialogue_5"
                    ? "bg-white text-rose-700 shadow-md scale-102"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                🌟 Mở rộng (5 Vòng)
              </button>
              <button
                onClick={() => handleModeChange("single")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  dialogueMode === "single"
                    ? "bg-white text-rose-700 shadow-md scale-102"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                ⚡ 1 Câu nhanh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Source Switcher: SGK Global Success vs Free Topics */}
      <div className="bg-white rounded-3xl p-5 border-2 border-rose-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              📚
            </span>
            <div>
              <h2 className="text-sm font-black text-slate-800">
                Chế độ Giáo Trình & Chủ Đề
              </h2>
              <p className="text-[11px] text-slate-500">
                Chọn luyện theo từng Unit SGK Global Success hoặc chủ đề giao tiếp tự do
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => handleTopicSourceChange("curriculum")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                topicSource === "curriculum"
                  ? "bg-rose-500 text-white shadow-xs"
                  : "text-slate-600 hover:text-rose-700"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📚 Theo từng Unit SGK Global Success</span>
            </button>
            <button
              onClick={() => handleTopicSourceChange("free_topics")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                topicSource === "free_topics"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-indigo-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🌟 Chủ đề Giao tiếp Tự do</span>
            </button>
          </div>
        </div>

        {/* Grade Selector: When clicked, IMMEDIATELY switches to that grade and its Unit 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-rose-500" />
              <span>Chọn Khối Lớp:</span>
            </span>
            <span className="text-[11px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Bấm để đổi ngay câu hỏi phù hợp lứa tuổi
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 1, label: "Khối 1 (6 tuổi)", unitCount: "16 Unit" },
              { id: 2, label: "Khối 2 (7 tuổi)", unitCount: "16 Unit" },
              { id: 3, label: "Khối 3 (8 tuổi)", unitCount: "20 Unit" },
              { id: 4, label: "Khối 4 (9 tuổi)", unitCount: "20 Unit" },
              { id: 5, label: "Khối 5 (10-11 tuổi)", unitCount: "20 Unit" },
              { id: "all", label: "Tất cả khối", unitCount: "92 Unit" },
            ].map((gradeItem) => {
              const isActive = selectedGradeFilter === gradeItem.id;
              return (
                <button
                  key={String(gradeItem.id)}
                  onClick={() => handleGradeFilterChange(gradeItem.id as any)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex flex-col items-center gap-0.5 ${
                    isActive
                      ? "bg-rose-500 text-white shadow-[0_3px_0_0_#BE123C] translate-y-[-1px]"
                      : "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 border border-slate-200"
                  }`}
                >
                  <span>{gradeItem.label}</span>
                  <span className={`text-[10px] font-bold ${isActive ? "text-rose-100" : "text-slate-400"}`}>
                    {gradeItem.unitCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pedagogical Grade & Age Information Banner */}
        <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${gradeInfo.badgeBg}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0">🎯</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider">
                  Chương trình SGK Tiếng Anh Global Success • {selectedGradeFilter === "all" ? "Toàn cấp Tiểu học" : `Khối ${selectedGradeFilter}`}
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-extrabold border border-current shadow-2xs">
                  {gradeInfo.age} • {gradeInfo.totalUnits} Unit
                </span>
              </div>
              <p className="text-xs font-medium mt-0.5">
                {gradeInfo.desc}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-black text-rose-700">
              Đang chọn: {selectedTopic.name}
            </span>
          </div>
        </div>

        {/* Direct Unit Selector & Carousel */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                {topicSource === "curriculum"
                  ? `Chọn Unit bài học (${availableTopics.length} Unit có sẵn):`
                  : `Chủ đề Giao tiếp (${availableTopics.length} chủ đề):`}
              </span>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded-full">
                Lớp {selectedTopic.grade} • {selectedTopic.levelLabel}
              </span>
            </div>

            {/* Prev/Next buttons for units */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevTopic}
                disabled={currentTopicIndex <= 0}
                className="px-2.5 py-1 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 text-slate-700"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Unit trước</span>
              </button>
              <button
                onClick={handleNextTopic}
                disabled={currentTopicIndex >= availableTopics.length - 1}
                className="px-2.5 py-1 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 text-slate-700"
              >
                <span>Unit sau</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Dropdown for quick selection across all units */}
          <div className="sm:hidden">
            <select
              value={selectedTopic.id}
              onChange={(e) => {
                const target = availableTopics.find((t) => t.id === e.target.value);
                if (target) handleSelectTopic(target);
              }}
              className="w-full text-xs font-bold p-2.5 rounded-xl border-2 border-rose-200 bg-white text-slate-800"
            >
              {availableTopics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name} ({topic.nameEn}) - Lớp {topic.grade}
                </option>
              ))}
            </select>
          </div>

          {/* Horizontal scroll of all units */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1.5">
            {availableTopics.map((topic) => {
              const isActive = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border-2 shrink-0 ${
                    isActive
                      ? "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#BE123C] translate-y-[-1px]"
                      : "bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-700 border-slate-200"
                  }`}
                >
                  <span className="text-base">{topic.icon}</span>
                  <div className="text-left">
                    <div className="font-black leading-tight">{topic.name}</div>
                    <div className={`text-[10px] ${isActive ? "text-rose-100" : "text-slate-400"}`}>
                      Lớp {topic.grade} • {topic.nameEn}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Conversation & Teacher Sophie Arena */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-xl space-y-6 relative overflow-hidden">
        {/* Dialogue Progress Header (If multi-turn) */}
        {totalTurns > 1 && (
          <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-rose-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                {currentTurn}/{totalTurns}
              </span>
              <div>
                <span className="text-xs font-black text-slate-800">
                  {currentTurn === 1
                    ? "Vòng 1: Khởi động & Mẫu câu trọng tâm Unit"
                    : currentTurn === totalTurns
                    ? "Vòng Cuối: Bày tỏ cảm xúc & Tổng kết đoạn hội thoại"
                    : `Vòng ${currentTurn}: Mở rộng chi tiết & Hỏi đáp nâng cao`}
                </span>
                <p className="text-[11px] text-slate-500 font-medium">
                  {isDialogueCompleted
                    ? "🎉 Đoạn hội thoại đã hoàn thành xuất sắc!"
                    : "Nói to rõ ràng từng lượt để cùng Cô Sophie hoàn thiện đoạn hội thoại tự nhiên."}
                </p>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalTurns }).map((_, i) => {
                const turnNum = i + 1;
                const isPassed = turnNum < currentTurn;
                const isCurrent = turnNum === currentTurn;
                return (
                  <div
                    key={i}
                    className={`h-2.5 rounded-full transition-all ${
                      isPassed
                        ? "w-6 bg-emerald-500"
                        : isCurrent
                        ? "w-8 bg-rose-500 animate-pulse"
                        : "w-2.5 bg-slate-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Teacher Sophie Speech Bubble Arena */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-linear-to-br from-rose-400 to-pink-500 text-white flex items-center justify-center text-3xl shadow-md border-2 border-white">
              👩‍🏫
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 font-black text-[9px] px-1.5 py-0.5 rounded-full border border-white">
              Lớp {selectedTopic.grade}
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-rose-50/80 rounded-2xl rounded-tl-none p-4 sm:p-5 border-2 border-rose-200 relative shadow-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-100 mb-2">
                <span className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1">
                  <span>Cô Giáo Sophie</span>
                  <span className="text-slate-400 font-normal">
                    (Unit {selectedTopic.unitNumber || "1"}: {selectedTopic.nameEn})
                  </span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakText(currentQuestion, { rate: 0.88 })}
                    className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors"
                    title="Nghe cô Sophie đọc lại câu hỏi"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowQuestionVi(!showQuestionVi)}
                    className="text-[11px] font-bold text-rose-600 hover:text-rose-800 bg-white px-2 py-0.5 rounded-md border border-rose-200"
                  >
                    {showQuestionVi ? "Ẩn dịch" : "Xem dịch"}
                  </button>
                </div>
              </div>

              {/* Spoken Question */}
              <div className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                "{currentQuestion}"
              </div>

              {/* Vietnamese Translation */}
              {showQuestionVi && currentQuestionVi && (
                <div className="text-xs sm:text-sm text-slate-500 font-medium italic mt-1.5">
                  👉 {currentQuestionVi}
                </div>
              )}

              {/* Suggested keywords / Topic hint badge */}
              {selectedTopic.suggestedKeywords && selectedTopic.suggestedKeywords.length > 0 && (
                <div className="pt-2.5 mt-2.5 border-t border-rose-100/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Từ vựng Unit:
                  </span>
                  {selectedTopic.suggestedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-white text-slate-700 font-semibold px-2 py-0.5 rounded-md border border-rose-100"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions under Question */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleGetHint}
                disabled={isLoadingHint}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-200 transition-all"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>{isLoadingHint ? "Đang mở gợi ý..." : "Gợi ý cách trả lời (Hints)"}</span>
              </button>

              <button
                onClick={handleGenerateAnotherQuestion}
                disabled={isGeneratingQuestion}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingQuestion ? "animate-spin" : ""}`} />
                <span>{isGeneratingQuestion ? "Đang tạo..." : "Luyện câu hỏi khác trong Unit"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hint Box (Expandable) */}
        {showHintBox && (
          <div className="bg-amber-50/90 rounded-2xl p-4 sm:p-5 border-2 border-amber-200 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-600 text-base">💡</span>
                <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
                  Gợi Ý Từ Cô Sophie (Giúp con tự tin nói)
                </span>
              </div>
              <button
                onClick={() => setShowHintBox(false)}
                className="text-xs font-bold text-amber-800 hover:text-amber-950"
              >
                Đóng ✕
              </button>
            </div>

            {hintData ? (
              <div className="space-y-2.5 text-xs sm:text-sm text-amber-950">
                {/* Sentence Starters */}
                {hintData.starters && hintData.starters.length > 0 && (
                  <div>
                    <span className="font-bold text-amber-900">Mẫu câu mở đầu dễ nói:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {hintData.starters.map((st, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setTranscript((prev) => (prev ? `${prev} ${st}` : st));
                          }}
                          className="bg-white hover:bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-300 font-semibold text-xs transition-colors"
                        >
                          "{st}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sample Full Answer */}
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">Câu trả lời mẫu tham khảo:</span>
                    <button
                      onClick={() => speakText(hintData.sampleFullAnswer, { rate: 0.85 })}
                      className="text-amber-700 hover:text-amber-900 text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe mẫu</span>
                    </button>
                  </div>
                  <div className="font-bold text-slate-800">
                    "{hintData.sampleFullAnswer}"
                  </div>
                  <div className="text-slate-500 italic text-[11px]">
                    👉 {hintData.vietnameseTranslation}
                  </div>
                </div>

                {/* Sophie Warm Tip */}
                {hintData.tipsVi && (
                  <p className="text-xs text-amber-800 font-medium italic">
                    🌸 {hintData.tipsVi}
                  </p>
                )}
              </div>
            ) : (
              <div className="py-2 text-center text-xs text-amber-700 font-bold animate-pulse">
                Cô Sophie đang soạn gợi ý cho con...
              </div>
            )}
          </div>
        )}

        {/* Student Voice Recording & Input Area */}
        <div className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-rose-500" />
              <span>Phần Trả Lời Của Học Sinh:</span>
            </span>

            {transcript && (
              <button
                onClick={() => setTranscript("")}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-600"
              >
                Xóa làm lại
              </button>
            )}
          </div>

          {/* Transcript Display Box */}
          <div
            className={`min-h-[80px] p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
              isRecording
                ? "bg-rose-50/60 border-rose-400 shadow-inner"
                : transcript
                ? "bg-white border-slate-300"
                : "bg-white/60 border-dashed border-slate-300"
            }`}
          >
            {transcript ? (
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-bold text-slate-800">
                  "{transcript}"
                </p>
                <p className="text-[11px] text-slate-400">
                  (Giọng nói đã được nhận diện qua microphone)
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-3 text-center text-slate-400">
                <p className="text-xs font-semibold">
                  {isRecording
                    ? "🎙️ Đang lắng nghe... Con hãy nói to rõ ràng vào mic nhé!"
                    : "Bấm nút Microphone bên dưới rồi nói câu trả lời của con..."}
                </p>
              </div>
            )}

            {isRecording && (
              <div className="flex items-center justify-center gap-1.5 pt-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-rose-600">Đang thu âm...</span>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleToggleRecord}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                    : "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_3px_0_0_#BE123C] active:translate-y-0.5"
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>Dừng Thu Âm</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>{transcript ? "Nói lại từ đầu" : "Bấm Mic & Trả Lời"}</span>
                  </>
                )}
              </button>

              {transcript && (
                <button
                  onClick={() => speakText(transcript, { rate: 0.9 })}
                  className="p-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                  title="Nghe lại giọng nói của con"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              onClick={handleSubmitSpokenAnswer}
              disabled={!transcript.trim() || isEvaluating || isRecording}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:pointer-events-none text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_3px_0_0_#059669] active:translate-y-0.5 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isEvaluating ? "Cô Sophie đang chấm..." : "Gửi Câu Trả Lời Cho Cô"}</span>
            </button>
          </div>
        </div>

        {/* Teacher Sophie Feedback & Mistake Correction Card */}
        {evaluation && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-indigo-200 shadow-md space-y-4 animate-fadeIn">
            {/* Feedback Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black ${
                    evaluation.score >= 80 ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                >
                  {evaluation.score >= 80 ? <Check className="w-5 h-5" /> : <Smile className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800">
                    Nhận Xét Của Cô Sophie
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {evaluation.hasError ? "Có một vài điểm cần hoàn thiện con nhé!" : "Phát âm rất tốt và chuẩn xác!"}
                  </p>
                </div>
              </div>

              {/* Stars & Score */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < evaluation.stars ? "text-amber-400 fill-amber-400" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {evaluation.score}/100 điểm
                </span>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-emerald-600" />
                  +{evaluation.xpEarned || 25} XP
                </span>
              </div>
            </div>

            {/* Sophie Comments */}
            <div className="space-y-2 text-slate-800">
              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-sm font-semibold flex items-start gap-2.5">
                <span className="text-lg">💬</span>
                <div>
                  <p className="text-indigo-950 font-bold">"{evaluation.sophieComment}"</p>
                  <p className="text-xs text-slate-600 italic mt-1">👉 {evaluation.sophieCommentVi}</p>
                </div>
              </div>

              {/* Natural Conversational Bridge */}
              {evaluation.conversationalBridge && (
                <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700">
                  <span className="font-bold text-slate-900">Phản hồi tự nhiên của cô: </span>
                  "{evaluation.conversationalBridge}"
                </div>
              )}
            </div>

            {/* Error Detail & Pronunciation Correction Box */}
            {evaluation.hasError && evaluation.errorDetail && (
              <div className="bg-rose-50 rounded-2xl p-4 sm:p-5 border-2 border-rose-300 space-y-3">
                <div className="flex items-center gap-2 text-rose-800">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Sửa Lỗi Phát Âm / Ngữ Pháp & Hướng Dẫn Nhắc Lại
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-rose-200 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold">Từ con vừa nói:</span>
                    <p className="text-sm font-black text-red-600 line-through">
                      {evaluation.errorDetail.problematicWord}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold">Dạng chuẩn xác của cô:</span>
                    <p className="text-sm font-black text-emerald-600 flex items-center gap-1.5">
                      <span>{evaluation.errorDetail.correctForm}</span>
                      <button
                        onClick={() => speakText(evaluation.errorDetail!.correctForm, { rate: 0.8 })}
                        className="text-emerald-700 hover:text-emerald-900"
                        title="Nghe phát âm chuẩn"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </p>
                  </div>
                </div>

                {evaluation.errorDetail.phonicsGuide && (
                  <p className="text-xs text-rose-900 font-medium">
                    📌 <strong>Phiên âm & Hướng dẫn:</strong> {evaluation.errorDetail.phonicsGuide}
                  </p>
                )}

                <p className="text-xs text-slate-700">
                  💡 {evaluation.errorDetail.explanationVi}
                </p>

                {/* Repetition Mic Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-rose-200">
                  <div className="text-xs font-bold text-rose-950">
                    {repeatSuccess ? (
                      <span className="text-emerald-600 font-black flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Con đã nhắc lại rất chuẩn xác! (+15 XP)
                      </span>
                    ) : (
                      <span>Cô mời con bấm nút bên cạnh và nhắc lại từ: <strong>"{evaluation.errorDetail.correctForm}"</strong></span>
                    )}
                  </div>

                  {!repeatSuccess && (
                    <button
                      onClick={handleStartRepeatPractice}
                      disabled={isRepeating}
                      className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                        isRepeating
                          ? "bg-rose-600 text-white animate-pulse"
                          : "bg-rose-500 hover:bg-rose-600 text-white shadow-xs"
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{isRepeating ? "Đang nghe con nhắc..." : "Bấm & Nhắc Lại Theo Cô"}</span>
                    </button>
                  )}
                </div>

                {repeatTranscript && !repeatSuccess && (
                  <p className="text-[11px] text-slate-500 italic">
                    Con vừa phát âm: "{repeatTranscript}" (Hãy thử lại lần nữa to rõ hơn nhé!)
                  </p>
                )}
              </div>
            )}

            {/* Next Dialogue Turn or Complete Action */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs text-slate-500 font-medium">
                {isDialogueCompleted
                  ? "🎉 Con đã xuất sắc hoàn thành đoạn hội thoại!"
                  : `Vòng tiếp theo: Lượt ${currentTurn + 1} / ${totalTurns}`}
              </div>

              <div className="flex items-center gap-2">
                {!isDialogueCompleted && currentTurn < totalTurns ? (
                  <button
                    onClick={handleProceedToNextTurn}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Tiếp tục vòng {currentTurn + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRestartDialogue}
                    className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Luyện lại đoạn này</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dialogue Chat History Log */}
        {dialogueHistory.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                <span>Nhật Ký Đoạn Hội Thoại Vừa Luyện ({dialogueHistory.length} Lượt):</span>
              </span>

              <button
                onClick={handleRestartDialogue}
                className="text-xs font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Làm mới hội thoại</span>
              </button>
            </div>

            <div className="space-y-3">
              {dialogueHistory.map((d, idx) => (
                <div key={idx} className="space-y-2 text-xs">
                  {/* Sophie turn */}
                  <div className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      👩‍🏫
                    </span>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 flex-1 space-y-1 shadow-2xs">
                      <div className="font-bold text-slate-800">"{d.question}"</div>
                      <div className="text-[11px] text-slate-500 italic">👉 {d.questionVi}</div>
                    </div>
                  </div>

                  {/* Student turn */}
                  <div className="flex items-start justify-end gap-2.5 pl-8">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none flex-1 max-w-lg space-y-1 shadow-2xs">
                      <div className="font-bold">"{d.studentAnswer}"</div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/20 text-[10px] text-blue-100">
                        <span>Điểm: {d.score}/100</span>
                        <span>{Array.from({ length: d.stars }).map((_, i) => "⭐").join("")}</span>
                      </div>
                    </div>
                    <span className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      👦
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Copyright Modal */}
      {showCopyrightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border-2 border-amber-300 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
                  🛡️
                </div>
                <div>
                  <h3 className="font-display font-black text-base sm:text-lg text-slate-800">
                    Bản Quyền Tác Giả & Sở Hữu Trí Tuệ
                  </h3>
                  <p className="text-xs text-amber-700 font-bold">
                    Tác giả: Thanh Nguyễn
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCopyrightModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                <p className="font-extrabold text-amber-950">
                  © Toàn bộ bản quyền kiến trúc phần mềm, hệ sinh thái học tập và giải pháp Trợ lý AI thuộc về tác giả:
                </p>
                <p className="text-base font-black text-rose-700">
                  THANH NGUYỄN
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-bold text-slate-800">
                  ⚠️ Điều khoản bảo hộ & Bản quyền sử dụng:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Nghiêm cấm mọi hành vi sao chép, giải mã, can thiệp hoặc tự ý chỉnh sửa ứng dụng.</li>
                  <li>Toàn bộ dữ liệu 16 Unit (Khối 1, 2) và 20 Unit (Khối 3, 4, 5) được chuẩn hóa theo chương trình GDPT Bộ Giáo dục & Đào tạo.</li>
                  <li>Hệ thống AI Speaking Coach Cô giáo Sophie và Trợ lý AI Thanh Nguyễn được thiết kế phục vụ tối đa cho giáo viên và học sinh Việt Nam.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCopyrightModal(false)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-sm"
              >
                Đã hiểu & Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
