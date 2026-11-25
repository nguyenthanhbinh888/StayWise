export type AmenityCategory =
  | "restaurant"
  | "affordableFood"
  | "supermarket"
  | "market"
  | "school"
  | "hospital"
  | "busStop"
  | "pharmacy"
  | "convenienceStore";

export interface AmenityItem {
  id: string;
  name: string;
  category: AmenityCategory;
  areaId: string;
  latitude: number;
  longitude: number;
  description: string;
  distanceKm?: number;
}
