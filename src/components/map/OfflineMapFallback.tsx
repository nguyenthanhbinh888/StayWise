"use client";

import React from "react";
import { Area } from "@/types/area";
import { MapPin, AlertCircle } from "lucide-react";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";

export const OfflineMapFallback: React.FC<{
  areas: Area[];
  selectedAreaId?: string | null;
  onSelectArea?: (area: Area) => void;
  height?: string;
}> = ({ areas, selectedAreaId, onSelectArea, height = "520px" }) => {
  return (
    <div
      style={{ height }}
      className="relative w-full rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col justify-between p-6 shadow-card text-left"
    >
      {/* Notice Banner */}
      <div className="z-10 flex items-center justify-between bg-slate-800/90 text-slate-200 px-3.5 py-2 rounded-xl border border-slate-600 text-xs">
        <span className="flex items-center gap-1.5 font-medium">
          <AlertCircle className="w-4 h-4 text-warning" />
          Bản đồ minh họa ngoại tuyến (Offline Visual Grid)
        </span>
        <span className="text-[11px] text-slate-400">Dữ liệu tọa độ cục bộ</span>
      </div>

      {/* Grid Canvas simulation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Node list mapped on coordinate plane */}
      <div className="z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 my-auto">
        {areas.map((area) => {
          const total = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
          const isSelected = selectedAreaId === area.id;

          return (
            <button
              key={area.id}
              onClick={() => onSelectArea && onSelectArea(area)}
              className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? "bg-primary text-white border-white shadow-lg scale-105"
                  : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-semibold">
                  <MapPin className="w-3 h-3 text-primary-light" />
                  {area.displayCity}
                </div>
                <h5 className="font-bold text-xs mt-1 text-white">{area.name}</h5>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-700/60 text-[11px]">
                <div className="text-slate-300">Thuê: <b>{area.rent.average} tr</b></div>
                <div className="text-emerald-400 font-bold">Tổng: {total} tr</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="z-10 text-[11px] text-slate-400 text-center">
        Đang hiển thị chế độ dự phòng độc lập. Các liên kết dữ liệu và tọa độ khu vực vẫn được bảo toàn trọn vẹn.
      </div>
    </div>
  );
};
