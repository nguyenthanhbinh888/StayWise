"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CostInputForm } from "@/components/forms/CostInputForm";
import { ExpensePieChart } from "@/components/charts/ExpensePieChart";
import { BudgetBarChart } from "@/components/charts/BudgetBarChart";
import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { Badge } from "@/components/common/Badge";
import { useStore } from "@/hooks/useStore";
import { useToast } from "@/hooks/useToast";
import { CalculatorInputs } from "@/types/calculator";
import { calculateBudgetBreakdown } from "@/lib/calculations/cost";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  GitCompare,
  ArrowRight,
  Info,
} from "lucide-react";

export default function CalculatorPage() {
  const { areas, savedCalculatorPlan, savePlan } = useStore();
  const { success } = useToast();

  const [selectedAreaId, setSelectedAreaId] = useState<string>("cau-giay");

  const [values, setValues] = useState<CalculatorInputs>({
    monthlyBudget: 11.0,
    rent: 4.2,
    food: 2.6,
    transportation: 0.8,
    electricity: 0.35,
    water: 0.1,
    internet: 0.2,
    personalExpenses: 0.7,
    contingencyExpenses: 0.4,
  });

  // Nạp kế hoạch đã lưu nếu có
  useEffect(() => {
    if (savedCalculatorPlan) {
      setValues(savedCalculatorPlan);
    }
  }, [savedCalculatorPlan]);

  // Load presets từ khu vực được chọn
  const handlePresetArea = (areaId: string) => {
    setSelectedAreaId(areaId);
    const area = areas.find((a) => a.id === areaId);
    if (area) {
      setValues((prev) => ({
        ...prev,
        rent: area.rent.average,
        food: area.monthlyExpenses.food,
        transportation: area.monthlyExpenses.transportation,
        electricity: Math.round((area.monthlyExpenses.utilities * 0.55) * 100) / 100,
        water: Math.round((area.monthlyExpenses.utilities * 0.15) * 100) / 100,
        internet: Math.round((area.monthlyExpenses.utilities * 0.3) * 100) / 100,
        personalExpenses: Math.round((area.monthlyExpenses.other * 0.6) * 100) / 100,
        contingencyExpenses: Math.round((area.monthlyExpenses.other * 0.4) * 100) / 100,
      }));
    }
  };

  const handleReset = () => {
    handlePresetArea("cau-giay");
    setValues((prev) => ({ ...prev, monthlyBudget: 11.0 }));
  };

  const handleSavePlan = () => {
    savePlan(values);
    success("Đã lưu kế hoạch tài chính!", "Kế hoạch sẽ được bảo toàn khi bạn tải lại trang.");
  };

  const breakdown = calculateBudgetBreakdown(values);

  const pieData = [
    { name: "Tiền thuê", value: values.rent, color: "#16A36A" },
    { name: "Ăn uống", value: values.food, color: "#F5A623" },
    { name: "Đi lại", value: values.transportation, color: "#3B82F6" },
    {
      name: "Điện nước & Net",
      value: (values.electricity || 0) + (values.water || 0) + (values.internet || 0),
      color: "#8B5CF6",
    },
    {
      name: "Chi tiêu & Phát sinh",
      value: (values.personalExpenses || 0) + (values.contingencyExpenses || 0),
      color: "#98A2B3",
    },
  ];

  const barData = [
    {
      name: "So sánh chi tiêu",
      "Ngân sách": values.monthlyBudget,
      "Chi phí thực tế": breakdown.totalCost,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title & Introduction */}
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5" /> Hoạch định tài chính cá nhân
            </span>
          </div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Tính chi phí sinh hoạt hàng tháng</h1>
          <p className="text-xs sm:text-sm text-textSecondary max-w-2xl leading-relaxed">
            Ước tính toàn bộ các khoản tiền trọ, ăn uống, điện nước và đi lại thực tế để kiểm tra khả năng tiết kiệm hoặc nguy cơ thâm hụt ngân sách.
          </p>
        </div>

        {/* Quick Area Preset Selector */}
        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-left">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span className="font-semibold text-navy">Nạp nhanh dữ liệu tham chiếu theo khu vực:</span>
          </div>
          <div className="w-full sm:w-72">
            <Select
              options={areas.map((a) => ({
                label: `${a.name} (${a.displayCity}) - TB ${a.rent.average} tr`,
                value: a.id,
              }))}
              value={selectedAreaId}
              onChange={(e) => handlePresetArea(e.target.value)}
            />
          </div>
        </div>

        {/* Results Banner Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white p-5 rounded-2xl border border-border shadow-card">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider block">
              Tổng chi phí ước tính
            </span>
            <span className="text-2xl font-black text-navy mt-1 block">
              {formatCurrencyMillion(breakdown.totalCost)}
            </span>
            <span className="text-[11px] text-textSecondary mt-1 block">
              Chiếm {breakdown.budgetUtilizationRatio}% ngân sách
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border shadow-card">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider block">
              Ngân sách hàng tháng
            </span>
            <span className="text-2xl font-black text-navy mt-1 block">
              {formatCurrencyMillion(values.monthlyBudget)}
            </span>
            <span className="text-[11px] text-textMuted mt-1 block">Hạn mức chi tiêu tối đa</span>
          </div>

          <div
            className={`p-5 rounded-2xl border shadow-card ${
              breakdown.status === "surplus"
                ? "bg-primary-light/40 border-primary/30"
                : breakdown.status === "deficit"
                ? "bg-danger-light/40 border-danger/30"
                : "bg-white border-border"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider block text-textSecondary">
              {breakdown.status === "surplus" ? "Dư thừa ngân sách" : "Thâm hụt ngân sách"}
            </span>
            <span
              className={`text-2xl font-black mt-1 block ${
                breakdown.status === "surplus"
                  ? "text-primary-dark"
                  : breakdown.status === "deficit"
                  ? "text-danger"
                  : "text-navy"
              }`}
            >
              {breakdown.surplusDeficit > 0 ? "+" : ""}
              {formatCurrencyMillion(breakdown.surplusDeficit)}
            </span>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold">
              {breakdown.status === "surplus" && (
                <>
                  <TrendingUp className="w-3.5 h-3.5 text-primary" /> Tiết kiệm an toàn
                </>
              )}
              {breakdown.status === "deficit" && (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-danger" /> Vượt chi, cần cắt giảm!
                </>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border shadow-card">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider block">
              Tỷ trọng tiền thuê nhà
            </span>
            <span className="text-2xl font-black text-navy mt-1 block">
              {breakdown.rentRatio}%
            </span>
            <span className="text-[11px] text-textSecondary mt-1 block">
              {breakdown.rentRatio <= 35
                ? "Mức lý tưởng (≤ 35%)"
                : "Hơi cao, nên tìm bạn ở ghép"}
            </span>
          </div>
        </section>

        {/* Main 2-Column: Form & Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <CostInputForm
              values={values}
              onChange={setValues}
              onReset={handleReset}
              onSavePlan={handleSavePlan}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-card text-left">
              <h4 className="text-sm font-bold text-navy mb-4">Cơ cấu chi tiêu thực tế</h4>
              <ExpensePieChart data={pieData} />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-card text-left">
              <h4 className="text-sm font-bold text-navy mb-4">Đối sánh với ngân sách</h4>
              <BudgetBarChart data={barData} />
            </div>

            <div className="bg-navy-light/60 p-5 rounded-2xl border border-navy/10 text-left space-y-3">
              <h5 className="text-xs font-bold text-navy uppercase tracking-wider">
                Gợi ý bước tiếp theo
              </h5>
              <p className="text-xs text-textSecondary leading-relaxed">
                Sau khi có ngân sách {values.monthlyBudget} triệu, bạn có thể xem các khu vực phù hợp nhất hoặc so sánh với các quận khác.
              </p>
              <div className="flex gap-2 pt-1">
                <Link href="/recommendations" className="w-full">
                  <Button size="sm" className="w-full text-xs gap-1.5">
                    Gợi ý khu vực <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link href="/compare" className="w-full">
                  <Button size="sm" variant="outline" className="w-full text-xs gap-1.5">
                    <GitCompare className="w-3.5 h-3.5" /> So sánh
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
