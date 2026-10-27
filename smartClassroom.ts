export type ClassroomDifficulty = "Easy" | "Useful" | "Natural" | "Must Know";
export type ClassroomTone = "friendly" | "encouraging" | "neutral" | "firm" | "playful";
export type ClassroomCategory =
  | "greetings"
  | "attention"
  | "instructions"
  | "teaching"
  | "checking"
  | "pair_group"
  | "praise"
  | "feedback"
  | "management"
  | "transitions"
  | "time_management"
  | "ending";

export interface SmartClassroomPhrase {
  id: string;
  english: string;
  vietnamese: string;
  category: ClassroomCategory;
  categoryTitle: string;
  subcategory?: string;
  context: string;
  level: "Primary";
  difficulty: ClassroomDifficulty;
  tone: ClassroomTone;
  tags: string[];
  alternatives?: string[];
  example?: string;
  teacherNotes?: string;
  ipa?: string;
  isMustKnow?: boolean;
  // Call & response specifics
  isCallResponse?: boolean;
  teacherCall?: string;
  studentResponse?: string;
  signalNumber?: number;
}

export type SmartClassroomTab =
  | "home"
  | "teacher-mode"
  | "classroom-script"
  | "report-comments"
  | "greetings"
  | "attention"
  | "instructions"
  | "teaching"
  | "checking"
  | "praise"
  | "feedback"
  | "transitions"
  | "management"
  | "ending"
  | "dictionary"
  | "favorites"
  | "pronunciation";

export interface ReportCommentItem {
  id: string;
  english: string;
  vietnamese: string;
  category:
    | "excellent"
    | "good"
    | "progress"
    | "practice"
    | "skills"
    | "attitude"
    | "short";
  skillFocus?:
    | "Listening"
    | "Speaking"
    | "Reading"
    | "Writing"
    | "Vocabulary"
    | "Pronunciation"
    | "General";
  wordCount?: number;
  variations?: string[];
}

export interface SmartCommentCriteria {
  achievement:
    | "Excellent"
    | "Very good"
    | "Good"
    | "Satisfactory"
    | "Making progress"
    | "Needs more practice";
  attitude:
    | "Active"
    | "Enthusiastic"
    | "Responsible"
    | "Confident"
    | "Cooperative"
    | "Hard-working"
    | "Improving";
  skill:
    | "Listening"
    | "Speaking"
    | "Reading"
    | "Writing"
    | "Vocabulary"
    | "Pronunciation"
    | "General";
  progress:
    | "Excellent progress"
    | "Good progress"
    | "Steady progress"
    | "Noticeable improvement"
    | "Needs further improvement";
  pronoun?: "You" | "He" | "She";
  studentName?: string;
  encouragement?: boolean;
}

export interface GeneratedCommentOutput {
  shortVersion: string;
  standardVersion: string;
  warmEncouragingVersion: string;
  variations: string[];
}

export interface TeacherCopilotResult {
  primaryEnglish: string;
  ipa?: string;
  vietnamese: string;
  alternativePhrases: Array<{
    phrase: string;
    tone: string;
    note?: string;
  }>;
  keyWords?: Array<{
    word: string;
    ipa: string;
    meaning: string;
  }>;
  teachingTip?: string;
}

export interface ScriptPhraseItem {
  phraseEn: string;
  phraseVi: string;
  ipa?: string;
  gesture?: string;
  expectedStudentResponse?: string;
}

export interface LessonScriptStage {
  stageId: string;
  stageName: string;
  stageNameVi: string;
  duration: string;
  purpose?: string;
  phrases: ScriptPhraseItem[];
}

export interface LessonScriptPlan {
  lessonTitle: string;
  topic: string;
  totalDuration: string;
  stages: LessonScriptStage[];
}

export interface DictionaryItem {
  id: string;
  wordOrPhrase: string;
  type: "word" | "phrase" | "sentence";
  ipa?: string;
  partOfSpeech?: string;
  vietnamese: string;
  classroomContext?: string;
  example: string;
  exampleVi?: string;
  notes?: string;
  relatedTags: string[];
}

export interface SelectionTranslateResult {
  text: string;
  type: "word" | "phrase" | "sentence";
  ipa?: string;
  partOfSpeech?: string;
  vietnamese: string;
  usageOrContext?: string;
  exampleSentence?: string;
  exampleSentenceVi?: string;
  usefulNotes?: string;
}

export interface DailyPracticePhrase {
  id: string;
  phrase: string;
  translationVi: string;
  context: string;
  phonicsTips: string;
  completed?: boolean;
}
