"use client";

import React from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { StatCard } from "@/components/cards/StatCard";
import { AdminTrendLineChart } from "@/components/charts/AdminTrendLineChart";
import { Button } from "@/components/common/Button";
import { useStore } from "@/hooks/useStore";
import {
  Building,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function AdminOverviewPage() {
  const { areas, contributions } = useStore();

  const totalAreas = areas.length;
  const totalContributions = contributions.length;
  const pendingCount = contributions.filter((c) => c.status === "pending").length;
  const approvedCount = contributions.filter((c) => c.status === "approved").length;
  const rejectedCount = contributions.filter((c) => c.status === "rejected").length;

  const trendData = [
    { date: "15/11", contributions: 12, approved: 10 },
    { date: "16/11", contributions: 18, approved: 15 },
    { date: "17/11", contributions: 14, approved: 12 },
    { date: "18/11", contributions: 22, approved: 19 },
    { date: "19/11", contributions: 25, approved: 22 },
    { date: "20/11", contributions: 30, approved: 26 },
    { date: "21/11", contributions: 28, approved: 24 },
    { date: "22/11", contributions: totalContributions, approved: approvedCount },
  ];

  return (
    <div className="flex-1 flex flex-col text-left">
      <AdminHeader
        title="Tổng quan Quản trị Hệ thống"
        subtitle="Theo dõi biến động dữ liệu khu vực và hàng đợi kiểm duyệt cộng đồng"
      />

      <main className="p-6 lg:p-8 space-y-8 max-w-7xl">
        {/* KPI Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Tổng khu vực"
            value={`${totalAreas}`}
            subtitle="Đang quản lý"
            icon={Building}
            variant="navy"
          />
          <StatCard
            title="Tổng đóng góp"
            value={`${totalContributions}`}
            subtitle="Từ người dùng"
            icon={MessageSquare}
            variant="primary"
          />
          <StatCard
            title="Đang chờ duyệt"
            value={`${pendingCount}`}
            subtitle="Cần xử lý ngay"
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Đã phê duyệt"
            value={`${approvedCount}`}
            subtitle="Hiển thị công khai"
            icon={CheckCircle2}
            variant="primary"
          />
          <StatCard
            title="Bị từ chối"
            value={`${rejectedCount}`}
            subtitle="Spam / Sai lệch"
            icon={XCircle}
            variant="warning"
          />
        </section>

        {/* Charts & Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-border shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy">Xu hướng gửi đóng góp &amp; Phê duyệt</h3>
                <p className="text-xs text-textSecondary mt-0.5">Số lượt ghi nhận qua các ngày gần nhất</p>
              </div>
            </div>
            <AdminTrendLineChart data={trendData} />
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-border shadow-card space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-navy">Hàng đợi kiểm duyệt</h3>
              <p className="text-xs text-textSecondary mt-0.5">
                Hiện có <b className="text-warning font-bold">{pendingCount}</b> bài đóng góp đang chờ bạn phê duyệt.
              </p>

              <div className="mt-4 p-4 rounded-xl bg-background border border-border/80 space-y-2 text-xs">
                <span className="font-semibold text-navy block">Quy trình duyệt:</span>
                <p className="text-textSecondary leading-relaxed text-[11px]">
                  1. Kiểm tra tính xác thực về giá phòng và điện nước.<br />
                  2. Từ chối ngay nếu có dấu hiệu spam link quảng cáo.<br />
                  3. Sau khi bấm &quot;Duyệt&quot;, nội dung sẽ hiển thị ngay lập tức trên trang Cộng đồng.
                </p>
              </div>
            </div>

            <Link href="/admin/contributions">
              <Button className="w-full gap-2 text-xs" size="md">
                Chuyển tới trang Kiểm duyệt <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
