import { describe, it, expect } from "vitest";
import { recommendAreas } from "@/lib/recommendations/engine";
import { SEED_AREAS } from "@/data/areas";

describe("Recommendation Engine", () => {
  it("ranks areas according to user budget and destination", () => {
    const preferences = {
      city: "hanoi" as const,
      monthlyBudget: 9.0, // Triệu đồng
      maximumRent: 4.0,   // Triệu đồng
      destination: {
        label: "ĐH Quốc Gia Hà Nội",
        latitude: 21.037,
        longitude: 105.782,
      },
      maximumDistanceKm: 10,
      priorities: {
        affordableCost: 40,
        commute: 25,
        amenities: 15,
        environment: 20,
      },
    };

    const results = recommendAreas(SEED_AREAS, preferences);
    expect(results.length).toBe(5); // 5 khu vực Hà Nội

    // Cầu Giấy hoặc Mỹ Đình hoặc Hà Đông phải xếp trên Đống Đa vì Đống Đa vượt tiền thuê 4.0tr (4.5tr)
    const topRank = results[0];
    expect(topRank.rank).toBe(1);
    expect(topRank.totalScore).toBeGreaterThan(60);
    expect(topRank.reasons.length).toBeGreaterThan(0);
  });

  it("handles empty results gracefully when city has no match", () => {
    const results = recommendAreas([], {
      city: "hanoi",
      monthlyBudget: 10,
      maximumRent: 5,
      destination: null,
      maximumDistanceKm: 10,
      priorities: { affordableCost: 1, commute: 1, amenities: 1, environment: 1 },
    });
    expect(results).toEqual([]);
  });
});
