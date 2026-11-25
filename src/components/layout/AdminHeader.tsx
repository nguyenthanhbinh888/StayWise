"use client";

import React from "react";
import { ShieldCheck, UserCheck } from "lucide-react";
import { Badge } from "@/components/common/Badge";

export const AdminHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="text-left">
        <h2 className="text-base font-bold text-navy">{title}</h2>
        {subtitle && <p className="text-xs text-textMuted">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="warning" size="sm" className="gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Chế độ Demo Local
        </Badge>
        <div className="flex items-center gap-2 pl-3 border-l border-border text-xs text-navy font-semibold">
          <div className="w-7 h-7 rounded-full bg-navy-light text-navy flex items-center justify-center font-bold">
            <UserCheck className="w-4 h-4 text-primary" />
          </div>
          <span>Quản trị viên</span>
        </div>
      </div>
    </header>
  );
};
