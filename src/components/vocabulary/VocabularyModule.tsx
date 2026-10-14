import React, { useState, useEffect } from "react";
import { VocabItem, VocabGameType, GradeLevel, UserProgress } from "../../types";
import { GLOBAL_SUCCESS_VOCAB, EXTENDED_TOPICS_VOCAB } from "../../data/globalSuccessCurriculum";
import { speakText, createSpeechRecognizer, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord, recordMissedWord, removeMasteredWord, loadTeacherVocab } from "../../utils/storage";
import { recordWordPerformanceInSrs } from "../../utils/spacedRepetition";
import { EbbinghausDeck } from "./EbbinghausDeck";
import {
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  BookOpen,
  Brain,
} from "lucide-react";

interface VocabularyModuleProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
  selectedTopicFilter?: string;
}

export const VocabularyModule: React.FC<VocabularyModuleProps> = ({
  progress,
  onUpdateProgress,
  selectedTopicFilter,
}) => {
  // Combine core vocab + extended + teacher custom vocab
  const [allVocabList, setAllVocabList] = useState<VocabItem[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(progress.grade);
  const [selectedTopic, setSelectedTopic] = useState<string>(selectedTopicFilter || "All");
  const [gameType, setGameType] = useState<VocabGameType>("multiple_choice");
  const [viewMode, setViewMode] = useState<"quiz" | "ebbinghaus_srs" | "review">("quiz");

  // Active question state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [revealedClueCount, setRevealedClueCount] = useState<number>(1);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>("");

  // Load vocab list
  useEffect(() => {
    const teacherItems = loadTeacherVocab();
    const combined = [...GLOBAL_SUCCESS_VOCAB, ...EXTENDED_TOPICS_VOCAB, ...teacherItems];
    setAllVocabList(combined);
  }, []);

  // Filter items
  const filteredVocab = React.useMemo(() => {
    if (viewMode === "review") {
      const missedWordTexts = progress.missedWords.map((w) => w.word.toLowerCase());
      return allVocabList.filter((v) => missedWordTexts.includes(v.word.toLowerCase()));
    }
    return allVocabList.filter((item) => {
      const matchGrade = item.grade === selectedGrade;
      const matchTopic = selectedTopic === "All" || item.topic === selectedTopic;
      return matchGrade && matchTopic;
    });
  }, [allVocabList, selectedGrade, selectedTopic, viewMode, progress.missedWords]);

  const currentItem: VocabItem | undefined = filteredVocab[currentIndex] || filteredVocab[0];

  // Options shuffling for multiple choice
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  useEffect(() => {
    if (currentItem) {
      const opts = [currentItem.word, ...(currentItem.distractors || ["apple", "banana", "cat"])].slice(0, 4);
      setShuffledOptions([...opts].sort(() => Math.random() - 0.5));
      setSelectedAnswer(null);
      setTypedInput("");
      setIsAnswered(false);
      setIsCorrect(null);
      setWrongAttempts(0);
      setRevealedClueCount(1);
      setFeedbackMessage("");
      setSpokenTranscript("");
    }
  }, [currentIndex, currentItem, gameType]);

  // Read clue for Listen and Guess
  const handleListenClue = () => {
    if (!currentItem) return;
    playSound("click");
    speakText(currentItem.clue, { rate: 0.9 });
  };

  // Check Multiple Choice or Picture Choice
  const handleSelectOption = (chosenWord: string) => {
    if (isAnswered || !currentItem) return;

    setSelectedAnswer(chosenWord);
    const correct = chosenWord.toLowerCase().trim() === currentItem.word.toLowerCase().trim();

    if (correct) {
      playSound("correct");
      fireConfetti();
      setIsCorrect(true);
      setIsAnswered(true);
      setFeedbackMessage("⭐ Excellent! You got it!");
      const { updatedProgress } = addXpAndRecord("vocabulary", 10, true, currentItem.id);
      removeMasteredWord(currentItem.word);
      recordWordPerformanceInSrs(currentItem, true);
      onUpdateProgress(updatedProgress);
      setTimeout(() => {
        speakText(currentItem.word, { rate: 0.95 });
      }, 400);
    } else {
      playSound("wrong");
      setIsCorrect(false);
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
      recordMissedWord(currentItem);
      recordWordPerformanceInSrs(currentItem, false);
      setFeedbackMessage(`💡 Good try! Think again about: ${currentItem.clue.slice(0, 45)}...`);
    }
  };

  // Check Typed Word
  const handleCheckTypedWord = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedInput.trim() || isAnswered || !currentItem) return;

    const correct = typedInput.toLowerCase().trim() === currentItem.word.toLowerCase().trim();
    if (correct) {
      playSound("correct");
      fireConfetti();
      setIsCorrect(true);
      setIsAnswered(true);
      setFeedbackMessage("⭐ Fantastic spelling! You got it right!");
      const { updatedProgress } = addXpAndRecord("vocabulary", 15, true, currentItem.id);
      removeMasteredWord(currentItem.word);
      recordWordPerformanceInSrs(currentItem, true);
      onUpdateProgress(updatedProgress);
      setTimeout(() => {
        speakText(currentItem.word, { rate: 0.95 });
      }, 400);
    } else {
      playSound("wrong");
      setIsCorrect(false);
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
      recordMissedWord(currentItem);
      recordWordPerformanceInSrs(currentItem, false);
      setFeedbackMessage(`💡 Almost there! It starts with the letter '${currentItem.word.charAt(0).toUpperCase()}'. Try again!`);
    }
  };

  // Speech Recognition for Speaking Guess
  const handleToggleVoiceGuess = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setSpokenTranscript("Listening... speak your guess now!");

    const recognizer = createSpeechRecognizer(
      (transcript, isFinal) => {
        setSpokenTranscript(transcript);
        if (isFinal && currentItem) {
          setIsRecording(false);
          const cleaned = transcript.toLowerCase().replace(/[^a-z0-9]/g, "");
          const targetCleaned = currentItem.word.toLowerCase().replace(/[^a-z0-9]/g, "");
          if (cleaned.includes(targetCleaned)) {
            handleSelectOption(currentItem.word);
          } else {
            playSound("wrong");
            setFeedbackMessage(`💡 You said "${transcript}". Good try! Say it again or try another guess.`);
          }
        }
      },
      (listening) => setIsRecording(listening),
      (err) => {
        setIsRecording(false);
        setFeedbackMessage("Microphone tip: You can also choose from the options!");
      }
    );

    recognizer.start();
  };

  const handleNextQuestion = () => {
    playSound("click");
    stopSpeech();
    if (currentIndex < filteredVocab.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Extract unique topics for filter
  const availableTopics = Array.from(
    new Set(allVocabList.filter((v) => v.grade === selectedGrade).map((v) => v.topic))
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Header & Mode Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-amber-500/20">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800">
                  Vocabulary Guessing
                </h1>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-300">
                  +10 XP
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Read or listen to English clues and guess the target word! (Never reveals the word beforehand)
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="vocab-mode-quiz-btn"
              onClick={() => {
                playSound("click");
                setViewMode("quiz");
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                viewMode === "quiz"
                  ? "bg-amber-500 text-white border-amber-600 shadow-[0_2px_0_0_#B45309]"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <span>🎮 Đố Từ Vựng</span>
            </button>

            <button
              id="vocab-mode-ebbinghaus-btn"
              onClick={() => {
                playSound("click");
                setViewMode("ebbinghaus_srs");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                viewMode === "ebbinghaus_srs"
                  ? "bg-indigo-600 text-white border-indigo-800 shadow-[0_2px_0_0_#3730A3]"
                  : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200"
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>🧠 Thẻ Lặp Lại SRS (Ebbinghaus)</span>
            </button>

            <button
              id="vocab-review-mode-btn"
              onClick={() => {
                playSound("click");
                setViewMode(viewMode === "review" ? "quiz" : "review");
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                viewMode === "review"
                  ? "bg-rose-500 text-white border-rose-600 shadow-[0_2px_0_0_#BE123C]"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Từ Cần Ôn ({progress.missedWords.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Grade, Topic, Game Type */}
        {viewMode !== "ebbinghaus_srs" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
            {/* Grade Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 mb-1 block">Grade Level:</label>
              <select
                value={selectedGrade}
                onChange={(e) => {
                  playSound("click");
                  setSelectedGrade(Number(e.target.value) as GradeLevel);
                  setCurrentIndex(0);
                }}
                aria-label="Select Grade Level"
                className="w-full bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value={1}>Grade 1</option>
                <option value={2}>Grade 2</option>
                <option value={3}>Grade 3 (Global Success)</option>
                <option value={4}>Grade 4 (Global Success)</option>
                <option value={5}>Grade 5 (Global Success)</option>
              </select>
            </div>

            {/* Topic Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 mb-1 block">Topic:</label>
              <select
                value={selectedTopic}
                onChange={(e) => {
                  playSound("click");
                  setSelectedTopic(e.target.value);
                  setCurrentIndex(0);
                }}
                aria-label="Select Topic"
                className="w-full bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="All">All Topics ({availableTopics.length})</option>
                {availableTopics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Game Type Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 mb-1 block">Game Type:</label>
              <select
                value={gameType}
                onChange={(e) => {
                  playSound("click");
                  setGameType(e.target.value as VocabGameType);
                }}
                aria-label="Select Game Type"
                className="w-full bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="multiple_choice">Type 1: Multiple Choice</option>
                <option value="picture_choices">Type 2: Picture Choices</option>
                <option value="type_word">Type 3: Type the Word</option>
                <option value="listen_and_guess">Type 4: Listen & Guess</option>
                <option value="speaking_guess">Type 5: Speaking Guess (Mic 🎤)</option>
                <option value="word_detective">Type 6: Word Detective (Multi-clues)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Render Ebbinghaus Deck if active */}
      {viewMode === "ebbinghaus_srs" ? (
        <EbbinghausDeck
          allVocab={allVocabList}
          progress={progress}
          onUpdateProgress={onUpdateProgress}
        />
      ) : (
        /* Main Question Arena */
        !currentItem ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs space-y-4">
            <div className="text-4xl">🎉</div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              {viewMode === "review" ? "Great Job! No words need review right now!" : "No vocabulary items found for this filter."}
            </h3>
            <p className="text-xs text-slate-500">
              Try switching topics or Grade levels to explore more English vocabulary!
            </p>
            <button
              onClick={() => {
                setViewMode("quiz");
                setSelectedTopic("All");
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 relative overflow-hidden">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-xl border border-amber-200">
              <span>{currentItem.topic}</span>
              {currentItem.unit && <span>• Unit {currentItem.unit}</span>}
            </span>
            <span>
              Word {currentIndex + 1} of {filteredVocab.length}
            </span>
          </div>

          {/* Target Clue Box (Strictly no target word leaking!) */}
          <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-2xl p-6 border border-amber-200/80 space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-amber-800 text-xs font-bold border border-amber-200 shadow-xs">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>English Clue / Definition</span>
            </div>

            {/* If Word Detective Type, show progressive clues */}
            {gameType === "word_detective" && currentItem.detailedClues && (
              <div className="space-y-2 text-left max-w-md mx-auto py-2">
                {currentItem.detailedClues.slice(0, revealedClueCount).map((clue, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100 shadow-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 font-medium">{clue}</p>
                  </div>
                ))}

                {revealedClueCount < currentItem.detailedClues.length && (
                  <button
                    onClick={() => {
                      playSound("click");
                      setRevealedClueCount((prev) => prev + 1);
                    }}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1 mt-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Reveal Clue {revealedClueCount + 1}...</span>
                  </button>
                )}
              </div>
            )}

            {/* Standard Clue Display */}
            {gameType !== "word_detective" && (
              <div className="max-w-xl mx-auto space-y-2">
                <p className="font-display text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                  “{currentItem.clue}”
                </p>

                {/* Audio Listen Button for Listen and Guess */}
                <button
                  id="vocab-listen-clue-btn"
                  onClick={handleListenClue}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 shadow-xs transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Listen to Clue</span>
                </button>
              </div>
            )}

            {/* Hint image if wrong attempts >= 2 */}
            {wrongAttempts >= 2 && currentItem.emoji && (
              <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-amber-800 animate-bounce">
                <span>💡 Visual Hint:</span>
                <span className="text-3xl">{currentItem.emoji}</span>
              </div>
            )}
          </div>

          {/* Interactive Answer Area depending on Game Type */}

          {/* TYPE 1: Multiple Choice */}
          {gameType === "multiple_choice" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              {shuffledOptions.map((opt) => {
                const isThisSelected = selectedAnswer === opt;
                let btnStyle = "bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800";
                if (isAnswered) {
                  if (opt === currentItem.word) {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20";
                  } else if (isThisSelected) {
                    btnStyle = "bg-rose-100 text-rose-800 border-rose-300";
                  }
                }

                return (
                  <button
                    key={opt}
                    id={`vocab-opt-${opt}`}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`py-3.5 px-4 rounded-2xl border-2 font-display font-bold text-base transition-all active:scale-95 text-center ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 2: Picture Choices */}
          {gameType === "picture_choices" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {shuffledOptions.map((opt) => {
                const isTarget = opt === currentItem.word;
                const emojiMap: Record<string, string> = {
                  book: "📖",
                  pencil: "✏️",
                  red: "🔴",
                  blue: "🔵",
                  cat: "🐱",
                  dog: "🐶",
                  cake: "🎂",
                  sea: "🌊",
                  ear: "👂",
                  eye: "👁️",
                  nose: "👃",
                  mouth: "👄",
                  mother: "👩",
                  father: "👨",
                  brother: "👦",
                  sister: "👧",
                  grandfather: "👴",
                  grandmother: "👵",
                  elephant: "🐘",
                  monkey: "🐒",
                  doctor: "🩺",
                  maths: "📐",
                  morning: "🌅",
                  swim: "🏊",
                  train: "🚆",
                  autumn: "🍂",
                  "orange juice": "🍊",
                  "lucky money": "🧧",
                  "Santa Claus": "🎅",
                  astronaut: "👨‍🚀",
                  dinosaur: "🦕",
                };
                const emoji = emojiMap[opt] || "✨";

                return (
                  <button
                    key={opt}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                      isAnswered && isTarget
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800 scale-105"
                        : "bg-slate-50 hover:bg-amber-50 border-slate-200"
                    }`}
                  >
                    <span className="text-4xl mb-2">{emoji}</span>
                    <span className="font-display font-bold text-xs text-slate-700">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 3: Type the Word */}
          {gameType === "type_word" && (
            <form onSubmit={handleCheckTypedWord} className="max-w-md mx-auto space-y-3 text-center">
              <div className="relative">
                <input
                  type="text"
                  id="vocab-type-input"
                  disabled={isAnswered}
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder="Type your guess here..."
                  className="w-full text-center font-display font-bold text-lg py-3.5 px-4 rounded-2xl bg-slate-50 border-2 border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>
              {!isAnswered && (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-sm shadow-md transition-transform active:scale-95"
                >
                  Check My Guess ✨
                </button>
              )}
            </form>
          )}

          {/* TYPE 4: Listen & Guess (Same options with audio focus) */}
          {gameType === "listen_and_guess" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              {shuffledOptions.map((opt) => (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`py-3.5 px-4 rounded-2xl border-2 font-display font-bold text-base transition-all active:scale-95 text-center ${
                    isAnswered && opt === currentItem.word
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : "bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* TYPE 5: Speaking Guess with Microphone */}
          {gameType === "speaking_guess" && (
            <div className="text-center space-y-4 max-w-md mx-auto">
              <p className="text-xs text-slate-500 font-medium">
                Click the microphone button and speak your guessed word clearly!
              </p>

              <button
                id="vocab-speaking-mic-btn"
                disabled={isAnswered}
                onClick={handleToggleVoiceGuess}
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-transform active:scale-95 shadow-lg ${
                  isRecording
                    ? "bg-rose-500 text-white animate-pulse shadow-rose-500/40"
                    : "bg-amber-500 hover:bg-amber-400 text-white shadow-amber-500/30"
                }`}
              >
                {isRecording ? <Mic className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
              </button>

              {spokenTranscript && (
                <div className="p-3 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
                  {spokenTranscript}
                </div>
              )}

              {/* Fallback buttons if mic not working */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-600 block mb-2 font-bold">Or select directly:</span>
                <div className="grid grid-cols-2 gap-2">
                  {shuffledOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswered}
                      className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-xs font-bold text-slate-700"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TYPE 6: Word Detective Options */}
          {gameType === "word_detective" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              {shuffledOptions.map((opt) => (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`py-3.5 px-4 rounded-2xl border-2 font-display font-bold text-base transition-all active:scale-95 text-center ${
                    isAnswered && opt === currentItem.word
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : "bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Feedback & Word Reveal (ONLY AFTER ANSWERED) */}
          {feedbackMessage && (
            <div
              className={`p-4 rounded-2xl text-center font-display font-bold text-sm transition-all ${
                isCorrect
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : "bg-amber-50 text-amber-900 border border-amber-200"
              }`}
            >
              {feedbackMessage}
            </div>
          )}

          {/* Solved Card Info (Reveals phonics, Vietnamese meaning, example sentence) */}
          {isAnswered && isCorrect && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentItem.emoji}</span>
                  <div>
                    <h3 className="font-display font-bold text-xl text-blue-700">{currentItem.word}</h3>
                    <p className="text-xs text-slate-500">{currentItem.phonics} • {currentItem.vietnameseMeaning}</p>
                  </div>
                </div>

                <button
                  onClick={() => speakText(currentItem.word, { rate: 0.9 })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Pronounce Word</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-500 block mb-0.5">Example Sentence:</span>
                <span className="italic">“{currentItem.exampleSentence.replace("___", currentItem.word)}”</span>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                playSound("click");
                if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40"
            >
              Previous Word
            </button>

            <button
              id="vocab-next-word-btn"
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              <span>Next Word</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
