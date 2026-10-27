import React, { useState, useMemo } from "react";
import {
  ReportCommentItem,
  SmartCommentCriteria,
  GeneratedCommentOutput,
} from "../../types/smartClassroom";
import {
  EXCELLENT_COMMENTS,
  GOOD_COMMENTS,
  PROGRESS_COMMENTS,
  PRACTICE_COMMENTS,
  SUBJECT_SKILL_COMMENTS,
  ATTITUDE_COMMENTS,
  SHORT_COMMENTS,
  LANGUAGE_RULES,
  generateSmartComment,
} from "../../data/reportCommentsData";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  FileText,
  Sparkles,
  Volume2,
  Copy,
  Check,
  RefreshCw,
  Shuffle,
  Award,
  TrendingUp,
  Heart,
  Sliders,
  BookOpen,
  HelpCircle,
  AlertCircle,
  Download,
  Printer,
  User,
  Users,
  CheckCircle2,
  ChevronRight,
  Filter,
  Bookmark,
  Send,
} from "lucide-react";

interface EndOfYearCommentsStudioProps {
  onSaveFavorite?: (commentText: string) => void;
}

type StudioViewTab =
  | "generator"
  | "excellent"
  | "good"
  | "progress"
  | "practice"
  | "skills"
  | "attitude"
  | "short"
  | "rules"
  | "batch";

export const EndOfYearCommentsStudio: React.FC<EndOfYearCommentsStudioProps> = ({
  onSaveFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<StudioViewTab>("generator");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // --- Smart Generator State ---
  const [studentName, setStudentName] = useState<string>("");
  const [pronoun, setPronoun] = useState<"You" | "He" | "She">("You");
  const [achievement, setAchievement] = useState<SmartCommentCriteria["achievement"]>("Excellent");
  const [attitude, setAttitude] = useState<SmartCommentCriteria["attitude"]>("Enthusiastic");
  const [skill, setSkill] = useState<SmartCommentCriteria["skill"]>("Speaking");
  const [progress, setProgress] = useState<SmartCommentCriteria["progress"]>("Excellent progress");
  const [variantSeed, setVariantSeed] = useState<number>(0);

  // Skill filter for Section 5
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>("All");

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Batch Roster Mode State
  const [batchNamesText, setBatchNamesText] = useState<string>(
    "Nguyễn Minh Anh\nTrần Bảo Nam\nLê Quỳnh Chi\nPhạm Đức Huy\nVũ Gia Hân"
  );
  const [batchClassGrade, setBatchClassGrade] = useState<string>("3A1");
  const [batchResults, setBatchResults] = useState<
    Array<{ name: string; comment: string; short: string; level: string }>
  >([]);

  // Generated Smart Output based on selected criteria
  const smartOutput: GeneratedCommentOutput = useMemo(() => {
    return generateSmartComment(
      {
        achievement,
        attitude,
        skill,
        progress,
        pronoun,
        studentName: studentName.trim(),
      },
      variantSeed
    );
  }, [achievement, attitude, skill, progress, pronoun, studentName, variantSeed]);

  const handleCopy = (text: string, id: string) => {
    playSound("click");
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShuffleVariant = () => {
    playSound("click");
    setVariantSeed((prev) => prev + 1);
  };

  // Generate Batch Comments for class roster
  const handleGenerateBatch = () => {
    playSound("click");
    const names = batchNamesText
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (names.length === 0) {
      alert("Vui lòng nhập ít nhất một tên học sinh!");
      return;
    }

    const achievementsPool: Array<SmartCommentCriteria["achievement"]> = [
      "Excellent",
      "Very good",
      "Good",
      "Making progress",
      "Satisfactory",
    ];
    const skillsPool: Array<SmartCommentCriteria["skill"]> = [
      "Speaking",
      "Listening",
      "Reading",
      "Writing",
      "Vocabulary",
      "Pronunciation",
    ];
    const attitudesPool: Array<SmartCommentCriteria["attitude"]> = [
      "Enthusiastic",
      "Active",
      "Responsible",
      "Confident",
      "Hard-working",
    ];

    const results = names.map((fullName, idx) => {
      // Pick first name for friendly English sentence (e.g. "Minh Anh" -> "Anh" or full name)
      const firstName = fullName.split(" ").slice(-1)[0] || fullName;
      const ach = achievementsPool[idx % achievementsPool.length];
      const sk = skillsPool[idx % skillsPool.length];
      const att = attitudesPool[idx % attitudesPool.length];

      const res = generateSmartComment(
        {
          achievement: ach,
          attitude: att,
          skill: sk,
          progress:
            ach === "Excellent"
              ? "Excellent progress"
              : ach === "Very good"
              ? "Good progress"
              : "Steady progress",
          pronoun: "You",
          studentName: firstName,
        },
        idx
      );

      return {
        name: fullName,
        comment: res.standardVersion,
        short: res.shortVersion,
        level: ach,
      };
    });

    setBatchResults(results);
    playSound("levelup");
  };

  const handleCopyAllBatch = () => {
    playSound("click");
    if (batchResults.length === 0) return;

    let txt = `DANH SÁCH NHẬN XÉT TIẾNG ANH CUỐI NĂM - LỚP ${batchClassGrade}\n`;
    txt += `(Theo Thông tư 27/2020/TT-BGDĐT)\n\n`;

    batchResults.forEach((b, idx) => {
      txt += `${idx + 1}. ${b.name} [${b.level}]:\n`;
      txt += `   ${b.comment}\n\n`;
    });

    navigator.clipboard.writeText(txt);
    setCopiedId("batch-all");
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter skills in section 5
  const filteredSkillComments = useMemo(() => {
    if (selectedSkillFilter === "All") return SUBJECT_SKILL_COMMENTS;
    return SUBJECT_SKILL_COMMENTS.filter((s) => s.skillFocus === selectedSkillFilter);
  }, [selectedSkillFilter]);

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Theo Thông tư 27/2020/TT-BGDĐT Tiểu Học</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight flex items-center gap-3">
              <span>📝 End-of-Year Student Comments</span>
            </h1>

            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-medium">
              Kho nhận xét cuối năm bằng tiếng Anh chuẩn mực cho <strong>học bạ, sổ liên lạc, bảng điểm</strong>.
              Tuân thủ triết lý:{" "}
              <span className="text-yellow-300 font-bold italic">
                “Recognize progress – Encourage effort – Support growth”
              </span>{" "}
              (Ghi nhận tiến bộ – Khích lệ nỗ lực – Nâng đỡ sự phát triển).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => {
                playSound("click");
                setActiveTab("generator");
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 uppercase ${
                activeTab === "generator"
                  ? "bg-amber-400 text-amber-950 shadow-[0_3px_0_0_#B45309]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-950" />
              <span>Tạo Nhận Xét (Smart Generator)</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setActiveTab("batch");
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 uppercase ${
                activeTab === "batch"
                  ? "bg-emerald-400 text-emerald-950 shadow-[0_3px_0_0_#065F46]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              <Users className="w-4 h-4 text-emerald-950" />
              <span>Tạo Cho Cả Lớp (Roster)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs (10 Categories) */}
      <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          {[
            { id: "generator", label: "⚡ Smart Generator (Ghép Nhận Xét)", icon: "✨" },
            { id: "excellent", label: "1. Excellent (Rất Tốt)", icon: "🏆" },
            { id: "good", label: "2. Good (Tốt)", icon: "👍" },
            { id: "progress", label: "3. Making Progress (Tiến Bộ)", icon: "📈" },
            { id: "practice", label: "4. Needs Practice (Cần Cố Gắng)", icon: "🌱" },
            { id: "skills", label: "5. Theo 6 Kỹ Năng", icon: "🎯" },
            { id: "attitude", label: "6. Học Tập + Thái Độ", icon: "🤝" },
            { id: "short", label: "7. Cực Ngắn (5-10 Từ)", icon: "⚡" },
            { id: "rules", label: "9. Quy Tắc Ngôn Từ (TT 27)", icon: "🛡️" },
            { id: "batch", label: "10. Nhận Xét Cả Lớp (Batch)", icon: "👥" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound("click");
                setActiveTab(tab.id as StudioViewTab);
              }}
              className={`px-3.5 py-2.5 rounded-2xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md font-black"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. TAB CONTENT: SMART COMMENT GENERATOR (Section 8, 10, 11) */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-600" />
                <span>Tiêu Chí Đánh Giá Học Sinh</span>
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold">
                Mục 8 & 11
              </span>
            </div>

            {/* Student Name & Pronoun */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 flex items-center justify-between">
                <span>Tên học sinh (Tùy chọn):</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  (Để trống = dùng đại từ xưng hô)
                </span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ví dụ: Nam, Linh, Mai..."
                  className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold shrink-0">
                  {(["You", "He", "She"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPronoun(p)}
                      className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                        pronoun === p ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"
                      }`}
                    >
                      {p === "You" ? "You (Em)" : p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 1. Achievement */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 block">
                1. Mức độ hoàn thành (Achievement):
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    "Excellent",
                    "Very good",
                    "Good",
                    "Satisfactory",
                    "Making progress",
                    "Needs more practice",
                  ] as const
                ).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setAchievement(a);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                      achievement === a
                        ? "bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-500 font-black"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {a === "Excellent" && "🏆 Excellent"}
                    {a === "Very good" && "🌟 Very good"}
                    {a === "Good" && "👍 Good"}
                    {a === "Satisfactory" && "👌 Satisfactory"}
                    {a === "Making progress" && "📈 Making progress"}
                    {a === "Needs more practice" && "🌱 Needs practice"}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Learning Attitude */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 block">
                2. Thái độ học tập (Learning attitude):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    "Active",
                    "Enthusiastic",
                    "Responsible",
                    "Confident",
                    "Cooperative",
                    "Hard-working",
                    "Improving",
                  ] as const
                ).map((att) => (
                  <button
                    key={att}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setAttitude(att);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      attitude === att
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {att}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Key Skill Focus */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 block">
                3. Trọng tâm kỹ năng (Skill focus):
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    "Speaking",
                    "Listening",
                    "Reading",
                    "Writing",
                    "Vocabulary",
                    "Pronunciation",
                    "General",
                  ] as const
                ).map((sk) => (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setSkill(sk);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                      skill === sk
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Progress */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 block">
                4. Tiến độ phát triển (Progress):
              </label>
              <select
                value={progress}
                onChange={(e) =>
                  setProgress(e.target.value as SmartCommentCriteria["progress"])
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Excellent progress">Excellent progress (Tiến bộ vượt bậc)</option>
                <option value="Good progress">Good progress (Tiến bộ tốt)</option>
                <option value="Steady progress">Steady progress (Tiến bộ đều đặn)</option>
                <option value="Noticeable improvement">Noticeable improvement (Tiến bộ rõ rệt)</option>
                <option value="Needs further improvement">Needs further improvement (Cần cố gắng thêm)</option>
              </select>
            </div>

            {/* Diversity Control Trigger */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleShuffleVariant}
                className="w-full py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Shuffle className="w-4 h-4 text-amber-700" />
                <span>🎲 Đổi Cách Diễn Đạt Khác (Tránh Trùng Lặp - Lần {variantSeed + 1})</span>
              </button>
            </div>
          </div>

          {/* Generated Results Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Formula Banner */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-teal-50 border border-blue-200 text-xs font-medium text-slate-700 flex items-start gap-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-900">Công thức sư phạm hoàn chỉnh:</span>
                <span className="font-mono text-blue-800 ml-1">
                  [Thành tích: {achievement}] + [Thái độ: {attitude}] + [Kỹ năng: {skill}] + [Động viên tích cực]
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Khẩu hiệu Thông tư 27: <em>“Recognize progress – Encourage effort – Support growth.”</em>
                </p>
              </div>
            </div>

            {/* Version 1: Standard Version (1-2 sentences - School Records / Học Bạ) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-blue-200 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wide">
                  📄 Standard Version (1-2 câu - Dành cho Học bạ / Sổ liên lạc)
                </span>
                <span className="text-xs text-slate-400 font-bold">Khuyên dùng</span>
              </div>

              <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed select-text bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                "{smartOutput.standardVersion}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakText(smartOutput.standardVersion, { rate: 0.95 })}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-blue-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>0.95x</span>
                  </button>
                  <button
                    onClick={() => speakText(smartOutput.standardVersion, { rate: 0.7 })}
                    className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-bold cursor-pointer"
                    title="Nghe chậm"
                  >
                    🐢
                  </button>
                  {onSaveFavorite && (
                    <button
                      onClick={() => onSaveFavorite(smartOutput.standardVersion)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-amber-50 text-amber-700 border border-slate-200 text-xs cursor-pointer"
                      title="Lưu vào Favorites"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleCopy(smartOutput.standardVersion, "std")}
                  className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {copiedId === "std" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép câu này</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Version 2: Short Version (5-10 words - Fast entry) */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wide">
                  ⚡ Short Version (5–10 từ - Nhập nhanh trên phần mềm)
                </span>
                <span className="text-xs text-slate-400 font-bold">Ngắn gọn</span>
              </div>

              <p className="text-base font-bold text-slate-900 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 select-text">
                "{smartOutput.shortVersion}"
              </p>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => speakText(smartOutput.shortVersion)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopy(smartOutput.shortVersion, "short")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 cursor-pointer flex items-center gap-1.5"
                >
                  {copiedId === "short" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "short" ? "Đã chép!" : "Sao chép"}</span>
                </button>
              </div>
            </div>

            {/* Version 3: Warm & Encouraging Version (1-2 sentences) */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wide">
                  💖 Warm & Encouraging (Giọng ấm áp, truyền cảm hứng)
                </span>
                <span className="text-xs text-slate-400 font-bold">Phụ huynh yêu thích</span>
              </div>

              <p className="text-sm sm:text-base font-bold text-slate-900 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200 select-text leading-relaxed">
                "{smartOutput.warmEncouragingVersion}"
              </p>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => speakText(smartOutput.warmEncouragingVersion)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopy(smartOutput.warmEncouragingVersion, "warm")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 cursor-pointer flex items-center gap-1.5"
                >
                  {copiedId === "warm" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "warm" ? "Đã chép!" : "Sao chép"}</span>
                </button>
              </div>
            </div>

            {/* Section 10: Diversity Control Variations */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Shuffle className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs sm:text-sm font-black text-slate-900">
                    Mục 10: Các Cách Diễn Đạt Khác (Tránh Trùng Nhận Xét Giữa Các Học Sinh)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 font-bold">4 phương án thay thế</span>
              </div>

              <div className="space-y-2">
                {smartOutput.variations.map((v, vIdx) => (
                  <div
                    key={vIdx}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {vIdx + 1}
                      </span>
                      <p className="font-medium text-slate-800 select-text leading-snug">{v}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => speakText(v)}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer"
                        title="Nghe câu này"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(v, `var-${vIdx}`)}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                        title="Sao chép"
                      >
                        {copiedId === `var-${vIdx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB: 1. EXCELLENT PERFORMANCE (Hoàn thành rất tốt) */}
      {activeTab === "excellent" && (
        <CommentListSection
          title="1. EXCELLENT PERFORMANCE – HOÀN THÀNH RẤT TỐT"
          description="Dành cho học sinh xuất sắc, thể hiện năng lực học tập vượt trội và thái độ tích cực trong suốt năm học."
          badgeColor="bg-amber-100 text-amber-900 border-amber-300"
          badgeText="10 Câu Chuẩn Mực"
          items={EXCELLENT_COMMENTS}
          onCopy={handleCopy}
          copiedId={copiedId}
        />
      )}

      {/* 5. TAB: 2. GOOD PERFORMANCE (Hoàn thành tốt) */}
      {activeTab === "good" && (
        <CommentListSection
          title="2. GOOD PERFORMANCE – HOÀN THÀNH TỐT"
          description="Dành cho học sinh có kết quả học tập tốt, tiến bộ đều đặn và tích cực tham gia các hoạt động trên lớp."
          badgeColor="bg-blue-100 text-blue-900 border-blue-300"
          badgeText="10 Câu Chuẩn Mực"
          items={GOOD_COMMENTS}
          onCopy={handleCopy}
          copiedId={copiedId}
        />
      )}

      {/* 6. TAB: 3. MAKING PROGRESS (Có tiến bộ) */}
      {activeTab === "progress" && (
        <CommentListSection
          title="3. MAKING PROGRESS – CÓ TIẾN BỘ"
          description="Nhấn mạnh sự nỗ lực, quá trình chuyển biến tích cực và sự tự tin ngày càng tăng của học sinh."
          badgeColor="bg-emerald-100 text-emerald-900 border-emerald-300"
          badgeText="10 Câu Chuẩn Mực"
          items={PROGRESS_COMMENTS}
          onCopy={handleCopy}
          copiedId={copiedId}
        />
      )}

      {/* 7. TAB: 4. NEEDS MORE PRACTICE (Cần cố gắng thêm) */}
      {activeTab === "practice" && (
        <div className="space-y-6">
          <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-amber-900">
                LƯU Ý THEO TINH THẦN THÔNG TƯ 27 (GROWTH MINDSET):
              </span>
              <p className="mt-0.5 text-amber-900/90 leading-relaxed">
                Tuyệt đối không dùng các từ ngữ mang tính tiêu cực, phê bình hoặc gắn nhãn ("yếu", "lười", "kém").
                Tất cả các câu dưới đây được thiết kế theo hướng <strong>khích lệ nỗ lực, chỉ rõ hướng rèn luyện thêm</strong> để học sinh cảm nhận được sự tin tưởng và tự tin bước tiếp.
              </p>
            </div>
          </div>

          <CommentListSection
            title="4. NEEDS MORE PRACTICE – CẦN CỐ GẮNG THÊM"
            description="Nhận xét tích cực, định hướng phát triển mà không mang tính so sánh hay chỉ trích."
            badgeColor="bg-teal-100 text-teal-900 border-teal-300"
            badgeText="10 Câu Định Hướng Tích Cực"
            items={PRACTICE_COMMENTS}
            onCopy={handleCopy}
            copiedId={copiedId}
          />
        </div>
      )}

      {/* 8. TAB: 5. ENGLISH SUBJECT SKILLS (6 Kỹ Năng) */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {/* Skill Filter Pills */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <TargetIcon className="w-4 h-4 text-blue-600" />
                <span>5. Nhận Xét Chuyên Sâu Theo 6 Kỹ Năng Tiếng Anh</span>
              </h2>
              <span className="text-xs text-slate-500 font-bold">
                {filteredSkillComments.length} nhận xét
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                "All",
                "Listening",
                "Speaking",
                "Reading",
                "Writing",
                "Vocabulary",
                "Pronunciation",
              ].map((sk) => (
                <button
                  key={sk}
                  onClick={() => {
                    playSound("click");
                    setSelectedSkillFilter(sk);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSkillFilter === sk
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {sk === "All" && "Tất cả kỹ năng"}
                  {sk === "Listening" && "🎧 Listening (Nghe)"}
                  {sk === "Speaking" && "🗣️ Speaking (Nói)"}
                  {sk === "Reading" && "📖 Reading (Đọc)"}
                  {sk === "Writing" && "✍️ Writing (Viết)"}
                  {sk === "Vocabulary" && "📚 Vocabulary (Từ vựng)"}
                  {sk === "Pronunciation" && "🔤 Pronunciation (Phát âm)"}
                </button>
              ))}
            </div>
          </div>

          <CommentListSection
            title={`Nhận xét kỹ năng: ${selectedSkillFilter === "All" ? "Toàn bộ" : selectedSkillFilter}`}
            description="Các câu nhận xét cụ thể, chính xác giúp phụ huynh và giáo viên chủ nhiệm nắm rõ thế mạnh của học sinh."
            badgeColor="bg-indigo-100 text-indigo-900 border-indigo-300"
            badgeText={`${filteredSkillComments.length} Câu`}
            items={filteredSkillComments}
            onCopy={handleCopy}
            copiedId={copiedId}
          />
        </div>
      )}

      {/* 9. TAB: 6. LEARNING + ATTITUDE */}
      {activeTab === "attitude" && (
        <CommentListSection
          title="6. COMMENTS COMBINING LEARNING + ATTITUDE (KẾT QUẢ + THÁI ĐỘ)"
          description="Kết hợp hài hòa giữa tiến độ học tập và phẩm chất học sinh (năng nổ, trách nhiệm, tự giác, say mê khám phá)."
          badgeColor="bg-purple-100 text-purple-900 border-purple-300"
          badgeText="10 Câu Tiêu Biểu"
          items={ATTITUDE_COMMENTS}
          onCopy={handleCopy}
          copiedId={copiedId}
        />
      )}

      {/* 10. TAB: 7. SHORT COMMENTS (5-10 words) */}
      {activeTab === "short" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>⚡ 7. SHORT COMMENTS – NHẬN XÉT CỰC NGẮN (5–10 TỪ)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phù hợp khi giáo viên cần nhập nhanh trên các phần mềm quản lý điểm số điện tử có giới hạn số ký tự.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                15 Mẫu Nhanh
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SHORT_COMMENTS.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col justify-between gap-3 group transition-all"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-slate-900 select-text">
                      "{item.english}"
                    </p>
                    <p className="text-xs text-slate-500">{item.vietnamese}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-[11px] font-mono text-blue-700 font-bold">
                      {item.wordCount} words
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speakText(item.english)}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer"
                        title="Nghe"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(item.english, item.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-700 font-bold border border-slate-200 cursor-pointer flex items-center gap-1"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === item.id ? "Đã chép" : "Chép"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 11. TAB: 9. PEDAGOGICAL LANGUAGE RULES (TT 27) */}
      {activeTab === "rules" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-black uppercase">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Mục 9: Nguyên Tắc Ngôn Từ Sư Phạm (Thông tư 27)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900">
              Bảng Đối Chiếu: Tránh Nhãn Tiêu Cực ❌ → Chuyển Hướng Phát Triển ✅
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Theo quy định đánh giá học sinh tiểu học, lời nhận xét không được mang tính so sánh, không dùng từ ngữ gây tổn thương hay gắn nhãn cố định năng lực của trẻ. Thay vào đó, giáo viên luôn sử dụng ngôn ngữ của tư duy phát triển (Growth Mindset).
            </p>
          </div>

          <div className="space-y-4">
            {LANGUAGE_RULES.map((rule, rIdx) => (
              <div
                key={rIdx}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Banned */}
                  <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200 text-xs space-y-1">
                    <div className="font-black text-red-700 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>❌ Tuyệt đối không dùng:</span>
                    </div>
                    <p className="font-bold text-red-950 text-sm">"{rule.bannedText}"</p>
                  </div>

                  {/* Recommended */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
                    <div className="font-black text-emerald-700 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>✅ Thay bằng diễn đạt phát triển:</span>
                    </div>
                    <p className="font-bold text-emerald-950 text-sm select-text">
                      "{rule.recommendedText}"
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 font-medium pl-1 flex items-start gap-2">
                  <span className="font-bold text-blue-700 shrink-0">💡 Lý do sư phạm:</span>
                  <span>{rule.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. TAB: 10. BATCH ROSTER MODE (Nhận xét cả lớp) */}
      {activeTab === "batch" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-display font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Trợ Lý Tạo Nhận Xét Cho Cả Lớp (30–40 Học Sinh)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Dán danh sách tên học sinh vào ô dưới đây. Hệ thống sẽ tự động ghép nhận xét tiếng Anh đa dạng (không trùng lặp) cho từng học sinh chỉ trong 1 click.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={batchClassGrade}
                  onChange={(e) => setBatchClassGrade(e.target.value)}
                  placeholder="Lớp (Ví dụ: 3A1)"
                  className="w-24 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-center outline-none"
                />
                <button
                  onClick={handleGenerateBatch}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Tự Động Tạo Nhận Xét</span>
                </button>
              </div>
            </div>

            {/* Input textarea */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 block">
                Danh sách học sinh (mỗi dòng một tên):
              </label>
              <textarea
                rows={5}
                value={batchNamesText}
                onChange={(e) => setBatchNamesText(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                placeholder="Nguyễn Văn A&#10;Trần Thị B&#10;Lê Văn C..."
              />
            </div>

            {/* Results Table */}
            {batchResults.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-slate-800">
                    Đã tạo thành công <span className="text-emerald-700">{batchResults.length}</span> nhận xét tiếng Anh:
                  </div>

                  <button
                    onClick={handleCopyAllBatch}
                    className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-black text-amber-300 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedId === "batch-all" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === "batch-all" ? "Đã chép toàn bộ!" : "Sao chép toàn bộ danh sách"}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {batchResults.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-black text-slate-900 text-sm">{row.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                            {row.level}
                          </span>
                        </div>
                        <p className="text-slate-800 font-bold select-text pl-7">
                          "{row.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0">
                        <button
                          onClick={() => speakText(row.comment)}
                          className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                          title="Nghe câu"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(row.comment, `batch-${idx}`)}
                          className="px-3 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-800 font-bold border border-slate-200 cursor-pointer flex items-center gap-1"
                        >
                          {copiedId === `batch-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedId === `batch-${idx}` ? "Đã chép" : "Chép"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for rendering list of comments with search & variations
interface CommentListSectionProps {
  title: string;
  description: string;
  badgeColor: string;
  badgeText: string;
  items: ReportCommentItem[];
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

const CommentListSection: React.FC<CommentListSectionProps> = ({
  title,
  description,
  badgeColor,
  badgeText,
  items,
  onCopy,
  copiedId,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
            {title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-black border self-start sm:self-center ${badgeColor}`}>
          {badgeText}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <p className="text-base sm:text-lg font-black text-slate-900 select-text leading-snug">
                      "{item.english}"
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium select-text">
                      👉 {item.vietnamese}
                    </p>
                  </div>
                </div>

                {/* Variations if present */}
                {item.variations && item.variations.length > 0 && (
                  <div className="pl-8 pt-1.5 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400">
                      Cách diễn đạt tương đương (tránh lặp lời):
                    </span>
                    {item.variations.map((v, vIdx) => (
                      <div
                        key={vIdx}
                        className="text-xs text-slate-700 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between gap-2"
                      >
                        <span className="italic">"{v}"</span>
                        <button
                          onClick={() => onCopy(v, `${item.id}-v-${vIdx}`)}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] shrink-0 cursor-pointer"
                        >
                          {copiedId === `${item.id}-v-${vIdx}` ? "Đã chép!" : "Chép"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => speakText(item.english, { rate: 0.95 })}
                  className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 shadow-sm cursor-pointer"
                  title="Nghe chuẩn"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => speakText(item.english, { rate: 0.7 })}
                  className="px-2 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold shadow-sm cursor-pointer"
                  title="Nghe chậm"
                >
                  🐢
                </button>
                <button
                  onClick={() => onCopy(item.english, item.id)}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs border border-slate-200 shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
