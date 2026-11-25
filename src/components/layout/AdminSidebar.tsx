"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  CheckSquare,
  FileSpreadsheet,
  ArrowLeft,
  Compass,
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Tổng quan Admin", icon: LayoutDashboard },
    { href: "/admin/areas", label: "Quản lý khu vực", icon: MapPin },
    { href: "/admin/contributions", label: "Duyệt đóng góp", icon: CheckSquare },
    { href: "/admin/reports", label: "Báo cáo & Xuất CSV", icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-64 bg-navy text-white flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-navy-dark">
      <div>
        {/* Logo Admin */}
        <div className="p-6 border-b border-navy-dark">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight block">
                StayWise <span className="text-primary font-normal text-xs">Admin</span>
              </span>
              <span className="text-[10px] text-slate-400 block">Quản trị mô phỏng</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-navy-dark"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Web Link */}
      <div className="p-4 border-t border-navy-dark">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-navy-dark"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang người dùng
        </Link>
      </div>
    </aside>
  );
};
