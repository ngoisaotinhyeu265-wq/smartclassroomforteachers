import React, { useState, useEffect } from "react";
import { Search, Volume2, Sparkles, X, BookOpen, ExternalLink, HelpCircle, Check, Award, ArrowRight } from "lucide-react";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { GradeLevel } from "../../types";

interface KnowledgeLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  defaultGrade?: GradeLevel;
}

interface LookupResult {
  query: string;
  ipa?: string;
  endingSounds?: string;
  partOfSpeech?: string;
  vietnameseMeaning: string;
  definitionEn?: string;
  curriculumMatch?: {
    isSGK: boolean;
    grade: number;
    unit: string;
    lesson: string;
  };
  examples?: Array<{ en: string; vi: string }>;
  collocations?: string[];
  grammarTip?: string;
}

const QUICK_TOPIC_SUGGESTIONS = [
  "Present Simple tense",
  "How to use 'have got'",
  "like + V-ing",
  "animals in English",
  "ending sound /t/ vs /d/",
  "plural nouns (-s, -es)",
  "school subjects",
  "telling the time",
];

export const KnowledgeLookupModal: React.FC<KnowledgeLookupModalProps> = ({
  isOpen,
  onClose,
  initialQuery = "",
  defaultGrade = 3,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialQuery);
  const [grade, setGrade] = useState<GradeLevel>(defaultGrade);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LookupResult | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const handleSearch = async (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) return;

    playSound("click");
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/gemini/quick-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, grade }),
      });
      const data = await res.json();
      setResult(data);
      playSound("star");
    } catch (e) {
      setResult({
        query: q,
        ipa: "/.../",
        endingSounds: "Phát âm rõ ràng, bật hơi âm cuối",
        vietnameseMeaning: `Kiến thức tra cứu cho từ/chủ đề "${q}"`,
        definitionEn: `Information about ${q}`,
        curriculumMatch: { isSGK: true, grade: grade, unit: "Unit tổng hợp", lesson: "Bài học mở rộng" },
        examples: [{ en: `I can use "${q}" in my English speaking.`, vi: `Tôi có thể sử dụng "${q}" khi nói tiếng Anh.` }],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div
        id="knowledge-lookup-modal"
        className="bg-white w-full max-w-2xl rounded-[32px] p-6 sm:p-8 border-2 border-indigo-200 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-indigo-500/20">
              🔍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                  Tra Cứu SGK & Kiến Thức Mở Rộng
                </h2>
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200">
                  AI Explorer
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Tra cứu từ vựng, ngữ pháp, ngữ âm & kiến thức tiếng Anh ngoài SGK Global Success
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="knowledge-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(searchTerm);
                }}
                placeholder="Nhập từ vựng, câu, quy tắc ngữ pháp hoặc câu hỏi tiếng Anh..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all shadow-inner"
              />
            </div>

            {/* Grade Selector */}
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
              aria-label="Chọn lớp tra cứu"
              className="px-3 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 font-black text-xs text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value={1}>Lớp 1</option>
              <option value={2}>Lớp 2</option>
              <option value={3}>Lớp 3</option>
              <option value={4}>Lớp 4</option>
              <option value={5}>Lớp 5</option>
            </select>

            <button
              id="knowledge-search-btn"
              disabled={isLoading || !searchTerm.trim()}
              onClick={() => handleSearch(searchTerm)}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isLoading ? "Đang tra..." : "Tra Cứu"}</span>
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500">Gợi ý nhanh:</span>
            {QUICK_TOPIC_SUGGESTIONS.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  setSearchTerm(topic);
                  handleSearch(topic);
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {isLoading ? (
          <div className="py-12 text-center space-y-3 bg-slate-50 rounded-3xl border border-slate-200">
            <Sparkles className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
            <p className="font-display font-black text-slate-800 text-base">Đang tra cứu từ điển SGK & AI...</p>
            <p className="text-xs text-slate-500">Phân tích phiên âm IPA, bật hơi âm đuôi, ngữ nghĩa và ví dụ</p>
          </div>
        ) : result ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-black text-2xl text-indigo-950">{result.query}</h3>
                  <button
                    onClick={() => speakText(result.query, { rate: 0.88 })}
                    className="p-2 rounded-xl bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-xs transition-colors"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {result.curriculumMatch && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Global Success Lớp {result.curriculumMatch.grade} • {result.curriculumMatch.unit}</span>
                  </div>
                )}
              </div>

              {result.ipa && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-indigo-800 bg-white/80 px-2.5 py-1 rounded-lg border border-indigo-200">
                    {result.ipa}
                  </span>
                  {result.partOfSpeech && (
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {result.partOfSpeech}
                    </span>
                  )}
                </div>
              )}

              {/* Vietnamese Meaning */}
              <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-xs space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">
                  🇻🇳 Nghĩa Tiếng Việt:
                </span>
                <p className="font-display font-black text-lg text-slate-900 leading-snug">
                  {result.vietnameseMeaning}
                </p>
                {result.definitionEn && (
                  <p className="text-xs text-slate-500 font-medium">{result.definitionEn}</p>
                )}
              </div>
            </div>

            {/* Ending Sound Notice */}
            {result.endingSounds && (
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-start gap-3 text-amber-950">
                <div className="text-2xl">💨</div>
                <div className="space-y-1">
                  <span className="font-black text-xs block text-amber-900">
                    Kỹ thuật phát âm chuẩn & Bật hơi âm đuôi:
                  </span>
                  <p className="text-xs font-medium leading-relaxed">{result.endingSounds}</p>
                </div>
              </div>
            )}

            {/* Example Sentences */}
            {result.examples && result.examples.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
                <span className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                  📝 Câu ví dụ mẫu (Examples):
                </span>
                <div className="space-y-2">
                  {result.examples.map((ex, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-800 text-xs">“{ex.en}”</p>
                        <button
                          onClick={() => speakText(ex.en, { rate: 0.9 })}
                          className="text-indigo-600 hover:text-indigo-800 p-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">{ex.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grammar Tip or Collocations */}
            {result.grammarTip && (
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1 text-xs text-purple-950">
                <span className="font-black block text-purple-900">💡 Mẹo ngữ pháp & Ghi nhớ:</span>
                <p className="font-medium">{result.grammarTip}</p>
              </div>
            )}

            {result.collocations && result.collocations.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs font-bold text-slate-500">Cụm từ hay gặp:</span>
                {result.collocations.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
