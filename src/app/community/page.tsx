"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/hooks/useStore";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/common/Badge";
import { formatDateVN } from "@/lib/formatting/date";
import {
  Users,
  PlusCircle,
  ShieldCheck,
  Star,
  MessageSquare,
  Building,
  Filter,
} from "lucide-react";

export default function CommunityPage() {
  const { areas, contributions } = useStore();

  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedAreaId, setSelectedAreaId] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "highestRating">("newest");

  // Chỉ lấy các đóng góp có trạng thái "approved"
  const approvedContributions = useMemo(() => {
    return contributions.filter((c) => c.status === "approved");
  }, [contributions]);

  const filteredList = useMemo(() => {
    return approvedContributions
      .filter((c) => {
        const area = areas.find((a) => a.id === c.areaId);
        if (selectedCity !== "all" && area?.city !== selectedCity) return false;
        if (selectedAreaId !== "all" && c.areaId !== selectedAreaId) return false;
        if (selectedCategory !== "all" && c.category !== selectedCategory) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "highestRating") return b.rating - a.rating;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [approvedContributions, areas, selectedCity, selectedAreaId, selectedCategory, sortBy]);

  // Thống kê
  const totalApproved = approvedContributions.length;
  const uniqueAreasWithReviews = new Set(approvedContributions.map((c) => c.areaId)).size;
  const avgRating =
    totalApproved > 0
      ? Math.round(
          (approvedContributions.reduce((acc, c) => acc + c.rating, 0) / totalApproved) * 10
        ) / 10
      : 5.0;

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title & Stats Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Bảng tin cộng đồng
              </span>
            </div>
            <h1 className="text-3xl font-black text-navy tracking-tight">Kinh nghiệm sinh sống thực tế</h1>
            <p className="text-xs sm:text-sm text-textSecondary mt-1">
              Khám phá các nhận xét, cảnh báo ngập lụt, an ninh và giá cả thực tế từ chính cư dân
            </p>
          </div>

          <Link href="/contribute">
            <Button size="md" className="gap-2 shadow-sm">
              <PlusCircle className="w-4 h-4" /> Đóng góp đánh giá mới
            </Button>
          </Link>
        </div>

        {/* 3 Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-5 bg-white rounded-2xl border border-border shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-navy block">{totalApproved}</span>
              <span className="text-xs text-textSecondary">Đánh giá đã kiểm duyệt</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-border shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-navy-light text-navy flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-navy block">{uniqueAreasWithReviews} / {areas.length}</span>
              <span className="text-xs text-textSecondary">Khu vực có dữ liệu cộng đồng</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-border shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning-light text-warning flex items-center justify-center">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <span className="text-2xl font-black text-navy block">{avgRating} / 5.0</span>
              <span className="text-xs text-textSecondary">Mức độ hài lòng bình quân</span>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs text-left">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <span className="font-semibold text-navy flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-primary" /> Lọc theo:
            </span>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-navy focus:outline-none"
            >
              <option value="all">Tất cả thành phố</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
            </select>

            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-navy focus:outline-none"
            >
              <option value="all">Tất cả khu vực</option>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-navy focus:outline-none"
            >
              <option value="all">Tất cả chủ đề</option>
              <option value="general">Tổng quan trải nghiệm</option>
              <option value="security">An ninh</option>
              <option value="quietness">Độ yên tĩnh</option>
              <option value="flooding">Ngập lụt</option>
              <option value="traffic">Giao thông</option>
              <option value="utilities">Giá điện nước</option>
              <option value="rental">Giá thuê phòng</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-textSecondary">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-navy focus:outline-none"
            >
              <option value="newest">Mới nhất</option>
              <option value="highestRating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Review Feed */}
        <div className="space-y-4 text-left">
          {filteredList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredList.map((item) => {
                const area = areas.find((a) => a.id === item.areaId);

                return (
                  <div
                    key={item.id}
                    className="p-6 bg-white rounded-2xl border border-border shadow-card space-y-3 relative hover:shadow-card-hover transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-navy">{item.authorName}</h4>
                          <Badge variant="success" size="sm" className="text-[10px]">
                            Đã duyệt
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-textMuted mt-1">
                          <span className="font-semibold text-primary">
                            Khu vực: {area?.name || item.areaId} ({area?.displayCity})
                          </span>
                          <span>•</span>
                          <span>{formatDateVN(item.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold">{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-textSecondary leading-relaxed">{item.content}</p>

                    <div className="pt-2 border-t border-border/50 flex justify-between items-center text-[11px]">
                      <span className="text-textMuted capitalize">Chủ đề: {item.category}</span>
                      {area && (
                        <Link
                          href={`/areas/${area.slug}`}
                          className="text-primary hover:underline font-semibold"
                        >
                          Xem khu vực &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Chưa có đánh giá nào thỏa mãn bộ lọc"
              description="Hãy thử chọn lại thành phố hoặc chủ đề khác để hiển thị thêm nhận xét từ cư dân."
              actionText="Xem tất cả nhận xét"
              onAction={() => {
                setSelectedCity("all");
                setSelectedAreaId("all");
                setSelectedCategory("all");
              }}
            />
          )}
        </div>

        {/* Data Trust Commitment Box */}
        <section className="bg-navy-light/60 p-6 rounded-3xl border border-navy/10 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary" /> Tiêu chuẩn tin cậy dữ liệu cộng đồng (Data Trust)
          </div>
          <p className="text-xs text-textSecondary leading-relaxed">
            Để bảo vệ người tìm trọ khỏi các thông tin sai lệch hoặc quảng cáo giả mạo, mọi đóng góp gửi lên StayWise đều phải qua bộ phận kiểm duyệt của quản trị viên (Admin Moderation). Các nội dung vi phạm hoặc spam sẽ bị từ chối và không hiển thị công khai.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
