"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useStore } from "@/hooks/useStore";
import { useToast } from "@/hooks/useToast";
import { formatDateVN } from "@/lib/formatting/date";
import { Check, X, Star, Filter, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function AdminContributionsPage() {
  const { areas, contributions, approveContribution, rejectContribution } = useStore();
  const { success, warning } = useToast();

  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredList = contributions.filter((c) => {
    if (activeTab !== "all" && c.status !== activeTab) return false;
    if (selectedCategory !== "all" && c.category !== selectedCategory) return false;
    return true;
  });

  const handleApprove = (id: string, author: string) => {
    approveContribution(id);
    success("Đã phê duyệt đóng góp!", `Đánh giá của ${author} đã xuất hiện trên trang Cộng đồng.`);
  };

  const handleReject = (id: string, author: string) => {
    rejectContribution(id);
    warning("Đã từ chối đóng góp!", `Nội dung của ${author} đã được đánh dấu Bị từ chối.`);
  };

  return (
    <div className="flex-1 flex flex-col text-left">
      <AdminHeader
        title="Kiểm duyệt Đóng góp Cộng đồng"
        subtitle="Xét duyệt các đánh giá thực tế về giá phòng, ngập lụt và an ninh từ người dùng"
      />

      <main className="p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Filter & Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-border">
            {[
              { id: "pending", label: "Chờ duyệt", count: contributions.filter((c) => c.status === "pending").length },
              { id: "approved", label: "Đã duyệt", count: contributions.filter((c) => c.status === "approved").length },
              { id: "rejected", label: "Từ chối", count: contributions.filter((c) => c.status === "rejected").length },
              { id: "all", label: "Tất cả", count: contributions.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-textSecondary hover:text-navy hover:bg-background"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-textMuted"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-textSecondary flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Chủ đề:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-navy focus:outline-none"
            >
              <option value="all">Tất cả chủ đề</option>
              <option value="general">Tổng quan</option>
              <option value="security">An ninh</option>
              <option value="quietness">Độ yên tĩnh</option>
              <option value="flooding">Ngập lụt</option>
              <option value="traffic">Giao thông</option>
              <option value="utilities">Điện nước</option>
              <option value="rental">Giá phòng</option>
            </select>
          </div>
        </div>

        {/* Contributions List Table */}
        <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-background border-b border-border text-textSecondary uppercase tracking-wider font-semibold">
                  <th className="p-4 text-left">Người gửi &amp; Ngày</th>
                  <th className="p-4 text-left">Khu vực</th>
                  <th className="p-4 text-left">Chủ đề</th>
                  <th className="p-4 text-center">Đánh giá</th>
                  <th className="p-4 text-left min-w-[260px]">Nội dung chia sẻ</th>
                  <th className="p-4 text-center">Trạng thái</th>
                  <th className="p-4 text-right">Kiểm duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-navy">
                {filteredList.length > 0 ? (
                  filteredList.map((item) => {
                    const area = areas.find((a) => a.id === item.areaId);

                    return (
                      <tr key={item.id} className="hover:bg-background/60 transition-colors">
                        <td className="p-4">
                          <span className="font-bold block">{item.authorName}</span>
                          <span className="text-[10px] text-textMuted">{formatDateVN(item.createdAt)}</span>
                        </td>

                        <td className="p-4 font-semibold text-primary">
                          {area?.name || item.areaId}
                          <span className="text-[10px] text-textMuted block font-normal">{area?.displayCity}</span>
                        </td>

                        <td className="p-4 capitalize">
                          <span className="bg-background px-2 py-1 rounded-md text-[11px] font-medium border border-border">
                            {item.category}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {item.rating}
                          </span>
                        </td>

                        <td className="p-4 text-textSecondary leading-relaxed">
                          {item.content}
                        </td>

                        <td className="p-4 text-center">
                          {item.status === "pending" && (
                            <Badge variant="warning" size="sm" className="gap-1">
                              <Clock className="w-3 h-3" /> Chờ duyệt
                            </Badge>
                          )}
                          {item.status === "approved" && (
                            <Badge variant="success" size="sm" className="gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Đã duyệt
                            </Badge>
                          )}
                          {item.status === "rejected" && (
                            <Badge variant="danger" size="sm" className="gap-1">
                              <XCircle className="w-3 h-3" /> Bị từ chối
                            </Badge>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {item.status !== "approved" && (
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleApprove(item.id, item.authorName)}
                                className="text-[11px] px-2.5 py-1 min-h-[30px] gap-1"
                              >
                                <Check className="w-3 h-3" /> Duyệt
                              </Button>
                            )}
                            {item.status !== "rejected" && (
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleReject(item.id, item.authorName)}
                                className="text-[11px] px-2.5 py-1 min-h-[30px] gap-1"
                              >
                                <X className="w-3 h-3" /> Từ chối
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-xs text-textMuted">
                      Không có đóng góp nào trong danh mục này.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
