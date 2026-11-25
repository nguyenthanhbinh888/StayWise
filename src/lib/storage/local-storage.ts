import { Area } from "@/types/area";
import { Contribution } from "@/types/contribution";
import { CalculatorInputs } from "@/types/calculator";
import { STORAGE_KEYS } from "./keys";
import { SEED_AREAS } from "@/data/areas";
import { SEED_CONTRIBUTIONS } from "@/data/contributions";

/**
 * Trình bọc an toàn truy xuất LocalStorage:
 * - Kiểm tra môi trường browser
 * - Bọc try/catch chống crash JSON parse
 * - Tự động fallback về dữ liệu mẫu mặc định
 */
export const storageService = {
  // === AREAS ===
  getAreas(): Area[] {
    if (typeof window === "undefined") return SEED_AREAS;
    try {
      const item = localStorage.getItem(STORAGE_KEYS.AREAS);
      if (!item) {
        localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(SEED_AREAS));
        return SEED_AREAS;
      }
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_AREAS;
    } catch {
      return SEED_AREAS;
    }
  },

  saveAreas(areas: Area[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(areas));
    } catch (e) {
      console.error("Lỗi lưu danh sách khu vực vào localStorage:", e);
    }
  },

  resetAreas(): Area[] {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(SEED_AREAS));
      } catch (e) {
        console.error("Lỗi reset areas:", e);
      }
    }
    return SEED_AREAS;
  },

  // === CONTRIBUTIONS ===
  getContributions(): Contribution[] {
    if (typeof window === "undefined") return SEED_CONTRIBUTIONS;
    try {
      const item = localStorage.getItem(STORAGE_KEYS.CONTRIBUTIONS);
      if (!item) {
        localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(SEED_CONTRIBUTIONS));
        return SEED_CONTRIBUTIONS;
      }
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : SEED_CONTRIBUTIONS;
    } catch {
      return SEED_CONTRIBUTIONS;
    }
  },

  saveContributions(contributions: Contribution[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(contributions));
    } catch (e) {
      console.error("Lỗi lưu contributions vào localStorage:", e);
    }
  },

  // === COMPARISON AREA IDS ===
  getComparisonIds(): string[] {
    if (typeof window === "undefined") return ["cau-giay", "my-dinh"];
    try {
      const item = localStorage.getItem(STORAGE_KEYS.COMPARISON_IDS);
      if (!item) return ["cau-giay", "my-dinh"];
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : ["cau-giay", "my-dinh"];
    } catch {
      return ["cau-giay", "my-dinh"];
    }
  },

  saveComparisonIds(ids: string[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARISON_IDS, JSON.stringify(ids.slice(0, 4)));
    } catch (e) {
      console.error("Lỗi lưu comparison ids:", e);
    }
  },

  // === SAVED BUDGET PLAN ===
  getSavedCalculatorPlan(): CalculatorInputs | null {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(STORAGE_KEYS.SAVED_CALCULATOR_PLAN);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  saveCalculatorPlan(plan: CalculatorInputs): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_CALCULATOR_PLAN, JSON.stringify(plan));
    } catch (e) {
      console.error("Lỗi lưu calculator plan:", e);
    }
  },

  // === RESET TO SEED DATA TOÀN BỘ ===
  resetAll(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(SEED_AREAS));
      localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(SEED_CONTRIBUTIONS));
      localStorage.setItem(STORAGE_KEYS.COMPARISON_IDS, JSON.stringify(["cau-giay", "my-dinh"]));
      localStorage.removeItem(STORAGE_KEYS.SAVED_CALCULATOR_PLAN);
    } catch (e) {
      console.error("Lỗi reset toàn bộ dữ liệu:", e);
    }
  },
};
