"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (type: ToastType, title: string, message?: string) => void;
  success: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, title, message }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => toast("success", title, message), [toast]);
  const warning = useCallback((title: string, message?: string) => toast("warning", title, message), [toast]);
  const error = useCallback((title: string, message?: string) => toast("error", title, message), [toast]);
  const info = useCallback((title: string, message?: string) => toast("info", title, message), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, warning, error, info }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-modal border transition-all duration-300 animate-in slide-in-from-bottom-5 bg-white ${
              t.type === "success"
                ? "border-primary/20 text-navy"
                : t.type === "warning"
                ? "border-warning/30 text-navy"
                : t.type === "error"
                ? "border-danger/30 text-navy"
                : "border-info/30 text-navy"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-primary" />}
              {t.type === "warning" && <AlertTriangle className="w-5 h-5 text-warning" />}
              {t.type === "error" && <AlertCircle className="w-5 h-5 text-danger" />}
              {t.type === "info" && <Info className="w-5 h-5 text-info" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-textPrimary leading-snug">{t.title}</h4>
              {t.message && <p className="text-xs text-textSecondary mt-0.5 leading-relaxed">{t.message}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-textMuted hover:text-textPrimary transition-colors p-1"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
