"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/hooks/useStore";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { calculateOverallLivingScore } from "@/lib/calculations/scores";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { AreaCard } from "@/components/cards/AreaCard";
import { AmenityCard } from "@/components/cards/AmenityCard";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { ExpensePieChart } from "@/components/charts/ExpensePieChart";
import { MapContainerWrapper } from "@/components/map/MapContainerWrapper";
import { SEED_AMENITIES } from "@/data/amenities";
import { SEED_REVIEWS } from "@/data/reviews";
import {
  MapPin,
  Shield,
  Volume2,
  Navigation,
  Trees,
  Droplets,
  PlusCircle,
  GitCompare,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function AreaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { areas, isInComparison, toggleComparison } = useStore();

  const [selectedAmenityCategory, setSelectedAmenityCategory] = useState<string>("all");

  const area = areas.find((a) => a.slug === slug || a.id === slug);

  if (!area) {
    notFound();
  }

  const totalCost = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
  const overallScore = calculateOverallLivingScore(area.livingScores);
  const inComparison = isInComparison(area.id);

  // Lọc tiện ích thuộc khu vực này
  const areaAmenities = SEED_AMENITIES.filter((am) => am.areaId === area.id);
  const filteredAmenities =
    selectedAmenityCategory === "all"
      ? areaAmenities
      : areaAmenities.filter((am) => am.category === selectedAmenityCategory);

  // Đánh giá cộng đồng của khu vực
  const areaReviews = SEED_REVIEWS.filter((r) => r.areaId === area.id);

  // Khu vực tương đồng (cùng thành phố, loại trừ khu vực hiện tại)
  const relatedAreas = areas
    .filter((a) => a.city === area.city && a.id !== area.id)
    .slice(0, 3);

  const pieData = [
    { name: "Tiền thuê phòng", value: area.rent.average, color: "#16A36A" },
    { name: "Ăn uống", value: area.monthlyExpenses.food, color: "#F5A623" },
    { name: "Đi lại", value: area.monthlyExpenses.transportation, color: "#3B82F6" },
    { name: "Điện nước & Net", value: area.monthlyExpenses.utilities, color: "#8B5CF6" },
    { name: "Chi phí khác", value: area.monthlyExpenses.other, color: "#98A2B3" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between text-xs text-textSecondary text-left">
          <Link href="/explore" className="flex items-center gap-1.5 text-textMuted hover:text-navy transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách khám phá
          </Link>
          <div className="flex items-center gap-1.5">
            <Badge variant={area.city === "hanoi" ? "secondary" : "info"} size="sm">
              {area.displayCity}
            </Badge>
            <span>/</span>
            <span className="font-bold text-navy">{area.name}</span>
          </div>
        </div>

        {/* Section 1: Area Header */}
        <section className="bg-white rounded-3xl border border-border p-6 lg:p-8 shadow-card text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Thông tin tham chiếu thị trường
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-navy tracking-tight">
                {area.name}
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary max-w-2xl leading-relaxed">
                {area.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pt-2">
                {area.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-background border border-border px-2.5 py-1 rounded-lg text-textSecondary"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Pricing Box */}
            <div className="bg-navy-light/60 p-5 rounded-2xl border border-navy/10 min-w-[260px] space-y-3">
              <div>
                <span className="text-[11px] text-textMuted block">Tổng chi phí sinh hoạt tham chiếu</span>
                <span className="text-2xl font-black text-primary">
                  {formatCurrencyMillion(totalCost)} / tháng
                </span>
              </div>
              <div className="text-xs text-textSecondary border-t border-border/80 pt-2 flex justify-between">
                <span>Giá thuê phòng TB:</span>
                <b className="text-navy">{formatCurrencyMillion(area.rent.average)}</b>
              </div>
              <div className="text-xs text-textSecondary flex justify-between">
                <span>Khoảng giá phổ biến:</span>
                <b>{area.rent.min} - {area.rent.max} tr</b>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Button
                  size="sm"
                  variant={inComparison ? "primary" : "outline"}
                  onClick={() => toggleComparison(area.id)}
                  className="w-full text-xs gap-1.5"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  {inComparison ? "Đã trong so sánh" : "Thêm vào so sánh"}
                </Button>
                <Link href="/contribute">
                  <Button size="sm" variant="secondary" className="text-xs shrink-0" title="Đóng góp trải nghiệm">
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Cost Breakdown & Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-border shadow-card text-left space-y-4">
            <h3 className="text-base font-bold text-navy">Phân bổ chi phí sinh hoạt</h3>
            <p className="text-xs text-textSecondary leading-relaxed">
              Chi tiết các khoản chi tiêu hàng tháng theo số liệu tham chiếu tại khu vực {area.name}:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center p-3 rounded-xl bg-background border border-border/60 text-xs">
                <span className="font-semibold text-navy flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Tiền thuê phòng trọ
                </span>
                <span className="font-bold text-navy">{formatCurrencyMillion(area.rent.average)}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-background border border-border/60 text-xs">
                <span className="font-semibold text-navy flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" /> Tiền ăn uống sinh hoạt
                </span>
                <span className="font-bold text-navy">{formatCurrencyMillion(area.monthlyExpenses.food)}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-background border border-border/60 text-xs">
                <span className="font-semibold text-navy flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Chi phí đi lại (Xăng/Buýt)
                </span>
                <span className="font-bold text-navy">{formatCurrencyMillion(area.monthlyExpenses.transportation)}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-background border border-border/60 text-xs">
                <span className="font-semibold text-navy flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Điện nước &amp; Internet
                </span>
                <span className="font-bold text-navy">{formatCurrencyMillion(area.monthlyExpenses.utilities)}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-background border border-border/60 text-xs">
                <span className="font-semibold text-navy flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#98A2B3]" /> Chi tiêu cá nhân &amp; Khác
                </span>
                <span className="font-bold text-navy">{formatCurrencyMillion(area.monthlyExpenses.other)}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-border shadow-card flex flex-col items-center justify-center">
            <ExpensePieChart data={pieData} title="Tỷ lệ cơ cấu chi tiêu hàng tháng" />
          </div>
        </section>

        {/* Section 3: Living Quality Ratings */}
        <section className="bg-white p-6 lg:p-8 rounded-3xl border border-border shadow-card text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-navy">Chỉ số chất lượng môi trường sống</h3>
              <p className="text-xs text-textSecondary mt-0.5">
                Đánh giá theo thang điểm 5.0 dựa trên khảo sát và dữ liệu phản hồi cư dân
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-textMuted block">Điểm trung bình</span>
              <span className="text-xl font-extrabold text-primary">{overallScore} / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* An ninh */}
            <div className="p-4 rounded-2xl bg-background border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Shield className="w-4 h-4" /> An ninh
              </div>
              <div className="text-xl font-black text-navy">{area.livingScores.safety} / 5.0</div>
              <p className="text-[11px] text-textMuted">Tỷ lệ trật tự, bảo vệ và an toàn đêm khuya</p>
            </div>

            {/* Yên tĩnh */}
            <div className="p-4 rounded-2xl bg-background border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                <Volume2 className="w-4 h-4" /> Độ yên tĩnh
              </div>
              <div className="text-xl font-black text-navy">{area.livingScores.quietness} / 5.0</div>
              <p className="text-[11px] text-textMuted">Ít tiếng ồn công trường và còi xe</p>
            </div>

            {/* Giao thông */}
            <div className="p-4 rounded-2xl bg-background border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                <Navigation className="w-4 h-4" /> Giao thông
              </div>
              <div className="text-xl font-black text-navy">{area.livingScores.trafficConvenience} / 5.0</div>
              <p className="text-[11px] text-textMuted">Thuận tiện bắt xe buýt, tàu điện và đường lớn</p>
            </div>

            {/* Môi trường */}
            <div className="p-4 rounded-2xl bg-background border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <Trees className="w-4 h-4" /> Môi trường
              </div>
              <div className="text-xl font-black text-navy">{area.livingScores.environment} / 5.0</div>
              <p className="text-[11px] text-textMuted">Cây xanh, không khí và vệ sinh đường phố</p>
            </div>

            {/* Nguy cơ ngập */}
            <div className="p-4 rounded-2xl bg-background border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
                <Droplets className="w-4 h-4" /> Nguy cơ ngập
              </div>
              <div className="text-xl font-black text-navy">{area.livingScores.floodRisk} / 5.0</div>
              <p className="text-[11px] text-textMuted">Điểm cao = Nguy cơ ngập nước/triều cường cao</p>
            </div>
          </div>
        </section>

        {/* Section 4: Map & Amenities */}
        <section className="bg-white p-6 lg:p-8 rounded-3xl border border-border shadow-card text-left space-y-6">
          <div>
            <h3 className="text-base font-bold text-navy">Bản đồ vị trí &amp; Tiện ích xung quanh</h3>
            <p className="text-xs text-textSecondary mt-0.5">
              Khảo sát các điểm tiện ích thiết yếu trong bán kính 1 - 2 km quanh khu vực {area.name}
            </p>
          </div>

          <div className="h-[400px] rounded-2xl overflow-hidden border border-border">
            <MapContainerWrapper
              areas={[area]}
              center={[area.latitude, area.longitude]}
              zoom={13}
              showHeatmap={false}
              showAmenities={true}
              amenities={areaAmenities}
              height="400px"
            />
          </div>

          {/* Amenities Filter & List */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { label: "Tất cả tiện ích", value: "all" },
                { label: "Quán ăn", value: "restaurant" },
                { label: "Quán bình dân", value: "affordableFood" },
                { label: "Siêu thị", value: "supermarket" },
                { label: "Chợ dân sinh", value: "market" },
                { label: "Bệnh viện", value: "hospital" },
                { label: "Trạm buýt", value: "busStop" },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedAmenityCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    selectedAmenityCategory === cat.value
                      ? "bg-navy text-white shadow-sm"
                      : "bg-background text-textSecondary hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAmenities.map((am) => (
                <AmenityCard key={am.id} item={am} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Community Reviews */}
        <section className="bg-white p-6 lg:p-8 rounded-3xl border border-border shadow-card text-left space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy">Nhận xét cư dân ({areaReviews.length})</h3>
              <p className="text-xs text-textMuted mt-0.5">Những đánh giá thực tế đã qua kiểm duyệt</p>
            </div>
            <Link href="/contribute">
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <PlusCircle className="w-3.5 h-3.5 text-primary" /> Viết đánh giá
              </Button>
            </Link>
          </div>

          {areaReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {areaReviews.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-background rounded-2xl border border-dashed border-border text-xs text-textMuted">
              Khu vực này hiện chưa có đánh giá công khai. Hãy là người đầu tiên chia sẻ trải nghiệm!
            </div>
          )}
        </section>

        {/* Section 6: Related Areas */}
        <section className="text-left space-y-4">
          <h3 className="text-lg font-bold text-navy">Khu vực tương tự tại {area.displayCity}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedAreas.map((item) => (
              <AreaCard key={item.id} area={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
