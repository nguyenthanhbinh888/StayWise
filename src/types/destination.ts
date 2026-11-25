import { CityCode } from "./area";

export interface Destination {
  id: string;
  name: string;
  city: CityCode;
  category: "university" | "workplace" | "landmark";
  latitude: number;
  longitude: number;
}
