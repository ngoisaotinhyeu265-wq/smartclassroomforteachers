import React, { useState } from "react";
import { InteractiveStory, StoryNode, StoryChoice, UserProgress, GradeLevel } from "../../types";
import { speakText, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Compass,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Globe,
  Award,
  Zap,
} from "lucide-react";

interface InteractiveStorytellingProps {
  grade: GradeLevel;
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

// Built-in starter interactive stories for Grade 1-5 Global Success learners
const BUILT_IN_STORIES: InteractiveStory[] = [
  {
    id: "story-magic-backpack",
    title: "The Magic Backpack Adventure",
    titleVi: "Chuyến Phiêu Lưu Của Chiếc Ba Lô Diệu Kỳ",
    topic: "School & Magic",
    grade: 3,
    coverEmoji: "🎒",
    description: "Nam finds a glowing blue backpack in his classroom. Where will it take him?",
    difficulty: "Beginner",
    rootNodeId: "root",
    nodes: {
      root: {
        id: "root",
        chapterTitle: "A Mysterious Morning",
        text:
          "One sunny Monday morning, Nam walks into his classroom at Thang Long Primary School. Under his desk, there is a glowing blue backpack! When he touches it, a friendly voice whispers: 'Hello Nam! I am the Magic Explorer Backpack.'",
        textVi:
          "Vào một buổi sáng thứ Hai đầy nắng, Nam bước vào lớp học ở trường Tiểu học Thăng Long. Dưới bàn của cậu có một chiếc ba lô màu xanh đang phát sáng! Khi cậu chạm vào, một giọng nói thân thiện thì thầm: 'Chào Nam! Mình là Chiếc ba lô Thám hiểm Diệu kỳ.'",
        comprehensionQuestion: {
          question: "Where did Nam find the glowing backpack?",
          options: ["In his bedroom", "Under his desk in the classroom", "In the garden"],
          correctAnswer: "Under his desk in the classroom",
          explanation: "Nam found it under his desk at Thang Long Primary School.",
        },
        choices: [
          {
            id: "c1",
            choiceText: "Open the magic backpack and jump in! 🚀",
            nextNodeId: "galaxy_library",
          },
          {
            id: "c2",
            choiceText: "Put your English book inside first! 📚",
            nextNodeId: "enchanted_zoo",
          },
        ],
      },
      galaxy_library: {
        id: "galaxy_library",
        chapterTitle: "The Galaxy Library",
        text:
          "Whoosh! The backpack zooms into the sky! Nam lands in a floating library among the twinkling stars. An alien librarian with three purple eyes smiles and says: 'Welcome! Can you help me read this English story about planet Earth?'",
        textVi:
          "Vùuu! Chiếc ba lô bay vút lên bầu trời! Nam đáp xuống một thư viện lơ lửng giữa những vì sao lấp lánh. Một người thủ thư người ngoài hành tinh có ba mắt màu tím mỉm cười và nói: 'Chào mừng! Bạn có thể giúp tôi đọc câu chuyện tiếng Anh về Trái Đất này không?'",
        comprehensionQuestion: {
          question: "How many eyes does the friendly alien librarian have?",
          options: ["Two eyes", "Three purple eyes", "Ten eyes"],
          correctAnswer: "Three purple eyes",
          explanation: "The alien librarian has three purple eyes.",
        },
        choices: [
          {
            id: "c3",
            choiceText: "Read the story aloud to the stars! ⭐",
            nextNodeId: "happy_hero_ending",
          },
        ],
      },
      enchanted_zoo: {
        id: "enchanted_zoo",
        chapterTitle: "The Singing Animal Zoo",
        text:
          "The backpack glows brightly and opens a door to a green forest! A baby panda is playing the guitar, and two green parrots are singing the ABC song. 'Join our concert!' they chirp happily.",
        textVi:
          "Chiếc ba lô phát sáng rực rỡ và mở ra một cánh cửa dẫn đến khu rừng xanh mát! Một chú gấu trúc con đang chơi đàn ghi-ta, và hai chú vẹt xanh đang hát bài hát ABC. 'Hãy cùng tham gia buổi hòa nhạc của chúng tớ nhé!' các bạn ríu rít vui vẻ.",
        comprehensionQuestion: {
          question: "What song are the green parrots singing?",
          options: ["The ABC song", "A birthday song", "A lullaby"],
          correctAnswer: "The ABC song",
          explanation: "The two green parrots are happily singing the ABC song.",
        },
        choices: [
          {
            id: "c4",
            choiceText: "Sing and dance with the animals! 🎶",
            nextNodeId: "happy_hero_ending",
          },
        ],
      },
      happy_hero_ending: {
        id: "happy_hero_ending",
        chapterTitle: "The Golden Star Badge",
        text:
          "You did an amazing job! The magic backpack sparkles with golden stars. Nam returns to his desk just before the school bell rings. In his pencil case, there is a shiny gold badge that says: 'Master English Storyteller'.",
        textVi:
          "Bạn đã làm rất xuất sắc! Chiếc ba lô diệu kỳ lấp lánh những ngôi sao vàng. Nam quay trở lại bàn học ngay trước khi chuông trường reo. Trong hộp bút của cậu có một chiếc huy hiệu vàng sáng lấp lánh ghi: 'Bậc thầy kể chuyện tiếng Anh'.",
        isEnding: true,
        endingType: "victory",
        moralLesson: "Reading and exploring English brings wonderful adventures!",
        choices: [],
      },
    },
  },
  {
    id: "story-lost-puppy",
    title: "The Mystery Puppy at Hoan Kiem Lake",
    titleVi: "Chú Cún Lạc Ở Hồ Hoàn Kiếm",
    topic: "City Adventure & Kindness",
    grade: 4,
    coverEmoji: "🐶",
    description: "Mai and Tom find a cute lost puppy wearing a red collar near the Turtle Tower.",
    difficulty: "Intermediate",
    rootNodeId: "root",
    nodes: {
      root: {
        id: "root",
        chapterTitle: "A Sunny Walk by the Lake",
        text:
          "On Sunday afternoon, Mai and Tom are walking around Hoan Kiem Lake. The weather is cool and breezy. Suddenly, a little fluffy golden puppy runs up to them and barks gently: 'Woof woof!' It has a tiny red tag on its collar.",
        textVi:
          "Vào chiều Chủ Nhật, Mai và Tom đang đi dạo quanh hồ Hoàn Kiếm. Thời tiết mát mẻ và thoáng đãng. Đột nhiên, một chú cún con lông vàng xù chạy đến chỗ họ và sủa nhẹ: 'Gâu gâu!' Cún có một tấm thẻ nhỏ màu đỏ trên vòng cổ.",
        comprehensionQuestion: {
          question: "Where are Mai and Tom walking?",
          options: ["At West Lake", "Around Hoan Kiem Lake", "At the airport"],
          correctAnswer: "Around Hoan Kiem Lake",
          explanation: "Mai and Tom are walking around Hoan Kiem Lake.",
        },
        choices: [
          {
            id: "c1",
            choiceText: "Read the English address tag on the collar 🏷️",
            nextNodeId: "read_tag",
          },
          {
            id: "c2",
            choiceText: "Ask the ice-cream vendor if he knows the puppy 🍦",
            nextNodeId: "ask_vendor",
          },
        ],
      },
      read_tag: {
        id: "read_tag",
        chapterTitle: "The Clue on the Collar",
        text:
          "Mai carefully reads the tag: 'Name: Lucky. Address: 12 Trang Tien Street.' Tom cheers: 'That is right next to the bookstore! Let us walk there together!' Lucky wags his tail excitedly.",
        textVi:
          "Mai cẩn thận đọc tấm thẻ: 'Tên: Lucky. Địa chỉ: 12 phố Tràng Tiền.' Tom reo lên: 'Đó ngay cạnh hiệu sách! Chúng mình cùng đi bộ tới đó nào!' Lucky vui sướng vẫy đuôi.",
        comprehensionQuestion: {
          question: "What is the puppy's name?",
          options: ["Buddy", "Lucky", "Max"],
          correctAnswer: "Lucky",
          explanation: "The tag says the puppy's name is Lucky.",
        },
        choices: [
          {
            id: "c3",
            choiceText: "Walk to 12 Trang Tien Street 🏡",
            nextNodeId: "puppy_happy_ending",
          },
        ],
      },
      ask_vendor: {
        id: "ask_vendor",
        chapterTitle: "The Friendly Ice Cream Vendor",
        text:
          "The ice cream vendor smiles warmly: 'Oh! That puppy belongs to Mrs. Lan who works at Trang Tien Bakery! She is looking for him right now.' He gives Mai and Tom two chocolate ice cream cones for helping.",
        textVi:
          "Bác bán kem cười niềm nở: 'Ồ! Chú cún đó là của cô Lan làm ở tiệm bánh Tràng Tiền! Cô ấy đang tìm kiếm cún khắp nơi.' Bác tặng cho Mai và Tom hai que kem sô-cô-la vì đã giúp đỡ.",
        comprehensionQuestion: {
          question: "Where does Lucky's owner work?",
          options: ["At a supermarket", "At Trang Tien Bakery", "At a hospital"],
          correctAnswer: "At Trang Tien Bakery",
          explanation: "Mrs. Lan works at Trang Tien Bakery.",
        },
        choices: [
          {
            id: "c4",
            choiceText: "Take Lucky to the bakery! 🥐",
            nextNodeId: "puppy_happy_ending",
          },
        ],
      },
      puppy_happy_ending: {
        id: "puppy_happy_ending",
        chapterTitle: "A Heartwarming Reunion",
        text:
          "Mrs. Lan hugs Lucky with joyful tears! 'Thank you so much, smart children! You are true young heroes.' Everyone celebrates with delicious fresh pastries and warm smiles.",
        textVi:
          "Cô Lan ôm chầm lấy Lucky với những giọt nước mắt hạnh phúc! 'Cảm ơn các cháu thông minh rất nhiều! Các cháu là những anh hùng nhí thực thụ.' Mọi người cùng chung vui với những chiếc bánh ngọt thơm ngon và nụ cười rạng rỡ.",
        isEnding: true,
        endingType: "friendship",
        moralLesson: "Kindness and teamwork make the world a warmer place.",
        choices: [],
      },
    },
  },
];

export const InteractiveStorytelling: React.FC<InteractiveStorytellingProps> = ({
  grade,
  progress,
  onUpdateProgress,
}) => {
  const [selectedStory, setSelectedStory] = useState<InteractiveStory>(BUILT_IN_STORIES[0]);
  const [currentNodeId, setCurrentNodeId] = useState<string>("root");
  const [showViTranslation, setShowViTranslation] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Comprehension question state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);
  const [isQuestionCorrect, setIsQuestionCorrect] = useState<boolean | null>(null);

  // AI Story Generator
  const [customStoryPrompt, setCustomStoryPrompt] = useState<string>("");
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);

  const currentNode: StoryNode = selectedStory.nodes[currentNodeId] || selectedStory.nodes[selectedStory.rootNodeId] || selectedStory.nodes["root"];

  const handleReadAloud = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }
    playSound("click");
    setIsPlayingAudio(true);
    speakText(currentNode.text, {
      rate: 0.9,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleCheckQuestion = (chosenOption: string) => {
    if (!currentNode.comprehensionQuestion || isQuestionAnswered) return;

    setSelectedAnswer(chosenOption);
    const correct = chosenOption.trim().toLowerCase() === currentNode.comprehensionQuestion.correctAnswer.trim().toLowerCase();

    if (correct) {
      playSound("correct");
      fireConfetti();
      setIsQuestionCorrect(true);
      setIsQuestionAnswered(true);
      const { updatedProgress } = addXpAndRecord("reading", 10, true);
      onUpdateProgress(updatedProgress);
    } else {
      playSound("wrong");
      setIsQuestionCorrect(false);
    }
  };

  const handleChoosePath = (nextNodeId: string) => {
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);
    setCurrentNodeId(nextNodeId);
    setSelectedAnswer(null);
    setIsQuestionAnswered(false);
    setIsQuestionCorrect(null);

    const nextNode = selectedStory.nodes[nextNodeId];
    if (nextNode?.isEnding) {
      playSound("star");
      fireConfetti();
      const { updatedProgress } = addXpAndRecord("reading", 30, true);
      onUpdateProgress(updatedProgress);
    }
  };

  const handleRestartStory = () => {
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);
    setCurrentNodeId(selectedStory.rootNodeId || "root");
    setSelectedAnswer(null);
    setIsQuestionAnswered(false);
    setIsQuestionCorrect(null);
  };

  const handleGenerateAIStory = async () => {
    if (!customStoryPrompt.trim()) return;
    setIsGeneratingStory(true);
    playSound("click");

    try {
      const res = await fetch("/api/gemini/generate-interactive-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: customStoryPrompt,
          grade,
        }),
      });

      const storyData = await res.json();
      if (storyData.nodes) {
        setSelectedStory(storyData);
        setCurrentNodeId(storyData.rootNodeId || "root");
        setSelectedAnswer(null);
        setIsQuestionAnswered(false);
        setIsQuestionCorrect(null);
        playSound("star");
        fireConfetti();
      }
    } catch (e) {
      console.error("AI Story generation failed:", e);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Story Selection & AI Generator */}
      <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-[0_6px_0_0_#C7D2FE] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
              ✨
            </div>
            <div>
              <h2 className="font-display font-black text-xl text-slate-900">
                Interactive Storytelling (Đọc Truyện Tương Tác & Lựa Chọn Cốt Truyện)
              </h2>
              <p className="text-xs text-slate-500">
                Mỗi lựa chọn của bạn sẽ dẫn tới một kết thúc kỳ thú! Trả lời câu hỏi đọc hiểu để mở khóa nhánh truyện tiếp theo.
              </p>
            </div>
          </div>
        </div>

        {/* Story Picker Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          {BUILT_IN_STORIES.map((st) => (
            <button
              key={st.id}
              onClick={() => {
                playSound("click");
                setSelectedStory(st);
                handleRestartStory();
              }}
              className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                selectedStory.id === st.id
                  ? "bg-indigo-50 border-indigo-600 shadow-[0_3px_0_0_#3730A3]"
                  : "bg-slate-50 border-slate-200 hover:border-indigo-300"
              }`}
            >
              <span className="text-3xl">{st.coverEmoji || "📖"}</span>
              <div className="space-y-0.5">
                <span className="text-xs font-black text-indigo-900 block">{st.title}</span>
                <p className="text-[11px] text-slate-500 line-clamp-2">{st.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* AI Story Generation Bar */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-200 space-y-2">
          <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
            Tạo truyện tương tác AI theo chủ đề bạn yêu thích:
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={customStoryPrompt}
              onChange={(e) => setCustomStoryPrompt(e.target.value)}
              placeholder="VD: A dinosaur visiting our school cafeteria, Space robot pet..."
              className="flex-1 bg-white px-3.5 py-2 rounded-xl text-xs font-medium border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleGenerateAIStory}
              disabled={isGeneratingStory || !customStoryPrompt.trim()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-black rounded-xl border-2 border-purple-800 shadow-[0_2px_0_0_#581C87] flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingStory ? "AI Đang Soạn..." : "Tạo Truyện AI"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Story Theater */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 shadow-[0_8px_0_0_#C7D2FE] space-y-6">
        {/* Node Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-900 text-xs font-black border border-purple-300">
              {currentNode.chapterTitle}
            </span>
            {currentNode.isEnding && (
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-black border border-emerald-300">
                🎉 Grand Finale (Kết thúc)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowViTranslation(!showViTranslation)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{showViTranslation ? "Ẩn dịch" : "Dịch Tiếng Việt"}</span>
            </button>

            <button
              onClick={handleReadAloud}
              className={`p-2 rounded-xl border transition-all ${
                isPlayingAudio
                  ? "bg-rose-500 text-white border-rose-600"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-700 shadow-xs"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Story Text */}
        <div className="bg-gradient-to-b from-indigo-50/50 to-purple-50/30 rounded-3xl p-6 border border-indigo-100 space-y-4">
          <p className="font-display font-medium text-lg sm:text-xl text-slate-800 leading-relaxed">
            {currentNode.text}
          </p>

          {showViTranslation && currentNode.textVi && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed animate-in fade-in">
              🇻🇳 <span className="font-black">Bản dịch:</span> {currentNode.textVi}
            </div>
          )}
        </div>

        {/* Comprehension Check Requirement before proceeding */}
        {currentNode.comprehensionQuestion && !currentNode.isEnding && (
          <div className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-black text-slate-800">
                Câu hỏi đọc hiểu (Trả lời đúng để chọn hướng đi tiếp theo):
              </span>
            </div>

            <p className="text-xs font-bold text-slate-700">
              {currentNode.comprehensionQuestion.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentNode.comprehensionQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt.trim().toLowerCase() === currentNode.comprehensionQuestion!.correctAnswer.trim().toLowerCase();
                let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-indigo-300";

                if (isQuestionAnswered && isCorrect) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-700 shadow-xs";
                } else if (isSelected && isQuestionCorrect === false) {
                  btnStyle = "bg-rose-500 text-white border-rose-700 shadow-xs";
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleCheckQuestion(opt)}
                    disabled={isQuestionAnswered}
                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-left ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isQuestionCorrect === false && (
              <p className="text-[11px] font-bold text-rose-600">
                ⚠️ Chưa chính xác, hãy đọc lại đoạn văn và thử lại nhé!
              </p>
            )}

            {isQuestionAnswered && (
              <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Chính xác! Giờ hãy chọn hướng đi tiếp theo của câu chuyện nào!</span>
              </p>
            )}
          </div>
        )}

        {/* Branch Choices */}
        {!currentNode.isEnding && currentNode.choices && currentNode.choices.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-black text-slate-800">
                Lựa chọn quyết định của bạn:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentNode.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoosePath(choice.nextNodeId)}
                  disabled={currentNode.comprehensionQuestion && !isQuestionAnswered}
                  className={`p-4 rounded-2xl border-2 text-left font-black text-xs transition-all flex items-center justify-between gap-3 ${
                    currentNode.comprehensionQuestion && !isQuestionAnswered
                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-800 shadow-[0_4px_0_0_#3730A3] hover:translate-y-[-2px] active:translate-y-1"
                  }`}
                >
                  <span>{choice.choiceText}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Ending Award Screen */
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-6 text-white text-center space-y-4 border-2 border-amber-500 shadow-lg">
            <div className="text-5xl animate-bounce">🏆</div>
            <div>
              <h3 className="font-display font-black text-2xl">Chúc mừng bạn đã hoàn thành câu chuyện!</h3>
              <p className="text-xs font-bold text-amber-950 mt-1">
                {currentNode.moralLesson || "🌟 Hoàn thành xuất sắc (+30 XP)"}
              </p>
            </div>

            <button
              onClick={handleRestartStory}
              className="px-6 py-2.5 rounded-2xl bg-white text-amber-950 font-black text-xs border-2 border-amber-200 shadow-md inline-flex items-center gap-2 hover:scale-105 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Đọc Lại Từ Đầu / Khám Phá Nhánh Khác</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
