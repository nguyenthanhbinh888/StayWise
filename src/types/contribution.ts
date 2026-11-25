export type ContributionCategory =
  | "security"
  | "quietness"
  | "flooding"
  | "traffic"
  | "utilities"
  | "rental"
  | "general";

export type ContributionStatus = "pending" | "approved" | "rejected";

export interface Contribution {
  id: string;
  areaId: string;
  authorName: string;
  category: ContributionCategory;
  rating: number; // 1 - 5
  content: string;
  status: ContributionStatus;
  createdAt: string;
  updatedAt?: string;
}
