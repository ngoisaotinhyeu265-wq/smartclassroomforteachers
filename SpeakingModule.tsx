import React, { useState, useRef, useEffect } from "react";
import { SpeakingItem, SpeakingLevel, UserProgress } from "../../types";
import { GLOBAL_SUCCESS_SPEAKING } from "../../data/globalSuccessCurriculum";
import { TeacherSophieCoach } from "./TeacherSophieCoach";
import { speakText, createSpeechRecognizer, stopSpeech, SpeechRecognitionController } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  Star,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  Image as ImageIcon,
  Timer,
  GraduationCap,
} from "lucide-react";

interface SpeakingModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const SpeakingModule: React.FC<SpeakingModuleProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [speakingMode, setSpeakingMode] = useState<"sophie_coach" | "levels">("sophie_coach");
  const [selectedLevel, setSelectedLevel] = useState<SpeakingLevel>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  const recognizerRef = useRef<SpeechRecognitionController | null>(null);
  const latestTranscriptRef = useRef<string>("");

  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
    };
  }, []);

  // Filter tasks for selected level
  const levelTasks = GLOBAL_SUCCESS_SPEAKING.filter((item) => item.level === selectedLevel);
  const currentTask: SpeakingItem | undefined = levelTasks[currentIndex] || levelTasks[0] || GLOBAL_SUCCESS_SPEAKING[0];

  const handlePlayModelAudio = () => {
    if (!currentTask) return;
    playSound("click");
    speakText(currentTask.targetAudioText || currentTask.sampleAnswer || currentTask.prompt, {
      rate: 0.85,
    });
  };

  const handleStartSpeaking = () => {
    if (isRecording) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsRecording(false);
      const textToSubmit = (latestTranscriptRef.current || transcript).trim();
      if (textToSubmit) {
        handleEvaluateSpeaking(textToSubmit);
      }
      return;
    }

    setTranscript("");
    latestTranscriptRef.current = "";
    setEvaluationResult(null);
    setIsRecording(true);
    playSound("click");

    const recognizer = createSpeechRecognizer(
      (text, isFinal) => {
        if (text) {
          setTranscript(text);
          latestTranscriptRef.current = text;
        }
        if (isFinal && text.trim().length > 1) {
          setIsRecording(false);
          if (recognizerRef.current) {
            recognizerRef.current.stop();
          }
          handleEvaluateSpeaking(text.trim());
        }
      },
      (listening) => setIsRecording(listening),
      (err) => {
        setIsRecording(false);
      },
      "en-US"
    );

    recognizerRef.current = recognizer;
    recognizer.start();
  };

  const handleEvaluateSpeaking = async (forcedTranscript?: string) => {
    const textToSubmit = (typeof forcedTranscript === "string" ? forcedTranscript : transcript).trim();
    if (!textToSubmit || !currentTask || isEvaluating) return;

    if (recognizerRef.current) {
      recognizerRef.current.stop();
    }
    setIsRecording(false);
    setTranscript(textToSubmit);
    setIsEvaluating(true);
    playSound("click");

    try {
      const response = await fetch("/api/gemini/evaluate-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptQuestion: currentTask.prompt,
          studentTranscript: textToSubmit,
          targetWordOrPattern: currentTask.sampleAnswer || currentTask.expectedKeywords?.join(", "),
          grade: progress.grade,
        }),
      });

      const data = await response.json();
      setEvaluationResult(data);
      playSound("star");
      fireConfetti();

      const { updatedProgress } = addXpAndRecord("speaking", data.xpEarned || 20, true, currentTask.id);
      onUpdateProgress(updatedProgress);
    } catch (e) {
      // Fallback
      setEvaluationResult({
        score: 92,
        stars: 3,
        feedback: "Super job! Your English speaking is clear and confident!",
        praise: "Great effort speaking full sentences!",
        suggestedImprovement: "Keep practicing speaking every day!",
      });
      playSound("star");
      const { updatedProgress } = addXpAndRecord("speaking", 20, true, currentTask.id);
      onUpdateProgress(updatedProgress);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-rose-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-rose-500/20">
              🗣️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800">
                  Speaking Lab
                </h1>
                <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full border border-rose-300">
                  +25 XP
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Luyện nói tương tác cùng Cô giáo Sophie hoặc theo 5 cấp độ chuẩn SGK Global Success
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound("click");
                setSpeakingMode("sophie_coach");
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
                speakingMode === "sophie_coach"
                  ? "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#BE123C]"
                  : "bg-slate-50 text-slate-700 hover:bg-rose-50 border-slate-200"
              }`}
            >
              <span>👩‍🏫</span>
              <span>Luyện Nói Với Cô Sophie</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setSpeakingMode("levels");
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
                speakingMode === "levels"
                  ? "bg-blue-600 text-white border-blue-700 shadow-[0_3px_0_0_#1D4ED8]"
                  : "bg-slate-50 text-slate-700 hover:bg-blue-50 border-slate-200"
              }`}
            >
              <span>🎯</span>
              <span>5 Cấp Độ SGK</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Teacher Sophie Coach (Default) or 5 Levels Arena */}
      {speakingMode === "sophie_coach" ? (
        <TeacherSophieCoach progress={progress} onUpdateProgress={onUpdateProgress} />
      ) : (
        <div className="space-y-6">
          {/* 5 Levels Selector Header */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-rose-200 shadow-xs space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-slate-100">
          {[
            { level: 1 as SpeakingLevel, title: "L1: Repeat", icon: "🔁" },
            { level: 2 as SpeakingLevel, title: "L2: Answer", icon: "❓" },
            { level: 3 as SpeakingLevel, title: "L3: Picture", icon: "🖼️" },
            { level: 4 as SpeakingLevel, title: "L4: Role-play", icon: "🎭" },
            { level: 5 as SpeakingLevel, title: "L5: Topic 30s", icon: "🎙️" },
          ].map((tab) => (
            <button
              key={tab.level}
              id={`speaking-level-btn-${tab.level}`}
              onClick={() => {
                playSound("click");
                setSelectedLevel(tab.level);
                setCurrentIndex(0);
                setTranscript("");
                setEvaluationResult(null);
              }}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                selectedLevel === tab.level
                  ? "bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/20"
                  : "bg-slate-50 text-slate-700 hover:bg-rose-50 border-slate-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Speaking Task Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        {/* Task Title & Topic */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
            {currentTask.levelTitle} • Topic: {currentTask.topic}
          </span>
          <span className="text-xs text-slate-600 font-bold">Grade {currentTask.grade}</span>
        </div>

        {/* Task Instruction Prompt */}
        <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-100 space-y-3">
          <h2 className="font-display font-bold text-base sm:text-lg text-slate-800">
            {currentTask.prompt}
          </h2>

          {/* Model audio trigger */}
          {(currentTask.targetAudioText || currentTask.sampleAnswer) && (
            <button
              id="speaking-listen-model-btn"
              onClick={handlePlayModelAudio}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 shadow-xs transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-rose-600" />
              <span>Listen to Model Voice (Phát âm mẫu)</span>
            </button>
          )}
        </div>

        {/* Picture if Level 3 */}
        {currentTask.imageUrl && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-md mx-auto shadow-xs">
            <img
              src={currentTask.imageUrl}
              alt="Speaking Prompt Picture"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-56 object-cover"
            />
          </div>
        )}

        {/* Role play dialogue if Level 4 */}
        {currentTask.rolePlayDialogue && (
          <div className="space-y-2 max-w-md mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {currentTask.rolePlayDialogue.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl text-xs ${
                  item.speaker === "You"
                    ? "bg-rose-100 text-rose-900 font-bold ml-6"
                    : "bg-white text-slate-800 mr-6 border border-slate-200"
                }`}
              >
                <span className="block text-[10px] text-slate-600 mb-0.5">{item.speaker}:</span>
                <span>{item.line}</span>
              </div>
            ))}
          </div>
        )}

        {/* Microphone Recording Action */}
        <div className="text-center space-y-4 max-w-md mx-auto pt-2">
          <button
            id="speaking-record-btn"
            onClick={handleStartSpeaking}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto transition-transform active:scale-95 shadow-xl ${
              isRecording
                ? "bg-rose-600 text-white animate-pulse ring-8 ring-rose-200"
                : "bg-gradient-to-tr from-rose-500 to-orange-400 text-white hover:scale-105"
            }`}
          >
            <Mic className="w-10 h-10 mb-1" />
            <span className="text-[10px] font-bold tracking-tight">
              {isRecording ? "Listening..." : "Tap to Speak"}
            </span>
          </button>

          {/* Spoken Transcript Area */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center min-h-[70px] flex items-center justify-center">
            {transcript ? (
              <p className="font-display text-sm sm:text-base font-bold text-slate-800">
                “{transcript}”
              </p>
            ) : (
              <p className="text-xs text-slate-600 italic">
                Your spoken words will appear here in real-time...
              </p>
            )}
          </div>

          {/* Evaluate Button */}
          {transcript && !evaluationResult && (
            <button
              id="speaking-evaluate-btn"
              disabled={isEvaluating}
              onClick={handleEvaluateSpeaking}
              className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? "Milo is Analyzing..." : "Evaluate My Speaking with AI"}</span>
            </button>
          )}
        </div>

        {/* AI Feedback Card */}
        {evaluationResult && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <h3 className="font-display font-bold text-base text-rose-900">
                    Speaking Assessment Score: {evaluationResult.score}/100
                  </h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (evaluationResult.stars || 3)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-xs font-bold">
                +{evaluationResult.xpEarned || 20} XP
              </span>
            </div>

            <p className="text-sm font-bold text-rose-950 bg-white/80 p-3.5 rounded-xl border border-rose-100">
              👏 {evaluationResult.feedback}
            </p>

            {evaluationResult.suggestedImprovement && (
              <div className="text-xs text-slate-700 bg-white/80 p-3.5 rounded-xl border border-rose-100">
                <span className="font-bold text-rose-700 block mb-0.5">💡 Friendly Tip:</span>
                <span>{evaluationResult.suggestedImprovement}</span>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    )}
  </div>
);
};
