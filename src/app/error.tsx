"use client";

import React from "react";
import { Button } from "@/components/common/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-danger-light text-danger flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-navy">Đã xảy ra sự cố hiển thị</h3>
      <p className="text-xs text-textSecondary mt-2 mb-5">
        {error.message || "Hệ thống gặp lỗi không mong muốn khi tải dữ liệu. Vui lòng thử tải lại trang."}
      </p>
      <Button onClick={reset} size="sm" className="gap-2">
        <RotateCcw className="w-4 h-4" /> Tải lại nội dung
      </Button>
    </div>
  );
}
