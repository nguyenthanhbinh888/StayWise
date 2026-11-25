export type CityCode = "hanoi" | "hcm";

export interface MonthlyExpenses {
  food: number;           // Ăn uống (triệu VNĐ)
  transportation: number; // Đi lại (triệu VNĐ)
  utilities: number;      // Điện, nước, Internet (triệu VNĐ)
  other: number;          // Chi tiêu cá nhân, phát sinh (triệu VNĐ)
}

export interface RentRange {
  min: number;
  max: number;
  average: number;
}

export interface LivingScores {
  safety: number;             // An ninh (1 - 5, càng cao càng an toàn)
  quietness: number;          // Yên tĩnh (1 - 5, càng cao càng yên tĩnh)
  trafficConvenience: number; // Giao thông thuận tiện (1 - 5, càng cao càng thuận tiện)
  environment: number;        // Chất lượng môi trường (1 - 5, càng cao càng trong lành)
  floodRisk: number;          // Nguy cơ ngập lụt (1 - 5, càng cao càng ngập nặng)
}

export interface AmenityCounts {
  restaurants: number;
  affordableFood: number;
  supermarkets: number;
  markets: number;
  schools: number;
  hospitals: number;
  busStops: number;
  pharmacies: number;
  convenienceStores: number;
}

export interface Area {
  id: string;
  slug: string;
  name: string;
  city: CityCode;
  displayCity: string;
  latitude: number;
  longitude: number;
  rent: RentRange;
  monthlyExpenses: MonthlyExpenses;
  livingScores: LivingScores;
  amenities: AmenityCounts;
  description: string;
  highlights: string[];
  updatedAt: string;
}
