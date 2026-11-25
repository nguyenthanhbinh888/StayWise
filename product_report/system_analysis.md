# BÁO CÁO KHẢO SÁT HỆ THỐNG THỰC TẾ (`system_analysis.md`)

> **Sản phẩm khảo sát**: StayWise — Urban Living Cost Analysis & Housing Decision Platform  
> **Phiên bản**: `1.0.0` (kiểm chứng trực tiếp từ mã nguồn trong `d:\MyProject\StayWise`)  
> **Ngày khảo sát**: 25/11/2026  

---

## 1. Phân tích Source Code & Kiến trúc Tổng thể

### 1.1. Công nghệ & Dependencies thực tế (từ `package.json`)
- **Framework & Runtime**: Next.js `14.2.15` (App Router), React `^18.3.1`, TypeScript `^5.6.3` (Strict Mode trong `tsconfig.json`).
- **Styling & Icons**: Tailwind CSS `^3.4.14`, PostCSS, Autoprefixer, `clsx` `^2.1.1`, `tailwind-merge` `^2.5.4`, `lucide-react` `^0.453.0`.
- **Bản đồ**: `leaflet` `^1.9.4`, `react-leaflet` `^4.2.1`, `leaflet.heat` `^0.2.0` (cài đặt trong dependencies; lớp bản đồ thực tế dùng `L.map`, `L.tileLayer` OpenStreetMap, `L.divIcon` và `L.circle` để biểu diễn vùng nhiệt cường độ chi phí/môi trường ổn định không phụ thuộc ảnh marker ngoài).
- **Biểu đồ**: `recharts` `^2.13.0` (`PieChart`, `BarChart`, `RadarChart`, `AreaChart` bọc trong `ResponsiveContainer`).
- **Biểu mẫu & Xác thực đầu vào**: `react-hook-form` `^7.53.1`, `zod` `^3.23.8`, `@hookform/resolvers` `^3.9.0`.
- **Định dạng & Kiểm thử**: `date-fns` `^4.1.0`, `vitest` `^2.1.3`, `@testing-library/react` `^16.0.1`, `jsdom` `^25.0.1`, `puppeteer` `^25.18.1`.

### 1.2. Cấu trúc Thư mục & Trách nhiệm Module
- `src/app/`: Chứa 15 App Router routes thực tế (cộng `icon.tsx`, `error.tsx`, `not-found.tsx`, `layout.tsx`, `globals.css`):
  - Nhóm người dùng công khai: `/`, `/explore`, `/areas/[slug]`, `/calculator`, `/recommendations`, `/compare`, `/community`, `/contribute`, `/dashboard`, `/login`.
  - Nhóm quản trị mô phỏng: `/admin`, `/admin/areas`, `/admin/contributions`, `/admin/reports`.
- `src/components/`:
  - `common/`: 11 atomic UI components (`Button`, `Input`, `Select`, `Slider`, `Badge`, `Modal`, `Drawer`, `Tabs`, `EmptyState`, `LoadingSkeleton`, `ConfirmationDialog`).
  - `cards/`: 5 business cards (`AreaCard`, `StatCard`, `ReviewCard`, `RecommendationCard`, `AmenityCard`).
  - `charts/`: 5 Recharts components (`ExpensePieChart`, `BudgetBarChart`, `ComparisonBarChart`, `LivingScoreRadarChart`, `AdminTrendLineChart`).
  - `forms/`: 6 interactive forms (`SearchBar`, `AreaFilterForm`, `CostInputForm`, `PreferenceForm`, `ContributionForm`, `AreaEditModal`).
  - `layout/`: 5 layout components (`Header`, `Footer`, `MobileNav`, `AdminSidebar`, `AdminHeader`).
  - `map/`: 4 map components (`MapContainerWrapper`, `LeafletMap`, `MapLegend`, `OfflineMapFallback`).
- `src/data/`: Dữ liệu tĩnh minh họa gồm `areas.ts` (10 khu vực), `amenities.ts` (29 tiện ích mẫu), `destinations.ts` (10 điểm đến HN & TP.HCM), `reviews.ts` (6 đánh giá chi tiết mẫu), `contributions.ts` (7 đóng góp mẫu gồm approved/pending/rejected).
- `src/lib/`: Tầng nghiệp vụ thuần (`Pure Functions`) tách biệt hoàn toàn khỏi UI:
  - `calculations/`: `cost.ts`, `distance.ts`, `scores.ts`.
  - `recommendations/`: `engine.ts` (`recommendAreas`).
  - `storage/`: `keys.ts`, `local-storage.ts`.
  - `validation/`: `area.ts`, `contribution.ts`.
  - `formatting/`: `currency.ts`, `date.ts`.
  - `export/`: `csv.ts` (`exportAreasToCSV`).
- `src/context/` & `src/hooks/`: `StoreContext.tsx` và `ToastContext.tsx` quản lý state toàn cục và đồng bộ `localStorage` an toàn SSR thông qua cờ `isHydrated`.

---

## 2. Phân tích Chức năng & Luồng Nghiệp vụ Thực tế

1. **Trang chủ (`/`)**: Search Bar có autocomplete (`useDebounce` 150ms), 4 KPI thống kê tính động từ `areas` và `contributions`, Map Preview có nút bật/tắt Heatmap, danh sách 6 khu vực nổi bật, khối xem trước Calculator, quy trình 3 bước và 3 đánh giá cộng đồng đã duyệt.
2. **Khám phá & Bản đồ (`/explore`)**: Lọc theo thành phố, giá thuê tối đa, tổng chi phí tối đa, an ninh, yên tĩnh, nguy cơ ngập lụt; sắp xếp theo chi phí thấp nhất / giá thuê thấp nhất / chất lượng sống cao nhất; chuyển đổi 6 chế độ Heatmap (`totalCost`, `rent`, `food`, `transport`, `environment`, `flood`); bật/tắt lớp tiện ích; giao diện Mobile chuyển thành Tab Danh sách / Bản đồ + Drawer bộ lọc.
3. **Chi tiết khu vực (`/areas/[slug]`)**: Hiển thị thông tin chi tiết theo `slug`, tự gọi `notFound()` nếu `slug` không khớp; biểu đồ `ExpensePieChart`; 5 chỉ số sống; bản đồ vị trí kèm tiện ích lọc theo danh mục; danh sách đánh giá từ `SEED_REVIEWS`; khu vực tương đồng cùng thành phố.
4. **Tính chi phí sinh hoạt (`/calculator`)**: Nạp nhanh số liệu tham chiếu theo khu vực, chỉnh sửa 9 đầu mục chi tiêu, tính toán thời gian thực tổng chi phí, thặng dư/thâm hụt, tỷ lệ tiền thuê; vẽ Pie Chart & Bar Chart; lưu kế hoạch vào `localStorage` qua `savePlan()`.
5. **Gợi ý khu vực (`/recommendations`)**: Thuật toán đa tiêu chí `recommendAreas()` chuẩn hóa 4 trọng số về 100%, tính điểm Ngân sách, Đi lại (công thức Haversine theo đường chim bay tới `SEED_DESTINATIONS`), Tiện ích và Môi trường (đảo chiều `floodRisk`); xếp hạng giảm dần kèm lý do gợi ý và biểu đồ cột Top 5.
6. **So sánh khu vực (`/compare`)**: Chọn tối đa 4 khu vực (mặc định `["cau-giay", "my-dinh"]`), bảng ma trận 12 tiêu chí có cột đầu `sticky`, tự động highlight khu vực tiết kiệm nhất, vẽ `ComparisonBarChart` và `LivingScoreRadarChart`, xuất 4 thẻ kết luận tự động.
7. **Cộng đồng (`/community`) & Đóng góp (`/contribute`)**: `/community` chỉ hiển thị `contributions` có `status === "approved"`, hỗ trợ lọc theo thành phố/khu vực/chủ đề và sắp xếp; `/contribute` kiểm tra input bằng `contributionFormSchema` (Zod), lưu vào `localStorage` với `status: "pending"` và hiển thị bảng lịch sử đóng góp trên thiết bị.
8. **Dashboard (`/dashboard`)**: Lọc theo thành phố (`all`, `hanoi`, `hcm`), 5 KPI cards động, biểu đồ so sánh Giá thuê & Tổng chi phí, 4 bảng xếp hạng Top 3, bản đồ Heatmap tổng quan.
9. **Khu vực Admin Demo (`/admin`, `/admin/areas`, `/admin/contributions`, `/admin/reports`, `/login`)**:
   - `/admin`: 5 KPI tổng quan + `AdminTrendLineChart` + liên kết tới hàng đợi kiểm duyệt.
   - `/admin/areas`: CRUD khu vực (`AreaEditModal`, `ConfirmationDialog`), tìm kiếm/lọc, nút `Khôi phục Seed Data`.
   - `/admin/contributions`: Lọc theo tab `pending / approved / rejected` và chủ đề; thao tác `Duyệt` / `Từ chối` cập nhật `StoreContext` & `localStorage`, đồng bộ ngay sang `/community`.
   - `/admin/reports`: Thống kê tỷ lệ duyệt/từ chối và xuất file `StayWise_Areas_Report_YYYY-MM-DD.csv` định dạng UTF-8 có BOM (`\uFEFF`).

---

## 3. Phân tích Hệ thống Kỹ thuật & Giới hạn Thực tế

- **Kiến trúc lưu trữ**: Không sử dụng Backend API hay CSDL quan hệ (như Java/Spring/MySQL trong báo cáo mẫu). Toàn bộ ứng dụng vận hành theo mô hình **Frontend-first / Local-first** bằng TypeScript + React Context + Browser `localStorage`.
- **An toàn SSR & Hydration**: `MapContainerWrapper` dùng `next/dynamic(..., { ssr: false })`; `StoreContext` dùng `isHydrated` và `useEffect` để đồng bộ `localStorage` sau khi mount; các biểu đồ Recharts dùng trạng thái `mounted` trước khi render `ResponsiveContainer`.
- **Bảo mật & Xác thực**: Không sử dụng `dangerouslySetInnerHTML`; toàn bộ input được React escape tự động và kiểm tra bằng Zod. Trang `/login` chỉ là giao diện đăng nhập mô phỏng (mock UI), không có phân quyền bảo mật phía server hay JWT — route `/admin` có thể truy cập trực tiếp phục vụ trải nghiệm demo.
- **Chức năng còn hạn chế / chưa có trong phạm vi phiên bản 1.0.0**:
  - Chưa tích hợp Backend Database thực tế (dữ liệu lưu cục bộ theo trình duyệt).
  - Khoảng cách tới điểm đến tính bằng công thức Haversine theo đường chim bay, chưa tích hợp routing giao thông thực tế.
  - Trang chi tiết `/areas/[slug]` hiện đọc đánh giá từ `SEED_REVIEWS` tĩnh, chưa hợp nhất thêm các `contributions` mới được duyệt của khu vực đó (các bài duyệt mới hiện hiển thị tại `/community`).
