import React, { useState, useEffect } from "react";
import { UserProgress, VocabItem } from "../../types";
import { GLOBAL_SUCCESS_VOCAB } from "../../data/globalSuccessCurriculum";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  Gamepad2,
  Sparkles,
  Trophy,
  RotateCcw,
  Timer,
  Flame,
  CheckCircle,
  HelpCircle,
  Play,
} from "lucide-react";

interface GamesHubProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

type ActiveGame = "menu" | "balloon_pop" | "memory_cards" | "lucky_wheel" | "scramble_dash" | "bomb_defusal";

interface CardItem {
  id: string;
  text: string;
  type: "word" | "emoji";
  matchKey: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const GamesHub: React.FC<GamesHubProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGame>("menu");
  const [score, setScore] = useState<number>(0);

  // BALLOON POP STATE
  const [balloonTargetWord, setBalloonTargetWord] = useState<VocabItem>(GLOBAL_SUCCESS_VOCAB[0]);
  const [balloons, setBalloons] = useState<Array<{ word: string; color: string; isPopped: boolean }>>([]);

  // MEMORY CARDS STATE
  const [memoryCards, setMemoryCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);

  // LUCKY WHEEL STATE
  const [wheelSpinning, setWheelSpinning] = useState<boolean>(false);
  const [wheelResult, setWheelResult] = useState<string | null>(null);

  // SCRAMBLE DASH STATE
  const [scrambleWord, setScrambleWord] = useState<string>("");
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [formedLetters, setFormedLetters] = useState<string[]>([]);

  // BOMB DEFUSAL STATE
  const [bombTimer, setBombTimer] = useState<number>(15);
  const [isBombTicking, setIsBombTicking] = useState<boolean>(false);
  const [bombQuestion, setBombQuestion] = useState<VocabItem>(GLOBAL_SUCCESS_VOCAB[0]);
  const [bombOptions, setBombOptions] = useState<string[]>([]);

  // Initialize Balloon Pop
  const initBalloonPop = () => {
    const randomTarget = GLOBAL_SUCCESS_VOCAB[Math.floor(Math.random() * GLOBAL_SUCCESS_VOCAB.length)];
    setBalloonTargetWord(randomTarget);

    const colors = ["bg-rose-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-pink-500"];
    const pool = [
      randomTarget.word,
      ...(randomTarget.distractors || ["cat", "dog", "book", "cake"]).slice(0, 5),
    ].sort(() => Math.random() - 0.5);

    setBalloons(
      pool.map((w, i) => ({
        word: w,
        color: colors[i % colors.length],
        isPopped: false,
      }))
    );
  };

  const handlePopBalloon = (index: number, word: string) => {
    playSound("pop");
    setBalloons((prev) =>
      prev.map((b, i) => (i === index ? { ...b, isPopped: true } : b))
    );

    if (word.toLowerCase() === balloonTargetWord.word.toLowerCase()) {
      playSound("correct");
      fireConfetti();
      setScore((prev) => prev + 20);
      const { updatedProgress } = addXpAndRecord("games", 20, true);
      onUpdateProgress(updatedProgress);
      setTimeout(initBalloonPop, 1200);
    } else {
      playSound("wrong");
    }
  };

  // Initialize Memory Cards
  const initMemoryCards = () => {
    const sample = GLOBAL_SUCCESS_VOCAB.slice(0, 6);
    const cards: CardItem[] = [];

    sample.forEach((item, idx) => {
      cards.push({
        id: `word-${idx}`,
        text: item.word,
        type: "word",
        matchKey: item.word,
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        id: `emoji-${idx}`,
        text: item.emoji || item.vietnameseMeaning,
        type: "emoji",
        matchKey: item.word,
        isFlipped: false,
        isMatched: false,
      });
    });

    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
  };

  const handleCardClick = (card: CardItem) => {
    if (card.isFlipped || card.isMatched || selectedCards.length === 2) return;
    playSound("click");

    const flippedCard = { ...card, isFlipped: true };
    setMemoryCards((prev) => prev.map((c) => (c.id === card.id ? flippedCard : c)));

    const newSelected = [...selectedCards, flippedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [c1, c2] = newSelected;
      if (c1.matchKey === c2.matchKey) {
        playSound("correct");
        setScore((prev) => prev + 15);
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.matchKey === c1.matchKey ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
        }, 500);
      } else {
        playSound("wrong");
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === c1.id || c.id === c2.id ? { ...c, isFlipped: false } : c
            )
          );
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  // Initialize Word Scramble
  const initScramble = () => {
    const random = GLOBAL_SUCCESS_VOCAB[Math.floor(Math.random() * GLOBAL_SUCCESS_VOCAB.length)];
    setScrambleWord(random.word);
    setScrambledLetters(random.word.split("").sort(() => Math.random() - 0.5));
    setFormedLetters([]);
  };

  const handleToggleLetter = (letter: string, index: number) => {
    playSound("click");
    setFormedLetters((prev) => [...prev, letter]);
  };

  const handleCheckScramble = () => {
    const formed = formedLetters.join("");
    if (formed.toLowerCase() === scrambleWord.toLowerCase()) {
      playSound("correct");
      fireConfetti();
      setScore((prev) => prev + 15);
      const { updatedProgress } = addXpAndRecord("games", 15, true);
      onUpdateProgress(updatedProgress);
      setTimeout(initScramble, 1200);
    } else {
      playSound("wrong");
    }
  };

  // Lucky Wheel Spin
  const handleSpinWheel = () => {
    if (wheelSpinning) return;
    setWheelSpinning(true);
    playSound("click");

    const rewards = [
      "⭐ +50 Bonus XP!",
      "🏅 Master Badge Token",
      "🎈 2x Score in Balloon Pop",
      "✨ Free AI Story Pack",
      "🔥 +1 Streak Booster",
      "🎉 Super Confetti Blast!",
    ];

    setTimeout(() => {
      const chosen = rewards[Math.floor(Math.random() * rewards.length)];
      setWheelResult(chosen);
      setWheelSpinning(false);
      playSound("star");
      fireConfetti();
      const { updatedProgress } = addXpAndRecord("games", 30, true);
      onUpdateProgress(updatedProgress);
    }, 1800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-pink-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-pink-500/20">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800">
                  Games Hub (10+ Mini Games)
                </h1>
                <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-0.5 rounded-full border border-pink-300">
                  Fun & XP
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Luyện tập tiếng Anh qua các trò chơi thú vị: Balloon Pop, Lật thẻ ghi nhớ, Vòng quay & Scramble Dash
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Game Score: {score}</span>
            </div>

            {activeGame !== "menu" && (
              <button
                onClick={() => {
                  playSound("click");
                  setActiveGame("menu");
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Exit Game
              </button>
            )}
          </div>
        </div>
      </div>

      {/* GAME MENU */}
      {activeGame === "menu" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: "balloon_pop" as const,
              title: "🎈 Balloon Pop",
              desc: "Listen or read clue -> Pop matching balloon!",
              bg: "hover:border-rose-300 hover:bg-rose-50/50",
            },
            {
              id: "memory_cards" as const,
              title: "🃏 Memory Flip",
              desc: "Match English words with pictures!",
              bg: "hover:border-blue-300 hover:bg-blue-50/50",
            },
            {
              id: "lucky_wheel" as const,
              title: "🎡 Lucky Wheel",
              desc: "Spin the wheel for XP and gifts!",
              bg: "hover:border-amber-300 hover:bg-amber-50/50",
            },
            {
              id: "scramble_dash" as const,
              title: "🔤 Scramble Dash",
              desc: "Unscramble letters to make words!",
              bg: "hover:border-purple-300 hover:bg-purple-50/50",
            },
          ].map((game) => (
            <button
              key={game.id}
              onClick={() => {
                playSound("click");
                setActiveGame(game.id);
                if (game.id === "balloon_pop") initBalloonPop();
                if (game.id === "memory_cards") initMemoryCards();
                if (game.id === "scramble_dash") initScramble();
              }}
              className={`p-6 rounded-3xl bg-white border-2 border-slate-200 text-left transition-all active:scale-95 shadow-xs ${game.bg}`}
            >
              <h3 className="font-display font-bold text-lg text-slate-800 mb-1">{game.title}</h3>
              <p className="text-xs text-slate-500">{game.desc}</p>
            </button>
          ))}
        </div>
      )}

      {/* GAME 1: BALLOON POP */}
      {activeGame === "balloon_pop" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 text-center">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 max-w-md mx-auto">
            <span className="text-xs font-bold text-rose-800 block mb-1">Pop the balloon matching:</span>
            <p className="font-display font-bold text-lg text-slate-800">
              “{balloonTargetWord.clue}”
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-6">
            {balloons.map((b, idx) => (
              <button
                key={idx}
                disabled={b.isPopped}
                onClick={() => handlePopBalloon(idx, b.word)}
                className={`h-28 rounded-full flex flex-col items-center justify-center text-white font-display font-bold text-base shadow-lg transition-transform active:scale-75 ${
                  b.color
                } ${b.isPopped ? "opacity-0 scale-0 pointer-events-none" : "hover:scale-105"}`}
              >
                <span>🎈</span>
                <span>{b.word}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 2: MEMORY FLIP */}
      {activeGame === "memory_cards" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 text-center">
          <h2 className="font-display font-bold text-lg text-slate-800">
            Find the matching English pairs!
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            {memoryCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`h-24 sm:h-28 rounded-2xl border-2 font-display font-bold text-sm sm:text-base flex items-center justify-center p-2 transition-all duration-300 ${
                  card.isMatched
                    ? "bg-emerald-100 border-emerald-400 text-emerald-800 opacity-60"
                    : card.isFlipped
                    ? "bg-white border-blue-500 text-blue-700 shadow-md"
                    : "bg-blue-600 border-blue-700 text-white hover:bg-blue-500"
                }`}
              >
                {card.isFlipped || card.isMatched ? card.text : "❓"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 3: LUCKY WHEEL */}
      {activeGame === "lucky_wheel" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 text-center">
          <h2 className="font-display font-bold text-xl text-slate-800">
            Spin the English Wheel of Fortune! 🎡
          </h2>

          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-8 border-amber-400 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white font-display font-extrabold text-2xl mx-auto shadow-xl transition-all">
            <span className={wheelSpinning ? "animate-spin" : ""}>🎯</span>
          </div>

          <button
            disabled={wheelSpinning}
            onClick={handleSpinWheel}
            className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow-md transition-transform active:scale-95"
          >
            {wheelSpinning ? "Spinning..." : "SPIN NOW! ✨"}
          </button>

          {wheelResult && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 font-display font-bold text-base text-amber-900 animate-fade-in">
              🎉 Result: {wheelResult}
            </div>
          )}
        </div>
      )}

      {/* GAME 4: SCRAMBLE DASH */}
      {activeGame === "scramble_dash" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 text-center">
          <h2 className="font-display font-bold text-lg text-slate-800">
            Arrange letters into the correct English word:
          </h2>

          <div className="min-h-[70px] p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-purple-300 flex items-center justify-center gap-2 max-w-md mx-auto">
            {formedLetters.length === 0 ? (
              <span className="text-xs text-slate-400">Click letters below</span>
            ) : (
              formedLetters.map((l, i) => (
                <span
                  key={i}
                  className="w-10 h-10 rounded-xl bg-purple-600 text-white font-display font-bold text-lg flex items-center justify-center shadow-xs"
                >
                  {l}
                </span>
              ))
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
            {scrambledLetters.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleToggleLetter(letter, idx)}
                className="w-12 h-12 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-200 font-display font-bold text-lg text-slate-800 shadow-xs"
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                playSound("click");
                setFormedLetters([]);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
            >
              Clear
            </button>
            <button
              onClick={handleCheckScramble}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
            >
              Check Word ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
