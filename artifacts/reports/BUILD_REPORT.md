# BÁO CÁO BUILD VÀ KIỂM TRA TĨNH (BUILD_REPORT.md)

> **Dự án**: StayWise — Nền tảng phân tích chi phí sinh hoạt & Lựa chọn nơi ở thông minh  
> **Thời gian thực hiện**: 22/11/2026  
> **Môi trường**: Node.js v24.21.0, npm 11.19.0, Windows 11  

---

## 1. TỔNG HỢP KẾT QUẢ CÁC LỆNH BUILD VÀ TĨNH

| Lệnh thực thi | Mục tiêu kiểm tra | Kết quả | Chi tiết đầu ra |
|---|---|:---:|---|
| `npm install` | Cài đặt các dependencies từ package.json | **PASSED** | 562 packages đã được cài đặt và kiểm toán thành công. |
| `npm run typecheck` | Kiểm tra tính chặt chẽ kiểu TypeScript (`tsc --noEmit`) | **PASSED** | 0 lỗi kiểu dữ liệu. Toàn bộ interface tuân thủ TypeScript Strict Mode. |
| `npm run lint` | Kiểm tra quy chuẩn mã nguồn ESLint (`next lint`) | **PASSED** | `✔ No ESLint warnings or errors`. 100% tuân thủ quy chuẩn Next.js. |
| `npm run test` | Chạy bộ Unit Test tự động (`vitest run`) | **PASSED** | 4/4 Test Files đạt, 10/10 Tests Passed (Thời gian chạy: ~2.8s). |
| `npm run build` | Biên dịch bản dựng sản phẩm tối ưu (`next build`) | **PASSED** | `✓ Generating static pages (16/16)`. Biên dịch thành công 16 routes. |

---

## 2. CHI TIẾT BẢN DỰNG PRODUCTION ROUTE SIZES

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    9.72 kB         120 kB
├ ○ /_not-found                          139 B            88 kB
├ ○ /admin                               8.24 kB         218 kB
├ ○ /admin/areas                         7.8 kB          134 kB
├ ○ /admin/contributions                 4.74 kB         114 kB
├ ○ /admin/reports                       5 kB            105 kB
├ ƒ /areas/[slug]                        8.76 kB         239 kB
├ ○ /calculator                          6.45 kB         229 kB
├ ○ /community                           4.85 kB         125 kB
├ ○ /compare                             9.54 kB         228 kB
├ ○ /contribute                          6.11 kB         152 kB
├ ○ /dashboard                           6.79 kB         220 kB
├ ○ /explore                             7.38 kB         123 kB
├ ○ /login                               3.03 kB         114 kB
└ ○ /recommendations                     8.19 kB         221 kB
+ First Load JS shared by all            87.9 kB
  ├ chunks/117-6dbd1cb4f021f8e8.js       31.8 kB
  ├ chunks/fd9d1056-ee66851f464c1b76.js  53.6 kB
  └ other shared chunks (total)          2.46 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## 3. KẾT LUẬN
Bản dựng hoàn toàn ổn định, không có bất kỳ warning hay error nào. Ứng dụng đã sẵn sàng vận hành trên môi trường local và phục vụ đánh giá nghiệm thu.
