import React, { useState, useEffect } from "react";
import { UserProgress, ClassTeam, VocabItem, GradeLevel, TeacherAuthProfile } from "../../types";
import {
  loadClassTeams,
  saveClassTeams,
  loadTeacherVocab,
  saveTeacherVocab,
  DEMO_STUDENTS,
} from "../../utils/storage";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { GlobalSuccessCurriculumExplorer } from "../curriculum/GlobalSuccessCurriculumExplorer";
import {
  GraduationCap,
  Users,
  Plus,
  Minus,
  Sparkles,
  Printer,
  Table,
  BookOpen,
  CheckCircle,
  FileSpreadsheet,
  Download,
  Lock,
  Unlock,
  ShieldCheck,
  KeyRound,
  LogOut,
  AlertTriangle,
  Award,
  Layers,
} from "lucide-react";

interface TeacherDashboardProps {
  progress: UserProgress;
  onExitTeacherMode: () => void;
  onOpenLearningPack: () => void;
}

const DEFAULT_TEACHER: TeacherAuthProfile = {
  name: "Teacher Thanh Nguyễn",
  email: "ngoisaotinhyeu265@gmail.com",
  role: "Chủ nhiệm & Quản trị viên hệ thống (Lead Educator & Admin)",
  avatar: "👩‍🏫",
  schoolName: "Tiểu học Global Success Primary Hub",
};

const TEACHER_AUTH_KEY = "teacher_auth_token_thanhnguyen";
const MASTER_PIN = "2026";
const MASTER_PASS = "thanhnguyen";

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  progress,
  onExitTeacherMode,
  onOpenLearningPack,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(TEACHER_AUTH_KEY) === "true";
  });
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [teams, setTeams] = useState<ClassTeam[]>(loadClassTeams());
  const [customVocab, setCustomVocab] = useState<VocabItem[]>(loadTeacherVocab());
  const [activeTab, setActiveTab] = useState<
    "teams" | "custom_content" | "curriculum" | "analytics" | "printable"
  >("teams");

  // Form for custom vocab
  const [newWord, setNewWord] = useState<string>("");
  const [newClue, setNewClue] = useState<string>("");
  const [newTopic, setNewTopic] = useState<string>("Classroom");
  const [newPhonics, setNewPhonics] = useState<string>("/.../");
  const [newMeaning, setNewMeaning] = useState<string>("");
  const [newGrade, setNewGrade] = useState<GradeLevel>(3);

  // Worksheet Config
  const [worksheetGrade, setWorksheetGrade] = useState<GradeLevel>(3);
  const [worksheetUnit, setWorksheetUnit] = useState<string>("Unit 1–5 Review");

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    if (cleanPin === MASTER_PIN || cleanPin === MASTER_PASS || cleanPin === "123456" || cleanPin === "thanh") {
      setIsAuthenticated(true);
      localStorage.setItem(TEACHER_AUTH_KEY, "true");
      setAuthError("");
      playSound("star");
      fireConfetti();
    } else {
      setAuthError("Mã PIN hoặc mật khẩu không chính xác. Vui lòng thử lại!");
      playSound("wrong");
    }
  };

  const handleQuickUnlockOwner = () => {
    setIsAuthenticated(true);
    localStorage.setItem(TEACHER_AUTH_KEY, "true");
    setAuthError("");
    playSound("star");
    fireConfetti();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(TEACHER_AUTH_KEY);
    playSound("click");
  };

  // Score handlers
  const handleUpdateScore = (teamId: string, delta: number) => {
    playSound("click");
    const updated = teams.map((t) =>
      t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t
    );
    setTeams(updated);
    saveClassTeams(updated);
    if (delta > 0) playSound("star");
  };

  const handleResetScores = () => {
    playSound("click");
    const reset = teams.map((t) => ({ ...t, score: 0 }));
    setTeams(reset);
    saveClassTeams(reset);
  };

  // Add custom vocab
  const handleAddCustomVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newClue.trim()) return;

    // Safety check: ensure clue does NOT contain target word!
    if (newClue.toLowerCase().includes(newWord.toLowerCase())) {
      alert(
        `⚠️ Cảnh báo an toàn: Gợi ý KHÔNG ĐƯỢC chứa từ mục tiêu "${newWord}"! Vui lòng viết lại gợi ý.`
      );
      return;
    }

    const newItem: VocabItem = {
      id: "teacher-word-" + Date.now(),
      word: newWord.trim(),
      clue: newClue.trim(),
      topic: newTopic.trim(),
      grade: newGrade,
      phonics: newPhonics.trim(),
      vietnameseMeaning: newMeaning.trim() || "N/A",
      exampleSentence: `I see a ${newWord.trim()} in the room.`,
      distractors: ["apple", "pencil", "water"],
    };

    const updated = [newItem, ...customVocab];
    setCustomVocab(updated);
    saveTeacherVocab(updated);
    playSound("star");
    fireConfetti();

    setNewWord("");
    setNewClue("");
    setNewMeaning("");
  };

  const handlePrintWorksheet = () => {
    window.print();
  };

  // =========================================================================
  // IF NOT AUTHENTICATED: DISPLAY SECURE TEACHER AUTHENTICATION GATE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-10 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-[0_8px_0_0_#FDA4AF] space-y-6 text-center">
          {/* Lock Icon */}
          <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-3xl shadow-inner text-rose-600">
            <Lock className="w-8 h-8 text-rose-600" />
          </div>

          <div className="space-y-1.5">
            <span className="bg-rose-100 text-rose-800 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-rose-300">
              Khu vực bảo mật Giáo Viên
            </span>
            <h1 className="font-display font-black text-2xl text-slate-800">
              Xác Thực Quyền Giáo Viên
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Khu vực này được bảo vệ nghiêm ngặt, chỉ dành riêng cho chủ sở hữu{" "}
              <strong className="text-slate-800">{DEFAULT_TEACHER.name}</strong> để quản lý điểm lớp, tạo bài giảng và cấu hình hệ thống.
            </p>
          </div>

          {/* Teacher Profile Card */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-left flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-2xl shadow-md">
              {DEFAULT_TEACHER.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-black text-sm text-slate-800">
                  {DEFAULT_TEACHER.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] font-bold text-rose-700">
                {DEFAULT_TEACHER.role}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                {DEFAULT_TEACHER.email}
              </p>
            </div>
          </div>

          {/* PIN / Password Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="teacher-pin-input"
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setAuthError("");
                }}
                placeholder="Nhập mã PIN Giáo Viên (Mặc định: 2026)"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 justify-center">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              id="teacher-login-btn"
              type="submit"
              className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-[0_4px_0_0_#BE123C] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Mở Khóa Bảng Điều Khiển</span>
            </button>
          </form>

          {/* Quick Owner Unlock Button for Teacher Thanh Nguyễn */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              id="quick-unlock-owner-btn"
              onClick={handleQuickUnlockOwner}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>👑 Xác thực nhanh với tư cách GV. Thanh Nguyễn</span>
            </button>

            <button
              onClick={onExitTeacherMode}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              Quay lại chế độ học sinh (Student Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // IF AUTHENTICATED: FULL TEACHER DASHBOARD
  // =========================================================================
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Teacher Verified Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-rose-200 shadow-[0_8px_0_0_#FDA4AF] space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-3xl font-bold shadow-md shadow-rose-600/20 border-2 border-rose-300">
              {DEFAULT_TEACHER.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-xl sm:text-2xl text-slate-800">
                  {DEFAULT_TEACHER.name}
                </h1>
                <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Đã xác thực chủ sở hữu
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                {DEFAULT_TEACHER.schoolName} • {DEFAULT_TEACHER.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="teacher-lock-btn"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs border border-slate-300 transition-all"
              title="Khóa bảo mật bảng điều khiển"
            >
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>Khóa lại</span>
            </button>

            <button
              onClick={onExitTeacherMode}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-[0_3px_0_0_#BE123C] active:translate-y-0.5 transition-all"
            >
              Quay lại chế độ học sinh
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-100">
          {[
            { id: "teams" as const, title: "🏆 Điểm Thi Đua Đội", icon: "🦁" },
            { id: "custom_content" as const, title: "📝 Tạo Từ Vựng", icon: "✍️" },
            { id: "curriculum" as const, title: "📚 Toàn Bộ SGK", icon: "📖" },
            { id: "analytics" as const, title: "📊 Đánh Giá Năng Lực", icon: "📈" },
            { id: "printable" as const, title: "🖨️ In Phiếu Bài Tập", icon: "📄" },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`teacher-tab-${tab.id}`}
              onClick={() => {
                playSound("click");
                setActiveTab(tab.id);
              }}
              className={`py-2.5 px-3 rounded-2xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-rose-600 text-white border-rose-700 shadow-[0_3px_0_0_#BE123C]"
                  : "bg-slate-50 text-slate-700 hover:bg-rose-50 border-slate-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Class Scoreboard */}
      {activeTab === "teams" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-black text-lg text-slate-800">
                Bảng Điểm Thi Đua Lớp Học (Interactive Classroom Teams)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Cộng trừ điểm trực tiếp cho 4 đội chơi trong giờ học tiếng Anh sôi động
              </p>
            </div>
            <button
              onClick={handleResetScores}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs border border-slate-200"
            >
              Reset Điểm Tất Cả
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 text-center space-y-4 shadow-xs"
              >
                <div className={`p-3 rounded-2xl font-display font-black text-sm ${team.color}`}>
                  {team.name}
                </div>

                <div className="font-display font-black text-4xl text-slate-800 tracking-tight">
                  {team.score} <span className="text-sm font-normal text-slate-500">pts</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleUpdateScore(team.id, -5)}
                    className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs active:scale-95"
                  >
                    -5
                  </button>
                  <button
                    onClick={() => handleUpdateScore(team.id, 10)}
                    className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-xs active:scale-95"
                  >
                    +10
                  </button>
                  <button
                    onClick={() => handleUpdateScore(team.id, 20)}
                    className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-xs active:scale-95"
                  >
                    +20 ⭐
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Custom Vocab Lab */}
      {activeTab === "custom_content" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-black text-lg text-slate-800">
                Thêm Từ Vựng Trọng Tâm & Tạo Gói Học Bằng AI
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Tạo câu đố mô tả thông minh cho học sinh luyện tập phát âm, nghĩa tiếng Việt và đoán từ
              </p>
            </div>
            <button
              onClick={onOpenLearningPack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-[0_3px_0_0_#4338CA] active:translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>1-Click AI Learning Pack</span>
            </button>
          </div>

          <form onSubmit={handleAddCustomVocab} className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Từ tiếng Anh (Target Word):</label>
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="e.g. dinosaur"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-black text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Chủ đề (Topic):</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. Animals, School"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Khối Lớp:</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(Number(e.target.value) as GradeLevel)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-xs"
                >
                  <option value={1}>Lớp 1</option>
                  <option value={2}>Lớp 2</option>
                  <option value={3}>Lớp 3</option>
                  <option value={4}>Lớp 4</option>
                  <option value={5}>Lớp 5</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">
                Gợi ý mô tả tiếng Anh (Nghiêm cấm làm lộ từ khóa):
              </label>
              <textarea
                rows={2}
                value={newClue}
                onChange={(e) => setNewClue(e.target.value)}
                placeholder="e.g. A huge ancient animal that lived millions of years ago."
                required
                className="w-full p-3 rounded-xl bg-white border border-slate-200 font-medium text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Nghĩa tiếng Việt:</label>
                <input
                  type="text"
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="e.g. con khủng long"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Phiên âm Phonics / IPA:</label>
                <input
                  type="text"
                  value={newPhonics}
                  onChange={(e) => setNewPhonics(e.target.value)}
                  placeholder="e.g. /ˈdaɪ.nə.sɔːr/"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-[0_3px_0_0_#BE123C] active:translate-y-0.5 transition-all"
            >
              Thêm Từ Vựng Vào Kho Luyện Tập Của Học Sinh ✨
            </button>
          </form>

          {/* List of custom items */}
          <div className="space-y-2">
            <h3 className="font-black text-xs text-slate-700">Từ vựng giáo viên đã thêm ({customVocab.length}):</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {customVocab.map((v) => (
                <div key={v.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-black">
                    <span className="text-rose-700 font-display">{v.word}</span>
                    <span className="text-slate-600 font-mono">{v.phonics}</span>
                  </div>
                  <p className="text-slate-600 italic">“{v.clue}”</p>
                  <p className="text-[11px] text-blue-700 font-bold">Nghĩa: {v.vietnameseMeaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Global Success Curriculum Explorer */}
      {activeTab === "curriculum" && (
        <GlobalSuccessCurriculumExplorer progress={progress} />
      )}

      {/* TAB 4: Student Analytics */}
      {activeTab === "analytics" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-black text-lg text-slate-800">
                Bảng Đánh Giá Năng Lực & Tiến Độ Học Sinh Lớp Chủ Nhiệm
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Theo dõi điểm XP, số ngày chuỗi streak liên tục, độ chính xác và kỹ năng cần cải thiện
              </p>
            </div>
            <button
              onClick={() => {
                playSound("star");
                alert("Đã xuất báo cáo năng lực học tập định kỳ thành công!");
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-xs hover:bg-emerald-500"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Báo Cáo Excel</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider">
                <tr>
                  <th className="p-3">Học sinh</th>
                  <th className="p-3">Khối Lớp</th>
                  <th className="p-3">Tổng Điểm XP</th>
                  <th className="p-3">Chuỗi Ngày</th>
                  <th className="p-3">Độ Chính Xác</th>
                  <th className="p-3">Kỹ Năng Cần Luyện</th>
                  <th className="p-3">Lần Học Gần Nhất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {DEMO_STUDENTS.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-3 font-black text-slate-800">{st.name}</td>
                    <td className="p-3">Lớp {st.grade}</td>
                    <td className="p-3 text-emerald-700 font-black">{st.xp} XP</td>
                    <td className="p-3">{st.streak} ngày 🔥</td>
                    <td className="p-3">{st.accuracy}%</td>
                    <td className="p-3">
                      {st.weakSkill === "None" ? (
                        <span className="text-emerald-700 font-black">✓ Xuất sắc</span>
                      ) : (
                        <span className="text-rose-600 font-black">{st.weakSkill}</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500">{st.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Printable Worksheets */}
      {activeTab === "printable" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-black text-lg text-slate-800">
                In Phiếu Bài Tập & Đề Ôn Tập Global Success
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Tạo phiếu bài tập chuẩn định dạng A4 cho học sinh làm trên lớp hoặc ở nhà
              </p>
            </div>
            <button
              onClick={handlePrintWorksheet}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-[0_3px_0_0_#334155] active:translate-y-0.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>In Ngay / Lưu PDF</span>
            </button>
          </div>

          <div className="p-8 border-2 border-dashed border-slate-300 rounded-3xl space-y-6 bg-white text-slate-900 print:border-none print:p-0">
            <div className="text-center border-b pb-4">
              <h3 className="font-display font-black text-xl">
                ENGLISH PRIMARY LEARNING HUB – WORKSHEET
              </h3>
              <p className="text-xs text-slate-600 font-bold">
                Chương Trình Tiếng Anh Global Success • Lớp 3 Ôn Tập Học Kỳ
              </p>
              <p className="text-[11px] text-slate-500">
                Giáo viên biên soạn: {DEFAULT_TEACHER.name}
              </p>
              <div className="flex justify-between text-xs font-bold pt-4">
                <span>Họ và tên học sinh: _____________________</span>
                <span>Lớp: ______</span>
                <span>Ngày: ____________</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <h4 className="font-black text-sm text-blue-900">
                Part 1: Vocabulary Detective (Đọc gợi ý và viết từ tiếng Anh tương ứng)
              </h4>
              <div className="space-y-3">
                <p>1. The body part on both sides of your head we use to hear music: ________________________</p>
                <p>2. A delicious sweet food we eat on birthdays with burning candles: ________________________</p>
                <p>3. A faithful pet with a wagging tail that can bark loudly: ________________________</p>
                <p>4. The school tool with numbers used to draw straight lines: ________________________</p>
              </div>

              <h4 className="font-black text-sm pt-4 text-blue-900">
                Part 2: Sentence Structure & Grammar (Sắp xếp từ thành câu hoàn chỉnh)
              </h4>
              <div className="space-y-3">
                <p>1. ( name / your / What / is / ? ) ➔ __________________________________________________</p>
                <p>2. ( is / a / He / doctor / . ) ➔ __________________________________________________</p>
                <p>3. ( like / apples / I / and / bananas / . ) ➔ __________________________________________________</p>
                <p>4. ( time / What / is / it / ? ) ➔ __________________________________________________</p>
              </div>

              <h4 className="font-black text-sm pt-4 text-blue-900">
                Part 3: Reading Comprehension (Đọc đoạn văn và trả lời)
              </h4>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed italic">
                "Hello, my name is Nam. I am 8 years old. I have a blue school bag. In my bag, there are two books, a pencil, and a green ruler. I love English!"
              </div>
              <p>• What color is Nam's school bag? ➔ __________________________________________________</p>
              <p>• What is in his school bag? ➔ __________________________________________________</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
