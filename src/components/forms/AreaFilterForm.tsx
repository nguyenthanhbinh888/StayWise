"use client";

import React from "react";
import { Slider } from "@/components/common/Slider";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { RotateCcw } from "lucide-react";

export interface FilterState {
  city: "all" | "hanoi" | "hcm";
  maxRent: number;
  maxTotalCost: number;
  minSafety: number;
  minQuietness: number;
  maxFloodRisk: number;
}

export const AreaFilterForm: React.FC<{
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
}> = ({ filters, onChange, onReset }) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-card space-y-5 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Bộ lọc khu vực</h4>
        <button
          onClick={onReset}
          className="text-xs text-textMuted hover:text-primary flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
        </button>
      </div>

      {/* Thành phố */}
      <Select
        label="Thành phố"
        value={filters.city}
        onChange={(e) => onChange({ ...filters, city: e.target.value as FilterState["city"] })}
        options={[
          { label: "Tất cả thành phố (Hà Nội & TP.HCM)", value: "all" },
          { label: "Hà Nội", value: "hanoi" },
          { label: "TP. Hồ Chí Minh", value: "hcm" },
        ]}
      />

      {/* Giá thuê tối đa */}
      <Slider
        label="Giá thuê phòng tối đa"
        min={2.5}
        max={7.5}
        step={0.5}
        value={filters.maxRent}
        valueDisplay={`${filters.maxRent} triệu/tháng`}
        onChange={(e) => onChange({ ...filters, maxRent: parseFloat(e.target.value) })}
      />

      {/* Tổng chi phí tối đa */}
      <Slider
        label="Tổng chi phí sinh hoạt tối đa"
        min={7.0}
        max={15.0}
        step={0.5}
        value={filters.maxTotalCost}
        valueDisplay={`${filters.maxTotalCost} triệu/tháng`}
        onChange={(e) => onChange({ ...filters, maxTotalCost: parseFloat(e.target.value) })}
      />

      {/* Điểm An ninh tối thiểu */}
      <Slider
        label="Mức độ an ninh tối thiểu"
        min={1}
        max={5}
        step={0.5}
        value={filters.minSafety}
        valueDisplay={`${filters.minSafety} / 5 sao`}
        onChange={(e) => onChange({ ...filters, minSafety: parseFloat(e.target.value) })}
      />

      {/* Điểm Yên tĩnh tối thiểu */}
      <Slider
        label="Độ yên tĩnh tối thiểu"
        min={1}
        max={5}
        step={0.5}
        value={filters.minQuietness}
        valueDisplay={`${filters.minQuietness} / 5 sao`}
        onChange={(e) => onChange({ ...filters, minQuietness: parseFloat(e.target.value) })}
      />

      {/* Nguy cơ ngập tối đa */}
      <Slider
        label="Nguy cơ ngập tối đa chấp nhận"
        min={1}
        max={5}
        step={0.5}
        value={filters.maxFloodRisk}
        valueDisplay={`≤ ${filters.maxFloodRisk} điểm`}
        onChange={(e) => onChange({ ...filters, maxFloodRisk: parseFloat(e.target.value) })}
      />
    </div>
  );
};
