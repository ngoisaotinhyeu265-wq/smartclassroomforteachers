import { UserProgress, Badge, GradeLevel, VocabItem, TeacherStudent, ClassTeam } from "../types";

const STORAGE_KEY = "EPLH_USER_PROGRESS_V1";
const TEACHER_VOCAB_KEY = "EPLH_TEACHER_VOCAB_V1";
const CLASS_TEAMS_KEY = "EPLH_CLASS_TEAMS_V1";

export const ALL_BADGES: Badge[] = [
  {
    id: "first_step",
    name: "First Steps",
    nameVi: "Bước chân đầu tiên",
    icon: "🌱",
    description: "Completed your first English activity!",
    requiredXp: 10,
  },
  {
    id: "vocab_master",
    name: "Vocabulary Master",
    nameVi: "Bậc thầy từ vựng",
    icon: "🏅",
    description: "Guessed 20 words correctly in Vocabulary Hub!",
    requiredXp: 100,
    skill: "vocabulary",
  },
  {
    id: "speaking_star",
    name: "Speaking Star",
    nameVi: "Ngôi sao nói giỏi",
    icon: "🌟",
    description: "Completed 5 speaking exercises with clear pronunciation!",
    requiredXp: 120,
    skill: "speaking",
  },
  {
    id: "reading_hero",
    name: "Reading Hero",
    nameVi: "Hiệp sĩ đọc hiểu",
    icon: "📖",
    description: "Read 3 stories and scored 100% on comprehension!",
    requiredXp: 150,
    skill: "reading",
  },
  {
    id: "listening_expert",
    name: "Listening Expert",
    nameVi: "Chuyên gia luyện nghe",
    icon: "🎧",
    description: "Completed 5 listening audio challenges!",
    requiredXp: 140,
    skill: "listening",
  },
  {
    id: "writing_star",
    name: "Writing Star",
    nameVi: "Cây bút tài năng",
    icon: "✍️",
    description: "Wrote and submitted great sentences with AI feedback!",
    requiredXp: 130,
    skill: "writing",
  },
  {
    id: "grammar_explorer",
    name: "Grammar Explorer",
    nameVi: "Nhà khám phá ngữ pháp",
    icon: "🔤",
    description: "Mastered 3 Grammar Lab lessons!",
    requiredXp: 120,
    skill: "grammar",
  },
  {
    id: "pronunciation_pro",
    name: "Pronunciation Pro",
    nameVi: "Chuyên gia phát âm",
    icon: "🗣️",
    description: "Practiced word stress, sentence stress, and intonation!",
    requiredXp: 110,
    skill: "pronunciation",
  },
  {
    id: "7_day_learner",
    name: "7-Day Streak Learner",
    nameVi: "Chăm chỉ 7 ngày liên tục",
    icon: "🔥",
    description: "Maintained a 7-day study streak!",
    requiredXp: 300,
  },
  {
    id: "hundred_words",
    name: "100 Words Champion",
    nameVi: "Chiến binh 100 từ vựng",
    icon: "🏆",
    description: "Learned over 100 English words!",
    requiredXp: 500,
  },
];

export function getLevelTitle(xp: number): "🌱 Beginner" | "🌿 Explorer" | "🌳 Learner" | "⭐ English Star" | "🏆 English Champion" {
  if (xp >= 600) return "🏆 English Champion";
  if (xp >= 350) return "⭐ English Star";
  if (xp >= 180) return "🌳 Learner";
  if (xp >= 60) return "🌿 Explorer";
  return "🌱 Beginner";
}

const DEFAULT_PROGRESS: UserProgress = {
  studentName: "Teacher Thanh Nguyễn",
  isOwner: true,
  ownerName: "Teacher Thanh Nguyễn",
  grade: 3,
  xp: 320,
  streakDays: 7,
  lastActiveDate: new Date().toISOString().split("T")[0],
  levelTitle: "⭐ English Star",
  badges: ["first_step", "vocab_master", "7_day_learner"],
  completedItemIds: [],
  missedWords: [],
  srsWords: [],
  skillStats: {
    vocabulary: { score: 92, attempts: 24 },
    speaking: { score: 88, attempts: 15 },
    writing: { score: 86, attempts: 12 },
    reading: { score: 94, attempts: 18 },
    listening: { score: 85, attempts: 16 },
    grammar: { score: 92, attempts: 20 },
    pronunciation: { score: 90, attempts: 14 },
    games: { score: 95, attempts: 22 },
  },
  dailyChallenge: {
    date: new Date().toISOString().split("T")[0],
    completedVocab: true,
    completedListening: true,
    completedReading: true,
    completedGrammar: true,
    completedSpeaking: false,
    completedWriting: false,
    allDone: false,
  },
};

export function loadUserProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const data = JSON.parse(raw);
    
    // Auto-migrate from previous Minh Anh default to Teacher Thanh Nguyễn
    if (data.studentName === "Minh Anh" || !data.studentName) {
      data.studentName = "Teacher Thanh Nguyễn";
      data.isOwner = true;
      data.ownerName = "Teacher Thanh Nguyễn";
    }
    if (!data.srsWords) {
      data.srsWords = [];
    }

    // Ensure daily challenge syncs with current date
    const today = new Date().toISOString().split("T")[0];
    if (data.dailyChallenge?.date !== today) {
      data.dailyChallenge = {
        date: today,
        completedVocab: false,
        completedListening: false,
        completedReading: false,
        completedGrammar: false,
        completedSpeaking: false,
        completedWriting: false,
        allDone: false,
      };
    }
    return data;
  } catch (e) {
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    progress.levelTitle = getLevelTitle(progress.xp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {}
}

export function addXpAndRecord(
  skill: keyof UserProgress["skillStats"],
  xpGain: number,
  isCorrect: boolean,
  itemId?: string
): { updatedProgress: UserProgress; unlockedBadges: Badge[] } {
  const current = loadUserProgress();
  current.xp += xpGain;
  current.levelTitle = getLevelTitle(current.xp);

  // Update skill stats
  const stat = current.skillStats[skill];
  if (stat) {
    stat.attempts += 1;
    if (isCorrect) {
      stat.score = Math.min(100, Math.round((stat.score * (stat.attempts - 1) + 100) / stat.attempts));
    } else {
      stat.score = Math.max(0, Math.round((stat.score * (stat.attempts - 1) + 50) / stat.attempts));
    }
  }

  if (itemId && !current.completedItemIds.includes(itemId)) {
    current.completedItemIds.push(itemId);
  }

  // Check badges
  const newlyUnlocked: Badge[] = [];
  ALL_BADGES.forEach((badge) => {
    if (!current.badges.includes(badge.id)) {
      if (badge.requiredXp && current.xp >= badge.requiredXp) {
        current.badges.push(badge.id);
        newlyUnlocked.push(badge);
      }
    }
  });

  saveUserProgress(current);
  return { updatedProgress: current, unlockedBadges: newlyUnlocked };
}

export function recordMissedWord(wordItem: VocabItem): void {
  const current = loadUserProgress();
  const existingIdx = current.missedWords.findIndex((w) => w.word.toLowerCase() === wordItem.word.toLowerCase());

  const today = new Date();
  // Spaced repetition interval: 1 day -> 3 days -> 7 days
  if (existingIdx >= 0) {
    current.missedWords[existingIdx].wrongCount += 1;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + 1);
    current.missedWords[existingIdx].nextReviewDate = nextDate.toISOString().split("T")[0];
  } else {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + 1);
    current.missedWords.push({
      wordId: wordItem.id,
      word: wordItem.word,
      clue: wordItem.clue,
      topic: wordItem.topic,
      wrongCount: 1,
      nextReviewDate: nextDate.toISOString().split("T")[0],
      intervalDays: 1,
    });
  }
  saveUserProgress(current);
}

export function removeMasteredWord(wordText: string): void {
  const current = loadUserProgress();
  current.missedWords = current.missedWords.filter((w) => w.word.toLowerCase() !== wordText.toLowerCase());
  saveUserProgress(current);
}

// Teacher custom vocabulary storage
export function loadTeacherVocab(): VocabItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TEACHER_VOCAB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveTeacherVocab(items: VocabItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TEACHER_VOCAB_KEY, JSON.stringify(items));
  } catch (e) {}
}

// Class Teams Storage for Class Mode
export const DEFAULT_TEAMS: ClassTeam[] = [
  { id: "team-a", name: "Team Red (Lions) 🦁", score: 0, color: "bg-red-500 text-white" },
  { id: "team-b", name: "Team Blue (Dolphins) 🐬", score: 0, color: "bg-blue-500 text-white" },
  { id: "team-c", name: "Team Green (Dragons) 🐲", score: 0, color: "bg-emerald-500 text-white" },
  { id: "team-d", name: "Team Yellow (Stars) ⭐", score: 0, color: "bg-amber-500 text-slate-900" },
];

export function loadClassTeams(): ClassTeam[] {
  if (typeof window === "undefined") return DEFAULT_TEAMS;
  try {
    const raw = localStorage.getItem(CLASS_TEAMS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_TEAMS;
  } catch (e) {
    return DEFAULT_TEAMS;
  }
}

export function saveClassTeams(teams: ClassTeam[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CLASS_TEAMS_KEY, JSON.stringify(teams));
  } catch (e) {}
}

// Demo Teacher Students
export const DEMO_STUDENTS: TeacherStudent[] = [
  { id: "s1", name: "Minh Anh", grade: 3, xp: 420, streak: 5, accuracy: 88, weakSkill: "Listening", lastActive: "Today" },
  { id: "s2", name: "Bảo Nam", grade: 3, xp: 380, streak: 4, accuracy: 84, weakSkill: "Writing", lastActive: "Today" },
  { id: "s3", name: "Khánh Linh", grade: 3, xp: 510, streak: 7, accuracy: 94, weakSkill: "None", lastActive: "Yesterday" },
  { id: "s4", name: "Đức Huy", grade: 3, xp: 260, streak: 2, accuracy: 72, weakSkill: "Speaking", lastActive: "2 days ago" },
  { id: "s5", name: "Mai Trang", grade: 3, xp: 450, streak: 6, accuracy: 90, weakSkill: "Grammar", lastActive: "Today" },
];
