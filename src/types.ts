export type GradeLevel = 1 | 2 | 3 | 4 | 5;

export type AppSkill =
  | "dashboard"
  | "vocabulary"
  | "speaking"
  | "writing"
  | "reading"
  | "listening"
  | "grammar"
  | "pronunciation"
  | "games"
  | "ai-tutor"
  | "ai-assistant"
  | "progress"
  | "curriculum"
  | "teacher"
  | "smart-classroom";

export type VocabGameType =
  | "multiple_choice"
  | "picture_choices"
  | "type_word"
  | "listen_and_guess"
  | "speaking_guess"
  | "word_detective";

export interface VocabItem {
  id: string;
  word: string;
  clue: string; // MUST NOT CONTAIN THE TARGET WORD
  detailedClues?: string[]; // Multiple progressive clues for Word Detective
  distractors: string[];
  exampleSentence: string;
  vietnameseMeaning?: string;
  phonics?: string;
  emoji?: string;
  imageUrl?: string;
  grade: GradeLevel;
  unit?: number;
  lesson?: string;
  topic: string;
  difficulty?: "easy" | "medium" | "hard";
}

export type SpeakingLevel = 1 | 2 | 3 | 4 | 5;

export interface SpeakingItem {
  id: string;
  level: SpeakingLevel; // 1: Repeat, 2: Answer, 3: Picture Speaking, 4: Role Play, 5: Topic Speaking
  levelTitle: string;
  grade: GradeLevel;
  unit?: number;
  topic: string;
  prompt: string;
  targetAudioText?: string;
  imageUrl?: string;
  rolePlayDialogue?: { speaker: string; line: string }[];
  expectedKeywords?: string[];
  sampleAnswer?: string;
  timeLimitSeconds?: number;
}

export type WritingLevel = 1 | 2 | 3 | 4 | 5;

export interface WritingItem {
  id: string;
  level: WritingLevel; // 1: Word Order, 2: Fill-in, 3: Picture writing, 4: Paragraph, 5: AI Model Studio
  levelTitle: string;
  grade: GradeLevel;
  unit?: number;
  topic: string;
  prompt: string;
  scrambledWords?: string[];
  jumbledWords?: string[];
  targetSentence?: string;
  keywords?: string[];
  fillOptions?: string[];
  starterText?: string;
  imageUrl?: string;
  modelAnswer?: string;
}

export type WritingErrorCategory =
  | "subject_verb_agreement" // Hòa hợp Chủ ngữ - Động từ
  | "verb_tense"             // Chia thì động từ (Tenses)
  | "spelling"               // Lỗi chính tả (Spelling)
  | "punctuation_caps"       // Dấu câu & Viết hoa (Punctuation & Capitalization)
  | "articles"               // Mạo từ a/an/the (Articles)
  | "plural_nouns"           // Danh từ số ít / số nhiều (Plural nouns)
  | "word_choice"            // Dùng từ / Ngữ cảnh (Word choice)
  | "word_order"             // Trật tự từ / Cấu trúc câu (Word order)
  | "other";

export interface WritingCorrection {
  type?: WritingErrorCategory | string;
  categoryTitle?: string; // e.g. "Hòa hợp Chủ ngữ - Động từ (Subject-Verb Agreement)"
  severity?: "error" | "warning" | "tip";
  original: string; // The incorrect part
  suggestion: string; // The corrected part
  correction?: string;
  ruleExplanation: string; // Specific grammatical rule explanation
  actionableHint: string; // Step-by-step actionable guidance for student
  example?: {
    incorrect: string;
    correct: string;
  };
  reason?: string;
}

export interface WritingRubric {
  grammarScore: number; // e.g. 23/25
  grammarFeedback: string;
  vocabularyScore: number; // e.g. 25/25
  vocabularyFeedback: string;
  spellingPunctuationScore: number; // e.g. 24/25
  spellingPunctuationFeedback: string;
  contentFlowScore: number; // e.g. 23/25
  contentFlowFeedback: string;
}

export interface WritingFeedbackResult {
  score: number;
  xpEarned?: number;
  praise: string;
  encouragement: string;
  correctedText?: string;
  improvedVersion: string;
  vietnameseTranslation?: string;
  rubric?: WritingRubric;
  corrections: WritingCorrection[];
  actionableGuidance?: string[]; // Specific, numbered actionable steps
  vocabularyHighlights?: string[];
  targetVocabUsed?: string[];
  friendlyTip?: string;
  actualWordCount?: number;
}

export interface ReadingQuestion {
  id: number;
  type?: "multiple_choice" | "true_false" | "fill_in" | "find_info";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ReadingPassage {
  id: string;
  grade: GradeLevel;
  unit?: number;
  topic: string;
  title: string;
  passage?: string;
  passageText?: string;
  vietnameseTranslation?: string;
  preReadingPrompt?: string;
  wordCount?: number;
  imageUrl?: string;
  vocabularyHighlights?: string[];
  keyVocabulary?: { word: string; meaning: string }[];
  questions: ReadingQuestion[];
}

export type ListeningType =
  | "listen_choose"
  | "listen_match"
  | "listen_number"
  | "listen_tick"
  | "listen_complete"
  | "listen_answer"
  | "listen_repeat"
  | "listen_picture";

export interface ListeningItem {
  id: string;
  grade: GradeLevel;
  unit?: number;
  topic: string;
  title: string;
  type: ListeningType;
  audioScript: string;
  prompt?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  imageUrl?: string;
  questions?: {
    id: number;
    question: string;
    options?: string[];
    correctAnswer: string;
    image?: string;
    explanation?: string;
  }[];
}

export type GrammarCategory =
  | "be"
  | "have_has"
  | "present_simple"
  | "present_continuous"
  | "past_simple"
  | "future"
  | "can_cant"
  | "there_is_are"
  | "this_that_these_those"
  | "possessives"
  | "personal_pronouns"
  | "prepositions"
  | "wh_questions"
  | "articles"
  | "plural_nouns"
  | "imperatives"
  | "comparatives";

export interface GrammarQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface GrammarLesson {
  id: string;
  grade: GradeLevel;
  category: GrammarCategory;
  title: string;
  vietnameseTitle: string;
  exampleContext?: string;
  discoveryExplanation?: string;
  structureFormula?: string;
  vietnameseExplanation?: string;
  discoverExamples?: string[];
  noticeRule?: string;
  learnExplanation?: string;
  practiceQuestions?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  challengeQuestions?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  useItPrompt?: string;
  guidedPractice?: {
    question: string;
    answer: string;
    hint: string;
  }[];
  quiz?: GrammarQuizQuestion[];
}

export type PronunciationType =
  | "sounds"
  | "minimal_pair"
  | "minimal_pairs"
  | "word_stress"
  | "sentence_stress"
  | "intonation";

export interface PronunciationItem {
  id: string;
  type: PronunciationType;
  title: string;
  grade: GradeLevel;
  word?: string;
  ipa?: string;
  phonetic?: string;
  contrastWord?: string;
  contrastIpa?: string;
  explanation?: string;
  phoneticPattern?: string;
  stressVisual?: string;
  pitchArrow?: "up" | "down";
  sentence?: string;
  targetWordOrSentence?: string;
  tip?: string;
  syllables?: any[];
  intonationPattern?: string;
  minimalPairs?: { word1: string; word2: string; phonetic1: string; phonetic2: string; audio1: string; audio2: string }[];
  stressedWordInSentence?: string;
  intonationType?: "rising" | "falling";
  explanationVietnamese?: string;
}

export type MiniGameId =
  | "guess_word"
  | "word_scramble"
  | "spin_wheel"
  | "word_jump"
  | "vocab_race"
  | "balloon_pop"
  | "memory_cards"
  | "quiz_challenge"
  | "word_detective"
  | "speaking_challenge";

export interface Badge {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  description: string;
  unlockedAt?: string;
  requiredXp?: number;
  skill?: AppSkill;
}

export interface MissedWordReview {
  wordId: string;
  word: string;
  clue: string;
  topic: string;
  wrongCount: number;
  nextReviewDate: string; // ISO date string
  intervalDays: number;
  repetitionCount?: number;
  easeFactor?: number; // Ebbinghaus SM-2 ease factor (default 2.5)
  memoryRetention?: number; // 0 to 100%
  lastReviewedDate?: string;
  masteryLevel?: "new" | "learning" | "reviewing" | "mastered";
}

// Spaced Repetition Memory Item
export interface SpacedRepetitionWord {
  wordId: string;
  word: string;
  clue: string;
  topic: string;
  vietnameseMeaning?: string;
  emoji?: string;
  phonics?: string;
  exampleSentence?: string;
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  memoryStrength: number; // Stability S in Ebbinghaus model
  retentionRate: number; // R = e^(-t/S)
  lastReviewedDate: string;
  nextReviewDate: string;
  status: "learning" | "review" | "mastered";
}

// Interactive Storytelling Types
export interface StoryChoice {
  id: string;
  choiceText: string;
  choiceTextVi?: string;
  emoji?: string;
  nextNodeId: string;
}

export interface StoryNode {
  id: string;
  chapterTitle: string;
  illustrationUrl?: string;
  emojiIcon?: string;
  text: string;
  textVi?: string;
  vocabularyGlossary?: { word: string; phonics: string; meaningVi: string; definition: string }[];
  comprehensionQuestion?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
  choices?: StoryChoice[];
  isEnding?: boolean;
  endingType?: "victory" | "friendship" | "discovery" | "try_again";
  moralLesson?: string;
}

export interface PostStoryQuestion {
  id: string;
  question: string;
  questionVi?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationVi?: string;
}

export interface InteractiveStory {
  id: string;
  title: string;
  titleVi: string;
  grade: GradeLevel;
  unit?: number;
  topic: string;
  coverEmoji: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rootNodeId: string;
  nodes: Record<string, StoryNode>;
  postStoryQuestions?: PostStoryQuestion[];
}

// AI Speech & Pronunciation Analysis Types
export interface PhonemeFeedback {
  phoneme: string;
  targetSound: string;
  studentSound: string;
  status: "correct" | "almost" | "incorrect";
  tip: string;
  tipVi: string;
  articulationGuide: {
    lipPosition: "spread" | "rounded" | "neutral" | "closed";
    tonguePosition: "front_high" | "front_mid" | "back_high" | "tip_teeth" | "tip_alveolar" | "retroflex";
    voicing: "voiced" | "voiceless";
    airflow: "plosive" | "fricative" | "nasal" | "continuous";
  };
}

export interface SyllableStressFeedback {
  syllable: string;
  isStressedTarget: boolean;
  isStressedStudent: boolean;
  accuracy: "correct" | "incorrect";
}

export interface PronunciationEvaluationResult {
  overallScore: number;
  soundScore: number;
  stressScore: number;
  intonationScore: number;
  targetText: string;
  recognizedText: string;
  phonemes: PhonemeFeedback[];
  syllables: SyllableStressFeedback[];
  intonationType: "rising" | "falling" | "flat";
  intonationDetected: "rising" | "falling" | "flat";
  praise: string;
  coachAdviceVi: string;
  coachAdviceEn: string;
  mouthGuideImage?: string;
}

export interface SkillStat {
  score: number;
  attempts: number;
}

export interface UserProgress {
  studentName: string;
  isOwner?: boolean;
  ownerName?: string;
  grade: GradeLevel;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  levelTitle: "🌱 Beginner" | "🌿 Explorer" | "🌳 Learner" | "⭐ English Star" | "🏆 English Champion";
  badges: string[]; // Badge IDs
  completedItemIds: string[];
  missedWords: MissedWordReview[];
  srsWords?: SpacedRepetitionWord[];
  skillStats: {
    vocabulary: SkillStat;
    speaking: SkillStat;
    writing: SkillStat;
    reading: SkillStat;
    listening: SkillStat;
    grammar: SkillStat;
    pronunciation: SkillStat;
    games: SkillStat;
  };
  dailyChallenge: {
    date: string;
    completedVocab: boolean;
    completedListening: boolean;
    completedReading: boolean;
    completedGrammar: boolean;
    completedSpeaking: boolean;
    completedWriting: boolean;
    allDone: boolean;
  };
}

export interface MiloChatMessage {
  id: string;
  sender: "milo" | "user";
  text: string;
  vietnameseHint?: string;
  suggestedFollowUps?: string[];
  timestamp: string;
}

export interface TeacherStudent {
  id: string;
  name: string;
  grade: GradeLevel;
  xp: number;
  streak: number;
  accuracy: number;
  weakSkill: string;
  lastActive: string;
}

export interface ClassTeam {
  id: string;
  name: string;
  score: number;
  color: string;
}

export interface LearningPack {
  topic: string;
  grade: GradeLevel;
  vocabulary: Array<{ word: string; clue: string }>;
  readingPassage?: {
    title: string;
    text: string;
    questions: string[];
  };
  speakingPrompts?: string[];
  writingTask?: {
    prompt: string;
  };
  miniGameIdea?: string;
}

// Global Success Official Units & Lessons Hierarchy (hoclieu.vn / taphuan.nxbgd.vn)
export interface GlobalSuccessSentenceStructure {
  pattern: string;
  vietnameseMeaning: string;
  sampleDialogue: { speaker: string; text: string; textVi?: string }[];
}

export interface GlobalSuccessLesson {
  lessonNumber: 1 | 2 | 3;
  lessonTitle: string;
  focus: "vocabulary_phonics" | "sentence_patterns" | "reading_communication";
  phonicsSound?: string;
  vocabulary: VocabItem[];
  sentenceStructures: GlobalSuccessSentenceStructure[];
  chantOrAudioScript?: string;
  readingMiniStory?: {
    title: string;
    text: string;
    translationVi: string;
  };
}

export interface GlobalSuccessUnit {
  grade: GradeLevel;
  unitNumber: number;
  unitTitle: string;
  unitTitleVi: string;
  theme: string;
  icon: string;
  semester: 1 | 2;
  lessons: GlobalSuccessLesson[];
}

export interface TeacherAuthProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  schoolName: string;
}

// AI Assistant & Sophie Speaking Types
export interface AiAssistantResponse {
  directAnswer: string;
  detailedExplanation: string;
  category: "grammar" | "vocabulary" | "phonics" | "sentence" | "exercise";
  formula?: string;
  examples: Array<{ english: string; vietnamese: string; note?: string }>;
  commonMistakes?: string[];
  quickQuiz?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
  speechText?: string;
}

export interface SophieSpeakingTopic {
  id: string;
  name: string;
  nameEn: string;
  grade: GradeLevel;
  unitNumber?: number;
  semester?: 1 | 2;
  level: "basic" | "intermediate" | "advanced";
  levelLabel: string;
  icon: string;
  descriptionVi: string;
  initialQuestion: string;
  initialQuestionVi: string;
  sampleAnswer: string;
  sampleAnswerVi: string;
  suggestedKeywords: string[];
  dialogueChain: Array<{
    turn: number;
    question: string;
    questionVi: string;
    sampleAnswer: string;
  }>;
}

export interface SophieFeedbackResult {
  hasError: boolean;
  score: number;
  stars: number;
  sophieComment: string;
  sophieCommentVi: string;
  errorDetail?: {
    errorType: "pronunciation" | "grammar" | "word_choice" | "incomplete";
    problematicWord: string;
    correctForm: string;
    phonicsGuide: string;
    explanationVi: string;
  };
  needsRepeatPractice: boolean;
  repeatTarget?: string;
  nextQuestion?: string;
  nextQuestionVi?: string;
  conversationalBridge?: string;
  isDialogueCompleted?: boolean;
  dialogueTurn?: number;
  totalDialogueTurns?: number;
  xpEarned: number;
}

export interface SophieHintData {
  starters: string[];
  sampleFullAnswer: string;
  vietnameseTranslation: string;
  keywords: string[];
  tipsVi: string;
}

