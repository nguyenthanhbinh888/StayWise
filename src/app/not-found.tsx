"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/common/Button";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-navy tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-navy mt-2">Không tìm thấy trang yêu cầu</h2>
        <p className="text-xs text-textSecondary mt-2 leading-relaxed">
          Khu vực hoặc đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật lại vị trí trên bản đồ.
        </p>
        <div className="flex gap-3 mt-6">
          <Link href="/">
            <Button size="sm" variant="secondary" className="gap-2">
              <Home className="w-4 h-4" /> Về trang chủ
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="sm" className="gap-2">
              <Compass className="w-4 h-4" /> Khám phá bản đồ
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
