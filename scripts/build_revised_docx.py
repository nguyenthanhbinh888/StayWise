import re
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR / "scripts"))

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
import build_docx as base_builder

ORIG_MD = ROOT_DIR / "product_report" / "final_report.md"
REV_DIR = ROOT_DIR / "staywise_report_revision"
REV_MD = REV_DIR / "final_report_revised.md"
REV_DOCX = REV_DIR / "final_report_revised.docx"
RENDERED_DIR = REV_DIR / "diagrams" / "rendered"


def build_revised_markdown() -> str:
    text = ORIG_MD.read_text(encoding="utf-8")
    text = text.replace("(evidence/diagrams/", "(product_report/evidence/diagrams/")

    # 1. Update Mục lục entries for 2.6 to reflect VOPC and Overall Class Diagram
    text = text.replace(
        "  - 2.6. Thiết kế kiến trúc và luồng xử lý\n",
        "  - 2.6. Thiết kế kiến trúc, luồng xử lý và biểu đồ lớp UML\n",
    )

    # 2. Replace Sections 2.6 and 2.7 with refactored UML diagrams & descriptions
    sec_26_start = text.index("### 2.6. Thiết kế kiến trúc và luồng xử lý")
    sec_3_start = text.index("## CHƯƠNG 3. CHƯƠNG TRÌNH THỬ NGHIỆM VÀ KẾT QUẢ")

    new_26_27 = f"""### 2.6. Thiết kế kiến trúc, luồng xử lý và biểu đồ lớp UML

#### 2.6.1. Kiến trúc phân tầng hệ thống
![Kiến trúc phân tầng hệ thống StayWise](product_report/evidence/diagrams/04_system_architecture.png)

*Hình 4: Kiến trúc phân tầng hệ thống StayWise (Frontend-first / Local-first)*

#### 2.6.2. Biểu đồ trình tự (Sequence Diagram) — Chức năng gợi ý khu vực tối ưu (UC_04)
Người dùng tương tác với `PreferenceForm` để cấu hình thành phố, ngân sách tối đa, trần giá thuê, điểm đến và 4 trọng số ưu tiên. `RecommendationsPage` lấy danh sách khu vực từ `StoreContext` và gọi hàm `recommendAreas(areas, preferences)` thuộc module `RecommendationEngine`. Thuật toán chuẩn hóa trọng số về 100%, gọi `calculateAreaTotalCost()` và `calculateDistance()` (Haversine) để chấm điểm thang 0–100, sắp xếp giảm dần và trả về `RecommendedArea[]`. Giao diện rẽ nhánh `alt`: hiển thị danh sách `RecommendationCard` cùng biểu đồ Top 5 nếu có kết quả, hoặc `EmptyState` nếu danh sách rỗng.

![Biểu đồ trình tự chức năng gợi ý khu vực tối ưu](staywise_report_revision/diagrams/rendered/sequence_recommendation.png)

*Hình 5: Biểu đồ Trình tự (`UC_04`) — Gợi ý khu vực tối ưu đa tiêu chí*

#### 2.6.3. Biểu đồ trình tự (Sequence Diagram) — Đóng góp dữ liệu và kiểm duyệt cộng đồng (UC_06)
Để tách bạch rõ trách nhiệm giữa thành phần xác thực đầu vào (`contributionFormSchema` - Zod), thành phần quản lý trạng thái (`StoreContext`), lớp lưu trữ (`storageService` / `localStorage`) và tác nhân quản trị (`Admin`), nghiệp vụ `UC_06` được tách thành hai biểu đồ trình tự riêng biệt:

**a) Luồng A — Người dùng gửi đóng góp trải nghiệm**
`ContributionForm` kiểm tra đầu vào qua `zodResolver(contributionFormSchema)`. Nếu dữ liệu không hợp lệ, hệ thống trả về lỗi ngay dưới từng trường và không lưu dữ liệu. Nếu hợp lệ, `ContributePage` gọi `StoreContext.submitContribution(data)` tạo bản ghi `Contribution` với `status = "pending"`, lưu vào `localStorage` thông qua `storageService.saveContributions()`, hiển thị thông báo Toast và cập nhật lịch sử đóng góp cá nhân.

![Biểu đồ trình tự luồng A người dùng gửi đóng góp](staywise_report_revision/diagrams/rendered/sequence_contribution.png)

*Hình 6: Biểu đồ Trình tự (`UC_06` — Luồng A) — Người dùng gửi đóng góp trải nghiệm*

**b) Luồng B — Admin kiểm duyệt và Community hiển thị**
Tác nhân `Quản trị viên (Admin Demo)` truy cập `AdminContributionsPage`, nơi lấy dữ liệu từ `StoreContext` (đã hydrate từ `storageService.getContributions()`) và lọc các bài `pending`. Khi Admin bấm Duyệt hoặc Từ chối, `StoreContext` gọi `approveContribution(id)` hoặc `rejectContribution(id)` và ghi lại vào `localStorage`. Khi người dùng truy cập `CommunityPage`, hệ thống chỉ lọc và hiển thị các bản ghi có `status === "approved"`.

![Biểu đồ trình tự luồng B Admin kiểm duyệt và Community hiển thị](staywise_report_revision/diagrams/rendered/sequence_admin_moderation.png)

*Hình 7: Biểu đồ Trình tự (`UC_06` — Luồng B) — Admin kiểm duyệt và Cộng đồng hiển thị*

#### 2.6.4. Biểu đồ lớp phân tích VOPC (View of Participating Classes)
Do StayWise xây dựng trên nền tảng React và TypeScript theo kiến trúc Frontend-first, các thành phần tham gia hiện thực hóa Use Case được phân biệt rõ bằng các stereotype `<<boundary>>` (React Page/Form/Card Component), `<<control>>` (React Context và các module nghiệp vụ thuần) và `<<entity>>` (Domain TypeScript interfaces).

**a) VOPC cho UC_04 — Gợi ý khu vực tối ưu**
Thể hiện các thành phần tham gia trực tiếp vào luồng gợi ý trong Hình 5: `RecommendationsPage`, `PreferenceForm`, `RecommendationCard`, `StoreContext`, `RecommendationEngine`, `CostCalculator`, `DistanceCalculator` cùng các thực thể `Area`, `Destination`, `RecommendationPreferences` và `RecommendedArea`.

![Biểu đồ VOPC UC_04 Gợi ý khu vực tối ưu](staywise_report_revision/diagrams/rendered/vopc_recommendation.png)

*Hình 8: Biểu đồ lớp phân tích VOPC (`UC_04`) — Gợi ý khu vực tối ưu*

**b) VOPC cho UC_06 — Đóng góp dữ liệu và kiểm duyệt cộng đồng**
Thể hiện các thành phần tham gia vào vòng đời đóng góp và kiểm duyệt trong Hình 6 và Hình 7: `ContributePage`, `ContributionForm`, `AdminContributionsPage`, `CommunityPage`, `ContributionValidator`, `StoreContext`, `ToastContext`, `storageService`, cùng thực thể `Contribution` tham chiếu `Area` qua `areaId`.

![Biểu đồ VOPC UC_06 Đóng góp và kiểm duyệt](staywise_report_revision/diagrams/rendered/vopc_contribution_moderation.png)

*Hình 9: Biểu đồ lớp phân tích VOPC (`UC_06`) — Đóng góp dữ liệu và kiểm duyệt cộng đồng*

#### 2.6.5. Biểu đồ lớp tổng thể (Overall UML Class Diagram)
Biểu đồ lớp tổng thể tổng hợp kiến trúc toàn hệ thống StayWise theo 4 package: `Presentation Layer` (các trang Next.js App Router, form tương tác, bản đồ `LeafletMap` và Context), `Application & Domain Logic` (các module tính toán, gợi ý, kiểm tra hợp lệ Zod và xuất CSV), `Domain Models` (các thực thể dữ liệu) và `Data Persistence` (`storageService` và `SeedData`).

![Biểu đồ lớp tổng thể hệ thống StayWise](staywise_report_revision/diagrams/rendered/overall_class_diagram.png)

*Hình 10: Biểu đồ Lớp Tổng thể (Overall UML Class Diagram) — Hệ thống StayWise*

### 2.7. Thiết kế cấu trúc dữ liệu và lưu trữ cục bộ
Mô hình dữ liệu cục bộ mô tả cấu trúc các thực thể TypeScript và quan hệ tham chiếu qua khóa `areaId` (`Area` liên kết `1` với `0..*` tới `AmenityItem`, `AreaReview` và `Contribution`). Thực thể `Destination` không có quan hệ khóa ngoại lưu trữ với `Area` mà chỉ cung cấp tọa độ cho hàm `calculateDistance()` (Haversine). Cơ chế lưu trữ `localStorage` được biểu diễn dưới dạng chú thích ngoài mô hình thực thể thông qua 4 khóa: `staywise_areas`, `staywise_contributions`, `staywise_comparison_ids` và `staywise_saved_calculator_plan`.

![Mô hình dữ liệu cục bộ hệ thống StayWise](staywise_report_revision/diagrams/rendered/staywise_data_model.png)

*Hình 11: Mô hình Dữ liệu Cục bộ (Data Model) — Hệ thống StayWise*

Bộ dữ liệu mẫu ban đầu gồm 10 khu vực tham chiếu (dữ liệu minh họa, đơn vị triệu đồng/tháng) trong `src/data/areas.ts`:

| Khu vực (`id`) | Thành phố | Tọa độ (Lat, Lng) | Thuê TB | Ăn uống | Đi lại | Điện/Nước/Net | Khác | Tổng CP tính toán |
|---|---|---|---:|---:|---:|---:|---:|---:|
| Cầu Giấy (`cau-giay`) | Hà Nội | `21.030, 105.790` | 4.20 | 2.60 | 0.80 | 0.65 | 1.10 | **9.35** |
| Mỹ Đình (`my-dinh`) | Hà Nội | `21.028, 105.770` | 3.80 | 2.50 | 0.85 | 0.65 | 1.00 | **8.80** |
| Hà Đông (`ha-dong`) | Hà Nội | `20.971, 105.779` | 3.20 | 2.40 | 0.90 | 0.62 | 0.95 | **8.07** |
| Đống Đa (`dong-da`) | Hà Nội | `21.018, 105.826` | 4.50 | 2.80 | 0.75 | 0.70 | 1.20 | **9.95** |
| Long Biên (`long-bien`) | Hà Nội | `21.046, 105.895` | 3.30 | 2.50 | 0.90 | 0.65 | 1.00 | **8.35** |
| Thủ Đức (`thu-duc`) | TP.HCM | `10.850, 106.770` | 3.80 | 2.80 | 1.00 | 0.70 | 1.20 | **9.50** |
| Bình Thạnh (`binh-thanh`) | TP.HCM | `10.810, 106.710` | 4.60 | 2.90 | 0.85 | 0.72 | 1.20 | **10.27** |
| Gò Vấp (`go-vap`) | TP.HCM | `10.840, 106.670` | 3.30 | 2.60 | 1.00 | 0.65 | 1.00 | **8.55** |
| Tân Bình (`tan-binh`) | TP.HCM | `10.800, 106.650` | 4.20 | 2.80 | 0.85 | 0.70 | 1.15 | **9.70** |
| Khu vực Quận 7 (`quan-7`) | TP.HCM | `10.730, 106.720` | 4.80 | 3.00 | 0.90 | 0.75 | 1.30 | **10.75** |

*Bảng 9: Bộ dữ liệu tham chiếu 10 khu vực trong hệ thống StayWise (Dữ liệu minh họa)*

"""

    ch3_text = text[sec_3_start:]
    # 3. Prefix Chapter 3 screenshot paths so they resolve from ROOT_DIR
    ch3_text = ch3_text.replace("(evidence/screenshots/", "(product_report/evidence/screenshots/")

    # 4. Shift Figure numbers in Chapter 3 by +4 (Hình 8..21 -> Hình 12..25)
    def shift_fig(match):
        num = int(match.group(1))
        return f"*Hình {num + 4}:"

    ch3_text = re.sub(r"\*Hình\s+(\d+):", shift_fig, ch3_text)

    revised = text[:sec_26_start] + new_26_27 + ch3_text
    REV_MD.write_text(revised, encoding="utf-8")
    return revised


def main():
    build_revised_markdown()

    doc = Document()
    for section in doc.sections:
        section.top_margin = Inches(0.9)
        section.bottom_margin = Inches(0.9)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(0.85)
        base_builder.add_page_number_footer(section)

    normal_style = doc.styles["Normal"]
    normal_style.font.name = "Times New Roman"
    normal_style.font.size = Pt(12)
    normal_style.paragraph_format.line_spacing = 1.25
    normal_style.paragraph_format.space_after = Pt(5)

    base_builder.build_cover_page(doc)

    lines = REV_MD.read_text(encoding="utf-8").splitlines()
    i = 0
    while i < len(lines) and not lines[i].startswith("## LỜI CẢM ƠN"):
        i += 1

    table_buffer = []

    while i < len(lines):
        line = lines[i]

        if table_buffer and not line.strip().startswith("|"):
            base_builder.add_styled_table(doc, table_buffer)
            table_buffer = []

        if line.strip().startswith("|"):
            table_buffer.append(line)
            i += 1
            continue

        stripped = line.strip()
        if not stripped or stripped == "---":
            i += 1
            continue

        img_match = re.match(r"^!\[([^\]]*)\]\(([^)]+)\)$", stripped)
        if img_match:
            rel_path = img_match.group(2)
            img_path = ROOT_DIR / rel_path
            if img_path.exists():
                p_img = doc.add_paragraph()
                p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p_img.paragraph_format.space_before = Pt(6)
                p_img.paragraph_format.space_after = Pt(2)
                if "mobile" in rel_path:
                    width = Inches(2.8)
                elif "overall_class_diagram" in rel_path or "vopc_recommendation" in rel_path:
                    width = Inches(6.5)
                else:
                    width = Inches(6.1)
                p_img.add_run().add_picture(str(img_path), width=width)
            else:
                p_miss = doc.add_paragraph(f"[Thiếu ảnh: {rel_path}]")
                p_miss.alignment = WD_ALIGN_PARAGRAPH.CENTER
            i += 1
            continue

        if stripped.startswith("## "):
            heading_text = stripped[3:].strip()
            if any(heading_text.startswith(prefix) for prefix in ["MỞ ĐẦU", "CHƯƠNG ", "TÀI LIỆU THAM KHẢO"]):
                doc.add_page_break()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(12)
            p.paragraph_format.space_after = Pt(6)
            if heading_text in ["LỜI CẢM ƠN", "MỤC LỤC", "MỞ ĐẦU", "TÀI LIỆU THAM KHẢO"] or heading_text.startswith("CHƯƠNG "):
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(heading_text)
            r.bold = True
            r.font.name = "Times New Roman"
            r.font.size = Pt(15)
            r.font.color.rgb = RGBColor(23, 50, 77)
            i += 1
            continue

        if stripped.startswith("### "):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after = Pt(4)
            r = p.add_run(stripped[4:].strip())
            r.bold = True
            r.font.name = "Times New Roman"
            r.font.size = Pt(13.5)
            r.font.color.rgb = RGBColor(23, 50, 77)
            i += 1
            continue

        if stripped.startswith("#### "):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(8)
            p.paragraph_format.space_after = Pt(3)
            r = p.add_run(stripped[5:].strip())
            r.bold = True
            r.font.name = "Times New Roman"
            r.font.size = Pt(12.5)
            r.font.color.rgb = RGBColor(8, 115, 74)
            i += 1
            continue

        if re.match(r"^\*(Hình|Bảng)\s+\d+:.*\*$", stripped):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(8)
            r = p.add_run(stripped.strip("*"))
            r.italic = True
            r.font.name = "Times New Roman"
            r.font.size = Pt(11)
            r.font.color.rgb = RGBColor(71, 85, 105)
            i += 1
            continue

        if stripped.startswith("- "):
            p = doc.add_paragraph(style="List Bullet")
            p.paragraph_format.space_after = Pt(3)
            base_builder.add_formatted_runs(p, stripped[2:].strip(), base_size=12)
            i += 1
            continue

        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        base_builder.add_formatted_runs(p, stripped, base_size=12)
        i += 1

    if table_buffer:
        base_builder.add_styled_table(doc, table_buffer)

    doc.save(str(REV_DOCX))
    print(f"Generated revised DOCX: {REV_DOCX} ({REV_DOCX.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
