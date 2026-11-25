import os
import re
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

ROOT_DIR = Path(__file__).resolve().parent.parent
REPORT_DIR = ROOT_DIR / "product_report"
MD_PATH = REPORT_DIR / "final_report.md"
DOCX_PATH = REPORT_DIR / "final_report.docx"


def set_cell_shading(cell, fill_hex):
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading)


def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement("w:tcMar")
    for m, val in [("top", top), ("bottom", bottom), ("left", left), ("right", right)]:
        node = OxmlElement(f"w:{m}")
        node.set(qn("w:w"), str(val))
        node.set(qn("w:type"), "dxa")
        tcMar.append(node)
    tcPr.append(tcMar)


def add_page_number_footer(section):
    footer = section.footer
    p = footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_pre = p.add_run("Báo cáo Sản phẩm StayWise  |  Trang ")
    run_pre.font.name = "Times New Roman"
    run_pre.font.size = Pt(10)
    run_pre.font.color.rgb = RGBColor(102, 112, 133)

    fldChar1 = parse_xml(r'<w:fldChar %s w:fldCharType="begin"/>' % nsdecls("w"))
    instrText = parse_xml(r'<w:instrText %s xml:space="preserve"> PAGE </w:instrText>' % nsdecls("w"))
    fldChar2 = parse_xml(r'<w:fldChar %s w:fldCharType="separate"/>' % nsdecls("w"))
    fldChar3 = parse_xml(r'<w:fldChar %s w:fldCharType="end"/>' % nsdecls("w"))
    run_pg = p.add_run()
    run_pg.font.name = "Times New Roman"
    run_pg.font.size = Pt(10)
    run_pg._r.append(fldChar1)
    run_pg._r.append(instrText)
    run_pg._r.append(fldChar2)
    run_pg._r.append(fldChar3)


def add_formatted_runs(paragraph, text, base_size=12, base_color=RGBColor(24, 34, 48)):
    # Clean inline HTML <br> to newline
    text = text.replace("<br>", "\n").replace("<br/>", "\n")
    # Parse **bold**, *italic*, `code`
    tokens = re.split(r"(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)", text)
    for tok in tokens:
        if not tok:
            continue
        if tok.startswith("**") and tok.endswith("**"):
            r = paragraph.add_run(tok[2:-2])
            r.bold = True
            r.font.name = "Times New Roman"
            r.font.size = Pt(base_size)
            r.font.color.rgb = base_color
        elif tok.startswith("*") and tok.endswith("*"):
            r = paragraph.add_run(tok[1:-1])
            r.italic = True
            r.font.name = "Times New Roman"
            r.font.size = Pt(base_size)
            r.font.color.rgb = base_color
        elif tok.startswith("`") and tok.endswith("`"):
            r = paragraph.add_run(tok[1:-1])
            r.font.name = "Consolas"
            r.font.size = Pt(max(10, base_size - 1))
            r.font.color.rgb = RGBColor(8, 115, 74)
        else:
            r = paragraph.add_run(tok)
            r.font.name = "Times New Roman"
            r.font.size = Pt(base_size)
            r.font.color.rgb = base_color


def add_styled_table(doc, rows):
    if not rows:
        return
    # Remove separator row (e.g., |---|---|)
    cleaned_rows = []
    for r in rows:
        cells = [c.strip() for c in r.strip().strip("|").split("|")]
        if all(re.match(r"^:?-+:?$", c) for c in cells):
            continue
        cleaned_rows.append(cells)

    if not cleaned_rows:
        return

    num_cols = max(len(r) for r in cleaned_rows)
    table = doc.add_table(rows=len(cleaned_rows), cols=num_cols)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    for i, row_cells in enumerate(cleaned_rows):
        row = table.rows[i]
        for j in range(num_cols):
            cell = row.cells[j]
            val = row_cells[j] if j < len(row_cells) else ""
            cell.text = ""
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            set_cell_margins(cell, top=70, bottom=70, left=100, right=100)

            if i == 0:
                set_cell_shading(cell, "17324D")
                add_formatted_runs(p, val, base_size=10.5, base_color=RGBColor(255, 255, 255))
                for r in p.runs:
                    r.bold = True
            else:
                if i % 2 == 0:
                    set_cell_shading(cell, "F7F9FC")
                add_formatted_runs(p, val, base_size=10.5, base_color=RGBColor(24, 34, 48))

    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_after = Pt(4)


def build_cover_page(doc):
    for _ in range(2):
        doc.add_paragraph()

    p_org = doc.add_paragraph()
    p_org.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_org = p_org.add_run("BÁO CÁO PHÂN TÍCH VÀ XÂY DỰNG SẢN PHẨM PHẦN MỀM\nKỸ THUẬT PHẦN MỀM & PHÁT TRIỂN ỨNG DỤNG WEB")
    r_org.bold = True
    r_org.font.name = "Times New Roman"
    r_org.font.size = Pt(14)
    r_org.font.color.rgb = RGBColor(23, 50, 77)

    for _ in range(3):
        doc.add_paragraph()

    p_type = doc.add_paragraph()
    p_type.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_type = p_type.add_run("ĐỀ TÀI NGHIÊN CỨU VÀ TRIỂN KHAI")
    r_type.bold = True
    r_type.font.name = "Times New Roman"
    r_type.font.size = Pt(16)
    r_type.font.color.rgb = RGBColor(22, 163, 106)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(12)
    p_title.paragraph_format.space_after = Pt(18)
    r_title = p_title.add_run("XÂY DỰNG NỀN TẢNG PHÂN TÍCH CHI PHÍ SINH HOẠT ĐÔ THỊ\nVÀ HỖ TRỢ QUYẾT ĐỊNH NƠI Ở THÔNG MINH STAYWISE")
    r_title.bold = True
    r_title.font.name = "Times New Roman"
    r_title.font.size = Pt(20)
    r_title.font.color.rgb = RGBColor(23, 50, 77)

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run("Urban Living Cost Analysis & Housing Decision Platform (Phiên bản 1.0.0)")
    r_sub.italic = True
    r_sub.font.name = "Times New Roman"
    r_sub.font.size = Pt(13)
    r_sub.font.color.rgb = RGBColor(102, 112, 133)

    for _ in range(5):
        doc.add_paragraph()

    p_meta = doc.add_paragraph()
    p_meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_meta = p_meta.add_run(
        "Thị trường mục tiêu: Hà Nội và TP. Hồ Chí Minh\n"
        "Công nghệ cốt lõi: Next.js 14 App Router • TypeScript • Tailwind CSS • Leaflet • Recharts\n\n"
        "Hà Nội - 2026"
    )
    r_meta.font.name = "Times New Roman"
    r_meta.font.size = Pt(12.5)
    r_meta.font.color.rgb = RGBColor(24, 34, 48)

    doc.add_page_break()


def main():
    doc = Document()

    # Configure page margins & normal style
    for section in doc.sections:
        section.top_margin = Inches(0.9)
        section.bottom_margin = Inches(0.9)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(0.85)
        add_page_number_footer(section)

    normal_style = doc.styles["Normal"]
    normal_style.font.name = "Times New Roman"
    normal_style.font.size = Pt(12)
    normal_style.paragraph_format.line_spacing = 1.25
    normal_style.paragraph_format.space_after = Pt(5)

    build_cover_page(doc)

    lines = MD_PATH.read_text(encoding="utf-8").splitlines()
    i = 0
    # Skip top title header block until LỜI CẢM ƠN
    while i < len(lines) and not lines[i].startswith("## LỜI CẢM ƠN"):
        i += 1

    table_buffer = []

    while i < len(lines):
        line = lines[i]

        # Flush table if leaving table block
        if table_buffer and not line.strip().startswith("|"):
            add_styled_table(doc, table_buffer)
            table_buffer = []

        if line.strip().startswith("|"):
            table_buffer.append(line)
            i += 1
            continue

        stripped = line.strip()

        if not stripped or stripped == "---":
            i += 1
            continue

        # Image line: ![alt](path)
        img_match = re.match(r"^!\[([^\]]*)\]\(([^)]+)\)$", stripped)
        if img_match:
            alt_text = img_match.group(1)
            rel_path = img_match.group(2)
            img_path = REPORT_DIR / rel_path
            if img_path.exists():
                p_img = doc.add_paragraph()
                p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p_img.paragraph_format.space_before = Pt(6)
                p_img.paragraph_format.space_after = Pt(2)
                width = Inches(2.8) if "mobile" in rel_path else Inches(6.1)
                p_img.add_run().add_picture(str(img_path), width=width)
            else:
                p_miss = doc.add_paragraph(f"[Thiếu ảnh: {rel_path}]")
                p_miss.alignment = WD_ALIGN_PARAGRAPH.CENTER
            i += 1
            continue

        # Headings
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

        # Caption line (*Hình X: ...* or *Bảng X: ...*)
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

        # Bullet list
        if stripped.startswith("- "):
            p = doc.add_paragraph(style="List Bullet")
            p.paragraph_format.space_after = Pt(3)
            add_formatted_runs(p, stripped[2:].strip(), base_size=12)
            i += 1
            continue

        # Normal paragraph
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        add_formatted_runs(p, stripped, base_size=12)
        i += 1

    if table_buffer:
        add_styled_table(doc, table_buffer)

    doc.save(str(DOCX_PATH))
    print(f"Successfully generated DOCX: {DOCX_PATH} ({DOCX_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
