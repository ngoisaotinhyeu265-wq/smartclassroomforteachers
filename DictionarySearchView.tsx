import React, { useState, useMemo } from "react";
import {
  SMART_CLASSROOM_PHRASES,
  CLASSROOM_DICTIONARY,
  SMART_SEARCH_INTENTS,
} from "../../data/smartClassroomData";
import { SmartClassroomPhrase, DictionaryItem } from "../../types/smartClassroom";
import { PhraseCard } from "./PhraseCard";
import { speakText } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import {
  Search,
  Sparkles,
  Volume2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Filter,
  X,
} from "lucide-react";

interface DictionarySearchViewProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenTranslateModal: (phrase: SmartClassroomPhrase) => void;
  initialQuery?: string;
}

export const DictionarySearchView: React.FC<DictionarySearchViewProps> = ({
  favorites,
  onToggleFavorite,
  onOpenTranslateModal,
  initialQuery = "",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [activeTab, setActiveTab] = useState<"smart_search" | "dictionary">("smart_search");

  // Semantic intent matching or direct phrase filtering
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    // Check if matches any predefined smart semantic intents (e.g. "muốn học sinh im lặng")
    const matchedIntent = SMART_SEARCH_INTENTS.find((intent) =>
      intent.triggers.some((trigger) => q.includes(trigger.toLowerCase()) || trigger.toLowerCase().includes(q))
    );

    if (matchedIntent) {
      return SMART_CLASSROOM_PHRASES.filter((p) =>
        matchedIntent.matchedPhraseIds.includes(p.id)
      );
    }

    // Otherwise match by English, Vietnamese, tags, context, subcategory
    return SMART_CLASSROOM_PHRASES.filter((p) => {
      return (
        p.english.toLowerCase().includes(q) ||
        p.vietnamese.toLowerCase().includes(q) ||
        p.context.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.alternatives && p.alternatives.some((a) => a.toLowerCase().includes(q)))
      );
    });
  }, [searchQuery]);

  const filteredDictionary = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return CLASSROOM_DICTIONARY;
    return CLASSROOM_DICTIONARY.filter((item) => {
      return (
        item.wordOrPhrase.toLowerCase().includes(q) ||
        item.vietnamese.toLowerCase().includes(q) ||
        (item.classroomContext && item.classroomContext.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Search Box */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 text-white rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_0_#1E40AF] border-2 border-indigo-300 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-blue-100 text-xs font-black uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Phần 12 & 14 • Tra Cứu Thông Minh & Từ Điển Lớp Học</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-black">
            🔍 Smart Search & Classroom Dictionary
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
            Nhập ý định sư phạm bằng tiếng Việt (ví dụ: <em>"muốn học sinh im lặng"</em>, <em>"khen học sinh"</em>, <em>"chuyển hoạt động"</em>) hoặc từ vựng tiếng Anh để tìm câu khẩu lệnh hoàn hảo.
          </p>

          {/* Big Search Input Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-indigo-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập ý định (vd: muốn học sinh im lặng, khen ngợi, chuyển hoạt động...)"
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 font-bold text-sm sm:text-base border-2 border-white shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-400/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Suggested Trigger Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-black text-blue-200">Gợi ý tìm nhanh:</span>
            {[
              "muốn học sinh im lặng",
              "khen học sinh",
              "chuyển hoạt động",
              "hết giờ",
              "chia nhóm",
              "sửa lỗi",
            ].map((trigger, i) => (
              <button
                key={i}
                onClick={() => {
                  playSound("click");
                  setSearchQuery(trigger);
                }}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-white/30 text-white text-xs font-bold transition-colors border border-white/25 cursor-pointer"
              >
                👉 {trigger}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Smart Search Results vs Dictionary */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => {
            playSound("click");
            setActiveTab("smart_search");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer ${
            activeTab === "smart_search"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Kết quả tìm kiếm ({searchResults.length})</span>
        </button>

        <button
          onClick={() => {
            playSound("click");
            setActiveTab("dictionary");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer ${
            activeTab === "dictionary"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Từ điển thuật ngữ lớp học ({filteredDictionary.length})</span>
        </button>
      </div>

      {/* Tab 1: Smart Search Results */}
      {activeTab === "smart_search" && (
        <div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {searchResults.map((phrase) => (
                <PhraseCard
                  key={phrase.id}
                  phrase={phrase}
                  isFavorite={favorites.includes(phrase.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenTranslateModal={onOpenTranslateModal}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto">
                💡
              </div>
              <h3 className="font-display font-black text-lg text-slate-800">
                {searchQuery
                  ? `Không tìm thấy câu phù hợp với "${searchQuery}"`
                  : "Nhập từ khóa hoặc chọn một gợi ý ở trên để tìm câu"}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Hệ thống hỗ trợ tìm kiếm bằng cả tiếng Anh hoặc tiếng Việt theo ý định giảng dạy (ví dụ: "im lặng", "khen học sinh", "bài tập về nhà").
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Classroom Dictionary View */}
      {activeTab === "dictionary" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDictionary.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB] space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                    {item.partOfSpeech || item.type}
                  </span>
                  <button
                    onClick={() => speakText(item.wordOrPhrase, { rate: 0.9 })}
                    className="p-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors shadow-xs cursor-pointer"
                    title="Phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black text-slate-900 select-text">
                    {item.wordOrPhrase}
                  </h3>
                  {item.ipa && (
                    <span className="text-xs font-mono text-indigo-600 font-bold block mt-0.5 select-text">
                      {item.ipa}
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 select-text">
                  🇻🇳 {item.vietnamese}
                </div>

                {item.classroomContext && (
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-800">Ngữ cảnh:</strong> {item.classroomContext}
                  </div>
                )}

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-700">Ví dụ câu:</span>
                  <p className="font-medium text-slate-800 italic">"{item.example}"</p>
                  {item.exampleVi && (
                    <p className="text-slate-500">→ {item.exampleVi}</p>
                  )}
                </div>

                {item.notes && (
                  <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item.notes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
