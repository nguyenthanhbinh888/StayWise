"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/cards/StatCard";
import { MapContainerWrapper } from "@/components/map/MapContainerWrapper";
import { useStore } from "@/hooks/useStore";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { calculateOverallLivingScore } from "@/lib/calculations/scores";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import {
  BarChart3,
  Building,
  TrendingUp,
  Calculator,
  ShieldCheck,
  Star,
  Award,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DashboardPage() {
  const { areas, contributions } = useStore();

  const [selectedCity, setSelectedCity] = useState<"all" | "hanoi" | "hcm">("all");

  const filteredAreas = useMemo(() => {
    if (selectedCity === "all") return areas;
    return areas.filter((a) => a.city === selectedCity);
  }, [areas, selectedCity]);

  // KPIs
  const totalAreas = filteredAreas.length;
  const avgRent =
    totalAreas > 0
      ? Math.round(
          (filteredAreas.reduce((acc, a) => acc + a.rent.average, 0) / totalAreas) * 100
        ) / 100
      : 0;

  const avgTotalCost =
    totalAreas > 0
      ? Math.round(
          (filteredAreas.reduce(
            (acc, a) => acc + calculateAreaTotalCost(a.rent.average, a.monthlyExpenses),
            0
          ) /
            totalAreas) *
            100
        ) / 100
      : 0;

  const avgLivingScore =
    totalAreas > 0
      ? Math.round(
          (filteredAreas.reduce(
            (acc, a) => acc + calculateOverallLivingScore(a.livingScores),
            0
          ) /
            totalAreas) *
            10
        ) / 10
      : 0;

  const approvedReviewsCount = contributions.filter((c) => c.status === "approved").length;

  // Chart: So sánh giá thuê giữa các khu vực
  const rentChartData = filteredAreas.map((a) => ({
    name: a.name,
    "Giá thuê TB": a.rent.average,
    "Tổng chi phí TB": calculateAreaTotalCost(a.rent.average, a.monthlyExpenses),
  }));

  // Rankings
  const sortedByCost = [...filteredAreas].sort(
    (a, b) =>
      calculateAreaTotalCost(a.rent.average, a.monthlyExpenses) -
      calculateAreaTotalCost(b.rent.average, b.monthlyExpenses)
  );

  const topEconomical = sortedByCost.slice(0, 3);
  const topExpensive = [...sortedByCost].reverse().slice(0, 3);

  const topEnvironment = [...filteredAreas]
    .sort((a, b) => calculateOverallLivingScore(b.livingScores) - calculateOverallLivingScore(a.livingScores))
    .slice(0, 3);

  const topAmenities = [...filteredAreas]
    .sort(
      (a, b) =>
        Object.values(b.amenities).reduce((x, y) => x + y, 0) -
        Object.values(a.amenities).reduce((x, y) => x + y, 0)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header with City Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> Trung tâm phân tích đô thị
              </span>
            </div>
            <h1 className="text-3xl font-black text-navy tracking-tight">Thống kê &amp; Tổng quan chi phí</h1>
            <p className="text-xs sm:text-sm text-textSecondary mt-1">
              Phân tích tương quan mặt bằng giá thuê, cơ cấu chi tiêu và chỉ số chất lượng môi trường
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-textSecondary">Phạm vi:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value as typeof selectedCity)}
              className="bg-white rounded-xl border border-border px-3 py-2 text-xs font-bold text-navy focus:outline-none shadow-sm"
            >
              <option value="all">Toàn bộ (Hà Nội &amp; TP.HCM)</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
            </select>
          </div>
        </div>

        {/* 5 KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Số khu vực"
            value={`${totalAreas}`}
            subtitle={selectedCity === "all" ? "2 Thành phố lớn" : selectedCity === "hanoi" ? "Hà Nội" : "TP.HCM"}
            icon={Building}
            variant="navy"
          />
          <StatCard
            title="Giá thuê TB"
            value={formatCurrencyMillion(avgRent)}
            subtitle="Mức bình quân"
            icon={TrendingUp}
            variant="primary"
          />
          <StatCard
            title="Tổng chi phí TB"
            value={formatCurrencyMillion(avgTotalCost)}
            subtitle="Toàn bộ sinh hoạt phí"
            icon={Calculator}
            variant="warning"
          />
          <StatCard
            title="Chất lượng sống TB"
            value={`${avgLivingScore} / 5`}
            subtitle="Thang điểm 5.0"
            icon={ShieldCheck}
            variant="info"
          />
          <StatCard
            title="Đánh giá cư dân"
            value={`${approvedReviewsCount}`}
            subtitle="Đã kiểm duyệt"
            icon={Star}
            variant="primary"
          />
        </section>

        {/* Charts: Rent & Total Cost Distribution */}
        <section className="bg-white p-6 lg:p-8 rounded-3xl border border-border shadow-card text-left space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy">So sánh Giá thuê &amp; Tổng chi phí theo khu vực</h3>
              <p className="text-xs text-textSecondary mt-0.5">Đơn vị: Triệu đồng / tháng</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rentChartData} margin={{ top: 15, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#182230" }} interval={0} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} unit=" tr" />
                <Tooltip
                  formatter={(val: number) => [`${formatCurrencyMillion(val)}`, ""]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    borderColor: "#E5EAF0",
                    fontSize: "12px",
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="Giá thuê TB" fill="#17324D" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Tổng chi phí TB" fill="#16A36A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 4 Ranking Tables */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Top 3 Tiết kiệm nhất */}
          <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Award className="w-4 h-4" /> Top tiết kiệm nhất
            </div>
            <div className="divide-y divide-border/60">
              {topEconomical.map((area, idx) => (
                <div key={area.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-navy">#{idx + 1} {area.name}</span>
                    <span className="text-[10px] text-textMuted block">{area.displayCity}</span>
                  </div>
                  <span className="font-extrabold text-primary">
                    {formatCurrencyMillion(calculateAreaTotalCost(area.rent.average, area.monthlyExpenses))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Đắt đỏ nhất */}
          <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-danger uppercase tracking-wider">
              <Award className="w-4 h-4" /> Top chi phí cao nhất
            </div>
            <div className="divide-y divide-border/60">
              {topExpensive.map((area, idx) => (
                <div key={area.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-navy">#{idx + 1} {area.name}</span>
                    <span className="text-[10px] text-textMuted block">{area.displayCity}</span>
                  </div>
                  <span className="font-extrabold text-danger">
                    {formatCurrencyMillion(calculateAreaTotalCost(area.rent.average, area.monthlyExpenses))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Môi trường tốt nhất */}
          <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Award className="w-4 h-4" /> Top môi trường sống
            </div>
            <div className="divide-y divide-border/60">
              {topEnvironment.map((area, idx) => (
                <div key={area.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-navy">#{idx + 1} {area.name}</span>
                    <span className="text-[10px] text-textMuted block">{area.displayCity}</span>
                  </div>
                  <span className="font-extrabold text-navy">
                    {calculateOverallLivingScore(area.livingScores)} / 5.0
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Nhiều tiện ích nhất */}
          <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <Award className="w-4 h-4" /> Top nhiều tiện ích nhất
            </div>
            <div className="divide-y divide-border/60">
              {topAmenities.map((area, idx) => {
                const totalAm = Object.values(area.amenities).reduce((x, y) => x + y, 0);
                return (
                  <div key={area.id} className="py-2.5 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-navy">#{idx + 1} {area.name}</span>
                      <span className="text-[10px] text-textMuted block">{area.displayCity}</span>
                    </div>
                    <span className="font-extrabold text-navy">{totalAm} điểm</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Map Overview Section */}
        <section className="bg-white p-6 lg:p-8 rounded-3xl border border-border shadow-card text-left space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy">Phân bổ không gian đô thị</h3>
              <p className="text-xs text-textSecondary mt-0.5">Heatmap tổng chi phí sinh hoạt</p>
            </div>
          </div>

          <div className="h-[440px] rounded-2xl overflow-hidden border border-border">
            <MapContainerWrapper
              areas={filteredAreas}
              showHeatmap={true}
              heatmapMode="totalCost"
              height="440px"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
