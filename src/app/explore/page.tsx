"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AreaCard } from "@/components/cards/AreaCard";
import { AreaFilterForm, FilterState } from "@/components/forms/AreaFilterForm";
import { MapContainerWrapper, HeatmapMode } from "@/components/map/MapContainerWrapper";
import { EmptyState } from "@/components/common/EmptyState";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { useStore } from "@/hooks/useStore";
import { Area } from "@/types/area";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { calculateOverallLivingScore } from "@/lib/calculations/scores";
import { SEED_AMENITIES } from "@/data/amenities";
import { MapPin, SlidersHorizontal, Map, List, Layers } from "lucide-react";
import { Drawer } from "@/components/common/Drawer";

export default function ExplorePage() {
  const { areas } = useStore();

  const [filters, setFilters] = useState<FilterState>({
    city: "all",
    maxRent: 7.5,
    maxTotalCost: 15.0,
    minSafety: 1.0,
    minQuietness: 1.0,
    maxFloodRisk: 5.0,
  });

  const [sortBy, setSortBy] = useState<"lowestCost" | "lowestRent" | "highestScore">("lowestCost");
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>("totalCost");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showAmenities, setShowAmenities] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"list" | "map">("list");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Lọc và sắp xếp danh sách khu vực
  const filteredAreas = useMemo(() => {
    return areas
      .filter((area) => {
        if (filters.city !== "all" && area.city !== filters.city) return false;
        if (area.rent.average > filters.maxRent) return false;

        const totalCost = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
        if (totalCost > filters.maxTotalCost) return false;

        if (area.livingScores.safety < filters.minSafety) return false;
        if (area.livingScores.quietness < filters.minQuietness) return false;
        if (area.livingScores.floodRisk > filters.maxFloodRisk) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "lowestCost") {
          return (
            calculateAreaTotalCost(a.rent.average, a.monthlyExpenses) -
            calculateAreaTotalCost(b.rent.average, b.monthlyExpenses)
          );
        }
        if (sortBy === "lowestRent") {
          return a.rent.average - b.rent.average;
        }
        if (sortBy === "highestScore") {
          return (
            calculateOverallLivingScore(b.livingScores) -
            calculateOverallLivingScore(a.livingScores)
          );
        }
        return 0;
      });
  }, [areas, filters, sortBy]);

  const handleResetFilters = () => {
    setFilters({
      city: "all",
      maxRent: 7.5,
      maxTotalCost: 15.0,
      minSafety: 1.0,
      minQuietness: 1.0,
      maxFloodRisk: 5.0,
    });
  };

  const handleSelectArea = (area: Area) => {
    setSelectedAreaId(area.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border text-left">
          <div>
            <h1 className="text-2xl font-black text-navy tracking-tight">Khám phá khu vực &amp; Bản đồ</h1>
            <p className="text-xs text-textSecondary mt-1">
              Tìm kiếm khu vực sống tối ưu qua trực quan hóa không gian và bộ lọc đa tiêu chí
            </p>
          </div>

          {/* Quick controls bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden text-xs gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Bộ lọc
            </Button>

            {/* Mobile View Toggle */}
            <div className="flex lg:hidden bg-white rounded-xl border border-border p-1">
              <button
                onClick={() => setMobileTab("list")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  mobileTab === "list" ? "bg-primary text-white" : "text-textSecondary"
                }`}
              >
                <List className="w-3.5 h-3.5" /> Danh sách
              </button>
              <button
                onClick={() => setMobileTab("map")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  mobileTab === "map" ? "bg-primary text-white" : "text-textSecondary"
                }`}
              >
                <Map className="w-3.5 h-3.5" /> Bản đồ
              </button>
            </div>
          </div>
        </div>

        {/* Map Top Controls Bar */}
        <div className="my-4 bg-white p-3 rounded-2xl border border-border shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-navy flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-primary" /> Lớp Heatmap:
            </span>
            <select
              value={heatmapMode}
              onChange={(e) => setHeatmapMode(e.target.value as HeatmapMode)}
              className="rounded-lg border border-border px-2.5 py-1 text-xs text-navy focus:outline-none"
            >
              <option value="totalCost">Tổng chi phí sinh hoạt</option>
              <option value="rent">Giá thuê phòng TB</option>
              <option value="food">Chi phí ăn uống</option>
              <option value="transport">Chi phí đi lại</option>
              <option value="environment">Chất lượng môi trường</option>
              <option value="flood">Nguy cơ ngập lụt</option>
            </select>

            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-2.5 py-1 rounded-lg border font-medium ${
                showHeatmap
                  ? "bg-primary-light text-primary border-primary/30"
                  : "bg-gray-100 text-textMuted border-border"
              }`}
            >
              {showHeatmap ? "Bật Heatmap" : "Tắt Heatmap"}
            </button>

            <button
              onClick={() => setShowAmenities(!showAmenities)}
              className={`px-2.5 py-1 rounded-lg border font-medium ${
                showAmenities
                  ? "bg-info-light text-info border-info/30"
                  : "bg-gray-100 text-textMuted border-border"
              }`}
            >
              {showAmenities ? "Hiện tiện ích" : "Ẩn tiện ích"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-textSecondary">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-border px-2.5 py-1 text-xs text-navy focus:outline-none"
            >
              <option value="lowestCost">Tổng chi phí thấp nhất</option>
              <option value="lowestRent">Giá thuê thấp nhất</option>
              <option value="highestScore">Chất lượng sống cao nhất</option>
            </select>
          </div>
        </div>

        {/* Main Grid: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Left Sidebar: Filters */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <AreaFilterForm
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
            />

            <div className="p-4 bg-primary-light/50 rounded-2xl border border-primary/20 text-left text-xs text-navy">
              <span className="font-bold block mb-1">Mẹo tìm kiếm:</span>
              Click vào một Marker trên bản đồ hoặc bấm &quot;Xem vị trí&quot; ở từng thẻ khu vực để định vị nhanh trên không gian đô thị.
            </div>
          </div>

          {/* Right Main Area: Map & Area Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Map (Hidden on mobile if user chose 'list' tab) */}
            <div className={`${mobileTab === "list" ? "hidden lg:block" : "block"}`}>
              <MapContainerWrapper
                areas={filteredAreas}
                selectedAreaId={selectedAreaId}
                onSelectArea={handleSelectArea}
                heatmapMode={heatmapMode}
                showHeatmap={showHeatmap}
                showAmenities={showAmenities}
                amenities={SEED_AMENITIES}
                height="480px"
              />
            </div>

            {/* List (Hidden on mobile if user chose 'map' tab) */}
            <div className={`${mobileTab === "map" ? "hidden lg:block" : "block"} space-y-4`}>
              <div className="flex items-center justify-between text-xs text-textSecondary text-left">
                <span>
                  Hiển thị <b>{filteredAreas.length}</b> khu vực phù hợp
                </span>
                {filters.city !== "all" && (
                  <span className="font-semibold text-primary">
                    Thành phố: {filters.city === "hanoi" ? "Hà Nội" : "TP.HCM"}
                  </span>
                )}
              </div>

              {filteredAreas.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredAreas.map((area) => (
                    <AreaCard
                      key={area.id}
                      area={area}
                      onSelectOnMap={() => {
                        setSelectedAreaId(area.id);
                        setMobileTab("map");
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Không tìm thấy khu vực phù hợp"
                  description="Hãy thử nới lỏng mức ngân sách hoặc hạ bớt tiêu chí an ninh, ngập lụt để xem thêm khu vực khác."
                  actionText="Đặt lại bộ lọc"
                  onAction={handleResetFilters}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <Drawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          title="Bộ lọc khu vực"
          side="bottom"
        >
          <AreaFilterForm
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />
          <div className="pt-4">
            <Button className="w-full" onClick={() => setIsFilterDrawerOpen(false)}>
              Xem {filteredAreas.length} kết quả
            </Button>
          </div>
        </Drawer>
      </main>

      <Footer />
    </div>
  );
}
