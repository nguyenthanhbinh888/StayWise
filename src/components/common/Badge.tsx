import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  size = "md",
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        {
          "bg-primary-light text-primary-dark": variant === "primary" || variant === "success",
          "bg-navy-light text-navy": variant === "secondary",
          "bg-warning-light text-amber-800": variant === "warning",
          "bg-danger-light text-danger": variant === "danger",
          "bg-info-light text-info": variant === "info",
          "bg-gray-100 text-textSecondary": variant === "neutral",

          "text-[11px] px-2 py-0.5": size === "sm",
          "text-xs px-2.5 py-1": size === "md",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
