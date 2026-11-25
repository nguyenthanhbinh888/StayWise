/**
 * Format số tiền triệu VNĐ sang dạng chuỗi hiển thị thân thiện tiếng Việt
 * Ví dụ: 4.2 -> "4.2 triệu" hoặc "4.200.000 ₫"
 */
export function formatCurrencyMillion(
  millionValue: number,
  showUnit: boolean = true
): string {
  if (millionValue === undefined || millionValue === null || isNaN(millionValue)) {
    return showUnit ? "0 triệu" : "0";
  }
  const formatted = millionValue.toLocaleString("vi-VN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  return showUnit ? `${formatted} triệu` : formatted;
}

export function formatVND(vndValue: number): string {
  if (isNaN(vndValue)) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(vndValue);
}
