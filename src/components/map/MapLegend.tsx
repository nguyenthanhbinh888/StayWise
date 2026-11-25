import React from "react";
import { HeatmapMode } from "./MapContainerWrapper";

export const MapLegend: React.FC<{ mode: HeatmapMode }> = ({ mode }) => {
  const getLegendInfo = () => {
    switch (mode) {
      case "totalCost":
        return {
          title: "Thang tổng chi phí",
          low: "< 8.5 tr (Kinh tế)",
          mid: "8.5 - 10.0 tr (Vừa phải)",
          high: "> 10.0 tr (Cao)",
          colors: ["#16A36A", "#F5A623", "#E45A5A"],
        };
      case "rent":
        return {
          title: "Thang giá thuê TB",
          low: "< 3.5 tr (Rẻ)",
          mid: "3.5 - 4.5 tr (TB)",
          high: "> 4.5 tr (Cao)",
          colors: ["#16A36A", "#F5A623", "#E45A5A"],
        };
      case "flood":
        return {
          title: "Nguy cơ ngập lụt",
          low: "Thấp (An toàn)",
          mid: "Trung bình",
          high: "Cao (Triều cường)",
          colors: ["#3B82F6", "#F5A623", "#E45A5A"],
        };
      case "environment":
        return {
          title: "Chất lượng môi trường",
          low: "Trung bình",
          mid: "Khá",
          high: "Rất tốt (Trong lành)",
          colors: ["#F5A623", "#3B82F6", "#16A36A"],
        };
      default:
        return {
          title: "Mật độ chi tiêu",
          low: "Thấp",
          mid: "Trung bình",
          high: "Cao",
          colors: ["#16A36A", "#F5A623", "#E45A5A"],
        };
    }
  };

  const info = getLegendInfo();

  return (
    <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-border shadow-modal text-left text-xs max-w-[210px]">
      <h6 className="font-bold text-navy mb-2 text-[11px] uppercase tracking-wider">{info.title}</h6>
      <div className="space-y-1.5 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: info.colors[0] }} />
          <span className="text-textSecondary">{info.low}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: info.colors[1] }} />
          <span className="text-textSecondary">{info.mid}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: info.colors[2] }} />
          <span className="text-textSecondary">{info.high}</span>
        </div>
      </div>
    </div>
  );
};
