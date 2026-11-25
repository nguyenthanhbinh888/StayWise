# PHÂN TÍCH BÁO CÁO THAM KHẢO (`reference_report_analysis.md`)

> **Tài liệu nguồn phân tích**: Báo cáo môn học Đồ án Web — *"Xây dựng web bán quần áo (L'ATELIER & CO.)"*, Khoa Công nghệ Thông tin, Trường Đại học Kinh doanh và Công nghệ Hà Nội (2026).  
> **Mục đích**: Trích xuất cấu trúc chương mục, phong cách trình bày, quy cách bảng biểu, sơ đồ và mức độ chi tiết để làm khung chuẩn xây dựng báo cáo cho sản phẩm **StayWise**, đồng thời điều chỉnh trung thực theo kiến trúc thực tế của StayWise (Next.js App Router, Local-first, không bịa đặt Backend/MySQL).

---

## 1. Mục lục và Cấu trúc các Chương của Báo cáo Tham khảo

Báo cáo tham khảo tuân theo cấu trúc học thuật chuẩn đồ án CNTT gồm các phần sau:

1. **Trang bìa (Cover Page)**:
   - Tên đơn vị đào tạo / Khoa.
   - Tiêu đề loại báo cáo & Tên đề tài in hoa nổi bật.
   - Thông tin tác giả, địa điểm và năm thực hiện (`Hà Nội - 2026`).
2. **Lời cảm ơn**:
   - Văn phong trang trọng, nêu rõ quá trình vận dụng kiến thức, mục tiêu đề tài và công nghệ cốt lõi sử dụng.
3. **Mục lục, Danh mục Hình vẽ (`Hình 1..N`), Danh mục Bảng biểu (`Bảng 1..N`)**.
4. **MỞ ĐẦU**:
   - `1. Lý do chọn đề tài`: Nêu bối cảnh thực tế, vấn đề tồn tại khi thiếu công cụ hỗ trợ, lý do lựa chọn công nghệ.
   - `2. Mục tiêu đề tài`: Chia thành `2.1. Mục tiêu tổng quát` và `2.2. Mục tiêu cụ thể` (phân tách rõ theo mảng: Phân tích thiết kế, Backend/Logic, Frontend, Dữ liệu/Tích hợp, Kiểm thử).
   - `3. Đối tượng và phạm vi nghiên cứu`: `3.1. Đối tượng nghiên cứu` (quy trình kỹ thuật), `3.2. Phạm vi chức năng` (chia theo 2 nhóm tác nhân chính).
5. **CHƯƠNG 1. TỔNG QUAN VỀ CÔNG NGHỆ VÀ HỆ THỐNG**:
   - `1.1. Tổng quan về bài toán`: Khái niệm, đặc điểm lĩnh vực, giới thiệu hệ thống mới (chia theo khu vực người dùng & quản trị viên), mục tiêu giải quyết.
   - `1.2. Kiến trúc hệ thống`: Mô tả mô hình kiến trúc tổng thể và cách giao tiếp giữa các tầng. *(Với StayWise: điều chỉnh từ Client-Server RESTful sang kiến trúc Frontend-first / Local-first Next.js App Router + Pure Domain Services + LocalStorage)*.
   - `1.3. Công nghệ phát triển nền tảng, xử lý nghiệp vụ và lưu trữ`: Trình bày chi tiết từng công nghệ lõi (StayWise: Next.js 14 App Router, TypeScript 5 Strict, React Context & LocalStorage, Zod + React Hook Form, Pure Calculation & Recommendation Services).
   - `1.4. Công nghệ phát triển giao diện và trực quan hóa`: React 18, Tailwind CSS, Leaflet & React Leaflet, Leaflet.heat, Recharts, Lucide React, Typography Inter.
6. **CHƯƠNG 2. PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG**:
   - `2.1. Mô tả bài toán`: `2.1.1. Bối cảnh và mục tiêu nghiệp vụ`, `2.1.2. Quy trình nghiệp vụ người dùng`, `2.1.3. Quy trình nghiệp vụ quản trị viên`.
   - `2.2. Phân tích yêu cầu hệ thống`:
     - `2.2.1. Yêu cầu chức năng`: Bảng đánh mã `FR01..FRn` gồm 3 cột (`Mã | Nhóm chức năng | Nội dung yêu cầu`).
     - `2.2.2. Yêu cầu phi chức năng`: Phân tích theo từng tiêu chí (Bảo mật, Toàn vẹn dữ liệu, Dễ sử dụng, Bảo trì, Tương thích, Ổn định, Mở rộng).
   - `2.3. Phân tích tác nhân hệ thống`: Mô tả vai trò và quyền hạn từng tác nhân (Người dùng cuối, Quản trị viên, Tác nhân ngoài như OpenStreetMap Tile Server).
   - `2.4. Biểu đồ Use Case`: `2.4.1. Tổng quát`, `2.4.2. Phía quản trị viên`, `2.4.3. Phía người dùng` (kèm hình minh họa sơ đồ).
   - `2.5. Đặc tả chi tiết các Use Case chính`: Dùng mẫu bảng đặc tả chuẩn 9 trường (`Mã Use case`, `Tên Use case`, `Tác nhân`, `Mô tả`, `Sự kiện kích hoạt`, `Tiền điều kiện`, `Luồng sự kiện chính` dạng bảng 3 cột `# | Thực hiện bởi | Hành động`, `Luồng sự kiện thay thế`, `Hậu điều kiện`).
   - `2.6. Thiết kế xử lý và kiến trúc thành phần`:
     - `2.6.1. Biểu đồ trình tự (Sequence Diagram)` cho các luồng nghiệp vụ chính.
     - `2.6.2. Biểu đồ phân tích thành phần / VOPC` (View - Control - Entity/Data).
     - `2.6.3. Biểu đồ lớp / Mô hình dữ liệu tổng thể`.
   - `2.7. Thiết kế cấu trúc dữ liệu và lưu trữ`: Mô tả các thực thể dữ liệu TypeScript và cơ chế lưu trữ LocalStorage (thay thế cho MySQL trong báo cáo mẫu vì StayWise là ứng dụng Local-first không dùng CSDL quan hệ rời).
7. **CHƯƠNG 3. CHƯƠNG TRÌNH THỬ NGHIỆM VÀ KẾT QUẢ**:
   - `3.1. Giao diện và kết quả thử nghiệm phía người dùng`: Trình bày từng màn hình chức năng kèm ảnh chụp thực tế và chú thích `Hình X: ...`.
   - `3.2. Giao diện và kết quả thử nghiệm phía quản trị viên`: Trình bày từng màn hình Admin kèm ảnh chụp thực tế.
   - `3.3. Kết quả kiểm thử và đánh giá hệ thống`: Tổng hợp kết quả kiểm thử Unit Test, Build/Lint, E2E với trạng thái `PASS / FAIL / BLOCKED / NOT TESTED` và đánh giá hạn chế thực tế.
8. **TÀI LIỆU THAM KHẢO**:
   - Đánh số `[1], [2], ...` liệt kê tài liệu chính thức của các công nghệ thực sự sử dụng trong dự án.

---

## 2. Quy cách Trình bày, Đánh số và Phong cách Viết

- **Đánh số chương mục**: Chương dùng chữ hoa `CHƯƠNG 1.`, `CHƯƠNG 2.`, `CHƯƠNG 3.`; mục con dùng phân cấp số `1.1.`, `1.1.1.`, `2.5.1.`.
- **Đánh số hình ảnh & bảng biểu**: Liên tục từ đầu đến cuối báo cáo (`Hình 1: ...`, `Hình 2: ...`; `Bảng 1: ...`, `Bảng 2: ...`), có mục lục riêng.
- **Văn phong**: Khách quan, học thuật, giải thích rõ bản chất và luồng đi của dữ liệu (không chỉ liệt kê gạch đầu dòng khô khan), trung thực về giới hạn kỹ thuật (ví dụ trong mẫu nhấn mạnh việc kiểm tra quyền hay giới hạn sandbox; với StayWise nhấn mạnh giới hạn dữ liệu minh họa, khoảng cách đường chim bay và Admin Demo dùng LocalStorage).
- **Mức độ chi tiết**: Mỗi Use Case chính được đặc tả đầy đủ cả luồng chính lẫn luồng thay thế/ngoại lệ; mỗi chức năng lớn có sơ đồ minh họa và ảnh chụp màn hình thực tế.
