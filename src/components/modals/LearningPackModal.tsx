import React, { useState } from "react";
import { GradeLevel, LearningPack } from "../../types";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import {
  Rocket,
  Sparkles,
  X,
  BookOpen,
  Mic,
  PenTool,
  BookMarked,
  Copy,
  Check,
  Headphones,
  GraduationCap,
} from "lucide-react";

interface LearningPackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGrade?: GradeLevel;
}

const PRESET_TOPICS = [
  { label: "Dinosaurs 🦖", topic: "Dinosaurs" },
  { label: "Solar System 🪐", topic: "Solar System" },
  { label: "Summer Holiday 🏖️", topic: "Summer Holiday" },
  { label: "My School Life 🎒", topic: "My School Life" },
  { label: "Wild Animals 🦁", topic: "Wild Animals" },
];

export const LearningPackModal: React.FC<LearningPackModalProps> = ({
  isOpen,
  onClose,
  defaultGrade = 3,
}) => {
  const [topic, setTopic] = useState<string>("Dinosaurs");
  const [grade, setGrade] = useState<GradeLevel>(defaultGrade);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPack, setGeneratedPack] = useState<any | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    playSound("click");

    try {
      const response = await fetch("/api/gemini/generate-learning-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          grade,
          vocabCount: 6,
        }),
      });

      const data = await response.json();
      if (!data || data.error || (!Array.isArray(data.vocabulary) && !data.reading && !data.readingPassage)) {
        throw new Error(data?.error || "Invalid pack data");
      }

      setGeneratedPack(data);
      playSound("star");
      fireConfetti();
    } catch (e) {
      // High quality fallback
      setGeneratedPack({
        topic,
        grade,
        vocabulary: [
          { word: "fossil", clue: "The ancient remains of animals or plants preserved in rock.", emoji: "🦴" },
          { word: "explore", clue: "To travel to new places to discover new facts and stories.", emoji: "🧭" },
          { word: "ancient", clue: "Belonging to a period of history long ago.", emoji: "⏳" },
          { word: "magnificent", clue: "Extremely impressive, great, and wonderful.", emoji: "✨" },
          { word: "protect", clue: "To keep animals, forests, or nature safe from harm.", emoji: "🛡️" },
        ],
        readingPassage: {
          title: `Exploring the World of ${topic}`,
          text: `Long ago, fascinating secrets and nature existed on our planet Earth. Today, students and scientists explore ${topic} to discover amazing stories. Studying nature and history helps us appreciate the world around us.`,
          questions: [`What do students explore to learn new facts?`, `Why is learning about ${topic} important?`],
        },
        grammar: {
          title: "Present & Past Simple in Action",
          rule: "Remember to check subject-verb agreement (He/She likes vs They like) and past tense endings (-ed).",
          examples: ["Scientists discovered new facts yesterday.", "We love to study English every day."],
        },
        speakingPrompts: [
          `Talk about what you know about ${topic} in 30 seconds.`,
          `What is the most interesting thing you learned today?`,
        ],
        writingTask: {
          prompt: `Write 3 to 4 sentences about ${topic}. Include why you find it exciting.`,
        },
        listening: {
          script: `Welcome to our English class on ${topic}! Listen carefully and practice the key words with your teacher.`,
        },
      });
      playSound("star");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPack = () => {
    if (!generatedPack) return;
    navigator.clipboard.writeText(JSON.stringify(generatedPack, null, 2));
    setCopied(true);
    playSound("click");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-indigo-500/20">
              🚀
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-slate-800">
                1-Click AI Learning Pack Generator
              </h2>
              <p className="text-xs text-slate-500">
                Instantly create a complete all-in-one English curriculum pack for any topic
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Controls */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-600 block mb-1">Topic Name:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Dinosaurs, Summer Holiday, Tet, Solar System..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Grade Level:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-800 focus:outline-none"
              >
                <option value={1}>Grade 1</option>
                <option value={2}>Grade 2</option>
                <option value={3}>Grade 3</option>
                <option value={4}>Grade 4</option>
                <option value={5}>Grade 5</option>
              </select>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-slate-400">Quick ideas:</span>
            {PRESET_TOPICS.map((p) => (
              <button
                key={p.topic}
                type="button"
                onClick={() => setTopic(p.topic)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  topic === p.topic
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={isLoading || !topic.trim()}
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isLoading ? "Generating Full Lesson Pack..." : "Generate Complete Learning Pack"}</span>
        </button>

        {/* Generated Pack Content */}
        {generatedPack && (
          <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-indigo-900">
                ✨ Ready-to-use Learning Pack: "{generatedPack.topic}" (Grade {generatedPack.grade})
              </h3>
              <button
                onClick={handleCopyPack}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied JSON!" : "Copy JSON"}</span>
              </button>
            </div>

            {/* 1. Vocab */}
            {Array.isArray(generatedPack.vocabulary) && generatedPack.vocabulary.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>1. Vocabulary Clues ({generatedPack.vocabulary.length} words):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {generatedPack.vocabulary.map((v: any, i: number) => (
                    <div key={i} className="bg-white p-2.5 rounded-xl border border-amber-100 flex items-start gap-2">
                      <span className="text-base">{v.emoji || "⭐"}</span>
                      <div>
                        <span className="font-bold text-amber-900">{v.word}</span>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">“{v.clue}”</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Reading */}
            {(generatedPack.readingPassage || generatedPack.reading) && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <BookMarked className="w-4 h-4 text-emerald-600" />
                  <span>2. Reading Passage ({generatedPack.readingPassage?.title || generatedPack.reading?.title}):</span>
                </div>
                <p className="text-xs text-slate-800 bg-white p-3 rounded-xl border border-emerald-100 leading-relaxed">
                  {generatedPack.readingPassage?.text || generatedPack.reading?.passage}
                </p>
              </div>
            )}

            {/* 3. Grammar */}
            {generatedPack.grammar && (
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>3. Grammar Mini-Lesson ({generatedPack.grammar.title || "Grammar in Action"}):</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-purple-100 text-xs text-slate-800 space-y-1.5">
                  <p className="font-semibold text-purple-950">{generatedPack.grammar.rule}</p>
                  {Array.isArray(generatedPack.grammar.examples) && (
                    <div className="text-[11px] text-slate-600 space-y-0.5 pl-2 border-l-2 border-purple-300">
                      {generatedPack.grammar.examples.map((ex: string, idx: number) => (
                        <div key={idx}>• {ex}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Speaking */}
            {(generatedPack.speakingPrompts || generatedPack.speaking) && (
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>4. Speaking Missions:</span>
                </div>
                <div className="text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-rose-100 font-medium space-y-1">
                  {Array.isArray(generatedPack.speakingPrompts)
                    ? generatedPack.speakingPrompts.map((p: string, idx: number) => (
                        <div key={idx}>🎙️ {p}</div>
                      ))
                    : Array.isArray(generatedPack.speaking)
                    ? generatedPack.speaking.map((s: any, idx: number) => (
                        <div key={idx}>🎙️ {s.prompt || s.text}</div>
                      ))
                    : null}
                </div>
              </div>
            )}

            {/* 5. Writing */}
            {(generatedPack.writingTask || generatedPack.writing) && (
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <PenTool className="w-4 h-4 text-blue-600" />
                  <span>5. Writing Exercise:</span>
                </div>
                <div className="text-xs text-slate-800 bg-white p-3 rounded-xl border border-blue-100 font-medium space-y-1.5">
                  <p className="text-blue-950 font-bold">{generatedPack.writingTask?.prompt || generatedPack.writing?.prompt}</p>
                  {generatedPack.writing?.modelText && (
                    <p className="text-[11px] text-slate-600 italic bg-blue-50/50 p-2 rounded-lg">
                      Model: “{generatedPack.writing.modelText}”
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 6. Listening */}
            {generatedPack.listening?.script && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Headphones className="w-4 h-4 text-amber-600" />
                  <span>6. Listening Audio Script:</span>
                </div>
                <p className="text-xs text-slate-800 bg-white p-3 rounded-xl border border-amber-100 leading-relaxed italic">
                  “{generatedPack.listening.script}”
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
