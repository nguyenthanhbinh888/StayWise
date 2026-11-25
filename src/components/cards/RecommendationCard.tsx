"use client";

import React from "react";
import Link from "next/link";
import { Area } from "@/types/area";
import { RecommendedArea } from "@/types/recommendation";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";
import { useStore } from "@/hooks/useStore";

export const RecommendationCard: React.FC<{
  item: RecommendedArea;
  area: Area;
}> = ({ item, area }) => {
  const { isInComparison, toggleComparison } = useStore();
  const inComp = isInComparison(area.id);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all text-left relative overflow-hidden">
      {/* Huy hiệu thứ hạng */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-base shadow-sm ${
              item.rank === 1
                ? "bg-amber-400 text-navy"
                : item.rank === 2
                ? "bg-slate-200 text-navy"
                : item.rank === 3
                ? "bg-amber-100 text-amber-900"
                : "bg-navy-light text-navy"
            }`}
          >
            #{item.rank}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={area.city === "hanoi" ? "secondary" : "info"} size="sm">
                {area.displayCity}
              </Badge>
              <span className="text-xs font-bold text-primary">
                Độ phù hợp: {item.totalScore}/100 điểm
              </span>
            </div>
            <h3 className="text-lg font-bold text-navy mt-0.5">
              <Link href={`/areas/${area.slug}`} className="hover:text-primary transition-colors">
                {area.name}
              </Link>
            </h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-textMuted block">Tổng chi phí dự kiến</span>
          <span className="text-base font-extrabold text-navy">
            {formatCurrencyMillion(item.totalEstimatedCost)}
          </span>
          <span
            className={`text-[11px] font-semibold block ${
              item.leftoverBudget >= 0 ? "text-primary" : "text-danger"
            }`}
          >
            {item.leftoverBudget >= 0
              ? `Dư ${item.leftoverBudget} tr/tháng`
              : `Vượt ${Math.abs(item.leftoverBudget)} tr/tháng`}
          </span>
        </div>
      </div>

      {/* 4 thành phần điểm */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-background p-3 rounded-xl border border-border/50 text-xs">
        <div>
          <span className="text-textMuted block text-[11px]">Ngân sách</span>
          <span className="font-bold text-navy">{item.budgetScore}/100</span>
        </div>
        <div>
          <span className="text-textMuted block text-[11px]">Đi lại</span>
          <span className="font-bold text-navy">{item.commuteScore}/100</span>
        </div>
        <div>
          <span className="text-textMuted block text-[11px]">Tiện ích</span>
          <span className="font-bold text-navy">{item.amenitiesScore}/100</span>
        </div>
        <div>
          <span className="text-textMuted block text-[11px]">Môi trường</span>
          <span className="font-bold text-navy">{item.environmentScore}/100</span>
        </div>
      </div>

      {/* Lý do gợi ý */}
      <div className="mt-4 space-y-1.5">
        <h5 className="text-xs font-semibold text-textSecondary uppercase tracking-wider flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-primary" /> Lý do được đề xuất:
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {item.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-textSecondary">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleComparison(area.id)}
          className={inComp ? "border-primary text-primary" : ""}
        >
          {inComp ? "Đã chọn so sánh" : "Thêm vào so sánh"}
        </Button>
        <Link href={`/areas/${area.slug}`}>
          <Button size="sm">
            Xem chi tiết khu vực <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
