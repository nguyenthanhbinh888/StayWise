import { Area } from "@/types/area";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";

/**
 * Xuất dữ liệu danh sách khu vực ra file CSV với BOM UTF-8 (để hiển thị đúng tiếng Việt trong Microsoft Excel)
 */
export function exportAreasToCSV(areas: Area[]): void {
  const headers = [
    "ID",
    "Tên khu vực",
    "Thành phố",
    "Vĩ độ (Lat)",
    "Kinh độ (Lng)",
    "Giá thuê TB (triệu)",
    "Ăn uống (triệu)",
    "Đi lại (triệu)",
    "Điện nước Net (triệu)",
    "Chi phí khác (triệu)",
    "Tổng chi phí TB (triệu)",
    "Điểm An ninh",
    "Điểm Yên tĩnh",
    "Điểm Giao thông",
    "Điểm Môi trường",
    "Điểm Nguy cơ ngập",
    "Ngày cập nhật",
  ];

  const rows = areas.map((a) => {
    const totalCost = calculateAreaTotalCost(a.rent.average, a.monthlyExpenses);
    return [
      `"${a.id}"`,
      `"${a.name}"`,
      `"${a.displayCity}"`,
      a.latitude,
      a.longitude,
      a.rent.average,
      a.monthlyExpenses.food,
      a.monthlyExpenses.transportation,
      a.monthlyExpenses.utilities,
      a.monthlyExpenses.other,
      totalCost,
      a.livingScores.safety,
      a.livingScores.quietness,
      a.livingScores.trafficConvenience,
      a.livingScores.environment,
      a.livingScores.floodRisk,
      `"${a.updatedAt}"`,
    ].join(",");
  });

  // \uFEFF là Byte Order Mark (BOM) cho UTF-8
  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `StayWise_Areas_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
