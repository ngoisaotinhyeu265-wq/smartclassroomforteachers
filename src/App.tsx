import React, { useState, useEffect } from "react";
import { AppSkill, GradeLevel, UserProgress } from "./types";
import { loadUserProgress, saveUserProgress } from "./utils/storage";
import { Navbar } from "./components/Navbar";
import { StudentDashboard } from "./components/StudentDashboard";
import { VocabularyModule } from "./components/vocabulary/VocabularyModule";
import { SpeakingModule } from "./components/speaking/SpeakingModule";
import { WritingModule } from "./components/writing/WritingModule";
import { ReadingModule } from "./components/reading/ReadingModule";
import { ListeningModule } from "./components/listening/ListeningModule";
import { GrammarModule } from "./components/grammar/GrammarModule";
import { PronunciationModule } from "./components/pronunciation/PronunciationModule";
import { GamesHub } from "./components/games/GamesHub";
import { MiloTutor } from "./components/ai-tutor/MiloTutor";
import { AiAssistantModule } from "./components/ai-assistant/AiAssistantModule";
import { ProgressDashboard } from "./components/progress/ProgressDashboard";
import { TeacherDashboard } from "./components/teacher/TeacherDashboard";
import { GlobalSuccessCurriculumExplorer } from "./components/curriculum/GlobalSuccessCurriculumExplorer";
import { SmartClassroomApp } from "./components/smart-classroom/SmartClassroomApp";
import { LearningPackModal } from "./components/modals/LearningPackModal";
import { DailyChallengeModal } from "./components/modals/DailyChallengeModal";
import { KnowledgeLookupModal } from "./components/modals/KnowledgeLookupModal";
import { TextSelectionTranslator } from "./components/common/TextSelectionTranslator";
import { playSound } from "./utils/audioEffects";
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  PenTool,
  BookMarked,
  Headphones,
  FileCode2,
  Volume2,
  Gamepad2,
  Bot,
  TrendingUp,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { DashboardNavBar, NavItemConfig } from "./components/navigation/DashboardNavBar";

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());
  const [currentSkill, setCurrentSkill] = useState<AppSkill>("dashboard");
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string | undefined>(undefined);
  const [targetUnitNumber, setTargetUnitNumber] = useState<number>(1);
  const [targetGrade, setTargetGrade] = useState<GradeLevel>(progress.grade || 3);

  // Modals
  const [isLearningPackOpen, setIsLearningPackOpen] = useState<boolean>(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState<boolean>(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState<boolean>(false);
  const [knowledgeQuery, setKnowledgeQuery] = useState<string>("");

  // Sync progress changes to localStorage
  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveUserProgress(newProgress);
  };

  const handleChangeGrade = (newGrade: GradeLevel) => {
    const updated = { ...progress, grade: newGrade };
    handleUpdateProgress(updated);
    setTargetGrade(newGrade);
  };

  const handleSelectUnitFromDashboard = (grade: GradeLevel, unitNumber: number) => {
    setTargetGrade(grade);
    setTargetUnitNumber(unitNumber);
    setCurrentSkill("curriculum");
  };

  const handleOpenKnowledgeSearch = (query: string = "") => {
    setKnowledgeQuery(query);
    setIsKnowledgeModalOpen(true);
  };

  const navItems: NavItemConfig[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4 text-blue-500" /> },
    { id: "ai-assistant", label: "Trợ Lý AI Thanh Nguyễn", icon: <Sparkles className="w-4 h-4 text-amber-500" />, badge: "MỚI", badgeColor: "bg-amber-100 text-amber-900 border border-amber-300" },
    { id: "smart-classroom", label: "Smart Classroom", icon: <span className="text-sm">🏫</span>, badge: "GV", badgeColor: "bg-blue-100 text-blue-800" },
    { id: "curriculum", label: "SGK Global Success", icon: <GraduationCap className="w-4 h-4 text-indigo-500" /> },
    { id: "vocabulary", label: "Vocabulary", icon: <BookOpen className="w-4 h-4 text-orange-500" /> },
    { id: "speaking", label: "Speaking Cô Sophie", icon: <Mic className="w-4 h-4 text-pink-500" /> },
    { id: "writing", label: "Writing", icon: <PenTool className="w-4 h-4 text-purple-500" /> },
    { id: "reading", label: "Reading Truyện Tương Tác", icon: <BookMarked className="w-4 h-4 text-emerald-500" /> },
    { id: "listening", label: "Listening", icon: <Headphones className="w-4 h-4 text-sky-500" /> },
    { id: "grammar", label: "Grammar Lab", icon: <FileCode2 className="w-4 h-4 text-yellow-600" /> },
    { id: "pronunciation", label: "Pronunciation", icon: <Volume2 className="w-4 h-4 text-violet-500" /> },
    { id: "games", label: "Games Hub", icon: <Gamepad2 className="w-4 h-4 text-rose-500" />, badge: "HOT", badgeColor: "bg-rose-100 text-rose-800" },
    { id: "ai-tutor", label: "Milo Tutor", icon: <Bot className="w-4 h-4 text-cyan-500" />, badge: "24/7", badgeColor: "bg-cyan-100 text-cyan-800" },
    { id: "progress", label: "Progress", icon: <TrendingUp className="w-4 h-4 text-slate-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-[#1E293B] font-sans flex flex-col selection:bg-amber-200 selection:text-amber-950 pb-8">
      {/* Top Navbar */}
      <Navbar
        currentSkill={currentSkill}
        onSelectSkill={(skill) => {
          setSelectedTopicFilter(undefined);
          setCurrentSkill(skill);
        }}
        progress={progress}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={() => setIsTeacherMode(!isTeacherMode)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenLearningPack={() => setIsLearningPackOpen(true)}
        onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
        onOpenKnowledgeSearch={() => handleOpenKnowledgeSearch("")}
        onChangeGrade={handleChangeGrade}
      />

      {/* Secondary Horizontal Sub-Nav (Scrollable back & forth with buttons, drag & wheel) */}
      {!isTeacherMode && (
        <DashboardNavBar
          currentSkill={currentSkill}
          onSelectSkill={(skill) => {
            setSelectedTopicFilter(undefined);
            setCurrentSkill(skill);
          }}
          navItems={navItems}
        />
      )}

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4">

        {/* If in Teacher Mode, display Teacher Dashboard */}
        {isTeacherMode ? (
          <TeacherDashboard
            progress={progress}
            onExitTeacherMode={() => setIsTeacherMode(false)}
            onOpenLearningPack={() => setIsLearningPackOpen(true)}
          />
        ) : (
          <>
            {currentSkill === "dashboard" && (
              <StudentDashboard
                progress={progress}
                onSelectSkill={(skill) => {
                  setSelectedTopicFilter(undefined);
                  setCurrentSkill(skill);
                }}
                onOpenLearningPack={() => setIsLearningPackOpen(true)}
                onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
                onSelectGlobalSuccessUnit={handleSelectUnitFromDashboard}
                onSelectExtendedTopic={(topic) => {
                  setSelectedTopicFilter(topic);
                  setCurrentSkill("vocabulary");
                }}
              />
            )}

            {currentSkill === "vocabulary" && (
              <VocabularyModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
                selectedTopicFilter={selectedTopicFilter}
              />
            )}

            {currentSkill === "speaking" && (
              <SpeakingModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "writing" && (
              <WritingModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "reading" && (
              <ReadingModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "listening" && (
              <ListeningModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "grammar" && (
              <GrammarModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "pronunciation" && (
              <PronunciationModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "games" && (
              <GamesHub
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "ai-assistant" && (
              <AiAssistantModule
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "ai-tutor" && (
              <MiloTutor
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "curriculum" && (
              <GlobalSuccessCurriculumExplorer
                progress={progress}
                initialGrade={targetGrade}
                initialUnitNumber={targetUnitNumber}
                onGradeChange={handleChangeGrade}
                onUnitChange={(u) => setTargetUnitNumber(u)}
                onSelectUnitPractice={(skill, topic) => {
                  setSelectedTopicFilter(topic);
                  setCurrentSkill(skill);
                }}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {currentSkill === "progress" && (
              <ProgressDashboard
                progress={progress}
                onSelectReviewMode={() => {
                  setCurrentSkill("vocabulary");
                }}
              />
            )}

            {currentSkill === "smart-classroom" && (
              <SmartClassroomApp
                onBackToApp={() => setCurrentSkill("dashboard")}
              />
            )}
          </>
        )}
      </main>

      {/* Persistent Copyright of Thanh Nguyễn Footer */}
      <footer className="mt-8 border-t-2 border-[#D1E0FB] bg-white/95 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-black text-slate-800">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">
              ©
            </span>
            <span>
              Bản quyền phần mềm thuộc về tác giả{" "}
              <strong className="text-blue-700">Thanh Nguyễn</strong> — Mọi quyền được bảo lưu
            </span>
          </div>

          <div className="flex items-center gap-2 bg-rose-50 text-rose-700 font-extrabold px-3 py-1 rounded-full border border-rose-200 text-[11px]">
            <span>🔒</span>
            <span>Nghiêm cấm mọi hành vi sao chép, tự ý chỉnh sửa ứng dụng</span>
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Hệ sinh thái Tiếng Anh Tiểu học chuẩn Chương trình GDPT Bộ GD&ĐT
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <LearningPackModal
        isOpen={isLearningPackOpen}
        onClose={() => setIsLearningPackOpen(false)}
        defaultGrade={progress.grade}
      />

      <DailyChallengeModal
        isOpen={isDailyChallengeOpen}
        onClose={() => setIsDailyChallengeOpen(false)}
        progress={progress}
        onStartSkill={(skill) => {
          setCurrentSkill(skill);
        }}
      />

      <KnowledgeLookupModal
        isOpen={isKnowledgeModalOpen}
        onClose={() => setIsKnowledgeModalOpen(false)}
        initialQuery={knowledgeQuery}
        defaultGrade={progress.grade}
      />

      {/* Global Instant Highlight/Selection Translation Tool */}
      <TextSelectionTranslator
        onOpenFullLookup={(query) => handleOpenKnowledgeSearch(query)}
      />
    </div>
  );
}
