import React, { useState } from "react";
import { VocabItem, UserProgress, SpacedRepetitionWord } from "../../types";
import {
  calculateRetentionRate,
  reviewSrsWord,
  getDueSrsWords,
  SrsRating,
  initializeSrsWord,
} from "../../utils/spacedRepetition";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { saveUserProgress, addXpAndRecord } from "../../utils/storage";
import {
  RotateCcw,
  Volume2,
  Sparkles,
  TrendingUp,
  Brain,
  CheckCircle2,
  Clock,
  Zap,
  HelpCircle,
  Award,
} from "lucide-react";

interface EbbinghausDeckProps {
  allVocab: VocabItem[];
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const EbbinghausDeck: React.FC<EbbinghausDeckProps> = ({
  allVocab,
  progress,
  onUpdateProgress,
}) => {
  // Ensure SRS items exist in user progress
  const srsList: SpacedRepetitionWord[] = progress.srsWords || [];

  // If SRS list is empty, pre-populate with current grade vocab items
  const activeSrsList = React.useMemo(() => {
    if (srsList.length > 0) return srsList;
    return allVocab.slice(0, 15).map((v) => initializeSrsWord(v));
  }, [srsList, allVocab]);

  const dueWords = getDueSrsWords(activeSrsList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [reviewCountToday, setReviewCountToday] = useState<number>(0);

  const currentSrsItem: SpacedRepetitionWord | undefined =
    dueWords[currentIndex] || activeSrsList[currentIndex] || activeSrsList[0];

  const currentRetention = currentSrsItem
    ? calculateRetentionRate(currentSrsItem.lastReviewedDate, currentSrsItem.memoryStrength)
    : 100;

  const handleFlipCard = () => {
    playSound("click");
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentSrsItem) {
      speakText(currentSrsItem.word, { rate: 0.9 });
    }
  };

  const handleRateCard = (rating: SrsRating) => {
    if (!currentSrsItem) return;

    playSound(rating === "forgot" ? "wrong" : "correct");
    if (rating === "good" || rating === "easy") {
      fireConfetti();
    }

    const updatedItem = reviewSrsWord(currentSrsItem, rating);

    // Update in user progress
    const updatedSrsList = [...activeSrsList];
    const itemIndex = updatedSrsList.findIndex((w) => w.wordId === currentSrsItem.wordId);
    if (itemIndex >= 0) {
      updatedSrsList[itemIndex] = updatedItem;
    } else {
      updatedSrsList.push(updatedItem);
    }

    const updatedProg: UserProgress = {
      ...progress,
      srsWords: updatedSrsList,
    };

    saveUserProgress(updatedProg);
    const { updatedProgress } = addXpAndRecord("vocabulary", rating === "easy" ? 15 : 10, rating !== "forgot");
    onUpdateProgress({ ...updatedProg, ...updatedProgress });

    setIsFlipped(false);
    setReviewCountToday((prev) => prev + 1);

    if (currentIndex < dueWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Average retention calculation
  const avgRetention = React.useMemo(() => {
    if (activeSrsList.length === 0) return 100;
    const total = activeSrsList.reduce(
      (acc, item) => acc + calculateRetentionRate(item.lastReviewedDate, item.memoryStrength),
      0
    );
    return Math.round(total / activeSrsList.length);
  }, [activeSrsList]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Ebbinghaus Curve Metric Card */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 shadow-[0_8px_0_0_#1E1B4B] border-2 border-indigo-300 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl font-black">
              🧠
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl">
                Đường Cong Lãng Quên Ebbinghaus (Spaced Repetition)
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                Thuật toán ôn tập ngắt quãng: Từ vựng trả lời sai sẽ được xếp lịch ôn sớm & thường xuyên hơn!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20">
            <TrendingUp className="w-5 h-5 text-amber-300" />
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-200 block">Độ ghi nhớ não bộ:</span>
              <span className="text-xl font-black text-white">{avgRetention}%</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/15 text-center">
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Cần ôn hôm nay</span>
            <span className="text-lg font-black text-amber-300">{dueWords.length} từ</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Đã ôn trong ngày</span>
            <span className="text-lg font-black text-emerald-300">{reviewCountToday} lượt</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Tổng bộ nhớ SRS</span>
            <span className="text-lg font-black text-white">{activeSrsList.length} từ</span>
          </div>
        </div>
      </div>

      {/* 3D Flip Flashcard */}
      {currentSrsItem ? (
        <div className="space-y-4">
          <div
            onClick={handleFlipCard}
            className="cursor-pointer min-h-[320px] bg-white rounded-3xl p-7 border-2 border-indigo-200 shadow-[0_8px_0_0_#C7D2FE] hover:border-indigo-400 transition-all flex flex-col justify-between relative group"
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-black border border-indigo-200 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                {currentSrsItem.topic || "Vocabulary"} • Lần lặp #{currentSrsItem.repetitions}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Khoảng cách: {currentSrsItem.intervalDays} ngày
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                  Ghi nhớ: {currentRetention}%
                </span>
              </div>
            </div>

            {/* Card Content (Front vs Back) */}
            {!isFlipped ? (
              /* FRONT: Clue (Strictly NO target word leak) */
              <div className="text-center py-6 space-y-4 my-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Đoán từ dựa trên manh mối (Click thẻ để lật đáp án)
                </span>
                <p className="font-display font-bold text-xl sm:text-2xl text-slate-900 leading-snug max-w-lg mx-auto">
                  “{currentSrsItem.clue}”
                </p>
                <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 text-xs font-bold text-indigo-700">
                  <span>💡 Chủ đề: {currentSrsItem.topic}</span>
                </div>
              </div>
            ) : (
              /* BACK: Word Revealed + Phonics + Vietnamese meaning */
              <div className="text-center py-6 space-y-4 my-auto animate-in fade-in zoom-in-95">
                <div className="text-5xl animate-bounce">{currentSrsItem.emoji || "🌟"}</div>
                <div>
                  <h3 className="font-display font-black text-4xl text-indigo-700">
                    {currentSrsItem.word}
                  </h3>
                  <p className="text-sm font-mono text-slate-500 mt-1 font-bold">
                    {currentSrsItem.phonics || "/.../"}
                  </p>
                </div>
                <div className="bg-amber-50 py-2.5 px-5 rounded-2xl border border-amber-200 inline-block">
                  <span className="text-sm font-black text-amber-900">
                    Nghĩa: {currentSrsItem.vietnameseMeaning || "Từ vựng tiếng Anh"}
                  </span>
                </div>
                {currentSrsItem.exampleSentence && (
                  <p className="text-xs text-slate-600 italic">
                    Example: {currentSrsItem.exampleSentence}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Card Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400 font-bold">
              <span>{isFlipped ? "Đã lật thẻ ✅" : "Chạm để xem đáp án 🔄"}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFlipped) speakText(currentSrsItem.word);
                  else speakText(currentSrsItem.clue);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-700 border border-slate-200"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isFlipped ? "Nghe từ" : "Nghe manh mối"}</span>
              </button>
            </div>
          </div>

          {/* Ebbinghaus Response Rating Bar */}
          {isFlipped && (
            <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 shadow-[0_6px_0_0_#C7D2FE] space-y-3 animate-in fade-in">
              <div className="text-center">
                <span className="text-xs font-black text-slate-700">
                  Bạn đánh giá mức độ ghi nhớ từ này như thế nào? (Chọn để thuật toán điều chỉnh lịch ôn):
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Forgot */}
                <button
                  onClick={() => handleRateCard("forgot")}
                  className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 text-rose-800 text-left space-y-1 transition-all shadow-[0_3px_0_0_#FDA4AF] active:translate-y-1"
                >
                  <div className="flex items-center justify-between font-black text-xs">
                    <span>🔴 Quên hẳn</span>
                    <span>0 ngày</span>
                  </div>
                  <p className="text-[10px] text-rose-600 font-bold">Ôn lại ngay hôm nay</p>
                </button>

                {/* Hard */}
                <button
                  onClick={() => handleRateCard("hard")}
                  className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 text-left space-y-1 transition-all shadow-[0_3px_0_0_#FCD34D] active:translate-y-1"
                >
                  <div className="flex items-center justify-between font-black text-xs">
                    <span>🟠 Hơi khó</span>
                    <span>+1 ngày</span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-bold">Cần ôn lại sớm</p>
                </button>

                {/* Good */}
                <button
                  onClick={() => handleRateCard("good")}
                  className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 text-emerald-900 text-left space-y-1 transition-all shadow-[0_3px_0_0_#6EE7B7] active:translate-y-1"
                >
                  <div className="flex items-center justify-between font-black text-xs">
                    <span>🟢 Nhớ tốt</span>
                    <span>+{Math.max(2, currentSrsItem.intervalDays * 2)} ngày</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-bold">Lịch ôn tiêu chuẩn</p>
                </button>

                {/* Easy */}
                <button
                  onClick={() => handleRateCard("easy")}
                  className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 text-blue-900 text-left space-y-1 transition-all shadow-[0_3px_0_0_#93C5FD] active:translate-y-1"
                >
                  <div className="flex items-center justify-between font-black text-xs">
                    <span>🔵 Rất dễ</span>
                    <span>+{Math.max(4, currentSrsItem.intervalDays * 3)} ngày</span>
                  </div>
                  <p className="text-[10px] text-blue-700 font-bold">Ghi nhớ dài hạn</p>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 text-center space-y-3">
          <div className="text-4xl">🎉</div>
          <h3 className="font-display font-black text-lg text-slate-800">
            Tuyệt vời! Bạn đã hoàn thành tất cả các từ cần ôn hôm nay!
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Hệ thống đường cong lãng quên Ebbinghaus sẽ tự động thông báo khi có từ vựng đến hạn cần củng cố trí nhớ.
          </p>
        </div>
      )}
    </div>
  );
};
