import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const MD_PATH = path.join(ROOT_DIR, "staywise_report_revision", "final_report_revised.md");
const PDF_PATH = path.join(ROOT_DIR, "staywise_report_revision", "final_report_revised.pdf");

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatInline(str) {
  let s = escapeHtml(str);
  s = s.replace(/&lt;br\s*\/?&gt;/gi, "<br/>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  return s;
}

function mdToHtml(mdText) {
  const lines = mdText.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && !lines[i].startsWith("## LỜI CẢM ƠN")) {
    i++;
  }

  const out = [];
  out.push(`
    <div class="cover-page">
      <div class="cover-org">BÁO CÁO PHÂN TÍCH VÀ XÂY DỰNG SẢN PHẨM PHẦN MỀM<br/>KỸ THUẬT PHẦN MỀM &amp; PHÁT TRIỂN ỨNG DỤNG WEB</div>
      <div class="cover-spacer"></div>
      <div class="cover-type">ĐỀ TÀI NGHIÊN CỨU VÀ TRIỂN KHAI</div>
      <div class="cover-title">XÂY DỰNG NỀN TẢNG PHÂN TÍCH CHI PHÍ SINH HOẠT ĐÔ THỊ<br/>VÀ HỖ TRỢ QUYẾT ĐỊNH NƠI Ở THÔNG MINH STAYWISE</div>
      <div class="cover-sub">Urban Living Cost Analysis &amp; Housing Decision Platform (Phiên bản 1.0.0)</div>
      <div class="cover-spacer"></div>
      <div class="cover-meta">
        Thị trường mục tiêu: Hà Nội và TP. Hồ Chí Minh<br/>
        Công nghệ cốt lõi: Next.js 14 App Router • TypeScript • Tailwind CSS • Leaflet • Recharts<br/><br/>
        <strong>Hà Nội - 2026</strong>
      </div>
    </div>
  `);

  let tableRows = [];
  let inList = false;

  function flushTable() {
    if (tableRows.length === 0) return;
    const cleaned = [];
    for (const row of tableRows) {
      const cells = row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
      cleaned.push(cells);
    }
    if (cleaned.length > 0) {
      let html = "<table><thead><tr>";
      for (const h of cleaned[0]) html += `<th>${formatInline(h)}</th>`;
      html += "</tr></thead><tbody>";
      for (let r = 1; r < cleaned.length; r++) {
        html += "<tr>";
        for (let c = 0; c < cleaned[0].length; c++) {
          html += `<td>${formatInline(cleaned[r][c] || "")}</td>`;
        }
        html += "</tr>";
      }
      html += "</tbody></table>";
      out.push(html);
    }
    tableRows = [];
  }

  function flushList() {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  }

  for (; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("|")) {
      flushList();
      tableRows.push(line);
      continue;
    } else {
      flushTable();
    }

    if (!trimmed || trimmed === "---") {
      flushList();
      continue;
    }

    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushList();
      const relPath = imgMatch[2];
      const absPath = path.join(ROOT_DIR, relPath);
      if (fs.existsSync(absPath)) {
        const ext = path.extname(absPath).toLowerCase().slice(1);
        const b64 = fs.readFileSync(absPath).toString("base64");
        const isMobile = relPath.includes("mobile");
        out.push(
          `<div class="img-wrap"><img src="data:image/${ext};base64,${b64}" class="${isMobile ? "img-mobile" : "img-wide"}" /></div>`
        );
      }
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      const title = trimmed.slice(3).trim();
      const pageBreak = /^(MỞ ĐẦU|CHƯƠNG |TÀI LIỆU THAM KHẢO)/.test(title) ? "page-break" : "";
      const center = /^(LỜI CẢM ƠN|MỤC LỤC|MỞ ĐẦU|CHƯƠNG |TÀI LIỆU THAM KHẢO)/.test(title) ? "text-center" : "";
      out.push(`<h2 class="${pageBreak} ${center}">${formatInline(title)}</h2>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      out.push(`<h3>${formatInline(trimmed.slice(4).trim())}</h3>`);
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      flushList();
      out.push(`<h4>${formatInline(trimmed.slice(5).trim())}</h4>`);
      continue;
    }

    if (/^\*(Hình|Bảng)\s+\d+:.*\*$/.test(trimmed)) {
      flushList();
      out.push(`<p class="caption">${escapeHtml(trimmed.slice(1, -1))}</p>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${formatInline(trimmed.slice(2).trim())}</li>`);
      continue;
    }

    flushList();
    out.push(`<p>${formatInline(trimmed)}</p>`);
  }

  flushTable();
  flushList();

  return `<!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="utf-8" />
    <style>
      @page {
        size: A4;
        margin: 20mm 18mm 20mm 22mm;
      }
      body {
        font-family: "Times New Roman", Times, serif;
        font-size: 12pt;
        line-height: 1.45;
        color: #182230;
        margin: 0;
      }
      .cover-page {
        page-break-after: always;
        text-align: center;
        padding-top: 40px;
      }
      .cover-org { font-size: 14pt; font-weight: bold; color: #17324D; }
      .cover-spacer { height: 110px; }
      .cover-type { font-size: 15pt; font-weight: bold; color: #16A36A; margin-bottom: 14px; }
      .cover-title { font-size: 19pt; font-weight: bold; color: #17324D; line-height: 1.35; margin-bottom: 14px; }
      .cover-sub { font-size: 12.5pt; font-style: italic; color: #667085; }
      .cover-meta { font-size: 12pt; line-height: 1.6; }
      h2 { font-size: 15pt; color: #17324D; margin-top: 18px; margin-bottom: 10px; }
      h2.page-break { page-break-before: always; }
      h2.text-center { text-align: center; }
      h3 { font-size: 13pt; color: #17324D; margin-top: 14px; margin-bottom: 6px; page-break-after: avoid; }
      h4 { font-size: 12pt; color: #08734A; margin-top: 10px; margin-bottom: 4px; page-break-after: avoid; }
      p { text-align: justify; margin: 0 0 7px 0; }
      ul { margin: 4px 0 8px 0; padding-left: 22px; }
      li { margin-bottom: 4px; text-align: justify; }
      code { font-family: Consolas, monospace; font-size: 10pt; color: #08734A; background: #F1F5F9; padding: 1px 4px; border-radius: 3px; }
      .img-wrap { text-align: center; margin: 10px 0 4px 0; page-break-inside: avoid; }
      .img-wide { max-width: 100%; max-height: 460px; height: auto; border: 1px solid #E5EAF0; }
      .img-mobile { max-width: 220px; height: auto; border: 1px solid #E5EAF0; }
      .caption { text-align: center; font-style: italic; font-size: 10.5pt; color: #475569; margin-bottom: 12px; page-break-before: avoid; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0 12px 0; font-size: 10pt; }
      th { background: #17324D; color: #FFFFFF; padding: 6px 8px; border: 1px solid #CBD5E1; text-align: left; }
      td { padding: 5px 8px; border: 1px solid #CBD5E1; vertical-align: top; }
      tr:nth-child(even) td { background: #F7F9FC; }
    </style>
  </head>
  <body>${out.join("\n")}</body>
  </html>`;
}

async function main() {
  const mdText = fs.readFileSync(MD_PATH, "utf-8");
  const html = mdToHtml(mdText);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({
    path: PDF_PATH,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate:
      '<div style="width:100%;text-align:center;font-size:9pt;color:#667085;font-family:Times New Roman;">Báo cáo Sản phẩm StayWise &nbsp;|&nbsp; Trang <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });
  await browser.close();
  const stat = fs.statSync(PDF_PATH);
  console.log(`Successfully generated PDF: ${PDF_PATH} (${stat.size} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
