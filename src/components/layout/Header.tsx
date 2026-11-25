"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Calculator,
  Sparkles,
  GitCompare,
  Users,
  BarChart3,
  ShieldAlert,
  Menu,
  PlusCircle,
} from "lucide-react";
import { MobileNav } from "./MobileNav";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/common/Button";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { comparisonIds } = useStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/explore", label: "Khám phá", icon: Compass },
    { href: "/calculator", label: "Tính chi phí", icon: Calculator },
    { href: "/recommendations", label: "Gợi ý", icon: Sparkles },
    {
      href: "/compare",
      label: "So sánh",
      icon: GitCompare,
      badge: comparisonIds.length > 0 ? comparisonIds.length : undefined,
    },
    { href: "/community", label: "Cộng đồng", icon: Users },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black text-navy tracking-tight leading-none">
                Stay<span className="text-primary">Wise</span>
              </span>
              <span className="text-[10px] font-semibold text-textMuted tracking-wider uppercase mt-0.5">
                Nơi sống thông minh
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all select-none relative ${
                    isActive
                      ? "text-primary bg-primary-light"
                      : "text-textSecondary hover:text-navy hover:bg-background"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-primary text-white text-[10px] font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/contribute">
              <Button size="sm" variant="outline" className="text-xs gap-1.5 border-dashed">
                <PlusCircle className="w-3.5 h-3.5 text-primary" />
                Đóng góp
              </Button>
            </Link>

            <Link href="/admin">
              <Button size="sm" variant="secondary" className="text-xs gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Admin Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/compare" className="relative p-2 text-textSecondary hover:text-navy">
              <GitCompare className="w-5 h-5" />
              {comparisonIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {comparisonIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileNavOpen(true)}
              className="p-2 rounded-xl text-navy hover:bg-background transition-colors"
              aria-label="Mở menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={navLinks}
      />
    </>
  );
};
