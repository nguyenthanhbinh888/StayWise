"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/hooks/useStore";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { calculateOverallLivingScore, findComparisonHighlights } from "@/lib/calculations/scores";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import { ComparisonBarChart } from "@/components/charts/ComparisonBarChart";
import { LivingScoreRadarChart } from "@/components/charts/LivingScoreRadarChart";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { EmptyState } from "@/components/common/EmptyState";
import {
  GitCompare,
  X,
  Plus,
  ShieldCheck,
  TrendingDown,
  Trees,
  Store,
  Compass,
} from "lucide-react";

export default function ComparePage() {
  const { areas, comparisonIds, removeComparison, clearComparison, toggleComparison } = useStore();

  // Danh sách các khu vực được chọn so sánh
  const selectedAreas = areas.filter((a) => comparisonIds.includes(a.id));
  const highlights = findComparisonHighlights(selectedAreas);

  // Dữ liệu cho BarChart
  const barChartData = selectedAreas.map((a) => ({
    areaName: a.name,
    "Tiền thuê": a.rent.average,
    "Ăn uống": a.monthlyExpenses.food,
    "Đi lại": a.monthlyExpenses.transportation,
    "Điện nước & Net": a.monthlyExpenses.utilities,
    "Khác": a.monthlyExpenses.other,
  }));

  // Dữ liệu cho RadarChart (so sánh 5 tiêu chí môi trường sống)
  const radarChartData = [
    {
      subject: "An ninh",
      ...selectedAreas.reduce((acc, a) => ({ ...acc, [a.id]: a.livingScores.safety }), {}),
    },
    {
      subject: "Yên tĩnh",
      ...selectedAreas.reduce((acc, a) => ({ ...acc, [a.id]: a.livingScores.quietness }), {}),
    },
    {
      subject: "Giao thông",
      ...selectedAreas.reduce((acc, a) => ({ ...acc, [a.id]: a.livingScores.trafficConvenience }), {}),
    },
    {
      subject: "Môi trường",
      ...selectedAreas.reduce((acc, a) => ({ ...acc, [a.id]: a.livingScores.environment }), {}),
    },
    {
      subject: "Ít ngập lụt",
      ...selectedAreas.reduce(
        (acc, a) => ({ ...acc, [a.id]: Math.max(1, 6 - a.livingScores.floodRisk) }),
        {}
      ),
    },
  ];

  const radarColors = ["#16A36A", "#17324D", "#F5A623", "#3B82F6"];
  const areaRadarKeys = selectedAreas.map((a, i) => ({
    key: a.id,
    name: a.name,
    color: radarColors[i % radarColors.length],
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                <GitCompare className="w-3.5 h-3.5" /> Bảng so sánh đối kháng
              </span>
            </div>
            <h1 className="text-3xl font-black text-navy tracking-tight">So sánh đa chiều các khu vực</h1>
            <p className="text-xs sm:text-sm text-textSecondary mt-1">
              Đặt tối đa 4 khu vực lên bàn cân đối đầu trực tiếp về cơ cấu chi tiêu và chất lượng môi trường
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedAreas.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearComparison} className="text-xs">
                Xóa tất cả ({selectedAreas.length})
              </Button>
            )}
            <Link href="/explore">
              <Button size="sm" className="gap-1.5 text-xs">
                <Plus className="w-3.5 h-3.5" /> Thêm khu vực khác
              </Button>
            </Link>
          </div>
        </div>

        {selectedAreas.length > 0 ? (
          <>
            {/* Quick Chips of Selected Areas */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-2xl border border-border text-left">
              <span className="text-xs font-semibold text-textSecondary mr-1">Đang so sánh:</span>
              {selectedAreas.map((area, idx) => (
                <div
                  key={area.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-light text-navy text-xs font-bold"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: radarColors[idx % radarColors.length] }} />
                  <span>{area.name} ({area.displayCity})</span>
                  <button
                    onClick={() => removeComparison(area.id)}
                    className="text-textMuted hover:text-danger p-0.5"
                    aria-label={`Bỏ khu vực ${area.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {selectedAreas.length < 4 && (
                <span className="text-[11px] text-textMuted italic ml-2">
                  (Có thể thêm tối đa {4 - selectedAreas.length} khu vực nữa)
                </span>
              )}
            </div>

            {/* Matrix Comparison Table */}
            <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden text-left">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-navy text-white border-b border-navy-dark">
                      <th className="p-4 font-bold uppercase tracking-wider sticky left-0 bg-navy z-10 min-w-[180px]">
                        Tiêu chí so sánh
                      </th>
                      {selectedAreas.map((area) => (
                        <th key={area.id} className="p-4 font-bold text-center min-w-[160px]">
                          <div className="text-sm font-extrabold">{area.name}</div>
                          <span className="text-[10px] text-slate-300 font-normal">{area.displayCity}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-textSecondary">
                    {/* Giá thuê TB */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Giá thuê phòng TB</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center font-bold text-navy">
                          {formatCurrencyMillion(area.rent.average)}
                        </td>
                      ))}
                    </tr>

                    {/* Chi phí ăn uống */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Tiền ăn uống TB</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          {formatCurrencyMillion(area.monthlyExpenses.food)}
                        </td>
                      ))}
                    </tr>

                    {/* Đi lại */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Chi phí đi lại</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          {formatCurrencyMillion(area.monthlyExpenses.transportation)}
                        </td>
                      ))}
                    </tr>

                    {/* Điện nước */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Điện nước &amp; Internet</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          {formatCurrencyMillion(area.monthlyExpenses.utilities)}
                        </td>
                      ))}
                    </tr>

                    {/* Khác */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Chi tiêu phát sinh</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          {formatCurrencyMillion(area.monthlyExpenses.other)}
                        </td>
                      ))}
                    </tr>

                    {/* TỔNG CHI PHÍ THAM CHIẾU */}
                    <tr className="bg-primary-light/30 font-bold border-y-2 border-primary/20">
                      <td className="p-4 text-primary-dark font-extrabold sticky left-0 bg-[#E8F7EF]">
                        Tổng chi phí sinh hoạt TB
                      </td>
                      {selectedAreas.map((area) => {
                        const total = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
                        const isLowest = area.id === highlights.lowestCostAreaId;

                        return (
                          <td key={area.id} className="p-4 text-center">
                            <span className="text-sm font-extrabold text-navy block">
                              {formatCurrencyMillion(total)}
                            </span>
                            {isLowest && (
                              <Badge variant="success" size="sm" className="mt-1">
                                Tiết kiệm nhất
                              </Badge>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* An ninh */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Điểm an ninh</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center font-bold text-navy">
                          {area.livingScores.safety} / 5.0
                        </td>
                      ))}
                    </tr>

                    {/* Yên tĩnh */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Độ yên tĩnh</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          {area.livingScores.quietness} / 5.0
                        </td>
                      ))}
                    </tr>

                    {/* Giao thông */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Thuận tiện giao thông</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          {area.livingScores.trafficConvenience} / 5.0
                        </td>
                      ))}
                    </tr>

                    {/* Môi trường */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Chất lượng môi trường</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          {area.livingScores.environment} / 5.0
                        </td>
                      ))}
                    </tr>

                    {/* Nguy cơ ngập */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Nguy cơ ngập lụt</td>
                      {selectedAreas.map((area) => (
                        <td key={area.id} className="p-4 text-center">
                          <span
                            className={`font-bold ${
                              area.livingScores.floodRisk >= 3.5 ? "text-danger" : "text-navy"
                            }`}
                          >
                            {area.livingScores.floodRisk} / 5.0
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Tiện ích */}
                    <tr className="hover:bg-background/60">
                      <td className="p-4 font-semibold text-navy sticky left-0 bg-white">Tổng tiện ích thiết yếu</td>
                      {selectedAreas.map((area) => {
                        const totalAm = Object.values(area.amenities).reduce((a, b) => a + b, 0);
                        return (
                          <td key={area.id} className="p-4 text-center font-bold text-navy">
                            {totalAm} điểm
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Section: Bar Chart & Radar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-3xl border border-border shadow-card">
                <h3 className="text-sm font-bold text-navy mb-4">So sánh cơ cấu chi phí (triệu đồng)</h3>
                <ComparisonBarChart data={barChartData} />
              </div>

              <div className="bg-white p-6 rounded-3xl border border-border shadow-card">
                <h3 className="text-sm font-bold text-navy mb-4">So sánh chất lượng môi trường sống (1 - 5)</h3>
                <LivingScoreRadarChart data={radarChartData} areaKeys={areaRadarKeys} />
              </div>
            </div>

            {/* Automated Conclusion Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                  <TrendingDown className="w-4 h-4" /> Tiết kiệm chi phí nhất
                </div>
                <h4 className="text-base font-bold text-navy">
                  {areas.find((a) => a.id === highlights.lowestCostAreaId)?.name || "--"}
                </h4>
                <p className="text-xs text-textSecondary">
                  Tổng chi phí sinh hoạt trung bình thấp nhất trong các lựa chọn hiện tại.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <Trees className="w-4 h-4" /> Môi trường sống tốt nhất
                </div>
                <h4 className="text-base font-bold text-navy">
                  {areas.find((a) => a.id === highlights.bestEnvironmentAreaId)?.name || "--"}
                </h4>
                <p className="text-xs text-textSecondary">
                  Đạt điểm trung bình cao nhất về độ sạch sẽ, không gian xanh và ít ngập.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  <ShieldCheck className="w-4 h-4" /> Mức độ an ninh cao nhất
                </div>
                <h4 className="text-base font-bold text-navy">
                  {areas.find((a) => a.id === highlights.safestAreaId)?.name || "--"}
                </h4>
                <p className="text-xs text-textSecondary">
                  Khu dân cư văn minh, trật tự xã hội và tỷ lệ an toàn ban đêm cao nhất.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <Store className="w-4 h-4" /> Tiện ích phong phú nhất
                </div>
                <h4 className="text-base font-bold text-navy">
                  {areas.find((a) => a.id === highlights.mostAmenitiesAreaId)?.name || "--"}
                </h4>
                <p className="text-xs text-textSecondary">
                  Mật độ chợ dân sinh, siêu thị, quán ăn và trạm xe buýt dày đặc nhất.
                </p>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            title="Chưa chọn khu vực nào để so sánh"
            description="Bạn có thể chọn tối đa 4 khu vực từ trang Khám phá hoặc bấm nút bên dưới để bắt đầu."
            icon={Compass}
            actionText="Đến trang Khám phá khu vực"
            onAction={() => toggleComparison("cau-giay")}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
