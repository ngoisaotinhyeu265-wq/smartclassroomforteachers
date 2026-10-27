import React, { useState, useEffect } from "react";
import { LessonScriptPlan, LessonScriptStage, ScriptPhraseItem } from "../../types/smartClassroom";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  FileText,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Copy,
  Printer,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight,
  Eye,
  Check,
  RefreshCw,
  Layers,
  HelpCircle,
} from "lucide-react";

interface ClassroomScriptBuilderProps {
  onOpenSelectionTranslate?: (text: string) => void;
}

// Curated default 7-stage lesson plan template for Grade 3 Global Success
const DEFAULT_LESSON_PLAN: LessonScriptPlan = {
  lessonTitle: "Tiết Học Tiêu Chuẩn 35 Phút (Lớp 3 - Global Success)",
  topic: "Unit 3: Our Friends (Giao tiếp & Giới thiệu bạn bè)",
  totalDuration: "35 phút",
  stages: [
    {
      stageId: "opening",
      stageName: "Stage 1: Opening",
      stageNameVi: "1. Chào Đầu Giờ & Ổn Định",
      duration: "3 phút",
      purpose: "Chào hỏi, kiểm tra sĩ số, khơi gợi năng lượng",
      phrases: [
        {
          phraseEn: "Good morning, class! Please stand up nicely.",
          phraseVi: "Chào buổi sáng cả lớp! Mời các em đứng ngay ngắn nào.",
          ipa: "/ɡʊd ˈmɔːnɪŋ klɑːs/",
          gesture: "Hai bàn tay đưa lên nhẹ nhàng mời học sinh đứng",
          expectedStudentResponse: "Good morning, teacher!",
        },
        {
          phraseEn: "How are you today? Are you ready for English?",
          phraseVi: "Hôm nay các em thế nào? Đã sẵn sàng học tiếng Anh chưa?",
          ipa: "/hɑʊ ɑː jʊ təˈdeɪ/",
          gesture: "Nụ cười tươi tắn và ngón tay cái hướng lên (Thumbs up)",
          expectedStudentResponse: "Yes, we are ready!",
        },
        {
          phraseEn: "Is anyone absent today? Who is missing?",
          phraseVi: "Hôm nay có bạn nào vắng mặt không cả lớp?",
          ipa: "/ɪz ˈeniwʌn ˈæbsənt təˈdeɪ/",
          gesture: "Liếc nhìn nhanh sĩ số và mỉm cười",
          expectedStudentResponse: "Nobody, teacher! Everyone is here!",
        },
        {
          phraseEn: "Sit down, please. Let's start our lesson!",
          phraseVi: "Mời các em ngồi xuống. Chúng ta bắt đầu bài học nhé!",
          ipa: "/sɪt daʊn pliːz/",
          gesture: "Hạ hai lòng bàn tay mời cả lớp ngồi",
          expectedStudentResponse: "Học sinh ngồi xuống trật tự",
        },
      ],
    },
    {
      stageId: "warmup",
      stageName: "Stage 2: Warm-up",
      stageNameVi: "2. Khởi Động & Ôn Bài Cũ",
      duration: "5 phút",
      purpose: "Kích hoạt phản xạ vui vẻ qua bài hát hoặc trò chơi nhỏ",
      phrases: [
        {
          phraseEn: "Let's sing our Hello song together! Clap your hands!",
          phraseVi: "Cả lớp cùng hát bài hát Xin Chào nào! Vỗ tay theo nhịp nhé!",
          ipa: "/lets sɪŋ ɑʊə həˈləʊ sɒŋ tuːˈɡeðə/",
          gesture: "Vỗ tay theo nhịp điệu bài hát vui nhộn",
          expectedStudentResponse: "Cả lớp vừa hát vừa vỗ tay hào hứng",
        },
        {
          phraseEn: "One, two, three -> Eyes on me!",
          phraseVi: "Một, hai, ba -> Mắt nhìn cô nào!",
          ipa: "/wʌn tuː θriː aɪz ɒn miː/",
          gesture: "Chỉ hai ngón tay vào mắt mình",
          expectedStudentResponse: "One, two -> Eyes on you!",
        },
        {
          phraseEn: "Who can remember the words from yesterday? Raise your hand!",
          phraseVi: "Ai còn nhớ các từ chúng ta học hôm qua nào? Giơ tay lên cô xem!",
          ipa: "/huː kæn rɪˈmembə ðə wɜːdz/",
          gesture: "Giơ một tay lên cao làm mẫu",
          expectedStudentResponse: "Nhiều cánh tay giơ lên hào hứng",
        },
      ],
    },
    {
      stageId: "presentation",
      stageName: "Stage 3: Presentation",
      stageNameVi: "3. Dẫn Dắt & Giảng Bài Mới",
      duration: "10 phút",
      purpose: "Dạy từ vựng mới, mẫu câu trọng tâm kết hợp tranh/thẻ từ",
      phrases: [
        {
          phraseEn: "Open your books to page 24, please.",
          phraseVi: "Mời các em mở sách trang 24.",
          ipa: "/ˈəʊpən jɔː bʊks tuː peɪdʒ/",
          gesture: "Giơ sách và chỉ vào số 24 trên góc bảng",
          expectedStudentResponse: "Học sinh lật sách đến đúng trang",
        },
        {
          phraseEn: "Look at the big screen and listen carefully.",
          phraseVi: "Hãy nhìn lên màn hình lớn và lắng nghe thật kỹ nhé.",
          ipa: "/lʊk æt ðə bɪɡ skriːn/",
          gesture: "Chỉ tay lên màn hình hoặc tranh minh họa",
          expectedStudentResponse: "Cả lớp hướng mắt lên màn hình",
        },
        {
          phraseEn: "Listen first, don't say anything. Just listen.",
          phraseVi: "Chỉ nghe trước thôi, các em chưa cần đọc. Lắng nghe thật kỹ nhé.",
          ipa: "/ˈlɪsn fɜːst dɒnt seɪ ˈeniθɪŋ/",
          gesture: "Đặt một ngón trỏ lên tai và lắc nhẹ tay còn lại",
          expectedStudentResponse: "Lớp im lặng chú ý lắng nghe cô phát âm",
        },
        {
          phraseEn: "Now listen and repeat after me. Friend... Friend!",
          phraseVi: "Bây giờ nghe và nhắc lại theo cô nhé. Friend... Friend!",
          ipa: "/nɑʊ ˈlɪsn ænd rɪˈpiːt/",
          gesture: "Chỉ vào miệng cô rồi đưa tay về phía học sinh",
          expectedStudentResponse: "Cả lớp đồng thanh: Friend!",
        },
      ],
    },
    {
      stageId: "practice",
      stageName: "Stage 4: Guided Practice",
      stageNameVi: "4. Luyện Tập Có Hướng Dẫn",
      duration: "10 phút",
      purpose: "Luyện đọc theo dãy, đồng thanh, cá nhân và làm việc theo cặp",
      phrases: [
        {
          phraseEn: "Row 1, read it loud and clear, please!",
          phraseVi: "Dãy 1, các em đọc thật to và rõ ràng nhé!",
          ipa: "/rəʊ wʌn riːd ɪt lɑʊd/",
          gesture: "Đưa tay chỉ về phía dãy bàn 1",
          expectedStudentResponse: "Học sinh dãy 1 đồng thanh đọc to",
        },
        {
          phraseEn: "Excellent pronunciation! Good job, Row 1!",
          phraseVi: "Phát âm rất xuất sắc! Tốt lắm dãy 1!",
          ipa: "/ˈeksələnt prəˌnʌnsiˈeɪʃn/",
          gesture: "Vỗ tay tán thưởng nồng nhiệt",
          expectedStudentResponse: "Học sinh vui vẻ tự tin",
        },
        {
          phraseEn: "Now turn to your partner. Practice the conversation in 3 minutes.",
          phraseVi: "Bây giờ các em quay sang bạn bên cạnh. Luyện đoạn hội thoại trong 3 phút.",
          ipa: "/nɑʊ tɜːn tuː jɔː ˈpɑːtnə/",
          gesture: "Hai bàn tay chắp lại làm ký hiệu hai người đối thoại",
          expectedStudentResponse: "Học sinh quay sang nhau bắt đầu thực hành",
        },
        {
          phraseEn: "You have one minute left! Finish up, please.",
          phraseVi: "Các em còn 1 phút nữa thôi nhé! Hãy nhanh chóng hoàn thành nào.",
          ipa: "/jʊ hæv wʌn ˈmɪnɪt left/",
          gesture: "Giơ 1 ngón tay và chỉ vào đồng hồ",
          expectedStudentResponse: "Học sinh tăng tốc luyện tập câu cuối",
        },
      ],
    },
    {
      stageId: "production",
      stageName: "Stage 5: Production & Game",
      stageNameVi: "5. Vận Dụng & Trò Chơi",
      duration: "5 phút",
      purpose: "Hoạt động giao tiếp tự do, mini game hoặc thi đấu nhóm",
      phrases: [
        {
          phraseEn: "Are you ready for our mini game? Team Red vs Team Blue!",
          phraseVi: "Các em đã sẵn sàng chơi mini game chưa? Đội Đỏ đấu với Đội Xanh nhé!",
          ipa: "/ɑː jʊ ˈredi fɔːr ɑʊə ˈmɪni ɡeɪm/",
          gesture: "Chỉ tay sang hai bên chia lớp làm hai đội",
          expectedStudentResponse: "Yeah! We are ready!",
        },
        {
          phraseEn: "Who wants to come to the front? Raise your hand!",
          phraseVi: "Ai muốn lên bảng nào? Hãy giơ tay lên cô xem!",
          ipa: "/huː wɒnts tuː kʌm tuː ðə frʌnt/",
          gesture: "Mời hai đại diện học sinh bước lên bục giảng",
          expectedStudentResponse: "Học sinh đồng loạt giơ tay xin lên bảng",
        },
        {
          phraseEn: "One, two, three, go! Let's guess the picture!",
          phraseVi: "Một, hai, ba, bắt đầu! Cùng đoán bức tranh nào!",
          ipa: "/wʌn tuː θriː ɡəʊ/",
          gesture: "Hô to đếm ngược và mở thẻ tranh",
          expectedStudentResponse: "Cả lớp hò reo cổ vũ sôi nổi",
        },
      ],
    },
    {
      stageId: "review",
      stageName: "Stage 6: Review & Wrap-up",
      stageNameVi: "6. Củng Cố & Khen Ngợi",
      duration: "4 phút",
      purpose: "Tổng kết bài học, kiểm tra độ hiểu bài và đếm sao thi đua",
      phrases: [
        {
          phraseEn: "What did we learn today? Who can tell me?",
          phraseVi: "Hôm nay chúng ta đã học được những gì nào? Ai có thể nói cho cô?",
          ipa: "/wɒt dɪd wiː lɜːn təˈdeɪ/",
          gesture: "Đưa tay mời học sinh giơ tay phát biểu",
          expectedStudentResponse: "Today we learned words about friends!",
        },
        {
          phraseEn: "That's exactly right! Spot on!",
          phraseVi: "Hoàn toàn chính xác! Chuẩn không cần chỉnh!",
          ipa: "/ðæts ɪɡˈzæktli raɪt/",
          gesture: "Gật đầu tán thưởng và mỉm cười",
          expectedStudentResponse: "Học sinh tự hào",
        },
        {
          phraseEn: "You all worked so hard today. Give yourselves a big round of applause!",
          phraseVi: "Hôm nay cả lớp đã học tập rất chăm chỉ. Cả lớp tự thưởng cho mình một tràng pháo tay nào!",
          ipa: "/jʊ ɔːl wɜːkt səʊ hɑːd təˈdeɪ/",
          gesture: "Vỗ tay thật to và tự hào",
          expectedStudentResponse: "Cả lớp vỗ tay rộn ràng khắp phòng học",
        },
      ],
    },
    {
      stageId: "ending",
      stageName: "Stage 7: Homework & Goodbye",
      stageNameVi: "7. Dặn Dò & Lời Chào Tạm Biệt",
      duration: "3 phút",
      purpose: "Dặn dò bài tập về nhà, thu dọn sách vở và chào ra về",
      phrases: [
        {
          phraseEn: "Please take out your homework notebooks.",
          phraseVi: "Các em lấy vở bài tập về nhà ra để ghi bài nào.",
          ipa: "/pliːz teɪk aʊt jɔː ˈhəʊmwɜːk ˈnəʊtbʊks/",
          gesture: "Làm động tác mở vở ghi chép",
          expectedStudentResponse: "Học sinh mở vở ghi bài tập",
        },
        {
          phraseEn: "Remember to do exercise 1 and 2 on page 26.",
          phraseVi: "Các em nhớ làm bài tập 1 và 2 ở trang 26 nhé.",
          ipa: "/rɪˈmembə tuː duː ˈeksəsaɪz/",
          gesture: "Viết bài tập ngắn gọn lên góc bảng",
          expectedStudentResponse: "Yes, teacher!",
        },
        {
          phraseEn: "Put your books and pens away, please.",
          phraseVi: "Cất sách vở và bút vào cặp nào các em.",
          ipa: "/pʊt jɔː bʊks ænd penz əˈweɪ/",
          gesture: "Làm động tác kéo khóa cặp",
          expectedStudentResponse: "Học sinh thu dọn bàn học gọn gàng",
        },
        {
          phraseEn: "Stand up nicely, class. Goodbye and see you tomorrow!",
          phraseVi: "Cả lớp đứng ngay ngắn nào. Chào tạm biệt và hẹn gặp lại các em ngày mai nhé!",
          ipa: "/stænd ʌp ˈnaɪsli klɑːs/",
          gesture: "Vẫy tay chào tạm biệt với nụ cười ấm áp",
          expectedStudentResponse: "Goodbye teacher! Have a nice day!",
        },
      ],
    },
  ],
};

const SAMPLE_TEMPLATES = [
  {
    id: "g3_friends",
    title: "Lớp 3: Unit 3 - Our Friends",
    desc: "Tiết dạy chuẩn 35 phút: Giới thiệu bạn bè, luyện phát âm /p/ & /b/",
  },
  {
    id: "g4_can_do",
    title: "Lớp 4: Unit 5 - Things We Can Do",
    desc: "Tiết dạy chuẩn: Động từ hành động, thực hành cặp, mini game",
  },
  {
    id: "g5_daily",
    title: "Lớp 5: Unit 2 - I Always Get Up Early",
    desc: "Tiết dạy chuẩn: Thói quen hàng ngày, khảo sát nhóm và đóng vai",
  },
  {
    id: "g1_colors",
    title: "Lớp 1-2: Colors & Animals (TPR)",
    desc: "Tiết dạy tiểu học đầu cấp: Nhiều bài hát, khẩu lệnh nhịp điệu ngắn",
  },
];

export const ClassroomScriptBuilder: React.FC<ClassroomScriptBuilderProps> = ({
  onOpenSelectionTranslate,
}) => {
  const [scriptPlan, setScriptPlan] = useState<LessonScriptPlan>(DEFAULT_LESSON_PLAN);
  const [activeStageId, setActiveStageId] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"bilingual" | "english-only">("bilingual");
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlayingScript, setIsPlayingScript] = useState<boolean>(false);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<number | null>(null);

  // AI Generator Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiGrade, setAiGrade] = useState<number>(3);
  const [aiUnit, setAiUnit] = useState<string>("Unit 3: Our Friends");
  const [aiTopic, setAiTopic] = useState<string>("Describing friends and hobbies");
  const [aiSkill, setAiSkill] = useState<string>("Speaking & Phonics");
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Filtered phrases based on selected stage tab
  const displayedStages =
    activeStageId === "all"
      ? scriptPlan.stages
      : scriptPlan.stages.filter((s) => s.stageId === activeStageId);

  // Total phrases count
  const totalPhrasesCount = scriptPlan.stages.reduce(
    (acc, stage) => acc + stage.phrases.length,
    0
  );

  const handleGenerateAiScript = async () => {
    setIsGeneratingAi(true);
    playSound("click");
    try {
      const res = await fetch("/api/smart-classroom/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: aiGrade,
          unitTitle: aiUnit,
          topic: aiTopic,
          skillFocus: aiSkill,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.stages && Array.isArray(data.stages)) {
          setScriptPlan(data);
          setIsAiModalOpen(false);
          playSound("levelup");
          alert("Kịch bản tiết dạy AI đã được tạo thành công!");
        }
      }
    } catch (err) {
      console.error("Failed to generate AI script:", err);
      alert("Không thể kết nối máy chủ AI. Vui lòng thử lại sau ít giây.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCopyFullScript = () => {
    playSound("click");
    let fullText = `=== ${scriptPlan.lessonTitle} ===\nChủ đề: ${scriptPlan.topic}\nThời lượng: ${scriptPlan.totalDuration}\n\n`;

    scriptPlan.stages.forEach((stage, idx) => {
      fullText += `--- ${stage.stageNameVi} (${stage.duration}) ---\n`;
      stage.phrases.forEach((p, pIdx) => {
        fullText += `${pIdx + 1}. [Teacher]: "${p.phraseEn}"\n   [Dịch nghĩa]: ${p.phraseVi}\n`;
        if (p.gesture) fullText += `   [Mẹo cử chỉ]: ${p.gesture}\n`;
        if (p.expectedStudentResponse) fullText += `   [Phản ứng trò]: ${p.expectedStudentResponse}\n`;
        fullText += `\n`;
      });
      fullText += `\n`;
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    playSound("click");
    let fullText = `=== ${scriptPlan.lessonTitle} ===\nChủ đề: ${scriptPlan.topic}\n\n`;
    scriptPlan.stages.forEach((stage) => {
      fullText += `### ${stage.stageNameVi} (${stage.duration})\n`;
      stage.phrases.forEach((p) => {
        fullText += `- ${p.phraseEn}\n  -> ${p.phraseVi}\n`;
      });
      fullText += `\n`;
    });

    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Classroom_Script_${scriptPlan.lessonTitle.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    playSound("click");
    window.print();
  };

  // Autoplay through the whole stage audio sequentially
  const handleAutoplayStage = async (stage: LessonScriptStage) => {
    if (isPlayingScript) {
      setIsPlayingScript(false);
      return;
    }

    playSound("click");
    setIsPlayingScript(true);

    for (let i = 0; i < stage.phrases.length; i++) {
      setCurrentlyPlayingIndex(i);
      speakText(stage.phrases[i].phraseEn, { rate: 0.95 });
      // wait for speech + pause
      await new Promise((resolve) => setTimeout(resolve, 3500));
    }

    setIsPlayingScript(false);
    setCurrentlyPlayingIndex(null);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-teal-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Lesson Script Builder (7 Stages)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Teacher's Classroom Script
            </h1>
            <p className="text-teal-100 text-sm sm:text-base mt-1 max-w-2xl font-medium">
              Ghép nối toàn bộ 7 chặng sư phạm:{" "}
              <span className="text-amber-300 font-bold">
                Opening → Warm-up → Presentation → Practice → Production → Review → Homework → Goodbye
              </span>{" "}
              thành một kịch bản tiếng Anh hoàn chỉnh, mạch lạc từng phút cho cả tiết dạy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                playSound("click");
                setIsAiModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm shadow-[0_3px_0_0_#B45309] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer uppercase"
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              <span>Tạo Kịch Bản Bằng AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Control Bar & Stage Selector */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>{scriptPlan.lessonTitle}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {scriptPlan.totalDuration}
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Chủ đề: <span className="text-slate-700 font-bold">{scriptPlan.topic}</span> • Tổng số:{" "}
              <span className="text-blue-600 font-bold">{totalPhrasesCount} câu lệnh sư phạm</span>
            </p>
          </div>

          {/* Export & View Mode Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Bilingual toggle */}
            <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => {
                  playSound("click");
                  setViewMode("bilingual");
                }}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === "bilingual"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Song ngữ Anh - Việt
              </button>
              <button
                onClick={() => {
                  playSound("click");
                  setViewMode("english-only");
                }}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === "english-only"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Chỉ Tiếng Anh
              </button>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopyFullScript}
              className="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
              title="Sao chép toàn bộ kịch bản"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Đã chép!" : "Sao chép"}</span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
              title="In kịch bản ra giấy A4"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In</span>
            </button>

            {/* Download button */}
            <button
              onClick={handleDownloadTxt}
              className="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
              title="Tải tệp văn bản .txt"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải về</span>
            </button>
          </div>
        </div>

        {/* 7 Stages Tab Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Chọn chặng để xem chi tiết hoặc bấm "Toàn bộ kịch bản":</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                playSound("click");
                setActiveStageId("all");
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                activeStageId === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
            >
              📑 Toàn bộ 7 chặng ({totalPhrasesCount})
            </button>

            {scriptPlan.stages.map((st, idx) => (
              <button
                key={st.stageId}
                onClick={() => {
                  playSound("click");
                  setActiveStageId(st.stageId);
                }}
                className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStageId === st.stageId
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                <span>{st.stageNameVi}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10">
                  {st.duration}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Stages List Rendering */}
      <div className="space-y-6">
        {displayedStages.map((stage, stageIdx) => (
          <div
            key={stage.stageId}
            className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5"
          >
            {/* Stage Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase">
                    {stage.stageName}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Thời lượng ước tính: {stage.duration}</span>
                  </span>
                </div>
                <h3 className="text-xl font-display font-black text-slate-900 mt-1">
                  {stage.stageNameVi}
                </h3>
                {stage.purpose && (
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Mục tiêu sư phạm: {stage.purpose}
                  </p>
                )}
              </div>

              {/* Stage Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAutoplayStage(stage)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                    isPlayingScript
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  title="Tự động đọc lần lượt tất cả các câu trong chặng này"
                >
                  {isPlayingScript ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Dừng đọc</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Nghe toàn bộ chặng</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phrases in this stage */}
            <div className="space-y-4">
              {stage.phrases.map((phrase, pIdx) => {
                const isCurrentlyPlaying =
                  isPlayingScript && currentlyPlayingIndex === pIdx;

                return (
                  <div
                    key={pIdx}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isCurrentlyPlaying
                        ? "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
                        : "bg-slate-50/60 hover:bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        {/* Number & Utterance */}
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                            {pIdx + 1}
                          </span>
                          <div className="space-y-1">
                            <p className="text-base sm:text-lg font-black text-slate-900 select-text leading-snug">
                              {phrase.phraseEn}
                            </p>
                            {phrase.ipa && (
                              <p className="text-xs font-mono text-blue-700 font-semibold select-text">
                                {phrase.ipa}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Translation (if bilingual) */}
                        {viewMode === "bilingual" && (
                          <div className="pl-9 text-xs sm:text-sm text-slate-700 font-medium">
                            <span className="text-slate-400 font-bold mr-1">Dịch:</span>
                            <span>{phrase.phraseVi}</span>
                          </div>
                        )}

                        {/* Gesture & Expected Student Response */}
                        <div className="pl-9 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {phrase.gesture && (
                            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-1.5">
                              <span className="font-black text-amber-700 shrink-0">
                                ✋ Mẹo cử chỉ:
                              </span>
                              <span className="font-medium">{phrase.gesture}</span>
                            </div>
                          )}

                          {phrase.expectedStudentResponse && (
                            <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950 flex items-start gap-1.5">
                              <span className="font-black text-teal-700 shrink-0">
                                👧 Phản ứng trò:
                              </span>
                              <span className="font-medium italic">
                                {phrase.expectedStudentResponse}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            playSound("click");
                            speakText(phrase.phraseEn, { rate: 0.95 });
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 shadow-sm cursor-pointer"
                          title="Nghe câu này (0.95x)"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            playSound("click");
                            speakText(phrase.phraseEn, { rate: 0.65 });
                          }}
                          className="px-2 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold shadow-sm cursor-pointer"
                          title="Nghe chậm"
                        >
                          🐢
                        </button>
                        <button
                          onClick={() => {
                            playSound("click");
                            navigator.clipboard.writeText(phrase.phraseEn);
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-sm cursor-pointer"
                          title="Sao chép"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 4. AI Script Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-display font-black text-lg text-slate-900">
                  Tạo Kịch Bản Tiết Dạy Bằng AI
                </h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Nhập thông tin bài học Global Success của bạn, trợ lý Gemini sẽ ghép nối 7 chặng khẩu lệnh lớp học hoàn chỉnh, tự nhiên và sát thực tế nhất.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp:</label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setAiGrade(g)}
                      className={`py-2 rounded-xl font-black text-xs border transition-all cursor-pointer ${
                        aiGrade === g
                          ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên bài / Unit:
                </label>
                <input
                  type="text"
                  value={aiUnit}
                  onChange={(e) => setAiUnit(e.target.value)}
                  placeholder="Ví dụ: Unit 3: Our Friends"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chủ đề & Nội dung bài dạy:
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ví dụ: Giới thiệu bạn bè, hỏi tên và tuổi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Trọng tâm kỹ năng:
                </label>
                <select
                  value={aiSkill}
                  onChange={(e) => setAiSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Speaking & Phonics">Speaking & Phonics (Nói & Ngữ âm)</option>
                  <option value="Listening & Vocabulary">Listening & Vocabulary (Nghe & Từ vựng)</option>
                  <option value="Reading & Writing">Reading & Writing (Đọc & Viết)</option>
                  <option value="Grammar & Sentence Patterns">Grammar & Patterns (Ngữ pháp & Mẫu câu)</option>
                  <option value="Games & Review">Games & Review (Trò chơi & Ôn tập)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleGenerateAiScript}
                disabled={isGeneratingAi}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{isGeneratingAi ? "Đang tạo kịch bản..." : "Tạo Kịch Bản Ngay"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
