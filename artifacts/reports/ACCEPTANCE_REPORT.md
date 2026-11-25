# STAYWISE — ACCEPTANCE REPORT (BÁO CÁO NGHIỆM THU)

> **Dự án**: StayWise — Nền tảng phân tích chi phí sinh hoạt đô thị & Lựa chọn nơi ở thông minh  
> **Loại sản phẩm**: Urban Living Cost Analysis & Housing Decision Platform  
> **Nhân sự thực hiện**: Staff Software Engineer, Senior Frontend Engineer, QA Engineer & Technical Lead  
> **Phiên bản nghiệm thu**: 1.0.0  
> **Thời gian nghiệm thu**: 22/11/2026  
> **Địa chỉ chạy thực tế (Local URL)**: [http://localhost:3000](http://localhost:3000)  

---

## 1. PROJECT OVERVIEW (TỔNG QUAN DỰ ÁN)

- **Tên sản phẩm**: StayWise
- **Thị trường mục tiêu**: Hà Nội và TP. Hồ Chí Minh
- **Đối tượng người dùng**: Sinh viên đại học, người mới đi làm và người đang tìm kiếm nơi thuê trọ phù hợp ngân sách
- **Ngôn ngữ giao diện**: 100% Tiếng Việt chuẩn mực
- **Tech Stack cốt lõi**:
  - Framework: Next.js 14 (App Router)
  - Ngôn ngữ: TypeScript (Strict mode)
  - Thiết kế & Styling: Tailwind CSS (Design Tokens chuẩn mực)
  - Biểu tượng: Lucide React
  - Bản đồ không gian: Leaflet, React Leaflet (SSR-free Dynamic Import)
  - Trực quan hóa mật độ: Leaflet.heat Canvas Heatmap
  - Biểu đồ dữ liệu: Recharts (Donut/Pie, Grouped Bar, Stacked Bar, Radar, Area)
  - Quản lý biểu mẫu: React Hook Form & Zod Validation
  - Quản lý trạng thái & Lưu trữ: React Context API & Browser LocalStorage
  - Kiểm thử tự động: Vitest, React Testing Library, Puppeteer E2E Automation

---

## 2. IMPLEMENTATION SUMMARY (TÓM TẮT TRIỂN KHAI)

Dự án đã được triển khai hoàn chỉnh 100% theo đúng [SPEC.md](file:///d:/MyProject/StayWise/SPEC.md) và kế hoạch [IMPLEMENTATION_PLAN.md](file:///d:/MyProject/StayWise/IMPLEMENTATION_PLAN.md):

1. **Bộ dữ liệu chuẩn 10 khu vực**:
   - Hà Nội (5 khu vực): Cầu Giấy, Mỹ Đình, Hà Đông, Đống Đa, Long Biên.
   - TP.HCM (5 khu vực): Thủ Đức, Bình Thạnh, Gò Vấp, Tân Bình, Khu vực Quận 7.
   - 100% chi phí thành phần (tiền thuê, ăn uống, đi lại, điện nước/net, chi phí khác) khớp chính xác với bảng mục 4.2 trong SPEC.md.
   - Tổng chi phí luôn được tính toán động từ các khoản chi tiết qua hàm `calculateMonthlyCost()`.
   - Có đầy đủ tọa độ tham chiếu chuẩn xác, danh sách tiện ích xung quanh, đánh giá cộng đồng và địa điểm học tập/làm việc tham chiếu.
   - Toàn bộ dữ liệu hiển thị kèm nhãn minh họa bắt buộc: *"Dữ liệu minh họa — Không thay thế số liệu khảo sát thực tế."*

2. **Hệ thống bản đồ & Heatmap**:
   - Tích hợp Leaflet hoàn toàn tách biệt khỏi SSR thông qua dynamic import, đảm bảo 0 lỗi `window is not defined`.
   - Lớp Heatmap cho phép chuyển đổi tức thời giữa 6 chế độ: Tổng chi phí, Giá thuê, Chi phí ăn uống, Đi lại, Chất lượng môi trường, Nguy cơ ngập lụt.
   - Marker thiết kế bằng DivIcon/CircleMarker chuẩn SVG, không phụ thuộc URL ảnh bên ngoài.
   - Tích hợp lớp bản đồ minh họa ngoại tuyến (`OfflineMapFallback`) tự động kích hoạt nếu máy chủ tile ngắt kết nối mạng.

3. **Nghiệp vụ tính toán & Gợi ý độc lập**:
   - Công cụ tính chi phí (`/calculator`): Phân bổ chi tiêu thời gian thực, tính số tiền dư/thâm hụt, cảnh báo tỷ lệ tiền thuê nhà.
   - Thuật toán gợi ý đa tiêu chí minh bạch (`/recommendations`): Chấm điểm 0 - 100 dựa trên Ngân sách (40%), Đi lại (25%), Tiện ích (15%), Môi trường (20%), tự động chuẩn hóa trọng số về 100% và sinh danh sách lý do cụ thể.
   - Bảng so sánh đối kháng (`/compare`): Đối sánh tối đa 4 khu vực, tự động highlight ô rẻ nhất, vẽ biểu đồ Bar & Radar đa tiêu chí.

4. **Cộng đồng, Đóng góp & Quản trị Admin**:
   - Gửi đóng góp mới (`/contribute`) với Zod validation, lưu vào LocalStorage với trạng thái `pending`.
   - Giao diện Admin (`/admin`, `/admin/areas`, `/admin/contributions`, `/admin/reports`): Duyệt/từ chối đóng góp, CRUD khu vực, khôi phục Seed Data và xuất file CSV định dạng UTF-8 có BOM.
   - Bài viết được duyệt trong Admin sẽ ngay lập tức xuất hiện trên Bảng tin Cộng đồng (`/community`) mà không cần tải lại trang.

---

## 3. FEATURE ACCEPTANCE CHECKLIST (BẢNG KIỂM TRA TÍNH NĂNG)

| STT | Tính năng theo SPEC.md | Triển khai | Kiểm thử | Trạng thái |
|---|---|:---:|:---:|:---:|
| 1 | **Trang chủ (Homepage)** (Hero, Search bar có autocomplete, Stats động, Map preview, Featured areas, 3 bước hoạt động, Reviews, Footer) | Có | Có | **PASSED** |
| 2 | **Khám phá khu vực (`/explore`)** (Bản đồ Leaflet, Heatmap 6 chế độ, bộ lọc đa tiêu chí, drawer di động, danh sách khu vực) | Có | Có | **PASSED** |
| 3 | **Chi tiết khu vực (`/areas/[slug]`)** (Routing theo slug, biểu đồ cơ cấu chi phí, bản đồ tiện ích, 5 chỉ số sống, nhận xét đã duyệt, khu vực tương tự) | Có | Có | **PASSED** |
| 4 | **Tính chi phí sinh hoạt (`/calculator`)** (Nhập chi tiết từng khoản, nạp dữ liệu từ khu vực mẫu, tính thặng dư/thâm hụt tức thời, Recharts Pie & Bar, lưu kế hoạch) | Có | Có | **PASSED** |
| 5 | **Gợi ý khu vực tối ưu (`/recommendations`)** (Form khảo sát, chọn điểm đến tham chiếu, thanh trượt trọng số chuẩn hóa 100%, lý do đề xuất minh bạch, biểu đồ đối sánh) | Có | Có | **PASSED** |
| 6 | **So sánh đối đầu (`/compare`)** (Chọn tối đa 4 khu vực, bảng đối soát sticky, Recharts Stacked Bar chi phí & Radar môi trường sống, kết luận tự động) | Có | Có | **PASSED** |
| 7 | **Bảng tin cộng đồng (`/community`)** (Chỉ hiển thị bài đã duyệt, lọc theo thành phố/khu vực/chủ đề, KPI đánh giá, Data Trust notice) | Có | Có | **PASSED** |
| 8 | **Đóng góp dữ liệu (`/contribute`)** (Form validation với Zod, lưu LocalStorage trạng thái `pending`, bảng lịch sử đóng góp cá nhân) | Có | Có | **PASSED** |
| 9 | **Trung tâm phân tích (`/dashboard`)** (5 KPI cards, biểu đồ tương quan giá thuê & tổng chi phí 2 thành phố, 4 bảng xếp hạng top 3, Heatmap tổng thể) | Có | Có | **PASSED** |
| 10 | **Quản trị tổng quan (`/admin`)** (KPI hàng đợi, biểu đồ xu hướng đóng góp thời gian, điều hướng quản trị) | Có | Có | **PASSED** |
| 11 | **Quản trị khu vực (`/admin/areas`)** (Bảng danh sách, tìm kiếm, lọc thành phố, modal Thêm/Sửa, xác nhận xóa, khôi phục Seed Data) | Có | Có | **PASSED** |
| 12 | **Kiểm duyệt đóng góp (`/admin/contributions`)** (Tabs Pending/Approved/Rejected, nút Duyệt & Từ chối, đồng bộ tức thời với Community) | Có | Có | **PASSED** |
| 13 | **Báo cáo dữ liệu & Xuất CSV (`/admin/reports`)** (KPI tỷ lệ duyệt, nút tải file CSV chuẩn UTF-8 xem tốt trên Excel) | Có | Có | **PASSED** |
| 14 | **Đăng nhập mô phỏng (`/login`)** (Form đăng nhập giải thích rõ cơ chế client-side mock authentication) | Có | Có | **PASSED** |
| 15 | **Trang 404 & Error Boundary (`/not-found`, `error.tsx`)** (Giao diện thân thiện, điều hướng quay về an toàn) | Có | Có | **PASSED** |

---

## 4. ROUTE TESTING MATRIX (KIỂM THỬ ĐÁP ỨNG VIEWPORT)

| Tuyến đường (Route) | Desktop (1440×900) | Tablet (768×1024) | Mobile (390×844) | Trạng thái hiển thị |
|---|:---:|:---:|:---:|:---:|
| `/` (Trang chủ) | ✅ Hoàn hảo | ✅ Hoàn hảo | ✅ Hoàn hảo (Drawer nav) | **PASSED** |
| `/explore` (Khám phá) | ✅ 2 Cột song song | ✅ Bản đồ trọn vẹn | ✅ Tab [Danh sách] / [Bản đồ] | **PASSED** |
| `/areas/cau-giay` | ✅ Hoàn hảo | ✅ Hoàn hảo | ✅ Co dãn 1 cột mượt mà | **PASSED** |
| `/calculator` | ✅ 2 Cột (Form & Chart) | ✅ Form trên, Chart dưới | ✅ Thanh trượt touch dễ thao tác | **PASSED** |
| `/recommendations` | ✅ Hoàn hảo | ✅ Hoàn hảo | ✅ Thẻ xếp hạng trực quan | **PASSED** |
| `/compare` | ✅ Bảng đầy đủ | ✅ Cuộn ngang sticky | ✅ Bảng cuộn ngang mượt mà | **PASSED** |
| `/community` | ✅ Lưới 2 cột | ✅ Lưới 2 cột | ✅ 1 Cột thẻ nhận xét | **PASSED** |
| `/contribute` | ✅ Hoàn hảo | ✅ Hoàn hảo | ✅ Form nhập liệu tối ưu | **PASSED** |
| `/dashboard` | ✅ 5 KPI, Biểu đồ lớn | ✅ 5 KPI tự quấn dòng | ✅ Thẻ KPI co dãn chuẩn | **PASSED** |
| `/admin` | ✅ Sidebar cố định | ✅ Sidebar cố định | ✅ Layout thích ứng | **PASSED** |
| `/admin/areas` | ✅ Bảng CRUD chuẩn | ✅ Bảng cuộn ngang | ✅ Thao tác modal chuẩn | **PASSED** |
| `/admin/contributions` | ✅ Nút Duyệt/Từ chối | ✅ Nút Duyệt/Từ chối | ✅ Thao tác chạm nhanh | **PASSED** |
| `/admin/reports` | ✅ Xuất CSV tức thì | ✅ Xuất CSV tức thì | ✅ Nút tải file to rõ | **PASSED** |

---

## 5. FUNCTIONAL END-TO-END SCENARIO RESULTS

Kết quả thực thi tự động qua Puppeteer Browser Runner:

1. **Scenario 1 — Khám phá**: Mở trang chủ $\to$ Nhập "Cầu Giấy" vào ô tìm kiếm Hero $\to$ Danh sách gợi ý xuất hiện $\to$ Chuyển trang chi tiết $\to$ **PASSED**.
2. **Scenario 2 — Tính chi phí**: Mở Calculator $\to$ Chọn khu vực Thủ Đức $\to$ Nạp tự động giá phòng 3.8tr $\to$ Kéo ngân sách 12tr $\to$ Số dư hiển thị 1.8tr $\to$ Biểu đồ cập nhật tức thời $\to$ Bấm "Lưu kế hoạch" $\to$ Toast thành công $\to$ **PASSED**.
3. **Scenario 3 — Recommendation**: Chọn TP Hà Nội $\to$ Ngân sách 10tr $\to$ Điểm đến ĐH Quốc Gia $\to$ Bấm "Tìm khu vực" $\to$ Cầu Giấy/Mỹ Đình xếp hạng đầu kèm lý do chi tiết $\to$ **PASSED**.
4. **Scenario 4 — Comparison**: Chọn 2 khu vực Cầu Giấy và Bình Thạnh $\to$ Thêm khu vực thứ 3 $\to$ Bảng so sánh 12 tiêu chí hiển thị $\to$ Radar Chart vẽ chuẩn $\to$ Xóa 1 khu vực cập nhật ngay $\to$ **PASSED**.
5. **Scenario 5 — Contribution**: Người dùng gửi đóng góp trải nghiệm $\to$ Toast thông báo $\to$ Trạng thái `pending` xuất hiện trong lịch sử $\to$ Chưa xuất hiện bên Community $\to$ **PASSED**.
6. **Scenario 6 — Admin Moderation**: Admin mở `/admin/contributions` $\to$ Bấm "Duyệt" $\to$ Trạng thái chuyển thành `approved` $\to$ Mở `/community` thấy bài viết xuất hiện công khai ngay $\to$ **PASSED**.
7. **Scenario 7 — Responsive**: Kiểm tra tự động trên Desktop 1440px, Tablet 768px, Mobile 390px $\to$ Không có horizontal overflow $\to$ **PASSED**.

---

## 6. BUILD & CODE QUALITY RESULTS

- `npm run typecheck`: **PASSED** (0 TypeScript errors)
- `npm run lint`: **PASSED** (`✔ No ESLint warnings or errors`)
- `npm run test`: **PASSED** (10/10 tests in 4 test files passed)
- `npm run build`: **PASSED** (Biên dịch thành công 16/16 routes tối ưu)

---

## 7. BROWSER CONSOLE EVALUATION

- **React Hydration Mismatch Errors**: **0**
- **Uncaught Exceptions**: **0**
- **Missing Key Warnings**: **0**
- **Lưu ý mạng ngoại tuyến**: Khi chạy môi trường ngắt Internet hoặc máy chủ OpenStreetMap từ chối tile, bản đồ kích hoạt cơ chế `OfflineMapFallback` vẽ canvas lưới tọa độ phẳng, đảm bảo trang không bao giờ bị trắng hoặc crash.

---

## 8. SCREENSHOT ARTIFACTS VERIFICATION

Toàn bộ **39 ảnh chụp màn hình thực tế** được lưu trữ tại:

- **Desktop (1440×900)**: `artifacts/screenshots/desktop/` (13 ảnh từ 01-home.png đến 13-admin-reports.png)
- **Tablet (768×1024)**: `artifacts/screenshots/tablet/` (13 ảnh từ 01-home.png đến 13-admin-reports.png)
- **Mobile (390×844)**: `artifacts/screenshots/mobile/` (13 ảnh từ 01-home.png đến 13-admin-reports.png)

---

## 9. GIỚI HẠN CỦA PHIÊN BẢN DEMO (REMAINING LIMITATIONS)

1. **Lưu trữ phía Client**: Dữ liệu đóng góp và quản trị Admin được lưu trữ trong `localStorage` của trình duyệt. Khi mở ở trình duyệt khác hoặc ẩn danh, dữ liệu sẽ quay về bộ dữ liệu mẫu mặc định 10 khu vực.
2. **Khoảng cách di chuyển**: Được tính bằng công thức toán học Haversine theo đường chim bay từ tọa độ địa lý. Để đo quãng đường xe máy thực tế, cần tích hợp OSRM hoặc dịch vụ Routing ngoài trong phiên bản thương mại sau này.
3. **Xác thực Admin**: Trang `/login` là giao diện mô phỏng quyền quản trị cục bộ, chưa kết nối JWT hoặc OAuth Backend.

---

## 10. FINAL ACCEPTANCE CONCLUSION (KẾT LUẬN NGHIỆM THU)

### ⭐️ TRẠNG THÁI NGHIỆM THU: **READY FOR LOCAL DEMO (SẴN SÀNG BÀN GIAO & DEMO THỰC TẾ)**

Sản phẩm StayWise đáp ứng 100% các tiêu chí kỹ thuật, thẩm mỹ giao diện, tính năng nghiệp vụ, bản đồ, biểu đồ và khả năng vận hành độc lập không cần bất kỳ API key trả phí nào.
