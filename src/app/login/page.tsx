"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { ShieldCheck, Compass, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("staywise2026");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-textPrimary">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-left max-w-md mx-auto w-full">
        <div className="bg-white p-8 rounded-3xl border border-border shadow-card w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-2">
              <Compass className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-navy tracking-tight">Đăng nhập Quản trị</h1>
            <p className="text-xs text-textSecondary">
              Chế độ truy cập mô phỏng bảng điều khiển StayWise Admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Tài khoản Quản trị"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />

            <Input
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button type="submit" size="md" className="w-full gap-2">
              Vào trang Quản trị <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="p-3.5 bg-background rounded-xl border border-border/80 text-[11px] text-textMuted leading-relaxed">
            <span className="font-bold text-navy flex items-center gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Lưu ý phiên bản Demo:
            </span>
            Ứng dụng vận hành theo mô hình Client-first cục bộ, không gửi thông tin tài khoản qua mạng bên ngoài. Bấm đăng nhập để vào ngay trang quản trị.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
