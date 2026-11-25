"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ShieldAlert, PlusCircle, Compass } from "lucide-react";
import { Button } from "@/components/common/Button";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative z-10 w-4/5 max-w-xs h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-navy text-base">StayWise</span>
            </Link>
            <button onClick={onClose} className="p-1 rounded-lg text-textMuted hover:text-navy">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="mt-5 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-textSecondary hover:bg-background hover:text-navy"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-border space-y-2 text-left">
          <Link href="/contribute" onClick={onClose} className="block w-full">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <PlusCircle className="w-4 h-4 text-primary" /> Đóng góp dữ liệu
            </Button>
          </Link>

          <Link href="/admin" onClick={onClose} className="block w-full">
            <Button variant="secondary" size="sm" className="w-full gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Quản trị Admin Demo
            </Button>
          </Link>

          <p className="text-[10px] text-textMuted text-center pt-2">
            StayWise v1.0.0 &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
};
