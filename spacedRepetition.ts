import { SpacedRepetitionWord, VocabItem, UserProgress } from "../types";
import { loadUserProgress, saveUserProgress } from "./storage";

/**
 * Ebbinghaus Spaced Repetition System (SRS) Utility
 * Model: R = e^(-t / S) where:
 *   R = estimated memory retention (0.0 to 1.0)
 *   t = elapsed days since last review
 *   S = memory stability (strength in days)
 */

export function calculateRetentionRate(lastReviewedDate: string, memoryStrength: number): number {
  if (!lastReviewedDate || memoryStrength <= 0) return 0;
  const now = new Date().getTime();
  const last = new Date(lastReviewedDate).getTime();
  const diffDays = Math.max(0, (now - last) / (1000 * 60 * 60 * 24));
  
  // Ebbinghaus formula: R = e^(-t / S)
  const retention = Math.exp(-diffDays / Math.max(1, memoryStrength));
  return Math.min(100, Math.max(5, Math.round(retention * 100)));
}

export function initializeSrsWord(vocabItem: VocabItem): SpacedRepetitionWord {
  const today = new Date().toISOString().split("T")[0];
  return {
    wordId: vocabItem.id,
    word: vocabItem.word,
    clue: vocabItem.clue,
    topic: vocabItem.topic,
    vietnameseMeaning: vocabItem.vietnameseMeaning,
    emoji: vocabItem.emoji,
    phonics: vocabItem.phonics,
    exampleSentence: vocabItem.exampleSentence,
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    memoryStrength: 1.0,
    retentionRate: 100,
    lastReviewedDate: today,
    nextReviewDate: today,
    status: "learning",
  };
}

export type SrsRating = "forgot" | "hard" | "good" | "easy";

/**
 * Process a spaced repetition review rating
 */
export function reviewSrsWord(
  item: SpacedRepetitionWord,
  rating: SrsRating
): SpacedRepetitionWord {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  
  let newRepetitions = item.repetitions;
  let newInterval = item.intervalDays;
  let newEaseFactor = item.easeFactor || 2.5;
  let newStrength = item.memoryStrength || 1.0;
  let newStatus: "learning" | "review" | "mastered" = item.status;

  if (rating === "forgot") {
    // Memory lapse: reset repetition count & schedule for immediate review
    newRepetitions = 0;
    newInterval = 0; // Today or tomorrow
    newEaseFactor = Math.max(1.3, newEaseFactor - 0.2);
    newStrength = 0.5;
    newStatus = "learning";
  } else if (rating === "hard") {
    newRepetitions += 1;
    newInterval = newInterval === 0 ? 1 : Math.max(1, Math.round(newInterval * 1.2));
    newEaseFactor = Math.max(1.3, newEaseFactor - 0.15);
    newStrength = Math.max(1, newInterval * 0.9);
    newStatus = "learning";
  } else if (rating === "good") {
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 3;
    } else {
      newInterval = Math.round(newInterval * newEaseFactor);
    }
    newRepetitions += 1;
    newStrength = newInterval * 1.2;
    newStatus = newInterval >= 21 ? "mastered" : "review";
  } else if (rating === "easy") {
    if (newRepetitions === 0) {
      newInterval = 3;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(newInterval * newEaseFactor * 1.3);
    }
    newRepetitions += 1;
    newEaseFactor = Math.min(3.0, newEaseFactor + 0.15);
    newStrength = newInterval * 1.5;
    newStatus = newInterval >= 14 ? "mastered" : "review";
  }

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + Math.max(1, newInterval));
  const nextDateStr = newInterval === 0 ? todayStr : nextDate.toISOString().split("T")[0];

  return {
    ...item,
    repetitions: newRepetitions,
    intervalDays: newInterval,
    easeFactor: Number(newEaseFactor.toFixed(2)),
    memoryStrength: Number(newStrength.toFixed(1)),
    retentionRate: 100,
    lastReviewedDate: todayStr,
    nextReviewDate: nextDateStr,
    status: newStatus,
  };
}

/**
 * Sync or update an SRS item in user progress
 */
export function recordWordPerformanceInSrs(
  wordItem: VocabItem,
  isCorrect: boolean
): { progress: UserProgress; srsItem: SpacedRepetitionWord } {
  const current = loadUserProgress();
  if (!current.srsWords) current.srsWords = [];

  let existingIndex = current.srsWords.findIndex(
    (w) => w.word.toLowerCase() === wordItem.word.toLowerCase()
  );

  let srsItem: SpacedRepetitionWord;
  if (existingIndex >= 0) {
    const existing = current.srsWords[existingIndex];
    srsItem = reviewSrsWord(existing, isCorrect ? "good" : "forgot");
    current.srsWords[existingIndex] = srsItem;
  } else {
    const initial = initializeSrsWord(wordItem);
    srsItem = reviewSrsWord(initial, isCorrect ? "good" : "forgot");
    current.srsWords.push(srsItem);
  }

  saveUserProgress(current);
  return { progress: current, srsItem };
}

/**
 * Get all words due for review today based on Ebbinghaus scheduling
 */
export function getDueSrsWords(srsWords: SpacedRepetitionWord[] = []): SpacedRepetitionWord[] {
  const todayStr = new Date().toISOString().split("T")[0];
  return srsWords.filter((item) => {
    return !item.nextReviewDate || item.nextReviewDate <= todayStr;
  });
}
