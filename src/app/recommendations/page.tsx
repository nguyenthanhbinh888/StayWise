"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PreferenceForm } from "@/components/forms/PreferenceForm";
import { RecommendationCard } from "@/components/cards/RecommendationCard";
import { EmptyState } from "@/components/common/EmptyState";
import { useStore } from "@/hooks/useStore";
import { RecommendationPreferences } from "@/types/recommendation";
import { SEED_DESTINATIONS } from "@/data/destinations";
import { recommendAreas } from "@/lib/recommendations/engine";
import { Sparkles, BarChart2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function RecommendationsPage() {
  const { areas } = useStore();

  const [preferences, setPreferences] = useState<RecommendationPreferences>({
    city: "hanoi",
    monthlyBudget: 10.0,
    maximumRent: 4.5,
    destination: {
      label: "Đại học Quốc gia Hà Nội (Cầu Giấy)",
      latitude: 21.037,
      longitude: 105.782,
    },
    maximumDistanceKm: 12,
    priorities: {
      affordableCost: 40,
      commute: 25,
      amenities: 15,
      environment: 20,
    },
  });

  const [hasCalculated, setHasCalculated] = useState(true);

  const recommendations = useMemo(() => {
    return recommendAreas(areas, preferences);
  }, [areas, preferences]);

  const chartData = useMemo(() => {
    return recommendations.slice(0, 5).map((rec) => {
      const area = areas.find((a) => a.id === rec.areaId);
      return {
        name: area?.name || rec.areaId,
        "Điểm phù hợp": rec.totalScore,
        "Tổng chi phí": rec.totalEstimatedCost,
      };
    });
  }, [recommendations, areas]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title */}
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Thuật toán tối ưu hóa đa mục tiêu
            </span>
          </div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Gợi ý khu vực sống tối ưu</h1>
          <p className="text-xs sm:text-sm text-textSecondary max-w-2xl leading-relaxed">
            Hệ thống phân tích định lượng dựa trên ngân sách cá nhân, địa điểm học tập/làm việc và các chỉ số môi trường sống để đề xuất nơi ở phù hợp nhất.
          </p>
        </div>

        {/* 2 Columns: Preference Form & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-5">
            <PreferenceForm
              preferences={preferences}
              destinations={SEED_DESTINATIONS}
              onChange={setPreferences}
              onSubmit={() => setHasCalculated(true)}
            />
          </div>

          {/* Result List & Analysis */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-bold text-navy">
                Kết quả xếp hạng ({recommendations.length} khu vực)
              </h3>
              <span className="text-xs text-textMuted">
                Ưu tiên cao nhất xếp trên cùng
              </span>
            </div>

            {recommendations.length > 0 ? (
              <>
                <div className="space-y-4">
                  {recommendations.map((item) => {
                    const area = areas.find((a) => a.id === item.areaId);
                    if (!area) return null;
                    return (
                      <RecommendationCard
                        key={item.areaId}
                        item={item}
                        area={area}
                      />
                    );
                  })}
                </div>

                {/* Score Comparison Chart */}
                <div className="bg-white p-6 rounded-2xl border border-border shadow-card mt-8">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-navy uppercase tracking-wider">
                    <BarChart2 className="w-4 h-4 text-primary" /> So sánh điểm số Top 5 khu vực
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#182230" }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#667085" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            borderColor: "#E5EAF0",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="Điểm phù hợp" fill="#16A36A" radius={[6, 6, 0, 0]} barSize={28} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState
                title="Chưa có khu vực thỏa mãn tất cả tiêu chí"
                description="Bạn có thể tăng ngân sách tối đa hoặc nới rộng cự ly di chuyển để nhận thêm đề xuất."
                actionText="Khôi phục tiêu chí mặc định"
                onAction={() =>
                  setPreferences({
                    city: "hanoi",
                    monthlyBudget: 12.0,
                    maximumRent: 5.0,
                    destination: {
                      label: "Đại học Quốc gia Hà Nội (Cầu Giấy)",
                      latitude: 21.037,
                      longitude: 105.782,
                    },
                    maximumDistanceKm: 15,
                    priorities: {
                      affordableCost: 40,
                      commute: 25,
                      amenities: 15,
                      environment: 20,
                    },
                  })
                }
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
