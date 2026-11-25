"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 w-full rounded-2xl bg-white p-6 shadow-modal border border-border animate-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto",
          {
            "max-w-sm": maxWidth === "sm",
            "max-w-md": maxWidth === "md",
            "max-w-lg": maxWidth === "lg",
            "max-w-2xl": maxWidth === "xl",
          }
        )}
      >
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-navy">{title}</h3>
            {description && <p className="text-xs text-textSecondary mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-textMuted hover:bg-background hover:text-textPrimary transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
