import { Area } from "./area";
import { Contribution } from "./contribution";

export interface AdminStats {
  totalAreas: number;
  totalContributions: number;
  pendingContributions: number;
  approvedContributions: number;
  rejectedContributions: number;
  totalReviews: number;
}

export interface AreaFilterParams {
  city?: string;
  minRent?: number;
  maxRent?: number;
  maxTotalCost?: number;
  minSafety?: number;
  minQuietness?: number;
  maxFloodRisk?: number;
  searchQuery?: string;
}
