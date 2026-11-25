import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "StayWise — Phân tích chi phí sinh hoạt & Lựa chọn nơi ở thông minh",
  description: "Nền tảng công nghệ hỗ trợ khám phá, phân tích và so sánh chi phí sinh hoạt tại Hà Nội và TP.HCM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <StoreProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
