import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-border text-left mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-navy tracking-tight">
                Stay<span className="text-primary">Wise</span>
              </span>
            </Link>
            <p className="text-xs text-textSecondary leading-relaxed">
              Nền tảng công nghệ hỗ trợ phân tích chi phí sinh hoạt đô thị và đưa ra quyết định thuê trọ thông minh tại Hà Nội và TP. Hồ Chí Minh.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
              <ShieldCheck className="w-4 h-4" /> Minh bạch &amp; Độc lập
            </div>
          </div>

          {/* Cột 2: Điều hướng */}
          <div>
            <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Tính năng</h5>
            <ul className="space-y-2 text-xs text-textSecondary">
              <li><Link href="/explore" className="hover:text-primary transition-colors">Khám phá bản đồ</Link></li>
              <li><Link href="/calculator" className="hover:text-primary transition-colors">Tính chi phí sinh hoạt</Link></li>
              <li><Link href="/recommendations" className="hover:text-primary transition-colors">Gợi ý khu vực tối ưu</Link></li>
              <li><Link href="/compare" className="hover:text-primary transition-colors">So sánh khu vực</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Phân tích đô thị</Link></li>
            </ul>
          </div>

          {/* Cột 3: Cộng đồng & Đóng góp */}
          <div>
            <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Cộng đồng</h5>
            <ul className="space-y-2 text-xs text-textSecondary">
              <li><Link href="/community" className="hover:text-primary transition-colors">Đánh giá sinh sống</Link></li>
              <li><Link href="/contribute" className="hover:text-primary transition-colors">Đóng góp dữ liệu mới</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Giao diện Admin Demo</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Đăng nhập Quản trị</Link></li>
            </ul>
          </div>

          {/* Cột 4: Miễn trừ trách nhiệm dữ liệu mẫu */}
          <div className="bg-background p-4 rounded-2xl border border-border/80">
            <h5 className="text-xs font-bold text-navy mb-1.5">Chính sách dữ liệu mẫu</h5>
            <p className="text-[11px] text-textMuted leading-relaxed">
              Tất cả các số liệu giá thuê, chi phí và chỉ số môi trường trong ứng dụng là <b>dữ liệu minh họa</b> phục vụ trải nghiệm sản phẩm, không thay thế các báo cáo thống kê chính thức của cơ quan nhà nước.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-textMuted">
          <div>
            StayWise &copy; 2026. Xây dựng bằng Next.js App Router, Leaflet và Tailwind CSS.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            Phát triển với tinh thần <Heart className="w-3.5 h-3.5 text-danger fill-danger" /> vì cộng đồng sinh viên &amp; người đi làm.
          </div>
        </div>
      </div>
    </footer>
  );
};
