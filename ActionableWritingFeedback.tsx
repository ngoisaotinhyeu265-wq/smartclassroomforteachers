import React, { useState } from "react";
import { WritingFeedbackResult, WritingCorrection } from "../../types";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Volume2,
  Check,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Copy,
  Star,
  Zap,
  Info,
} from "lucide-react";

interface ActionableWritingFeedbackProps {
  feedback: WritingFeedbackResult;
  onApplyCorrection?: (original: string, suggestion: string) => void;
  onApplyAllCorrections?: (improvedText: string) => void;
  targetVocabCount?: number;
  usedVocabCount?: number;
}

export const ActionableWritingFeedback: React.FC<ActionableWritingFeedbackProps> = ({
  feedback,
  onApplyCorrection,
  onApplyAllCorrections,
  targetVocabCount,
  usedVocabCount,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showVietnameseTranslation, setShowVietnameseTranslation] = useState<boolean>(false);
  const [appliedIndices, setAppliedIndices] = useState<number[]>([]);

  const handleCopyText = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    playSound("click");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplySingle = (c: WritingCorrection, index: number) => {
    if (onApplyCorrection && c.original && (c.suggestion || c.correction)) {
      onApplyCorrection(c.original, c.suggestion || c.correction || "");
      setAppliedIndices((prev) => [...prev, index]);
      playSound("correct");
    }
  };

  // Helper to determine category icon and color
  const getCategoryBadge = (type?: string, title?: string) => {
    switch (type) {
      case "subject_verb_agreement":
        return {
          icon: "⚡",
          label: title || "Hòa hợp Chủ ngữ - Động từ",
          bg: "bg-indigo-50 border-indigo-200 text-indigo-800",
          tagBg: "bg-indigo-600 text-white",
        };
      case "verb_tense":
        return {
          icon: "⏳",
          label: title || "Chia thì động từ (Tense)",
          bg: "bg-amber-50 border-amber-200 text-amber-900",
          tagBg: "bg-amber-600 text-white",
        };
      case "articles":
        return {
          icon: "🔤",
          label: title || "Mạo từ a / an / the",
          bg: "bg-purple-50 border-purple-200 text-purple-800",
          tagBg: "bg-purple-600 text-white",
        };
      case "plural_nouns":
        return {
          icon: "📦",
          label: title || "Danh từ số ít & số nhiều",
          bg: "bg-cyan-50 border-cyan-200 text-cyan-900",
          tagBg: "bg-cyan-600 text-white",
        };
      case "spelling":
        return {
          icon: "✏️",
          label: title || "Chính tả từ vựng",
          bg: "bg-rose-50 border-rose-200 text-rose-800",
          tagBg: "bg-rose-600 text-white",
        };
      case "punctuation_caps":
        return {
          icon: "🔠",
          label: title || "Dấu câu & Viết hoa",
          bg: "bg-blue-50 border-blue-200 text-blue-800",
          tagBg: "bg-blue-600 text-white",
        };
      case "word_order":
        return {
          icon: "🔄",
          label: title || "Trật tự từ trong câu",
          bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
          tagBg: "bg-emerald-600 text-white",
        };
      default:
        return {
          icon: "💡",
          label: title || "Ngữ pháp & Cấu trúc câu",
          bg: "bg-slate-50 border-slate-200 text-slate-800",
          tagBg: "bg-slate-700 text-white",
        };
    }
  };

  const rubric = feedback.rubric;
  const corrections = feedback.corrections || [];
  const actionableGuidance = feedback.actionableGuidance || [];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-white text-slate-800 border-2 border-indigo-200 shadow-xl space-y-6 animate-fade-in">
      {/* 1. Score & Praise Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-indigo-950 flex flex-col items-center justify-center font-black shadow-md border-2 border-amber-200 shrink-0">
            <span className="text-2xl leading-none">{feedback.score}</span>
            <span className="text-[10px] tracking-wider uppercase font-bold text-indigo-900">/ 100 Điểm</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display font-black text-lg text-indigo-950">
                {feedback.score >= 90
                  ? "🌟 Bài Viết Xuất Sắc!"
                  : feedback.score >= 80
                  ? "👏 Rất Tốt, Cố Gắng Lên!"
                  : feedback.score >= 70
                  ? "💡 Khá Tốt, Cần Hoàn Thiện Vài Chi Tiết!"
                  : "💪 Tiếp Tục Cố Gắng Nhé!"}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-0.5">
              {feedback.praise}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center gap-1.5 border border-emerald-300 shadow-xs">
            <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>+{feedback.xpEarned || 25} XP</span>
          </span>
        </div>
      </div>

      {/* Target Vocab & Word Count Achievement Chips */}
      {(targetVocabCount !== undefined || feedback.actualWordCount !== undefined) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {targetVocabCount !== undefined && targetVocabCount > 0 && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Từ vựng mục tiêu đã dùng:</span>
              </span>
              <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {usedVocabCount ?? 0} / {targetVocabCount} từ
              </span>
            </div>
          )}

          {feedback.actualWordCount !== undefined && (
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs">
              <span className="font-bold text-blue-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Số lượng từ thực tế:</span>
              </span>
              <span className="font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                {feedback.actualWordCount} từ
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. Actionable Guidance Checklist (Lời Khuyên Hành Động Cụ Thể) */}
      {actionableGuidance.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-900 to-blue-900 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-display font-bold text-sm text-amber-300">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>🎯 LỜI KHUYÊN HÀNH ĐỘNG ĐỂ NÂNG CAO ĐIỂM SỐ:</span>
            </div>
            {onApplyAllCorrections && feedback.improvedVersion && (
              <button
                onClick={() => {
                  onApplyAllCorrections(feedback.improvedVersion);
                  playSound("correct");
                }}
                className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-transform active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Áp dụng tất cả vào bài</span>
              </button>
            )}
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            {actionableGuidance.map((guide, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/15 text-indigo-50"
              >
                <span className="w-5 h-5 rounded-full bg-amber-400 text-indigo-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{guide}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Rubric Score Breakdown (Bảng Điểm 4 Tiêu Chí Chi Tiết) */}
      {rubric && (
        <div className="space-y-2.5">
          <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bảng Đánh Giá Tiêu Chí Chi Tiết (Rubric Diagnostic):</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Grammar & Tenses */}
            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-950 flex items-center gap-1">
                  <span>📘 Ngữ Pháp & Chia Thì:</span>
                </span>
                <span className="font-black text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                  {rubric.grammarScore}/25
                </span>
              </div>
              <div className="w-full bg-indigo-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(rubric.grammarScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-snug font-medium">
                {rubric.grammarFeedback}
              </p>
            </div>

            {/* Vocabulary & Topic */}
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 flex items-center gap-1">
                  <span>📗 Vốn Từ & Từ Mục Tiêu:</span>
                </span>
                <span className="font-black text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                  {rubric.vocabularyScore}/25
                </span>
              </div>
              <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(rubric.vocabularyScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-snug font-medium">
                {rubric.vocabularyFeedback}
              </p>
            </div>

            {/* Spelling & Punctuation */}
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 flex items-center gap-1">
                  <span>📙 Chính Tả & Dấu Câu:</span>
                </span>
                <span className="font-black text-amber-700 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                  {rubric.spellingPunctuationScore}/25
                </span>
              </div>
              <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(rubric.spellingPunctuationScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-snug font-medium">
                {rubric.spellingPunctuationFeedback}
              </p>
            </div>

            {/* Content & Flow */}
            <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-950 flex items-center gap-1">
                  <span>📕 Diễn Đạt & Độ Trôi Chảy:</span>
                </span>
                <span className="font-black text-purple-700 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                  {rubric.contentFlowScore}/25
                </span>
              </div>
              <div className="w-full bg-purple-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(rubric.contentFlowScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-snug font-medium">
                {rubric.contentFlowFeedback}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Structured Error Diagnostic Cards (Chi Tiết Từng Lỗi Ngữ Pháp & Hướng Dẫn Sửa) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Phân Tích Chi Tiết Lỗi Ngữ Pháp & Cách Khắc Phục ({corrections.length}):</span>
          </h5>
        </div>

        {corrections.length > 0 ? (
          <div className="space-y-3">
            {corrections.map((c, i) => {
              const badge = getCategoryBadge(c.type, c.categoryTitle);
              const isApplied = appliedIndices.includes(i);

              return (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border ${badge.bg} transition-all shadow-xs space-y-3`}
                >
                  {/* Category & Severity Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${badge.tagBg}`}>
                        {badge.icon} {badge.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          c.severity === "error"
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : c.severity === "warning"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-blue-100 text-blue-800 border border-blue-300"
                        }`}
                      >
                        {c.severity === "error"
                          ? "🔴 Lỗi cần sửa"
                          : c.severity === "warning"
                          ? "🟡 Cần lưu ý"
                          : "🔵 Gợi ý thêm"}
                      </span>
                    </div>

                    {onApplyCorrection && (
                      <button
                        onClick={() => handleApplySingle(c, i)}
                        disabled={isApplied}
                        className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-transform active:scale-95 ${
                          isApplied
                            ? "bg-emerald-600 text-white cursor-default"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã sửa trong bài</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5" />
                            <span>Áp dụng sửa ngay</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Before / After Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-rose-600 shrink-0">❌ Bản nháp:</span>
                      <span className="line-through font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                        {c.original}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:border-l sm:border-slate-200 sm:pl-2">
                      <span className="font-bold text-emerald-600 shrink-0">✅ Cách sửa:</span>
                      <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {c.suggestion || c.correction}
                      </span>
                    </div>
                  </div>

                  {/* Deep Rule Explanation */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-indigo-950">Quy tắc ngữ pháp: </span>
                        <span className="text-slate-700 font-medium leading-relaxed">
                          {c.ruleExplanation || c.reason}
                        </span>
                      </div>
                    </div>

                    {/* Actionable Hint */}
                    {c.actionableHint && (
                      <div className="flex items-start gap-1.5 bg-white/70 p-2.5 rounded-xl border border-slate-200/60">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-950">Hướng dẫn hành động: </span>
                          <span className="text-slate-800 font-bold">{c.actionableHint}</span>
                        </div>
                      </div>
                    )}

                    {/* Mini Example if available */}
                    {c.example && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                        <span className="font-bold text-slate-500">Ví dụ tương tự:</span>
                        <span className="line-through text-rose-500">{c.example.incorrect}</span>
                        <span>➔</span>
                        <span className="font-bold text-emerald-700">{c.example.correct}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Tuyệt vời! Không phát hiện lỗi sai ngữ pháp hoặc chính tả nào.</p>
              <p className="font-normal text-emerald-700 text-[11px] mt-0.5">
                Em đã áp dụng rất tốt các quy tắc ngữ pháp của khối lớp mình!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Polished Version of Student's Writing (Bản Viết Trau Chuốt & Hoàn Thiện) */}
      {feedback.improvedVersion && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>✨ Bản Viết Mẫu Trau Chuốt & Chuẩn Ngữ Pháp:</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakText(feedback.improvedVersion, { rate: 0.88 })}
                className="px-2.5 py-1 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs font-bold flex items-center gap-1 shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe đọc mẫu</span>
              </button>

              <button
                onClick={() => handleCopyText(feedback.improvedVersion)}
                className="px-2.5 py-1 rounded-xl bg-white border border-indigo-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Đã sao chép!" : "Sao chép"}</span>
              </button>

              {feedback.vietnameseTranslation && (
                <button
                  onClick={() => setShowVietnameseTranslation(!showVietnameseTranslation)}
                  className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 text-xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <span>{showVietnameseTranslation ? "Ẩn dịch" : "Dịch nghĩa"}</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-sm font-serif italic text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs">
            “{feedback.improvedVersion}”
          </p>

          {showVietnameseTranslation && feedback.vietnameseTranslation && (
            <div className="p-3 rounded-xl bg-white/80 border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed animate-fade-in">
              <span className="font-bold text-indigo-800">Dịch nghĩa tiếng Việt: </span>
              <span>{feedback.vietnameseTranslation}</span>
            </div>
          )}
        </div>
      )}

      {/* 6. Encouragement & Friendly Tip */}
      {(feedback.friendlyTip || feedback.encouragement) && (
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
          {feedback.friendlyTip && (
            <div className="flex items-start gap-1.5 font-medium">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-bold text-amber-900">Mẹo vàng từ Milo: </strong>
                {feedback.friendlyTip}
              </span>
            </div>
          )}
          {feedback.encouragement && (
            <p className="text-[11px] text-amber-800/90 italic pl-5">
              💬 "{feedback.encouragement}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};
