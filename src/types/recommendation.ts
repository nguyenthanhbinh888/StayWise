import { CityCode } from "./area";

export interface Destination {
  id: string;
  name: string;
  city: CityCode;
  category: "university" | "workplace" | "landmark";
  latitude: number;
  longitude: number;
}

export interface RecommendationPreferences {
  city: CityCode;
  monthlyBudget: number;  // Triệu đồng
  maximumRent: number;    // Triệu đồng
  destination: {
    label: string;
    latitude: number;
    longitude: number;
  } | null;
  maximumDistanceKm: number;
  priorities: {
    affordableCost: number; // Trọng số ưu tiên (1-100)
    commute: number;
    amenities: number;
    environment: number;
  };
}

export interface RecommendedArea {
  areaId: string;
  rank: number;
  totalScore: number;       // 0 - 100
  budgetScore: number;
  commuteScore: number;
  amenitiesScore: number;
  environmentScore: number;
  totalEstimatedCost: number;
  leftoverBudget: number;
  distanceKm: number | null;
  reasons: string[];
}
