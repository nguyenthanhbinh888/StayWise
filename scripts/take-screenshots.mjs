import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "http://localhost:3000";
const ROOT_DIR = path.resolve(__dirname, "..");
const SCREENSHOTS_DIR = path.join(ROOT_DIR, "artifacts", "screenshots");

const ROUTES = [
  { name: "01-home.png", path: "/" },
  { name: "02-explore.png", path: "/explore" },
  { name: "03-area-details.png", path: "/areas/cau-giay" },
  { name: "04-calculator.png", path: "/calculator" },
  { name: "05-recommendations.png", path: "/recommendations" },
  { name: "06-compare.png", path: "/compare" },
  { name: "07-community.png", path: "/community" },
  { name: "08-contribute.png", path: "/contribute" },
  { name: "09-dashboard.png", path: "/dashboard" },
  { name: "10-admin.png", path: "/admin" },
  { name: "11-admin-areas.png", path: "/admin/areas" },
  { name: "12-admin-contributions.png", path: "/admin/contributions" },
  { name: "13-admin-reports.png", path: "/admin/reports" },
];

async function capture() {
  console.log("Starting screenshot capture...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 1. DESKTOP (1440x900)
  console.log("\n--- Capturing DESKTOP (1440x900) ---");
  await page.setViewport({ width: 1440, height: 900 });
  const desktopDir = path.join(SCREENSHOTS_DIR, "desktop");
  fs.mkdirSync(desktopDir, { recursive: true });

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1200)); // wait for Leaflet & charts animation
    const outPath = path.join(desktopDir, route.name);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved: ${outPath}`);
  }

  // 2. TABLET (768x1024)
  console.log("\n--- Capturing TABLET (768x1024) ---");
  await page.setViewport({ width: 768, height: 1024 });
  const tabletDir = path.join(SCREENSHOTS_DIR, "tablet");
  fs.mkdirSync(tabletDir, { recursive: true });

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1200));
    const outPath = path.join(tabletDir, route.name);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved: ${outPath}`);
  }

  // 3. MOBILE (390x844)
  console.log("\n--- Capturing MOBILE (390x844) ---");
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  const mobileDir = path.join(SCREENSHOTS_DIR, "mobile");
  fs.mkdirSync(mobileDir, { recursive: true });

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1200));
    const outPath = path.join(mobileDir, route.name);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved: ${outPath}`);
  }

  await browser.close();
  console.log("\nAll screenshots captured successfully!");
}

capture().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
