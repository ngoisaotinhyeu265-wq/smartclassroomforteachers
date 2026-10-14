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
} from "lucide-react";

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

  const navItems: Array<{ id: AppSkill; label: string; icon: React.ReactNode }> = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "smart-classroom", label: "Smart Classroom", icon: <span className="text-sm">🏫</span> },
    { id: "curriculum", label: "SGK Global Success", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "vocabulary", label: "Vocabulary", icon: <BookOpen className="w-4 h-4" /> },
    { id: "speaking", label: "Speaking", icon: <Mic className="w-4 h-4" /> },
    { id: "writing", label: "Writing", icon: <PenTool className="w-4 h-4" /> },
    { id: "reading", label: "Reading", icon: <BookMarked className="w-4 h-4" /> },
    { id: "listening", label: "Listening", icon: <Headphones className="w-4 h-4" /> },
    { id: "grammar", label: "Grammar Lab", icon: <FileCode2 className="w-4 h-4" /> },
    { id: "pronunciation", label: "Pronunciation", icon: <Volume2 className="w-4 h-4" /> },
    { id: "games", label: "Games Hub", icon: <Gamepad2 className="w-4 h-4" /> },
    { id: "ai-tutor", label: "Milo Tutor", icon: <Bot className="w-4 h-4" /> },
    { id: "progress", label: "Progress", icon: <TrendingUp className="w-4 h-4" /> },
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

      {/* Secondary Horizontal Sub-Nav (Geometric Balance Chunky Pills) */}
      {!isTeacherMode && (
        <div className="px-3 sm:px-6 lg:px-8 py-2 z-30">
          <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md px-3 sm:px-4 py-2 rounded-[24px] border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB] overflow-x-auto scrollbar-none flex items-center gap-2 whitespace-nowrap">
            {navItems.map((item) => {
              const isActive = currentSkill === item.id;
              return (
                <button
                  key={item.id}
                  id={`subnav-btn-${item.id}`}
                  onClick={() => {
                    playSound("click");
                    setSelectedTopicFilter(undefined);
                    setCurrentSkill(item.id);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-[0_3px_0_0_#1D4ED8] translate-y-[-1px]"
                      : "text-slate-700 hover:text-blue-700 hover:bg-[#F0F7FF] border border-transparent hover:border-blue-200"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
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
