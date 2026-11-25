"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContributionForm } from "@/components/forms/ContributionForm";
import { ContributionFormData } from "@/lib/validation/contribution";
import { Badge } from "@/components/common/Badge";
import { useStore } from "@/hooks/useStore";
import { useToast } from "@/hooks/useToast";
import { formatDateVN } from "@/lib/formatting/date";
import { PlusCircle, Clock, CheckCircle2, XCircle, ArrowLeft, Shield } from "lucide-react";

export default function ContributePage() {
  const { areas, contributions, submitContribution } = useStore();
  const { success } = useToast();

  const handleFormSubmit = (data: ContributionFormData) => {
    submitContribution({
      authorName: data.authorName,
      areaId: data.areaId,
      category: data.category,
      rating: data.rating,
      content: data.content,
    });

    success(
      "Gửi đóng góp thành công!",
      "Nội dung của bạn đã được ghi nhận vào hàng đợi kiểm duyệt (Pending)."
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation */}
        <div className="text-left">
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-navy transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Bảng tin cộng đồng
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" /> Xây dựng cơ sở dữ liệu mở
            </span>
          </div>
          <h1 className="text-3xl font-black text-navy tracking-tight mt-1">Đóng góp trải nghiệm khu vực</h1>
          <p className="text-xs sm:text-sm text-textSecondary mt-1 leading-relaxed">
            Chia sẻ chân thực về giá phòng trọ, tiền điện nước, mức độ an ninh hoặc tình trạng ngập nước giúp cộng đồng sinh viên và người đi làm đưa ra quyết định chính xác hơn.
          </p>
        </div>

        {/* Contribution Form */}
        <ContributionForm areas={areas} onSubmitSuccess={handleFormSubmit} />

        {/* Local Submission History */}
        <section className="bg-white rounded-2xl border border-border p-6 shadow-card text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-navy">Lịch sử đóng góp trên thiết bị này</h3>
              <p className="text-xs text-textMuted mt-0.5">
                Dữ liệu được lưu trong LocalStorage của trình duyệt và cập nhật theo thời gian thực
              </p>
            </div>
            <Link href="/admin/contributions" className="text-xs font-semibold text-primary hover:underline">
              Mở trang duyệt Admin &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {contributions.map((item) => {
              const area = areas.find((a) => a.id === item.areaId);

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-background border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy">{item.authorName}</span>
                      <span className="text-textMuted">•</span>
                      <span className="text-primary font-semibold">
                        {area?.name || item.areaId} ({area?.displayCity})
                      </span>
                    </div>
                    <p className="text-textSecondary line-clamp-1">{item.content}</p>
                    <span className="text-[10px] text-textMuted block">
                      Gửi lúc: {formatDateVN(item.createdAt)}
                    </span>
                  </div>

                  <div className="shrink-0">
                    {item.status === "pending" && (
                      <Badge variant="warning" size="sm" className="gap-1">
                        <Clock className="w-3 h-3" /> Chờ Admin duyệt
                      </Badge>
                    )}
                    {item.status === "approved" && (
                      <Badge variant="success" size="sm" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã phê duyệt
                      </Badge>
                    )}
                    {item.status === "rejected" && (
                      <Badge variant="danger" size="sm" className="gap-1">
                        <XCircle className="w-3 h-3" /> Bị từ chối
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
