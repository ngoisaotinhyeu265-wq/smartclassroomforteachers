import React, { useRef, useState, useEffect, useCallback } from "react";
import { AppSkill } from "../../types";
import { playSound } from "../../utils/audioEffects";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  X,
  Sparkles,
  ArrowRight,
  MoveHorizontal,
} from "lucide-react";

export interface NavItemConfig {
  id: AppSkill;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface DashboardNavBarProps {
  currentSkill: AppSkill;
  onSelectSkill: (skill: AppSkill) => void;
  navItems: NavItemConfig[];
}

export const DashboardNavBar: React.FC<DashboardNavBarProps> = ({
  currentSkill,
  onSelectSkill,
  navItems,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAllAppsModal, setShowAllAppsModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Check scroll positions
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkScroll]);

  // Auto-scroll active item into view
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const activeBtn = el.querySelector(`#subnav-btn-${currentSkill}`) as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      // Recheck after animation completes
      setTimeout(checkScroll, 350);
    }
  }, [currentSkill, checkScroll]);

  // Scroll buttons handlers
  const scrollByAmount = (amount: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    playSound("click");
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  // Wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Native horizontal trackpad
      return;
    }
    // Vertical mouse wheel scroll -> horizontal scroll
    if (e.deltaY !== 0) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  // Mouse Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Don't drag if clicking buttons directly with primary intention, but allow smooth drag
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.3; // Scroll speed multiplier
    if (Math.abs(walk) > 6) {
      setHasDragged(true);
    }
    el.scrollLeft = scrollLeftState - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-2 z-30 select-none">
      <div className="max-w-7xl mx-auto relative flex items-center gap-2">
        {/* Left Scroll Button */}
        <button
          type="button"
          onClick={() => scrollByAmount(-280)}
          disabled={!canScrollLeft}
          title="Di chuyển sang trái (ứng dụng trước)"
          aria-label="Cuộn sang trái"
          className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 z-10 ${
            canScrollLeft
              ? "bg-white text-blue-700 border-[#D1E0FB] shadow-[0_3px_0_0_#93C5FD] hover:bg-blue-50 hover:scale-105 active:translate-y-0.5 active:shadow-none cursor-pointer"
              : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-40"
          }`}
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Scrollable Container with Edge Fade Indicators */}
        <div className="relative flex-1 min-w-0 bg-white/95 backdrop-blur-md rounded-[26px] border-2 border-[#D1E0FB] shadow-[0_4px_0_0_#D1E0FB] p-1.5 sm:p-2">
          {/* Left Gradient Fade Indicator */}
          {canScrollLeft && (
            <div
              onClick={() => scrollByAmount(-240)}
              className="absolute left-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-r from-white via-white/80 to-transparent rounded-l-[24px] pointer-events-auto cursor-pointer z-10 flex items-center pl-1 group"
              title="Còn ứng dụng bên trái (nhấn để cuộn)"
            >
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-xs">
                <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
          )}

          {/* Right Gradient Fade Indicator */}
          {canScrollRight && (
            <div
              onClick={() => scrollByAmount(240)}
              className="absolute right-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-l from-white via-white/80 to-transparent rounded-r-[24px] pointer-events-auto cursor-pointer z-10 flex items-center justify-end pr-1 group"
              title="Còn ứng dụng bên phải (nhấn để cuộn)"
            >
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-xs">
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
          )}

          {/* Nav Items Horizontal Strip */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`overflow-x-auto scrollbar-none flex items-center gap-2 whitespace-nowrap scroll-smooth px-1.5 py-0.5 ${
              isDragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {navItems.map((item) => {
              const isActive = currentSkill === item.id;
              return (
                <button
                  key={item.id}
                  id={`subnav-btn-${item.id}`}
                  onClick={() => {
                    if (hasDragged) return; // Prevent navigation if user was dragging
                    playSound("click");
                    onSelectSkill(item.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-2xl text-xs font-black transition-all shrink-0 select-none ${
                    isActive
                      ? "bg-blue-600 text-white shadow-[0_3px_0_0_#1D4ED8] translate-y-[-1px]"
                      : "text-slate-700 hover:text-blue-700 hover:bg-[#F0F7FF] border border-transparent hover:border-blue-200"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase leading-tight ${
                        isActive
                          ? "bg-yellow-400 text-blue-950"
                          : item.badgeColor || "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => scrollByAmount(280)}
          disabled={!canScrollRight}
          title="Di chuyển sang phải (ứng dụng tiếp theo)"
          aria-label="Cuộn sang phải"
          className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 z-10 ${
            canScrollRight
              ? "bg-white text-blue-700 border-[#D1E0FB] shadow-[0_3px_0_0_#93C5FD] hover:bg-blue-50 hover:scale-105 active:translate-y-0.5 active:shadow-none cursor-pointer"
              : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-40"
          }`}
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* All Apps Quick Overview Button */}
        <button
          type="button"
          onClick={() => {
            playSound("click");
            setShowAllAppsModal(true);
          }}
          title="Xem tất cả ứng dụng (Menu mở rộng)"
          aria-label="Xem tất cả ứng dụng"
          className="shrink-0 px-2.5 sm:px-3 h-9 sm:h-10 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-2 border-indigo-200 font-black text-xs flex items-center gap-1.5 shadow-[0_3px_0_0_#A5B4FC] hover:scale-105 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all"
        >
          <Grid className="w-4 h-4" />
          <span className="hidden md:inline">Tất cả ({navItems.length})</span>
        </button>
      </div>

      {/* Helper cue for students on small screens */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 pt-1 text-[10px] text-slate-400 font-semibold sm:hidden">
        <span className="flex items-center gap-1">
          <MoveHorizontal className="w-3 h-3 text-blue-500 animate-pulse" />
          Vuốt hoặc nhấn 2 nút mũi tên để xem hết các ứng dụng
        </span>
        <span>{navItems.length} ứng dụng</span>
      </div>

      {/* All Apps Modal / Popover */}
      {showAllAppsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowAllAppsModal(false)}
        >
          <div
            className="bg-white rounded-[32px] border-4 border-[#D1E0FB] shadow-[0_12px_0_0_#93C5FD] p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-slate-900 uppercase">
                    Tất Cả Ứng Dụng Học Tập
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Nhấn vào bất kỳ ứng dụng nào để mở ngay lập tức
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAllAppsModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {navItems.map((item) => {
                const isActive = currentSkill === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playSound("click");
                      onSelectSkill(item.id);
                      setShowAllAppsModal(false);
                    }}
                    className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-700 shadow-[0_4px_0_0_#1D4ED8]"
                        : "bg-slate-50 hover:bg-blue-50/80 border-slate-200 hover:border-blue-300 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isActive ? "bg-white/20 text-white" : "bg-white text-blue-600 shadow-xs"
                        }`}
                      >
                        {item.icon}
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                            isActive
                              ? "bg-yellow-400 text-blue-950"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4
                        className={`font-black text-xs ${
                          isActive ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </h4>
                      <p
                        className={`text-[10px] mt-0.5 ${
                          isActive ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {isActive ? "Đang chọn" : "Nhấn để mở"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowAllAppsModal(false)}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs cursor-pointer transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
