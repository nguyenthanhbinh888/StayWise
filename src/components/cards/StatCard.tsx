import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "primary" | "navy" | "warning" | "info";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "primary",
  trend,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-card text-left transition-all hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
          {title}
        </span>
        <div
          className={cn("w-10 h-10 rounded-xl flex items-center justify-center", {
            "bg-primary-light text-primary": variant === "primary",
            "bg-navy-light text-navy": variant === "navy",
            "bg-warning-light text-warning": variant === "warning",
            "bg-info-light text-info": variant === "info",
          })}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3">
        <span className="text-2xl lg:text-3xl font-extrabold text-navy tracking-tight">
          {value}
        </span>
      </div>
      {(subtitle || trend) && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={cn("font-bold px-1.5 py-0.5 rounded", {
                "text-primary bg-primary-light": trend.isPositive,
                "text-danger bg-danger-light": !trend.isPositive,
              })}
            >
              {trend.value}
            </span>
          )}
          {subtitle && <span className="text-textMuted">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
