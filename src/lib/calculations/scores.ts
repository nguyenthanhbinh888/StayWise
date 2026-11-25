import { Area, LivingScores } from "@/types/area";
import { calculateAreaTotalCost } from "./cost";

/**
 * Tính điểm chất lượng môi trường sống tổng hợp (thang điểm 1 - 5)
 * Điểm ngập lụt được đảo chiều (vì điểm ngập càng cao thì rủi ro càng lớn)
 */
export function calculateOverallLivingScore(scores: LivingScores): number {
  const invertedFlood = Math.max(1, 6 - scores.floodRisk);
  const sum =
    scores.safety * 1.2 +
    scores.quietness * 0.9 +
    scores.trafficConvenience * 1.1 +
    scores.environment * 1.0 +
    invertedFlood * 1.0;
  
  const weightedAvg = sum / 5.2;
  return Math.round(weightedAvg * 10) / 10;
}

/**
 * Báo cáo đối soát so sánh giữa các khu vực
 */
export interface ComparisonHighlight {
  lowestCostAreaId: string;
  bestEnvironmentAreaId: string;
  safestAreaId: string;
  mostAmenitiesAreaId: string;
}

export function findComparisonHighlights(areas: Area[]): ComparisonHighlight {
  if (areas.length === 0) {
    return {
      lowestCostAreaId: "",
      bestEnvironmentAreaId: "",
      safestAreaId: "",
      mostAmenitiesAreaId: "",
    };
  }

  let lowestCostArea = areas[0];
  let lowestCost = calculateAreaTotalCost(lowestCostArea.rent.average, lowestCostArea.monthlyExpenses);

  let bestEnvArea = areas[0];
  let bestEnvScore = calculateOverallLivingScore(bestEnvArea.livingScores);

  let safestArea = areas[0];
  let safestScore = safestArea.livingScores.safety;

  let mostAmenitiesArea = areas[0];
  let maxAmenities = Object.values(mostAmenitiesArea.amenities).reduce((a, b) => a + b, 0);

  for (let i = 1; i < areas.length; i++) {
    const area = areas[i];
    const cost = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
    if (cost < lowestCost) {
      lowestCost = cost;
      lowestCostArea = area;
    }

    const envScore = calculateOverallLivingScore(area.livingScores);
    if (envScore > bestEnvScore) {
      bestEnvScore = envScore;
      bestEnvArea = area;
    }

    if (area.livingScores.safety > safestScore) {
      safestScore = area.livingScores.safety;
      safestArea = area;
    }

    const totalAmenities = Object.values(area.amenities).reduce((a, b) => a + b, 0);
    if (totalAmenities > maxAmenities) {
      maxAmenities = totalAmenities;
      mostAmenitiesArea = area;
    }
  }

  return {
    lowestCostAreaId: lowestCostArea.id,
    bestEnvironmentAreaId: bestEnvArea.id,
    safestAreaId: safestArea.id,
    mostAmenitiesAreaId: mostAmenitiesArea.id,
  };
}
