"use client";

import React from "react";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Button } from "@/components/common/Button";
import { useStore } from "@/hooks/useStore";
import { useToast } from "@/hooks/useToast";
import { exportAreasToCSV } from "@/lib/export/csv";
import { FileDown, FileSpreadsheet, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

export default function AdminReportsPage() {
  const { areas, contributions } = useStore();
  const { success } = useToast();

  const totalContributions = contributions.length;
  const approvedCount = contributions.filter((c) => c.status === "approved").length;
  const rejectedCount = contributions.filter((c) => c.status === "rejected").length;

  const approvalRate =
    totalContributions > 0 ? Math.round((approvedCount / totalContributions) * 100) : 0;

  const handleExportCSV = () => {
    exportAreasToCSV(areas);
    success("Đã xuất file báo cáo!", "Tập tin StayWise_Areas_Report.csv đã được tạo và tải xuống.");
  };

  return (
    <div className="flex-1 flex flex-col text-left">
      <AdminHeader
        title="Báo cáo &amp; Xuất dữ liệu"
        subtitle="Tổng hợp chất lượng dữ liệu và xuất tập tin bảng tính phục vụ phân tích ngoại tuyến"
      />

      <main className="p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* CSV Export Banner */}
        <section className="bg-gradient-to-r from-navy to-navy-dark text-white p-8 rounded-3xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" /> Xuất dữ liệu bảng tính
            </div>
            <h2 className="text-2xl font-black tracking-tight">Xuất báo cáo 10 khu vực ra file CSV</h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Tập tin xuất ra bao gồm đầy đủ tọa độ, giá thuê, 4 khoản sinh hoạt phí chi tiết, tổng chi phí tính toán và 5 chỉ số chất lượng môi trường sống. Định dạng UTF-8 tương thích tốt với Microsoft Excel và Google Sheets.
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleExportCSV}
            className="gap-2 shadow-lg shrink-0"
          >
            <FileDown className="w-4 h-4" /> Tải về CSV ngay
          </Button>
        </section>

        {/* Quality Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-card space-y-2">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">Tỷ lệ phê duyệt</span>
            <div className="text-3xl font-black text-primary">{approvalRate}%</div>
            <span className="text-xs text-textSecondary flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {approvedCount} bài đóng góp đã duyệt
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-card space-y-2">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">Tỷ lệ từ chối</span>
            <div className="text-3xl font-black text-danger">
              {totalContributions > 0 ? 100 - approvalRate : 0}%
            </div>
            <span className="text-xs text-textSecondary flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-danger" /> {rejectedCount} bài spam / không phù hợp
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-card space-y-2">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">Mức độ hoàn thiện</span>
            <div className="text-3xl font-black text-navy">100%</div>
            <span className="text-xs text-textSecondary flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-info" /> Đầy đủ thông số cả 10 khu vực
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
