"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: "left" | "right" | "bottom";
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "relative z-10 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out",
          {
            "ml-auto h-full w-full max-w-md border-l border-border animate-in slide-in-from-right": side === "right",
            "mr-auto h-full w-full max-w-md border-r border-border animate-in slide-in-from-left": side === "left",
            "mt-auto w-full max-h-[85vh] rounded-t-2xl border-t border-border animate-in slide-in-from-bottom": side === "bottom",
          }
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-bold text-navy text-base">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-textMuted hover:bg-background hover:text-textPrimary"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};
