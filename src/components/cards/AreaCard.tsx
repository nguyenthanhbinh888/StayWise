"use client";

import React from "react";
import Link from "next/link";
import { Area } from "@/types/area";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { calculateOverallLivingScore } from "@/lib/calculations/scores";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import { MapPin, ArrowRight, CheckSquare, Square, Shield, Droplets } from "lucide-react";
import { useStore } from "@/hooks/useStore";

export interface AreaCardProps {
  area: Area;
  distanceKm?: number | null;
  onSelectOnMap?: () => void;
}

export const AreaCard: React.FC<AreaCardProps> = ({ area, distanceKm, onSelectOnMap }) => {
  const { isInComparison, toggleComparison } = useStore();
  const inComparison = isInComparison(area.id);

  const totalCost = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
  const overallScore = calculateOverallLivingScore(area.livingScores);

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div>
        {/* Header: Area Name & City */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Badge variant={area.city === "hanoi" ? "secondary" : "info"} size="sm">
                {area.displayCity}
              </Badge>
              {distanceKm !== undefined && distanceKm !== null && (
                <span className="text-[11px] font-medium text-textMuted bg-gray-100 px-2 py-0.5 rounded-full">
                  ~{distanceKm} km
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-navy group-hover:text-primary transition-colors">
              <Link href={`/areas/${area.slug}`}>{area.name}</Link>
            </h3>
          </div>

          <button
            onClick={() => toggleComparison(area.id)}
            className="flex items-center gap-1 text-xs text-textSecondary hover:text-navy transition-colors py-1 px-1.5 rounded-lg hover:bg-background"
            title="Thêm vào danh sách so sánh"
          >
            {inComparison ? (
              <CheckSquare className="w-4 h-4 text-primary" />
            ) : (
              <Square className="w-4 h-4 text-textMuted" />
            )}
            <span className="hidden sm:inline text-[11px]">{inComparison ? "Đã chọn" : "So sánh"}</span>
          </button>
        </div>

        {/* Cost highlights */}
        <div className="mt-4 grid grid-cols-2 gap-2 bg-background p-3 rounded-xl border border-border/50 text-left">
          <div>
            <span className="text-[11px] text-textMuted block">Giá thuê TB</span>
            <span className="text-sm font-bold text-navy">
              {formatCurrencyMillion(area.rent.average)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-textMuted block">Tổng chi phí TB</span>
            <span className="text-sm font-bold text-primary">
              {formatCurrencyMillion(totalCost)}
            </span>
          </div>
        </div>

        {/* Living scores & highlights */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-textSecondary flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-primary" /> Chất lượng sống
            </span>
            <span className="font-bold text-navy">{overallScore} / 5.0</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${(overallScore / 5) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-textMuted pt-1">
            <span>An ninh: {area.livingScores.safety}/5</span>
            <span className="flex items-center gap-0.5">
              <Droplets className="w-3 h-3 text-info" /> Ngập: {area.livingScores.floodRisk}/5
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-textSecondary line-clamp-2 leading-relaxed">
          {area.description}
        </p>
      </div>

      {/* Footer Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-border/60 flex items-center justify-between gap-2">
        {onSelectOnMap && (
          <button
            onClick={onSelectOnMap}
            className="text-xs text-textSecondary hover:text-primary flex items-center gap-1 py-1 font-medium transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" /> Xem vị trí
          </button>
        )}
        <Link href={`/areas/${area.slug}`} className="ml-auto">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
            Chi tiết <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
