# StayWise — Lựa chọn nơi sống thông minh

> **Urban Living Cost Analysis & Housing Decision Platform**  
> Nền tảng phân tích chi phí sinh hoạt đô thị & hỗ trợ quyết định nơi ở dành cho sinh viên và người đi làm tại Hà Nội & TP. Hồ Chí Minh.

---

## 1. Giới thiệu sản phẩm

StayWise giải quyết bài toán cốt lõi của người thuê trọ đô thị: **"Với ngân sách X triệu và nơi học tập/làm việc tại Y, tôi nên sống ở khu vực nào để vừa tiết kiệm chi phí, vừa đảm bảo an ninh, không ngập nước và đầy đủ tiện ích?"**.

Sản phẩm tập trung vào chu trình ra quyết định:
$$\text{EXPLORE} \longrightarrow \text{ANALYZE} \longrightarrow \text{COMPARE} \longrightarrow \text{RECOMMEND} \longrightarrow \text{DECIDE}$$

### Điểm nổi bật:
- **100% Độc lập Local**: Không yêu cầu bất kỳ API key trả phí nào (không Google Maps API, không Mapbox).
- **Phân tích chi phí sinh hoạt toàn diện**: Không chỉ tiền phòng mà tính toán cả tiền ăn uống, điện, nước, internet và chi phí đi lại.
- **Bản đồ nhiệt chi phí đa chế độ**: Trực quan hóa giá thuê, tổng chi phí, nguy cơ ngập lụt và chất lượng môi trường.
- **Thuật toán gợi ý đa tiêu chí minh bạch**: Chấm điểm dựa trên 4 thành phần (Ngân sách, Đi lại, Tiện ích, Môi trường) có giải thích lý do cụ thể.
- **Hệ thống đánh giá & Kiểm duyệt hai chiều**: Đóng góp từ cư dân qua kiểm duyệt Admin và đồng bộ tức thời xuống LocalStorage.

---

## 2. Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Ngôn ngữ**: TypeScript 5 (Strict Mode)
- **Giao diện & Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Bộ icon**: Lucide React
- **Bản đồ & Heatmap**: Leaflet, React Leaflet, Leaflet.heat
- **Biểu đồ dữ liệu**: Recharts
- **Biểu mẫu & Xác thực**: React Hook Form, Zod, @hookform/resolvers
- **Lưu trữ dữ liệu**: Browser LocalStorage (có cơ chế try/catch & fallback an toàn)
- **Kiểm thử tự động**: Vitest, React Testing Library, Puppeteer Automation

---

## 3. Cấu trúc các Tuyến đường (Routes)

| Route | Tên trang | Chức năng chính |
|---|---|---|
| `/` | Trang chủ | Hero, Search có gợi ý, thống kê động, xem trước Heatmap, Featured Areas, 3 bước hoạt động, Reviews. |
| `/explore` | Khám phá khu vực | Không gian bản đồ lớn + bộ lọc đa tiêu chí, toggle Heatmap 6 chế độ, danh sách thẻ khu vực. |
| `/areas/[slug]` | Chi tiết khu vực | Phân bổ chi phí hàng tháng (Donut chart), bản đồ vị trí & tiện ích xung quanh, 5 chỉ số sống, đánh giá cư dân. |
| `/calculator` | Tính chi phí sinh hoạt | Form chi tiết từng khoản chi tiêu, nạp dữ liệu mẫu theo khu vực, tính thặng dư/thâm hụt, lưu kế hoạch. |
| `/recommendations` | Gợi ý khu vực tối ưu | Khảo sát ngân sách, chọn điểm đến, thanh trượt ưu tiên chuẩn hóa 100%, xếp hạng kèm lý do minh bạch. |
| `/compare` | So sánh đối đầu | So sánh tối đa 4 khu vực, bảng ma trận đối soát, biểu đồ Bar & Radar đa tiêu chí, kết luận tự động. |
| `/community` | Bảng tin cộng đồng | Hiển thị các đánh giá thực tế đã qua kiểm duyệt, lọc theo thành phố/khu vực/chủ đề. |
| `/contribute` | Đóng góp trải nghiệm | Gửi đánh giá thực tế (Zod validate), lưu trạng thái `pending`, bảng theo dõi lịch sử gửi. |
| `/dashboard` | Trung tâm phân tích | 5 Thẻ KPI, biểu đồ tương quan giá thuê & chi phí 2 thành phố, 4 bảng xếp hạng Top 3, Heatmap bao quát. |
| `/admin` | Quản trị tổng quan | Bảng điều khiển admin demo: KPI đóng góp, biểu đồ xu hướng gửi bài và phê duyệt. |
| `/admin/areas` | Quản lý khu vực | Bảng danh sách khu vực, tìm kiếm, modal Thêm/Sửa khu vực, xác nhận xóa, nút Khôi phục Seed Data. |
| `/admin/contributions` | Kiểm duyệt đóng góp | Danh sách Pending/Approved/Rejected, nút Duyệt & Từ chối, đồng bộ tức thời với Community. |
| `/admin/reports` | Báo cáo & Xuất CSV | Tỷ lệ phê duyệt, nút tải file CSV chuẩn UTF-8 có BOM hiển thị hoàn hảo trên Microsoft Excel. |
| `/login` | Đăng nhập mô phỏng | Form đăng nhập trải nghiệm quyền quản trị client-side. |

---

## 4. Hướng dẫn Cài đặt & Khởi chạy Local

### Yêu cầu môi trường:
- Node.js >= 18.17.0 (Đã kiểm thử tối ưu trên Node v24)
- Trình quản lý gói: npm hoặc yarn/pnpm

### Các bước cài đặt:

```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Kiểm tra tính chặt chẽ TypeScript
npm run typecheck

# 3. Kiểm tra chuẩn mã nguồn
npm run lint

# 4. Chạy bộ kiểm thử tự động
npm run test

# 5. Khởi chạy máy chủ phát triển
npm run dev
```

Mở trình duyệt tại: **`http://localhost:3000`**

### Lệnh đóng gói xuất bản (Production Build):

```bash
npm run build
npm run start
```

---

## 5. Dữ liệu mẫu & Lưu ý Quan trọng

1. **Tính chất dữ liệu mẫu**:
   Tất cả số liệu giá thuê, chi phí và điểm số của 10 khu vực (Hà Nội: Cầu Giấy, Mỹ Đình, Hà Đông, Đống Đa, Long Biên; TP.HCM: Thủ Đức, Bình Thạnh, Gò Vấp, Tân Bình, Quận 7) là **dữ liệu minh họa** phục vụ trải nghiệm sản phẩm, không thay thế số liệu khảo sát thống kê nhà nước.
2. **Khôi phục dữ liệu ban đầu**:
   Người dùng có thể khôi phục toàn bộ danh sách khu vực và đánh giá về trạng thái mẫu ban đầu bằng cách truy cập `/admin/areas` và nhấn nút **"Khôi phục Seed Data"**.
3. **Cơ chế lưu trữ LocalStorage**:
   Ứng dụng hoạt động theo kiến trúc Client-first, lưu trữ trạng thái duyệt bài và khu vực người dùng tạo mới trong trình duyệt. Không yêu cầu cài đặt cơ sở dữ liệu bên ngoài.
4. **Bản đồ ngoại tuyến (Offline Fallback)**:
   Nếu không có kết nối Internet để tải các mảnh bản đồ OpenStreetMap, ứng dụng sẽ tự động kích hoạt chế độ bản đồ minh họa ngoại tuyến (`OfflineMapFallback`), các Marker và dữ liệu không gian vẫn hiển thị đầy đủ và không bao giờ crash.
