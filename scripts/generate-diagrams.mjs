import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIAGRAMS_DIR = path.resolve(__dirname, "..", "product_report", "evidence", "diagrams");

fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });

const baseStyles = `
  body {
    margin: 0;
    padding: 28px;
    background: #ffffff;
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    color: #182230;
  }
  .diagram-box {
    border: 1.5px solid #cbd5e1;
    border-radius: 14px;
    padding: 22px 26px;
    background: #ffffff;
    display: inline-block;
    min-width: 820px;
  }
  .title {
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    color: #17324D;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 18px;
  }
  svg {
    display: block;
    margin: 0 auto;
  }
`;

// Helper for actor stick figure SVG
function actorSvg(x, y, label) {
  return `
    <g transform="translate(${x},${y})">
      <circle cx="0" cy="-22" r="10" fill="#f8fafc" stroke="#17324D" stroke-width="2"/>
      <line x1="0" y1="-12" x2="0" y2="12" stroke="#17324D" stroke-width="2"/>
      <line x1="-14" y1="-4" x2="14" y2="-4" stroke="#17324D" stroke-width="2"/>
      <line x1="0" y1="12" x2="-10" y2="28" stroke="#17324D" stroke-width="2"/>
      <line x1="0" y1="12" x2="10" y2="28" stroke="#17324D" stroke-width="2"/>
      <text x="0" y="45" text-anchor="middle" font-size="12" font-weight="700" fill="#17324D">${label}</text>
    </g>
  `;
}

function useCaseOval(cx, cy, rx, ry, text, fill = "#E8F7EF", stroke = "#16A36A") {
  return `
    <g>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>
      <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#182230">${text}</text>
    </g>
  `;
}

const diagrams = [
  {
    file: "01_use_case_tong_quat.png",
    html: `
      <div class="diagram-box">
        <div class="title">Biểu đồ Use Case Tổng quát — Hệ thống StayWise</div>
        <svg width="820" height="540" viewBox="0 0 820 540">
          <rect x="210" y="15" width="400" height="510" rx="10" fill="#F7F9FC" stroke="#17324D" stroke-width="2"/>
          <text x="410" y="38" text-anchor="middle" font-size="13" font-weight="800" fill="#17324D">HỆ THỐNG STAYWISE (LOCAL-FIRST)</text>

          ${actorSvg(80, 175, "Người tìm nơi ở")}
          ${actorSvg(80, 415, "Quản trị viên (Demo)")}
          ${actorSvg(730, 110, "OpenStreetMap Tiles")}

          ${useCaseOval(410, 75, 135, 21, "Tìm kiếm & Khám phá bản đồ")}
          ${useCaseOval(410, 125, 135, 21, "Xem chi tiết khu vực & Tiện ích")}
          ${useCaseOval(410, 175, 135, 21, "Tính chi phí sinh hoạt")}
          ${useCaseOval(410, 225, 135, 21, "Nhận gợi ý khu vực tối ưu")}
          ${useCaseOval(410, 275, 135, 21, "So sánh đa khu vực (≤ 4)")}
          ${useCaseOval(410, 325, 135, 21, "Xem cộng đồng & Đóng góp")}
          ${useCaseOval(410, 385, 135, 21, "Quản lý khu vực (CRUD)", "#EAF0F6", "#17324D")}
          ${useCaseOval(410, 435, 135, 21, "Kiểm duyệt đóng góp (Approve/Reject)", "#EAF0F6", "#17324D")}
          ${useCaseOval(410, 485, 135, 21, "Xem báo cáo & Xuất CSV", "#EAF0F6", "#17324D")}

          <!-- Lines User -->
          <line x1="100" y1="160" x2="275" y2="75" stroke="#64748b" stroke-width="1.4"/>
          <line x1="100" y1="168" x2="275" y2="125" stroke="#64748b" stroke-width="1.4"/>
          <line x1="100" y1="175" x2="275" y2="175" stroke="#64748b" stroke-width="1.4"/>
          <line x1="100" y1="182" x2="275" y2="225" stroke="#64748b" stroke-width="1.4"/>
          <line x1="100" y1="190" x2="275" y2="275" stroke="#64748b" stroke-width="1.4"/>
          <line x1="100" y1="198" x2="275" y2="325" stroke="#64748b" stroke-width="1.4"/>

          <!-- Lines Admin -->
          <line x1="100" y1="410" x2="275" y2="385" stroke="#17324D" stroke-width="1.4"/>
          <line x1="100" y1="418" x2="275" y2="435" stroke="#17324D" stroke-width="1.4"/>
          <line x1="100" y1="426" x2="275" y2="485" stroke="#17324D" stroke-width="1.4"/>

          <!-- Line OSM -->
          <line x1="545" y1="75" x2="710" y2="105" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5,4"/>
          <line x1="545" y1="125" x2="710" y2="112" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5,4"/>
        </svg>
      </div>
    `
  },
  {
    file: "02_use_case_admin.png",
    html: `
      <div class="diagram-box">
        <div class="title">Biểu đồ Use Case Phía Quản trị viên (Admin Demo)</div>
        <svg width="760" height="390" viewBox="0 0 760 390">
          <rect x="220" y="15" width="460" height="360" rx="10" fill="#F7F9FC" stroke="#17324D" stroke-width="2"/>
          <text x="450" y="38" text-anchor="middle" font-size="13" font-weight="800" fill="#17324D">PHÂN HỆ QUẢN TRỊ STAYWISE (/admin)</text>

          ${actorSvg(95, 195, "Quản trị viên (Demo)")}

          ${useCaseOval(450, 75, 150, 20, "Đăng nhập mô phỏng (/login)", "#EAF0F6", "#17324D")}
          ${useCaseOval(450, 125, 150, 20, "Xem Dashboard KPI & Xu hướng", "#EAF0F6", "#17324D")}
          ${useCaseOval(450, 175, 150, 20, "Thêm / Sửa / Xóa khu vực", "#EAF0F6", "#17324D")}
          ${useCaseOval(450, 225, 150, 20, "Khôi phục dữ liệu mẫu (Reset Seed)", "#EAF0F6", "#17324D")}
          ${useCaseOval(450, 275, 150, 20, "Duyệt / Từ chối đóng góp cộng đồng", "#E8F7EF", "#16A36A")}
          ${useCaseOval(450, 325, 150, 20, "Xem thống kê & Xuất file CSV", "#E8F7EF", "#16A36A")}

          <line x1="115" y1="180" x2="300" y2="75" stroke="#17324D" stroke-width="1.4"/>
          <line x1="115" y1="186" x2="300" y2="125" stroke="#17324D" stroke-width="1.4"/>
          <line x1="115" y1="192" x2="300" y2="175" stroke="#17324D" stroke-width="1.4"/>
          <line x1="115" y1="198" x2="300" y2="225" stroke="#17324D" stroke-width="1.4"/>
          <line x1="115" y1="204" x2="300" y2="275" stroke="#17324D" stroke-width="1.4"/>
          <line x1="115" y1="210" x2="300" y2="325" stroke="#17324D" stroke-width="1.4"/>
        </svg>
      </div>
    `
  },
  {
    file: "03_use_case_user.png",
    html: `
      <div class="diagram-box">
        <div class="title">Biểu đồ Use Case Phía Người dùng (Sinh viên / Người đi làm)</div>
        <svg width="780" height="440" viewBox="0 0 780 440">
          <rect x="210" y="15" width="490" height="410" rx="10" fill="#F7F9FC" stroke="#16A36A" stroke-width="2"/>
          <text x="455" y="38" text-anchor="middle" font-size="13" font-weight="800" fill="#08734A">PHÂN HỆ NGƯỜI DÙNG STAYWISE</text>

          ${actorSvg(90, 220, "Người tìm nơi ở")}

          ${useCaseOval(455, 72, 165, 20, "Tìm kiếm khu vực (Autocomplete)")}
          ${useCaseOval(455, 118, 165, 20, "Lọc khu vực & Bật/Tắt Heatmap")}
          ${useCaseOval(455, 164, 165, 20, "Xem chi tiết khu vực & Tiện ích")}
          ${useCaseOval(455, 210, 165, 20, "Tính chi phí & Lưu kế hoạch")}
          ${useCaseOval(455, 256, 165, 20, "Nhận gợi ý tối ưu đa tiêu chí")}
          ${useCaseOval(455, 302, 165, 20, "So sánh tối đa 4 khu vực")}
          ${useCaseOval(455, 348, 165, 20, "Xem đánh giá cộng đồng đã duyệt")}
          ${useCaseOval(455, 394, 165, 20, "Gửi đóng góp trải nghiệm mới")}

          <line x1="110" y1="205" x2="290" y2="72" stroke="#16A36A" stroke-width="1.4"/>
          <line x1="110" y1="210" x2="290" y2="118" stroke="#16A36A" stroke-width="1.4"/>
          <line x1="110" y1="215" x2="290" y2="164" stroke="#16A36A" stroke-width="1.4"/>
          <line x1="110" y1="220" x2="290" y2="210" stroke="#16A36A" stroke-width="1.4"/>
          <line x1="110" y1="225" x2="290" y2="256" stroke="#16A36A" stroke-width="1.4"/>
          <line x1="110" y1="230" x2="290" y2="302" stroke="#16A36A" stroke-width="1.4"/>
          <line x1="110" y1="235" x2="290" y2="348" stroke="#16A36A" stroke-width="1.4"/>
          <line x1="110" y1="240" x2="290" y2="394" stroke="#16A36A" stroke-width="1.4"/>
        </svg>
      </div>
    `
  },
  {
    file: "04_system_architecture.png",
    html: `
      <div class="diagram-box">
        <div class="title">Kiến trúc Phân tầng Hệ thống StayWise (Frontend-First / Local-First)</div>
        <svg width="820" height="420" viewBox="0 0 820 420">
          <!-- Layer 1 -->
          <rect x="30" y="20" width="760" height="80" rx="10" fill="#EAF0F6" stroke="#17324D" stroke-width="1.8"/>
          <text x="50" y="45" font-size="13" font-weight="800" fill="#17324D">1. PRESENTATION LAYER (Next.js 14 App Router &amp; React 18)</text>
          <text x="50" y="68" font-size="11.5" fill="#334155">Routes: /, /explore, /areas/[slug], /calculator, /recommendations, /compare, /community, /contribute, /dashboard, /admin/*</text>
          <text x="50" y="86" font-size="11.5" fill="#475569">Shared Design System: Tailwind CSS, Lucide Icons, Common UI (Modal, Drawer, Toast, Cards, Forms)</text>

          <!-- Arrow -->
          <line x1="410" y1="100" x2="410" y2="122" stroke="#17324D" stroke-width="2"/>
          <polygon points="405,116 415,116 410,124" fill="#17324D"/>

          <!-- Layer 2 -->
          <rect x="30" y="124" width="760" height="75" rx="10" fill="#E8F7EF" stroke="#16A36A" stroke-width="1.8"/>
          <text x="50" y="149" font-size="13" font-weight="800" fill="#08734A">2. VISUALIZATION LAYER (Client-Only Dynamic Components)</text>
          <text x="50" y="172" font-size="11.5" fill="#182230">• Leaflet Map &amp; Heatmap (ssr: false) + OpenStreetMap Tiles + OfflineMapFallback</text>
          <text x="50" y="189" font-size="11.5" fill="#182230">• Recharts Interactive Charts (ExpensePieChart, BudgetBarChart, ComparisonBarChart, LivingScoreRadarChart)</text>

          <line x1="410" y1="199" x2="410" y2="221" stroke="#16A36A" stroke-width="2"/>
          <polygon points="405,215 415,215 410,223" fill="#16A36A"/>

          <!-- Layer 3 -->
          <rect x="30" y="223" width="760" height="80" rx="10" fill="#FFF4DB" stroke="#F5A623" stroke-width="1.8"/>
          <text x="50" y="248" font-size="13" font-weight="800" fill="#92400E">3. APPLICATION &amp; DOMAIN LOGIC LAYER (Pure TypeScript Services)</text>
          <text x="50" y="270" font-size="11.5" fill="#182230">• Cost Calculator (calculateMonthlyCost, calculateBudgetBreakdown) | Distance (Haversine)</text>
          <text x="50" y="288" font-size="11.5" fill="#182230">• Recommendation Engine (recommendAreas) | Comparison Highlights | Zod Validation | CSV Exporter</text>

          <line x1="410" y1="303" x2="410" y2="325" stroke="#F5A623" stroke-width="2"/>
          <polygon points="405,319 415,319 410,327" fill="#F5A623"/>

          <!-- Layer 4 -->
          <rect x="30" y="327" width="760" height="75" rx="10" fill="#F1F5F9" stroke="#475569" stroke-width="1.8"/>
          <text x="50" y="352" font-size="13" font-weight="800" fill="#1E293B">4. STATE &amp; LOCAL DATA PERSISTENCE LAYER</text>
          <text x="50" y="374" font-size="11.5" fill="#182230">• StoreContext (isHydrated flag chống SSR Hydration Mismatch) &amp; ToastContext</text>
          <text x="50" y="391" font-size="11.5" fill="#182230">• Static Seed Data (10 Areas, 29 Amenities, 10 Destinations, 6 Reviews, 7 Contributions) ↔ Browser LocalStorage</text>
        </svg>
      </div>
    `
  },
  {
    file: "05_sequence_recommendation.png",
    html: `
      <div class="diagram-box">
        <div class="title">Biểu đồ Trình tự (Sequence) — Chức năng Gợi ý Khu vực Tối ưu</div>
        <svg width="820" height="380" viewBox="0 0 820 380">
          <!-- Lifelines -->
          ${[
            { x: 90, name: "Người dùng" },
            { x: 265, name: "PreferenceForm (UI)" },
            { x: 455, name: "StoreContext" },
            { x: 645, name: "recommendAreas()" },
          ]
            .map(
              (l) => `
            <rect x="${l.x - 68}" y="15" width="136" height="34" rx="6" fill="#EAF0F6" stroke="#17324D" stroke-width="1.5"/>
            <text x="${l.x}" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#17324D">${l.name}</text>
            <line x1="${l.x}" y1="49" x2="${l.x}" y2="355" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5,4"/>
          `
            )
            .join("")}

          <!-- Steps -->
          <line x1="90" y1="85" x2="265" y2="85" stroke="#17324D" stroke-width="1.5"/>
          <polygon points="258,81 265,85 258,89" fill="#17324D"/>
          <text x="177" y="79" text-anchor="middle" font-size="11">1. Chọn TP, ngân sách, điểm đến, trọng số</text>

          <line x1="265" y1="125" x2="455" y2="125" stroke="#17324D" stroke-width="1.5"/>
          <polygon points="448,121 455,125 448,129" fill="#17324D"/>
          <text x="360" y="119" text-anchor="middle" font-size="11">2. Lấy danh sách areas hiện hành</text>

          <line x1="455" y1="160" x2="265" y2="160" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <polygon points="272,156 265,160 272,164" fill="#64748b"/>
          <text x="360" y="154" text-anchor="middle" font-size="11">3. Trả về Area[]</text>

          <line x1="265" y1="200" x2="645" y2="200" stroke="#16A36A" stroke-width="1.6"/>
          <polygon points="638,196 645,200 638,204" fill="#16A36A"/>
          <text x="455" y="194" text-anchor="middle" font-size="11" font-weight="600" fill="#08734A">4. recommendAreas(areas, preferences)</text>

          <rect x="655" y="205" width="145" height="68" rx="6" fill="#E8F7EF" stroke="#16A36A" stroke-width="1.2"/>
          <text x="663" y="222" font-size="10.5" fill="#182230">• Chuẩn hóa W1..W4 = 100%</text>
          <text x="663" y="238" font-size="10.5" fill="#182230">• Tính Budget &amp; Haversine</text>
          <text x="663" y="254" font-size="10.5" fill="#182230">• Chấm điểm 0-100 &amp; Lý do</text>
          <text x="663" y="268" font-size="10.5" fill="#182230">• Sắp xếp giảm dần</text>

          <line x1="645" y1="295" x2="265" y2="295" stroke="#16A36A" stroke-width="1.5" stroke-dasharray="4,3"/>
          <polygon points="272,291 265,295 272,299" fill="#16A36A"/>
          <text x="455" y="289" text-anchor="middle" font-size="11">5. Trả về RecommendedArea[]</text>

          <line x1="265" y1="335" x2="90" y2="335" stroke="#17324D" stroke-width="1.5" stroke-dasharray="4,3"/>
          <polygon points="97,331 90,335 97,339" fill="#17324D"/>
          <text x="177" y="329" text-anchor="middle" font-size="11">6. Hiển thị thẻ xếp hạng &amp; Biểu đồ Top 5</text>
        </svg>
      </div>
    `
  },
  {
    file: "06_sequence_contribute_moderation.png",
    html: `
      <div class="diagram-box">
        <div class="title">Biểu đồ Trình tự — Đóng góp Dữ liệu &amp; Kiểm duyệt Admin</div>
        <svg width="820" height="400" viewBox="0 0 820 400">
          ${[
            { x: 80, name: "Người dùng" },
            { x: 245, name: "/contribute (Zod)" },
            { x: 425, name: "Store & LocalStorage" },
            { x: 600, name: "/admin/contributions" },
            { x: 750, name: "/community" },
          ]
            .map(
              (l) => `
            <rect x="${l.x - 65}" y="15" width="130" height="34" rx="6" fill="#EAF0F6" stroke="#17324D" stroke-width="1.4"/>
            <text x="${l.x}" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="#17324D">${l.name}</text>
            <line x1="${l.x}" y1="49" x2="${l.x}" y2="375" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="5,4"/>
          `
            )
            .join("")}

          <line x1="80" y1="85" x2="245" y2="85" stroke="#17324D" stroke-width="1.4"/>
          <polygon points="238,81 245,85 238,89" fill="#17324D"/>
          <text x="162" y="79" text-anchor="middle" font-size="10.5">1. Nhập form &amp; Submit</text>

          <line x1="245" y1="125" x2="425" y2="125" stroke="#F5A623" stroke-width="1.5"/>
          <polygon points="418,121 425,125 418,129" fill="#F5A623"/>
          <text x="335" y="119" text-anchor="middle" font-size="10.5">2. Validate Zod → status = "pending"</text>

          <line x1="425" y1="160" x2="245" y2="160" stroke="#64748b" stroke-width="1.3" stroke-dasharray="4,3"/>
          <polygon points="252,156 245,160 252,164" fill="#64748b"/>
          <text x="335" y="154" text-anchor="middle" font-size="10.5">3. Toast thành công &amp; Lịch sử cá nhân</text>

          <line x1="600" y1="210" x2="425" y2="210" stroke="#17324D" stroke-width="1.5"/>
          <polygon points="432,206 425,210 432,214" fill="#17324D"/>
          <text x="512" y="204" text-anchor="middle" font-size="10.5">4. Admin lọc Pending &amp; bấm Duyệt</text>

          <line x1="425" y1="255" x2="600" y2="255" stroke="#16A36A" stroke-width="1.5" stroke-dasharray="4,3"/>
          <polygon points="593,251 600,255 593,259" fill="#16A36A"/>
          <text x="512" y="249" text-anchor="middle" font-size="10.5" fill="#08734A">5. Cập nhật status = "approved"</text>

          <line x1="750" y1="305" x2="425" y2="305" stroke="#16A36A" stroke-width="1.5"/>
          <polygon points="432,301 425,305 432,309" fill="#16A36A"/>
          <text x="587" y="299" text-anchor="middle" font-size="10.5">6. Truy vấn contributions (status === "approved")</text>

          <line x1="425" y1="345" x2="750" y2="345" stroke="#16A36A" stroke-width="1.5" stroke-dasharray="4,3"/>
          <polygon points="743,341 750,345 743,349" fill="#16A36A"/>
          <text x="587" y="339" text-anchor="middle" font-size="10.5">7. Hiển thị bài đóng góp công khai</text>
        </svg>
      </div>
    `
  },
  {
    file: "07_data_model_erd.png",
    html: `
      <div class="diagram-box">
        <div class="title">Mô hình Dữ liệu &amp; Quan hệ Thực thể Cục bộ (TypeScript + LocalStorage)</div>
        <svg width="820" height="410" viewBox="0 0 820 410">
          <!-- Area Box -->
          <rect x="290" y="20" width="240" height="175" rx="8" fill="#FFFFFF" stroke="#17324D" stroke-width="2"/>
          <rect x="290" y="20" width="240" height="28" rx="6" fill="#17324D"/>
          <text x="410" y="39" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">Area (staywise_areas)</text>
          <text x="302" y="65" font-size="11" fill="#182230">🔑 id: string | slug: string</text>
          <text x="302" y="83" font-size="11" fill="#182230">• name, city ("hanoi"|"hcm"), displayCity</text>
          <text x="302" y="101" font-size="11" fill="#182230">• latitude, longitude: number</text>
          <text x="302" y="119" font-size="11" fill="#182230">• rent: { min, max, average }</text>
          <text x="302" y="137" font-size="11" fill="#182230">• monthlyExpenses: { food, transport, ... }</text>
          <text x="302" y="155" font-size="11" fill="#182230">• livingScores: { safety, quietness, ... }</text>
          <text x="302" y="173" font-size="11" fill="#182230">• amenities: AmenityCounts</text>

          <!-- AmenityItem -->
          <rect x="25" y="40" width="205" height="115" rx="8" fill="#FFFFFF" stroke="#16A36A" stroke-width="1.6"/>
          <rect x="25" y="40" width="205" height="26" rx="6" fill="#16A36A"/>
          <text x="127" y="57" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">AmenityItem (Tiện ích)</text>
          <text x="35" y="82" font-size="11">🔑 id: string</text>
          <text x="35" y="100" font-size="11">🔗 areaId: string</text>
          <text x="35" y="118" font-size="11">• name, category, distanceKm</text>
          <text x="35" y="136" font-size="11">• latitude, longitude</text>

          <!-- AreaReview -->
          <rect x="590" y="40" width="205" height="115" rx="8" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.6"/>
          <rect x="590" y="40" width="205" height="26" rx="6" fill="#3B82F6"/>
          <text x="692" y="57" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">AreaReview (Mẫu)</text>
          <text x="600" y="82" font-size="11">🔑 id: string</text>
          <text x="600" y="100" font-size="11">🔗 areaId: string</text>
          <text x="600" y="118" font-size="11">• authorName, overallRating</text>
          <text x="600" y="136" font-size="11">• security..utilityRating, content</text>

          <!-- Contribution -->
          <rect x="45" y="250" width="245" height="135" rx="8" fill="#FFFFFF" stroke="#F5A623" stroke-width="1.8"/>
          <rect x="45" y="250" width="245" height="26" rx="6" fill="#F5A623"/>
          <text x="167" y="267" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">Contribution (staywise_contributions)</text>
          <text x="55" y="292" font-size="11">🔑 id: string</text>
          <text x="55" y="310" font-size="11">🔗 areaId: string</text>
          <text x="55" y="328" font-size="11">• authorName, category, rating (1-5)</text>
          <text x="55" y="346" font-size="11">• status: "pending"|"approved"|"rejected"</text>
          <text x="55" y="364" font-size="11">• content, createdAt, updatedAt</text>

          <!-- Destination -->
          <rect x="330" y="260" width="200" height="115" rx="8" fill="#FFFFFF" stroke="#64748b" stroke-width="1.6"/>
          <rect x="330" y="260" width="200" height="26" rx="6" fill="#475569"/>
          <text x="430" y="277" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">Destination (Điểm đến)</text>
          <text x="340" y="302" font-size="11">🔑 id: string</text>
          <text x="340" y="320" font-size="11">• name, city ("hanoi"|"hcm")</text>
          <text x="340" y="338" font-size="11">• category (university/workplace)</text>
          <text x="340" y="356" font-size="11">• latitude, longitude</text>

          <!-- LocalStorage State -->
          <rect x="570" y="250" width="225" height="135" rx="8" fill="#F8FAFC" stroke="#17324D" stroke-width="1.6"/>
          <rect x="570" y="250" width="225" height="26" rx="6" fill="#17324D"/>
          <text x="682" y="267" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">LocalStorage Keys</text>
          <text x="580" y="292" font-size="10.5">• staywise_areas (Area[])</text>
          <text x="580" y="310" font-size="10.5">• staywise_contributions</text>
          <text x="580" y="328" font-size="10.5">• staywise_comparison_ids (≤4)</text>
          <text x="580" y="346" font-size="10.5">• staywise_saved_calculator_plan</text>
          <text x="580" y="364" font-size="10.5">• resetAll() → Khôi phục Seed Data</text>

          <!-- Relations -->
          <line x1="230" y1="95" x2="290" y2="95" stroke="#16A36A" stroke-width="1.6"/>
          <text x="260" y="88" text-anchor="middle" font-size="10" font-weight="700" fill="#16A36A">N : 1</text>

          <line x1="530" y1="95" x2="590" y2="95" stroke="#3B82F6" stroke-width="1.6"/>
          <text x="560" y="88" text-anchor="middle" font-size="10" font-weight="700" fill="#3B82F6">1 : N</text>

          <line x1="240" y1="250" x2="340" y2="195" stroke="#F5A623" stroke-width="1.6"/>
          <text x="275" y="218" text-anchor="middle" font-size="10" font-weight="700" fill="#B45309">N : 1</text>

          <line x1="430" y1="260" x2="430" y2="195" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4,3"/>
          <text x="462" y="232" text-anchor="middle" font-size="10" fill="#475569">Haversine</text>
        </svg>
      </div>
    `
  }
];

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  for (const d of diagrams) {
    await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head><body>${d.html}</body></html>`);
    const el = await page.$(".diagram-box");
    const outPath = path.join(DIAGRAMS_DIR, d.file);
    await el.screenshot({ path: outPath });
    console.log("Generated diagram:", outPath);
  }

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
