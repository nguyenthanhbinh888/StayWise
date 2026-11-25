import { describe, it, expect } from "vitest";
import { calculateDistance } from "@/lib/calculations/distance";

describe("Distance Calculation (Haversine)", () => {
  it("returns 0 for identical coordinates", () => {
    expect(calculateDistance(21.030, 105.790, 21.030, 105.790)).toBe(0);
  });

  it("calculates approximate straight line distance between Cầu Giấy and Mỹ Đình", () => {
    // Cầu Giấy (21.030, 105.790) -> Mỹ Đình (21.028, 105.770) ~ 2.1 km
    const dist = calculateDistance(21.030, 105.790, 21.028, 105.770);
    expect(dist).toBeGreaterThan(1.5);
    expect(dist).toBeLessThan(3.0);
  });

  it("calculates distance between Hanoi and HCM correctly (long distance check)", () => {
    const dist = calculateDistance(21.030, 105.790, 10.850, 106.770);
    expect(dist).toBeGreaterThan(1100);
    expect(dist).toBeLessThan(1200);
  });
});
