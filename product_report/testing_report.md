# BÁO CÁO KIỂM THỬ HỆ THỐNG STAYWISE (`testing_report.md`)

> **Sản phẩm**: StayWise (`v1.0.0`)  
> **Môi trường kiểm thử**: Local Dev Server (`http://localhost:3000`), Node.js `v24.21.0`, Windows 11  
> **Ngày thực hiện**: 25/11/2026  

---

## 1. Kết quả Kiểm tra Tĩnh & Unit Test

| Hạng mục | Lệnh kiểm tra | Trạng thái | Kết quả ghi nhận |
|---|---|:---:|---|
| Kiểm tra kiểu TypeScript | `npm run typecheck` | **PASS** | 0 lỗi biên dịch, tuân thủ `strict: true`. |
| Kiểm tra quy chuẩn mã nguồn | `npm run lint` | **PASS** | `✔ No ESLint warnings or errors`. |
| Unit Test Tính chi phí | `tests/unit/cost-calculation.test.ts` | **PASS** | 3/3 test cases đạt (`calculateMonthlyCost`, `calculateBudgetBreakdown` thặng dư & thâm hụt). |
| Unit Test Khoảng cách | `tests/unit/distance-calculation.test.ts` | **PASS** | 3/3 test cases đạt (tọa độ trùng = 0, Cầu Giấy–Mỹ Đình, HN–TP.HCM). |
| Unit Test Điểm sống & So sánh | `tests/unit/scores.test.ts` | **PASS** | 2/2 test cases đạt (`calculateOverallLivingScore`, `findComparisonHighlights`). |
| Unit Test Thuật toán Gợi ý | `tests/unit/recommendation-engine.test.ts` | **PASS** | 2/2 test cases đạt (`recommendAreas`, xử lý mảng rỗng). |
| Build Production | `npm run build` | **PASS** | Biên dịch thành công 16/16 routes (kiểm chứng ở giai đoạn build). |

---

## 2. Kết quả Kiểm thử E2E Tự động (Puppeteer Headless Browser)

| Mã kịch bản | Chức năng / Luồng kiểm thử | Trạng thái | Bằng chứng ghi nhận thực tế |
|---|---|:---:|---|
| `TC_E2E_01` | Trang chủ (`/`) & Search Bar | **PASS** | Tiêu đề Hero hiển thị đúng, ô tìm kiếm nhận diện được, các liên kết khu vực hoạt động. |
| `TC_E2E_02` | Khám phá (`/explore`), Bản đồ Leaflet & Lọc | **PASS** | `.leaflet-container` mount thành công, hiển thị đủ 10 markers khu vực, bộ lọc thành phố hoạt động. |
| `TC_E2E_03` | Chi tiết khu vực (`/areas/cau-giay`) | **PASS** | Tiêu đề "Cầu Giấy", biểu đồ `Recharts` PieChart & danh sách tiện ích hiển thị đầy đủ. |
| `TC_E2E_04` | Tính chi phí (`/calculator`) & Lưu LocalStorage | **PASS** | Tính toán động và hiển thị Toast `"Đã lưu kế hoạch tài chính!"` sau khi bấm lưu. |
| `TC_E2E_05` | Gợi ý khu vực (`/recommendations`) | **PASS** | Hệ thống chuẩn hóa trọng số, hiển thị thẻ kết quả kèm `"Độ phù hợp:"` và danh sách lý do. |
| `TC_E2E_06` | So sánh đối đầu (`/compare`) | **PASS** | Bảng ma trận so sánh và biểu đồ cơ cấu chi phí/radar hiển thị đầy đủ. |
| `TC_E2E_07` | Đóng góp (`/contribute`) $\to$ Duyệt Admin (`/admin/contributions`) $\to$ Cộng đồng (`/community`) | **PASS** | Gửi form thành công với trạng thái `"Chờ Admin duyệt"`, Admin bấm Duyệt và bài viết xuất hiện trên `/community`. |

---

## 3. Kiểm thử Chức năng Bổ sung & Đánh giá Hạn chế

| Hạng mục | Trạng thái | Ghi chú thực tế |
|---|:---:|---|
| Đa màn hình (Desktop 1440×900, Tablet 768×1024, Mobile 390×844) | **PASS** | Đã chụp đủ 39 ảnh màn hình tại `artifacts/screenshots/` và bản sao minh chứng tại `product_report/evidence/screenshots/`. |
| Tải OpenStreetMap Tiles trong Headless Chrome | **BLOCKED / FALLBACK** | Một số tile từ máy chủ OSM gặp `net::ERR_EMPTY_RESPONSE` trong môi trường chạy tự động; hệ thống xử lý bằng `OfflineMapFallback` để không crash ứng dụng. |
| Xuất CSV tại `/admin/reports` & CRUD Khu vực `/admin/areas` | **NOT TESTED (E2E)** | Đã rà soát mã nguồn (`exportAreasToCSV`, `AreaEditModal`, `ConfirmationDialog`), chưa có kịch bản Puppeteer click tải file CSV tự động. |
| Trang `/login` (Đăng nhập mô phỏng) & `/dashboard` | **NOT TESTED (Interactive)** | `/dashboard` đã chụp ảnh và kiểm tra hiển thị; `/login` là form điều hướng mô phỏng không có xác thực mật khẩu phía server. |
