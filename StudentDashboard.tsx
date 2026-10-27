import React, { useRef, useState, useCallback, useEffect } from "react";
import { AppSkill, UserProgress, GradeLevel } from "../types";
import { getUnitsByGrade } from "../data/globalSuccessCurriculumUnits";
import {
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
  Flame,
  Sparkles,
  Rocket,
  Compass,
  CheckCircle2,
  ArrowRight,
  Star,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  LayoutGrid,
  Columns,
  SlidersHorizontal,
  MoveHorizontal,
} from "lucide-react";
import { playSound } from "../utils/audioEffects";

interface StudentDashboardProps {
  progress: UserProgress;
  onSelectSkill: (skill: AppSkill) => void;
  onOpenLearningPack: () => void;
  onOpenDailyChallenge: () => void;
  onSelectGlobalSuccessUnit?: (grade: GradeLevel, unit: number) => void;
  onSelectExtendedTopic?: (topic: string) => void;
}

interface SkillCardConfig {
  id: AppSkill;
  title: string;
  subtitle: string;
  emoji: string;
  badge: string;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  descColor: string;
  xpRate: string;
  description: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  progress,
  onSelectSkill,
  onOpenLearningPack,
  onOpenDailyChallenge,
  onSelectGlobalSuccessUnit,
  onSelectExtendedTopic,
}) => {
  const currentGradeUnits = React.useMemo(() => {
    return getUnitsByGrade(progress.grade || 3);
  }, [progress.grade]);

  const cards: SkillCardConfig[] = [
    {
      id: "ai-assistant",
      title: "Trợ Lý AI Thanh Nguyễn",
      subtitle: "Hỏi đáp Từ vựng & Ngữ pháp",
      emoji: "🤖",
      badge: "Bản Quyền: Thanh Nguyễn",
      bgColor: "bg-[#FEF3C7]",
      borderColor: "border-[#FCD34D]",
      titleColor: "text-[#92400E]",
      descColor: "text-[#B45309]",
      xpRate: "HỎI ĐÁP SIÊU TỐC ⭐",
      description: "Giải đáp tức thì, đúng nội dung kiến thức về từ vựng, ngữ pháp, phát âm, mẫu câu và bài tập.",
    },
    {
      id: "smart-classroom",
      title: "Smart Classroom English",
      subtitle: "Tiếng Anh trong lớp học",
      emoji: "🏫",
      badge: "Dành Cho Giáo Viên",
      bgColor: "bg-[#EFF6FF]",
      borderColor: "border-[#93C5FD]",
      titleColor: "text-[#1E40AF]",
      descColor: "text-[#1D4ED8]",
      xpRate: "MỚI ⭐",
      description: "Kho câu lệnh, Attention Signals, lời khen và tra nghĩa bôi đen chuẩn lớp học tiểu học.",
    },
    {
      id: "curriculum",
      title: "SGK Global Success",
      subtitle: "Toàn bộ bài học Lớp 1-5",
      emoji: "🏫",
      badge: "Syllabus Explorer",
      bgColor: "bg-[#EDE9FE]",
      borderColor: "border-[#DDD6FE]",
      titleColor: "text-[#5B21B6]",
      descColor: "text-[#6D28D9]",
      xpRate: "Sách Chuẩn",
      description: "Khám phá tất cả các Unit, Lesson, từ vựng và mẫu câu chuẩn Bộ GD&ĐT (hoclieu.vn).",
    },
    {
      id: "vocabulary",
      title: "Vocabulary Guessing",
      subtitle: "Tổng hợp 16 & 20 Unit SGK",
      emoji: "📚",
      badge: "Đầy Đủ Các Unit",
      bgColor: "bg-[#FFEDD5]",
      borderColor: "border-[#FED7AA]",
      titleColor: "text-[#9A3412]",
      descColor: "text-[#C2410C]",
      xpRate: "+10 XP",
      description: "Tổng hợp toàn bộ từ vựng 16 Unit (Khối 1, 2) & 20 Unit (Khối 3, 4, 5). Đoán từ qua manh mối & 6 game.",
    },
    {
      id: "speaking",
      title: "Luyện Nói Với Cô Sophie",
      subtitle: "Đóng vai hội thoại & Sửa lỗi",
      emoji: "👩‍🏫",
      badge: "Teacher Sophie AI",
      bgColor: "bg-[#FCE7F3]",
      borderColor: "border-[#FBCFE8]",
      titleColor: "text-[#9D174D]",
      descColor: "text-[#BE185D]",
      xpRate: "+25 XP",
      description: "Cô giáo Sophie trò chuyện, gợi ý câu trả lời khi bí từ, sửa lỗi phát âm và hướng dẫn con nhắc lại.",
    },
    {
      id: "writing",
      title: "Luyện Viết",
      subtitle: "Sắp xếp & Bài mẫu AI",
      emoji: "✍️",
      badge: "5 Cấp độ",
      bgColor: "bg-[#F3E8FF]",
      borderColor: "border-[#E9D5FF]",
      titleColor: "text-[#6B21A8]",
      descColor: "text-[#7E22CE]",
      xpRate: "+20 XP",
      description: "Ghép câu từ xáo trộn, viết câu theo tranh, tạo bài mẫu AI chuẩn chỉnh.",
    },
    {
      id: "reading",
      title: "Luyện Đọc & Truyện Tương Tác",
      subtitle: "My Family (Lớp 3) & Global Success",
      emoji: "📖",
      badge: "Truyện Tương Tác ⭐",
      bgColor: "bg-[#DCFCE7]",
      borderColor: "border-[#BBF7D0]",
      titleColor: "text-[#166534]",
      descColor: "text-[#15803D]",
      xpRate: "+15 - 50 XP",
      description: "Đọc truyện tương tác phân nhánh 'My Family' đưa ra quyết định, nghe đọc to và làm 5 câu hỏi đọc hiểu tổng kết nhận thưởng.",
    },
    {
      id: "listening",
      title: "Luyện Nghe",
      subtitle: "Tốc độ chuẩn & Chậm 🐢",
      emoji: "🎧",
      badge: "Audio Controls",
      bgColor: "bg-[#DBEAFE]",
      borderColor: "border-[#BFDBFE]",
      titleColor: "text-[#1E40AF]",
      descColor: "text-[#1D4ED8]",
      xpRate: "+15 XP",
      description: "Nghe chọn tranh, điền từ nghe được, có transcript khi hoàn thành.",
    },
    {
      id: "grammar",
      title: "Ngữ Pháp (Grammar Lab)",
      subtitle: "6 Bước Khám Phá Tự Nhiên ⭐",
      emoji: "🔤",
      badge: "Grammar Lab",
      bgColor: "bg-[#FEF9C3]",
      borderColor: "border-[#FEF08A]",
      titleColor: "text-[#854D0E]",
      descColor: "text-[#A16207]",
      xpRate: "+25 XP",
      description: "Phòng thí nghiệm ngữ pháp 6 bước chuẩn SGK Global Success: To Be, Hiện Tại Đơn, Quá Khứ, Can/Can't, So Sánh...",
    },
    {
      id: "pronunciation",
      title: "Phát Âm",
      subtitle: "Trọng âm & Ngữ điệu",
      emoji: "👄",
      badge: "Stress & Pitch",
      bgColor: "bg-[#E0E7FF]",
      borderColor: "border-[#C7D2FE]",
      titleColor: "text-[#3730A3]",
      descColor: "text-[#4338CA]",
      xpRate: "+15 XP",
      description: "Cặp từ tối thiểu (ship/sheep), nhấn trọng âm TA-ble, ngữ điệu lên xuống.",
    },
    {
      id: "games",
      title: "Trò Chơi",
      subtitle: "10+ Trò chơi tương tác",
      emoji: "🎮",
      badge: "Games Hub",
      bgColor: "bg-[#FFCFD2]",
      borderColor: "border-[#FFA7A7]",
      titleColor: "text-[#991B1B]",
      descColor: "text-[#B91C1C]",
      xpRate: "Fun Rewards",
      description: "Bóng bay, Vòng quay may mắn, Word Scramble, Đua xe từ vựng, Lật thẻ.",
    },
    {
      id: "ai-tutor",
      title: "Milo AI Tutor",
      subtitle: "Bạn học AI thông minh",
      emoji: "🤖",
      badge: "24/7 Buddy",
      bgColor: "bg-[#CFFAFE]",
      borderColor: "border-[#A5F3FC]",
      titleColor: "text-[#155E75]",
      descColor: "text-[#0E7490]",
      xpRate: "AI Chat",
      description: "Trò chuyện bằng tiếng Anh/Việt, giải thích dễ hiểu, chữa bài tập tức thì.",
    },
    {
      id: "progress",
      title: "Tiến Trình",
      subtitle: "Spaced Repetition & XP",
      emoji: "📊",
      badge: "Báo Cáo",
      bgColor: "bg-[#E2E8F0]",
      borderColor: "border-[#CBD5E1]",
      titleColor: "text-[#334155]",
      descColor: "text-[#475569]",
      xpRate: "Badges",
      description: "Theo dõi chuỗi streak, ôn tập ngắt quãng từ sai, xem bảng vinh danh.",
    },
  ];

  const quickTopics = [
    { name: "My Family", emoji: "👨‍👩‍👧", grade: 3 },
    { name: "Our Bodies", emoji: "👂", grade: 3 },
    { name: "School Subjects", emoji: "📐", grade: 4 },
    { name: "Food & Drinks", emoji: "🍊", grade: 4 },
    { name: "Dinosaurs", emoji: "🦕", grade: 4 },
    { name: "Tet Holiday", emoji: "🧧", grade: 3 },
    { name: "Christmas", emoji: "🎅", grade: 3 },
    { name: "Space", emoji: "🚀", grade: 4 },
  ];

  const [modulesViewMode, setModulesViewMode] = useState<"carousel" | "grid">("carousel");
  const modulesContainerRef = useRef<HTMLDivElement>(null);
  const topicsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollModulesLeft, setCanScrollModulesLeft] = useState(false);
  const [canScrollModulesRight, setCanScrollModulesRight] = useState(true);
  const [isDraggingModules, setIsDraggingModules] = useState(false);
  const [modulesStartX, setModulesStartX] = useState(0);
  const [modulesScrollLeft, setModulesScrollLeft] = useState(0);
  const [hasDraggedModules, setHasDraggedModules] = useState(false);

  // Check scroll modules
  const checkModulesScroll = useCallback(() => {
    const el = modulesContainerRef.current;
    if (!el) return;
    setCanScrollModulesLeft(el.scrollLeft > 6);
    setCanScrollModulesRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkModulesScroll();
    const el = modulesContainerRef.current;
    if (!el) return;
    const handleResize = () => checkModulesScroll();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkModulesScroll, modulesViewMode]);

  const scrollModules = (amount: number) => {
    const el = modulesContainerRef.current;
    if (!el) return;
    playSound("click");
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(checkModulesScroll, 350);
  };

  const scrollTopics = (amount: number) => {
    const el = topicsContainerRef.current;
    if (!el) return;
    playSound("click");
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Drag handlers for modules carousel
  const handleModulesMouseDown = (e: React.MouseEvent) => {
    const el = modulesContainerRef.current;
    if (!el) return;
    setIsDraggingModules(true);
    setHasDraggedModules(false);
    setModulesStartX(e.pageX - el.offsetLeft);
    setModulesScrollLeft(el.scrollLeft);
  };

  const handleModulesMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingModules) return;
    const el = modulesContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - modulesStartX) * 1.3;
    if (Math.abs(walk) > 6) {
      setHasDraggedModules(true);
    }
    el.scrollLeft = modulesScrollLeft - walk;
    checkModulesScroll();
  };

  const handleModulesMouseUp = () => {
    setIsDraggingModules(false);
    setTimeout(() => setHasDraggedModules(false), 50);
  };

  const handleUnitClick = (unitNumber: number) => {
    playSound("click");
    if (onSelectGlobalSuccessUnit) {
      onSelectGlobalSuccessUnit(progress.grade, unitNumber);
    } else {
      onSelectSkill("curriculum");
    }
  };

  return (
    <div className="space-y-7 pb-12">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white p-6 sm:p-8 shadow-[0_8px_0_0_#1E40AF] border-2 border-blue-400">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-yellow-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-yellow-300 text-xs font-black border border-white/30 tracking-wide uppercase">
              <span>{progress.levelTitle}</span>
              <span>•</span>
              <span>Lớp {progress.grade} Global Success</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight leading-tight">
              Xin chào, {progress.studentName}! 👋
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
              Hôm nay em muốn luyện kỹ năng nào? Khám phá trọn bộ các Unit theo sách giáo khoa Global Success chuẩn Bộ GD&ĐT hoặc bắt đầu với các phân hệ học tập dưới đây!
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/25 backdrop-blur-xs text-xs font-black text-orange-300 border border-white/15">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>{progress.streakDays} Ngày Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/25 backdrop-blur-xs text-xs font-black text-yellow-300 border border-white/15">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{progress.xp} Tổng XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/25 backdrop-blur-xs text-xs font-black text-emerald-300 border border-white/15">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{progress.missedWords.length} Từ cần ôn tập</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <button
              id="dashboard-daily-challenge-btn"
              onClick={() => {
                playSound("star");
                onOpenDailyChallenge();
              }}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#FCD34D] hover:bg-[#FBBF24] text-[#78350F] font-black text-xs sm:text-sm shadow-[0_5px_0_0_#D97706] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Thử Thách Hôm Nay</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              id="dashboard-learning-pack-btn"
              onClick={() => {
                playSound("click");
                onOpenLearningPack();
              }}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white border-2 border-white/40 font-black text-xs sm:text-sm shadow-[0_5px_0_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-yellow-300" />
              <span>Gói Học 1-Click</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Global Success Unit Roadmap */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
              🏫
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg text-[#1E293B]">
                Bản Đồ Bài Học SGK Global Success (Lớp {progress.grade})
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Nhấn vào Unit bất kỳ để mở bài học, nghe phát âm & luyện tập tức thì
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onSelectSkill("curriculum");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-black transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>Xem Toàn Bộ {currentGradeUnits.length} Unit</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Units Horizontal Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-1">
          {currentGradeUnits.slice(0, 12).map((unit) => (
            <button
              key={unit.unitNumber}
              onClick={() => handleUnitClick(unit.unitNumber)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border-2 border-slate-200 hover:border-blue-400 text-left transition-all group cursor-pointer shadow-xs active:translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {unit.icon || "📖"}
                </span>
                <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-md">
                  Unit {unit.unitNumber}
                </span>
              </div>
              <h4 className="font-black text-xs text-slate-800 line-clamp-1 group-hover:text-blue-700">
                {unit.unitTitle}
              </h4>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {unit.unitTitleVi}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Explore Topics Bar with Left/Right slide arrows */}
      <div className="bg-white rounded-[28px] p-4 sm:p-5 border-2 border-[#D1E0FB] shadow-[0_6px_0_0_#D1E0FB]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            <h2 className="font-display font-black text-sm sm:text-base text-[#1E293B]">
              Chủ Đề Nổi Bật (Global Success & Mở Rộng)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider hidden sm:inline">
              Chọn để học nhanh
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollTopics(-180)}
                aria-label="Cuộn chủ đề sang trái"
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 flex items-center justify-center transition-all cursor-pointer border border-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTopics(180)}
                aria-label="Cuộn chủ đề sang phải"
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 flex items-center justify-center transition-all cursor-pointer border border-slate-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={topicsContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none scroll-smooth"
        >
          {quickTopics.map((topic) => (
            <button
              key={topic.name}
              onClick={() => {
                playSound("click");
                onSelectExtendedTopic?.(topic.name);
                onSelectSkill("vocabulary");
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#F0F7FF] hover:bg-blue-100 border-2 border-[#D1E0FB] text-slate-800 hover:text-blue-700 text-xs font-black whitespace-nowrap transition-all shadow-xs active:translate-y-0.5 cursor-pointer shrink-0"
            >
              <span className="text-lg">{topic.emoji}</span>
              <span>{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Core Modules Section with Interactive Scrollable Bar (Di chuyển qua lại không bị ẩn) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-[24px] border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB]">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display font-black text-lg sm:text-xl text-[#1E293B] uppercase tracking-tight">
              Thanh Phân Hệ Học Tập
            </h2>
            <span className="text-xs font-black text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
              13 Ứng Dụng
            </span>
          </div>

          {/* Navigation Controls: Left/Right Buttons & View Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {modulesViewMode === "carousel" && (
              <div className="flex items-center gap-1.5 mr-2">
                <button
                  type="button"
                  onClick={() => scrollModules(-320)}
                  disabled={!canScrollModulesLeft}
                  title="Di chuyển sang trái"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                    canScrollModulesLeft
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-600 hover:text-white cursor-pointer shadow-xs active:scale-95"
                      : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollModules(320)}
                  disabled={!canScrollModulesRight}
                  title="Di chuyển sang phải"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                    canScrollModulesRight
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-600 hover:text-white cursor-pointer shadow-xs active:scale-95"
                      : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
                  }`}
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            )}

            {/* Layout Toggle: Carousel vs Grid */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setModulesViewMode("carousel");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  modulesViewMode === "carousel"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Dạng thanh trượt di chuyển qua lại"
              >
                <MoveHorizontal className="w-3.5 h-3.5" />
                <span>Trượt ngang</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setModulesViewMode("grid");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  modulesViewMode === "grid"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Dạng lưới toàn bộ"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Lưới</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel View Mode (Scrollable with Left/Right navigation & drag) */}
        {modulesViewMode === "carousel" ? (
          <div className="relative">
            {/* Left Edge Overlay Button */}
            {canScrollModulesLeft && (
              <button
                type="button"
                onClick={() => scrollModules(-320)}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-blue-700 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-2 border-blue-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Xem ứng dụng phía trước"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3]" />
              </button>
            )}

            {/* Right Edge Overlay Button */}
            {canScrollModulesRight && (
              <button
                type="button"
                onClick={() => scrollModules(320)}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-blue-700 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-2 border-blue-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Xem thêm ứng dụng tràn màn hình"
              >
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={modulesContainerRef}
              onScroll={checkModulesScroll}
              onMouseDown={handleModulesMouseDown}
              onMouseMove={handleModulesMouseMove}
              onMouseUp={handleModulesMouseUp}
              onMouseLeave={handleModulesMouseUp}
              className={`flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none scroll-smooth ${
                isDraggingModules ? "cursor-grabbing select-none" : "cursor-grab"
              }`}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  id={`module-card-carousel-${card.id}`}
                  onClick={() => {
                    if (hasDraggedModules) return;
                    playSound("click");
                    onSelectSkill(card.id);
                  }}
                  className={`w-[260px] sm:w-[280px] shrink-0 ${card.bgColor} border-b-8 border-r-8 ${card.borderColor} rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1 active:border-b-4 active:border-r-4 select-none group shadow-xs`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-4xl group-hover:scale-110 transition-transform block">
                        {card.emoji}
                      </span>
                      <div className="flex flex-col items-end gap-1">
                        <span className="bg-white/80 backdrop-blur-xs text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-white/60">
                          {card.badge}
                        </span>
                        <span className="bg-white/90 text-emerald-700 text-[10px] font-black px-1.5 py-0.2 rounded-md shadow-xs">
                          {card.xpRate}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className={`font-display font-black text-base sm:text-lg ${card.titleColor} uppercase tracking-tight`}>
                        {card.title}
                      </h3>
                      <p className={`text-xs font-bold ${card.descColor} line-clamp-1`}>
                        {card.subtitle}
                      </p>
                    </div>

                    <p className={`text-[11px] font-semibold ${card.descColor}/90 leading-relaxed line-clamp-2`}>
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-black/5 flex items-center justify-between text-xs font-black group-hover:opacity-100">
                    <span className={card.titleColor}>Vào Học Ngay</span>
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform">
                      <ArrowRight className={`w-3.5 h-3.5 ${card.titleColor}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Instruction footnote for children */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-2 pt-1">
              <span className="flex items-center gap-1.5">
                <MoveHorizontal className="w-4 h-4 text-blue-500 animate-pulse" />
                Kéo chuột hoặc nhấn nút mũi tên để di chuyển qua lại giữa {cards.length} ứng dụng
              </span>
              <span>13 Phân Hệ Học Tập</span>
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {cards.map((card) => (
              <div
                key={card.id}
                id={`module-card-grid-${card.id}`}
                onClick={() => {
                  playSound("click");
                  onSelectSkill(card.id);
                }}
                className={`${card.bgColor} border-b-8 border-r-8 ${card.borderColor} rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1 active:border-b-4 active:border-r-4 select-none group`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform block">
                      {card.emoji}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-white/80 backdrop-blur-xs text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-white/60">
                        {card.badge}
                      </span>
                      <span className="bg-white/90 text-emerald-700 text-[10px] font-black px-1.5 py-0.2 rounded-md shadow-xs">
                        {card.xpRate}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-display font-black text-lg ${card.titleColor} uppercase tracking-tight`}>
                      {card.title}
                    </h3>
                    <p className={`text-xs font-bold ${card.descColor} line-clamp-1`}>
                      {card.subtitle}
                    </p>
                  </div>

                  <p className={`text-[11px] font-semibold ${card.descColor}/90 leading-relaxed line-clamp-2`}>
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-black/5 flex items-center justify-between text-xs font-black group-hover:opacity-100">
                  <span className={card.titleColor}>Vào Học Ngay</span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform">
                    <ArrowRight className={`w-3.5 h-3.5 ${card.titleColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Highlight Footer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
        {/* Today's Challenge Highlight */}
        <div className="bg-white border-2 border-[#D1E0FB] rounded-[32px] p-6 flex flex-col sm:flex-row items-center gap-5 shadow-[0_6px_0_0_#D1E0FB]">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            🏆
          </div>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-between">
              <span className="font-display font-black text-sm text-[#1E293B] uppercase tracking-wide">
                Nhiệm Vụ Hằng Ngày
              </span>
              <span className="font-black text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 text-xs">
                +100 XP Thưởng
              </span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden border border-slate-300">
              <div className="bg-gradient-to-r from-orange-400 to-amber-500 h-full w-1/2 rounded-full" />
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              Hoàn thành 6 hoạt động hôm nay để nhận huy hiệu Siêu Cần Cù!
            </p>
          </div>
          <button
            onClick={() => {
              playSound("star");
              onOpenDailyChallenge();
            }}
            className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-[0_4px_0_0_#D97706] active:translate-y-0.5 active:shadow-none whitespace-nowrap transition-all cursor-pointer"
          >
            Mở Nhiệm Vụ
          </button>
        </div>

        {/* Milo Tutor Companion Highlight */}
        <div className="bg-[#1E293B] rounded-[32px] p-6 text-white shadow-[0_6px_0_0_#0F172A] border-2 border-slate-700 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400/40 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            🤖
          </div>
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-black text-sm text-white uppercase tracking-wide">
                Milo AI Tutor 24/7
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-300 font-medium">
              "Em có câu hỏi ngữ pháp hay từ vựng nào chưa hiểu không? Hỏi Milo ngay nhé!"
            </p>
          </div>
          <button
            onClick={() => {
              playSound("click");
              onSelectSkill("ai-tutor");
            }}
            className="px-4 py-2.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-black text-xs shadow-[0_4px_0_0_#0891B2] active:translate-y-0.5 active:shadow-none whitespace-nowrap transition-all cursor-pointer"
          >
            Chat với Milo
          </button>
        </div>
      </div>
    </div>
  );
};
