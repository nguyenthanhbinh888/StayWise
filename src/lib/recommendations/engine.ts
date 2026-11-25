import { Area } from "@/types/area";
import { RecommendationPreferences, RecommendedArea } from "@/types/recommendation";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { calculateDistance } from "@/lib/calculations/distance";

/**
 * Thuật toán Gợi ý Khu vực Đa tiêu chí Minh bạch (Multi-Criteria Recommendation Engine)
 * 
 * Tổng điểm = Điểm Ngân sách * W1 + Điểm Đi lại * W2 + Điểm Tiện ích * W3 + Điểm Môi trường * W4
 * Mọi thành phần điểm chuẩn hóa trong khoảng 0 - 100.
 */
export function recommendAreas(
  areas: Area[],
  preferences: RecommendationPreferences
): RecommendedArea[] {
  // Lọc theo thành phố
  const cityFiltered = areas.filter((a) => a.city === preferences.city);

  if (cityFiltered.length === 0) {
    return [];
  }

  // Chuẩn hóa trọng số để tổng = 1.0 (100%)
  const rawP = preferences.priorities;
  const sumWeights =
    (rawP.affordableCost || 1) +
    (rawP.commute || 1) +
    (rawP.amenities || 1) +
    (rawP.environment || 1);

  const w1 = (rawP.affordableCost || 1) / sumWeights;
  const w2 = (rawP.commute || 1) / sumWeights;
  const w3 = (rawP.amenities || 1) / sumWeights;
  const w4 = (rawP.environment || 1) / sumWeights;

  const results: RecommendedArea[] = cityFiltered.map((area) => {
    const totalCost = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
    const leftoverBudget = Math.round((preferences.monthlyBudget - totalCost) * 100) / 100;
    const reasons: string[] = [];

    // 1. Điểm Ngân sách (0 - 100)
    let budgetScore = 70;
    if (preferences.monthlyBudget > 0) {
      if (totalCost <= preferences.monthlyBudget) {
        // Càng tiết kiệm được nhiều điểm càng cao, tối đa 100
        const savingRatio = (preferences.monthlyBudget - totalCost) / preferences.monthlyBudget;
        budgetScore = Math.min(100, Math.round(80 + savingRatio * 40));
        reasons.push(`Tổng chi phí ${totalCost} tr/tháng nằm trong ngân sách (dư ${leftoverBudget} tr).`);
      } else {
        // Vượt ngân sách bị phạt điểm
        const overRatio = (totalCost - preferences.monthlyBudget) / preferences.monthlyBudget;
        budgetScore = Math.max(0, Math.round(60 - overRatio * 150));
        reasons.push(`Vượt ngân sách dự kiến ${Math.abs(leftoverBudget)} tr/tháng.`);
      }
    }

    // Phạt thêm nếu giá thuê vượt maximumRent
    if (preferences.maximumRent > 0 && area.rent.average > preferences.maximumRent) {
      budgetScore = Math.max(0, budgetScore - 15);
    } else if (preferences.maximumRent > 0) {
      reasons.push(`Giá thuê TB ${area.rent.average} tr đáp ứng yêu cầu dưới ${preferences.maximumRent} tr.`);
    }

    // 2. Điểm Đi lại (0 - 100)
    let commuteScore = 75;
    let distanceKm: number | null = null;

    if (preferences.destination) {
      distanceKm = calculateDistance(
        area.latitude,
        area.longitude,
        preferences.destination.latitude,
        preferences.destination.longitude
      );

      const maxDist = preferences.maximumDistanceKm || 15;
      if (distanceKm <= maxDist) {
        commuteScore = Math.max(0, Math.round(100 - (distanceKm / maxDist) * 70));
        reasons.push(`Cách ${preferences.destination.label} khoảng ${distanceKm} km (đường chim bay).`);
      } else {
        const excess = distanceKm - maxDist;
        commuteScore = Math.max(0, Math.round(30 - excess * 5));
        reasons.push(`Khoảng cách ${distanceKm} km vượt cự ly mong muốn (${maxDist} km).`);
      }
    } else {
      reasons.push("Giao thông thuận tiện kết nối đa điểm nội thành.");
    }

    // 3. Điểm Tiện ích (0 - 100)
    const essentialAmenities =
      area.amenities.affordableFood +
      area.amenities.supermarkets +
      area.amenities.markets +
      area.amenities.busStops;
    const amenitiesScore = Math.min(100, Math.round((essentialAmenities / 80) * 100));
    if (amenitiesScore >= 80) {
      reasons.push(`Hệ thống tiện ích rất phong phú (${essentialAmenities} điểm ăn uống, chợ & trạm buýt).`);
    }

    // 4. Điểm Môi trường (0 - 100)
    const invertedFlood = Math.max(1, 6 - area.livingScores.floodRisk);
    const envRaw =
      (area.livingScores.safety +
        area.livingScores.quietness +
        area.livingScores.trafficConvenience +
        area.livingScores.environment +
        invertedFlood) /
      25;
    const environmentScore = Math.round(envRaw * 100);

    if (area.livingScores.safety >= 4.4) {
      reasons.push("Mức độ an ninh dân cư rất tốt.");
    }
    if (area.livingScores.floodRisk <= 2.2) {
      reasons.push("Khu vực cao ráo, ít nguy cơ ngập lụt.");
    }

    // Tổng điểm tính theo công thức
    const totalScore = Math.round(
      budgetScore * w1 +
      commuteScore * w2 +
      amenitiesScore * w3 +
      environmentScore * w4
    );

    return {
      areaId: area.id,
      rank: 0,
      totalScore,
      budgetScore,
      commuteScore,
      amenitiesScore,
      environmentScore,
      totalEstimatedCost: totalCost,
      leftoverBudget,
      distanceKm,
      reasons: reasons.slice(0, 4), // Chọn 4 lý do nổi bật nhất
    };
  });

  // Sắp xếp giảm dần theo tổng điểm
  results.sort((a, b) => b.totalScore - a.totalScore);

  // Đánh số thứ hạng (Rank)
  results.forEach((item, index) => {
    item.rank = index + 1;
  });

  return results;
}
