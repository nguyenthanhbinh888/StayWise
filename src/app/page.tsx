"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/forms/SearchBar";
import { AreaCard } from "@/components/cards/AreaCard";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Button } from "@/components/common/Button";
import { StatCard } from "@/components/cards/StatCard";
import { MapContainerWrapper } from "@/components/map/MapContainerWrapper";
import { useStore } from "@/hooks/useStore";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import {
  Compass,
  Calculator,
  Sparkles,
  ArrowRight,
  MapPin,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Building,
} from "lucide-react";

export default function HomePage() {
  const { areas, contributions } = useStore();
  const [heatmapToggle, setHeatmapToggle] = useState(true);

  // Tính các số liệu thực tế động từ `areas`
  const totalAreas = areas.length;
  const avgRent =
    totalAreas > 0
      ? Math.round(
          (areas.reduce((acc, a) => acc + a.rent.average, 0) / totalAreas) * 100
        ) / 100
      : 0;

  const avgTotalCost =
    totalAreas > 0
      ? Math.round(
          (areas.reduce(
            (acc, a) =>
              acc + calculateAreaTotalCost(a.rent.average, a.monthlyExpenses),
            0
          ) /
            totalAreas) *
            100
        ) / 100
      : 0;

  const approvedContributions = contributions.filter((c) => c.status === "approved");

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-background to-background py-16 lg:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-xs font-bold mb-6 animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5" /> Nền tảng phân tích chi phí sinh hoạt đô thị thông minh
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy tracking-tight max-w-4xl mx-auto leading-tight">
              Tìm nơi sống phù hợp. <br className="hidden sm:inline" />
              <span className="text-primary">Sống thông minh hơn.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-textSecondary max-w-2xl mx-auto leading-relaxed">
              Khám phá khu vực sống, phân tích chi phí sinh hoạt chi tiết và lựa chọn nơi ở phù hợp với ngân sách, điểm đến học tập/làm việc và chất lượng môi trường sống.
            </p>

            {/* Hero Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <SearchBar placeholder="Nhập tên khu vực: Cầu Giấy, Bình Thạnh, Thủ Đức, Hà Đông..." />
            </div>

            {/* Quick CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/explore">
                <Button size="lg" className="gap-2 shadow-md">
                  <Compass className="w-4 h-4" /> Khám phá bản đồ ngay
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline" className="gap-2 bg-white">
                  <Calculator className="w-4 h-4 text-primary" /> Tính chi phí sinh hoạt
                </Button>
              </Link>
            </div>

            {/* Disclaimer pill */}
            <p className="mt-4 text-[11px] text-textMuted">
              * Dữ liệu minh họa 10 khu vực trọng điểm tại Hà Nội và TP.HCM
            </p>
          </div>
        </section>

        {/* Section 2: Quick Statistics */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Khu vực khảo sát"
              value={`${totalAreas} Khu vực`}
              subtitle="Hà Nội & TP. Hồ Chí Minh"
              icon={Building}
              variant="navy"
            />
            <StatCard
              title="Giá thuê trung bình"
              value={formatCurrencyMillion(avgRent)}
              subtitle="Mức tham chiếu phân khúc trẻ"
              icon={TrendingUp}
              variant="primary"
            />
            <StatCard
              title="Tổng chi phí tham chiếu"
              value={formatCurrencyMillion(avgTotalCost)}
              subtitle="Bao gồm ăn uống, điện nước & đi lại"
              icon={Calculator}
              variant="warning"
            />
            <StatCard
              title="Đánh giá xác thực"
              value={`${approvedContributions.length + 6}+ Nhận xét`}
              subtitle="Cộng đồng cư dân đóng góp"
              icon={ShieldCheck}
              variant="info"
            />
          </div>
        </section>

        {/* Section 3: Explore Map Preview */}
        <section className="py-12 bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 text-left">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Trực quan hóa không gian
                </span>
                <h2 className="text-2xl font-extrabold text-navy mt-1">
                  Bản đồ nhiệt chi phí &amp; Môi trường đô thị
                </h2>
                <p className="text-xs text-textSecondary mt-1">
                  Xem nhanh mật độ giá thuê và tổng chi phí sinh hoạt theo tọa độ thực tế
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={heatmapToggle ? "primary" : "outline"}
                  onClick={() => setHeatmapToggle(!heatmapToggle)}
                  className="text-xs"
                >
                  {heatmapToggle ? "Đang bật Heatmap" : "Bật lớp Heatmap"}
                </Button>
                <Link href="/explore">
                  <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                    Xem bản đồ đầy đủ <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Map Preview Component */}
            <div className="h-[460px] rounded-2xl overflow-hidden border border-border shadow-card">
              <MapContainerWrapper
                areas={areas}
                showHeatmap={heatmapToggle}
                heatmapMode="totalCost"
                height="460px"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Featured Areas */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 text-left">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Khu vực tiêu biểu
              </span>
              <h2 className="text-2xl font-extrabold text-navy mt-1">
                Lựa chọn phổ biến của sinh viên &amp; người đi làm
              </h2>
            </div>
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
                Xem tất cả {areas.length} khu vực <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.slice(0, 6).map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </section>

        {/* Section 5: Calculator Preview CTA */}
        <section className="py-16 bg-navy text-white text-left relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-light/10 text-primary-light text-xs font-bold">
                <Calculator className="w-3.5 h-3.5 text-primary" /> Công cụ độc quyền
              </div>
              <h2 className="text-3xl font-black tracking-tight leading-tight">
                Không chỉ là tiền phòng. <br />
                <span className="text-primary">Tính toán toàn diện chi tiêu hàng tháng.</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                Người tìm trọ thường bị bội chi vì tiền điện, nước, internet và chi phí đi lại. Hãy nhập ngân sách của bạn để StayWise phân bổ và cảnh báo sớm thặng dư tài chính.
              </p>
              <div className="pt-2">
                <Link href="/calculator">
                  <Button size="lg" className="gap-2 shadow-lg">
                    Thử nghiệm bộ tính chi phí ngay <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10 text-xs">
                <span className="text-slate-300 font-semibold">Ước tính mẫu tại Cầu Giấy</span>
                <span className="text-primary-light font-bold">9.35 triệu/tháng</span>
              </div>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex justify-between"><span>Tiền thuê phòng:</span><b>4.2 triệu</b></div>
                <div className="flex justify-between"><span>Ăn uống:</span><b>2.6 triệu</b></div>
                <div className="flex justify-between"><span>Đi lại (xăng/xe buýt):</span><b>0.8 triệu</b></div>
                <div className="flex justify-between"><span>Điện nước &amp; Internet:</span><b>0.65 triệu</b></div>
                <div className="flex justify-between"><span>Chi phí sinh hoạt khác:</span><b>1.1 triệu</b></div>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Với ngân sách 11.0 triệu:</span>
                <span className="text-primary font-bold bg-primary-light/20 px-2 py-0.5 rounded">
                  Tiết kiệm được +1.65 triệu
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: How StayWise Works */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Quy trình thông minh
          </span>
          <h2 className="text-2xl font-extrabold text-navy mt-1 mb-10">
            3 bước tìm nơi sống lý tưởng
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-2xl border border-border shadow-card relative">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-navy">Khám phá khu vực</h3>
              <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                Xem bản đồ nhiệt trực quan theo giá thuê, tổng chi phí sinh hoạt và các tiện ích thiết yếu xung quanh trường học/nơi làm việc.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-border shadow-card relative">
              <div className="w-10 h-10 rounded-xl bg-navy-light text-navy flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-navy">Phân tích &amp; So sánh</h3>
              <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                Đưa tối đa 4 khu vực lên bàn cân đối đầu trực tiếp về cơ cấu chi phí, mức độ an ninh, nguy cơ ngập lụt và cự ly di chuyển.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-border shadow-card relative">
              <div className="w-10 h-10 rounded-xl bg-warning-light text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-navy">Chọn nơi ở tối ưu</h3>
              <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                Nhận đề xuất khu vực được cá nhân hóa kèm lý do minh bạch, xem đánh giá trải nghiệm thực tế từ cộng đồng cư dân đã xác thực.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Community Insights */}
        <section className="py-16 bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 text-left">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Trải nghiệm thực tế
                </span>
                <h2 className="text-2xl font-extrabold text-navy mt-1">
                  Đánh giá từ cộng đồng cư dân
                </h2>
              </div>
              <Link href="/community">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
                  Xem tất cả đánh giá <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedContributions.slice(0, 3).map((ct) => (
                <div key={ct.id} className="p-5 bg-background rounded-2xl border border-border/70 text-left space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-navy">{ct.authorName}</h4>
                      <span className="text-[11px] text-primary font-semibold">
                        Khu vực: {areas.find((a) => a.id === ct.areaId)?.name || ct.areaId}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      ★ {ct.rating}/5
                    </span>
                  </div>
                  <p className="text-xs text-textSecondary leading-relaxed">{ct.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
