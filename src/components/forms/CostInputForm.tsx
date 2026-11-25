"use client";

import React from "react";
import { CalculatorInputs } from "@/types/calculator";
import { Input } from "@/components/common/Input";
import { Slider } from "@/components/common/Slider";
import { Button } from "@/components/common/Button";
import { RotateCcw, BookmarkCheck } from "lucide-react";

export const CostInputForm: React.FC<{
  values: CalculatorInputs;
  onChange: (newValues: CalculatorInputs) => void;
  onReset: () => void;
  onSavePlan: () => void;
}> = ({ values, onChange, onReset, onSavePlan }) => {
  const updateField = (field: keyof CalculatorInputs, val: number) => {
    onChange({
      ...values,
      [field]: isNaN(val) ? 0 : Math.max(0, val),
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-card space-y-6 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h4 className="text-base font-bold text-navy">Thông tin chi phí hàng tháng</h4>
          <p className="text-xs text-textMuted mt-0.5">Nhập số liệu ước tính để tính toán thặng dư tài chính</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onReset} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
          </Button>
          <Button size="sm" onClick={onSavePlan} className="text-xs">
            <BookmarkCheck className="w-3.5 h-3.5" /> Lưu kế hoạch
          </Button>
        </div>
      </div>

      {/* Ngân sách hàng tháng */}
      <div className="bg-navy-light/60 p-4 rounded-xl border border-navy/10 space-y-2">
        <Slider
          label="Ngân sách chi tiêu hàng tháng của bạn"
          min={5}
          max={25}
          step={0.5}
          value={values.monthlyBudget}
          valueDisplay={`${values.monthlyBudget} triệu`}
          onChange={(e) => updateField("monthlyBudget", parseFloat(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tiền thuê */}
        <Input
          label="Tiền thuê phòng (triệu/tháng)"
          type="number"
          step="0.1"
          min="0"
          value={values.rent}
          onChange={(e) => updateField("rent", parseFloat(e.target.value))}
        />

        {/* Tiền ăn uống */}
        <Input
          label="Tiền ăn uống (triệu/tháng)"
          type="number"
          step="0.1"
          min="0"
          value={values.food}
          onChange={(e) => updateField("food", parseFloat(e.target.value))}
        />

        {/* Đi lại */}
        <Input
          label="Xăng xe / Xe buýt (triệu/tháng)"
          type="number"
          step="0.05"
          min="0"
          value={values.transportation}
          onChange={(e) => updateField("transportation", parseFloat(e.target.value))}
        />

        {/* Tiền điện */}
        <Input
          label="Tiền điện (triệu/tháng)"
          type="number"
          step="0.05"
          min="0"
          value={values.electricity}
          onChange={(e) => updateField("electricity", parseFloat(e.target.value))}
        />

        {/* Tiền nước */}
        <Input
          label="Tiền nước (triệu/tháng)"
          type="number"
          step="0.05"
          min="0"
          value={values.water}
          onChange={(e) => updateField("water", parseFloat(e.target.value))}
        />

        {/* Internet */}
        <Input
          label="Internet / Mạng di động (triệu/tháng)"
          type="number"
          step="0.05"
          min="0"
          value={values.internet}
          onChange={(e) => updateField("internet", parseFloat(e.target.value))}
        />

        {/* Chi tiêu cá nhân */}
        <Input
          label="Chi tiêu cá nhân, giải trí (triệu/tháng)"
          type="number"
          step="0.1"
          min="0"
          value={values.personalExpenses}
          onChange={(e) => updateField("personalExpenses", parseFloat(e.target.value))}
        />

        {/* Dự phòng phát sinh */}
        <Input
          label="Dự phòng phát sinh (triệu/tháng)"
          type="number"
          step="0.1"
          min="0"
          value={values.contingencyExpenses}
          onChange={(e) => updateField("contingencyExpenses", parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};
