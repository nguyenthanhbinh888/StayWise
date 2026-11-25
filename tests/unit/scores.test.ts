import { describe, it, expect } from "vitest";
import { calculateOverallLivingScore, findComparisonHighlights } from "@/lib/calculations/scores";
import { SEED_AREAS } from "@/data/areas";

describe("Living Scores & Comparison", () => {
  it("calculates overall living score with inverted flood risk", () => {
    const score = calculateOverallLivingScore({
      safety: 4.5,
      quietness: 4.0,
      trafficConvenience: 4.2,
      environment: 4.0,
      floodRisk: 2.0, // Ngập lụt thấp -> (6 - 2) = 4.0 điểm tốt
    });
    expect(score).toBeGreaterThan(3.5);
    expect(score).toBeLessThanOrEqual(5.0);
  });

  it("identifies best in class highlight areas", () => {
    const highlights = findComparisonHighlights(SEED_AREAS);
    expect(highlights.lowestCostAreaId).toBeTruthy();
    expect(highlights.bestEnvironmentAreaId).toBeTruthy();
    expect(highlights.safestAreaId).toBeTruthy();
    expect(highlights.mostAmenitiesAreaId).toBeTruthy();
  });
});
