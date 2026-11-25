import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

/**
 * Format ngày tháng tiếng Việt thân thiện
 * Ví dụ: "15/11/2026" hoặc "15 Tháng 11, 2026"
 */
export function formatDateVN(dateString: string, formatPattern: string = "dd/MM/yyyy"): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatPattern, { locale: vi });
  } catch {
    return dateString;
  }
}

export function formatRelativeDateVN(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy HH:mm", { locale: vi });
  } catch {
    return dateString;
  }
}
