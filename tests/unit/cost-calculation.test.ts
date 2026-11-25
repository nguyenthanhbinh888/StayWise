import { describe, it, expect } from "vitest";
import { calculateMonthlyCost, calculateBudgetBreakdown } from "@/lib/calculations/cost";

describe("Cost Calculations", () => {
  it("calculates monthly cost accurately matching SPEC.md 4.2", () => {
    // Cầu Giấy: rent 4.2, food 2.6, transport 0.8, utilities 0.65, other 1.1 -> 9.35
    const cgCost = calculateMonthlyCost(4.2, 2.6, 0.8, 0.65, 1.1);
    expect(cgCost).toBe(9.35);

    // Hà Đông: 3.2, 2.4, 0.9, 0.62, 0.95 -> 8.07
    const hdCost = calculateMonthlyCost(3.2, 2.4, 0.9, 0.62, 0.95);
    expect(hdCost).toBe(8.07);

    // Quận 7: 4.8, 3.0, 0.9, 0.75, 1.3 -> 10.75
    const q7Cost = calculateMonthlyCost(4.8, 3.0, 0.9, 0.75, 1.3);
    expect(q7Cost).toBe(10.75);
  });

  it("calculates budget breakdown with surplus correctly", () => {
    const result = calculateBudgetBreakdown({
      monthlyBudget: 12.0,
      rent: 4.0,
      food: 3.0,
      transportation: 1.0,
      electricity: 0.5,
      water: 0.2,
      internet: 0.3,
      personalExpenses: 1.0,
      contingencyExpenses: 0.5,
    });

    expect(result.totalCost).toBe(10.5);
    expect(result.surplusDeficit).toBe(1.5);
    expect(result.status).toBe("surplus");
    expect(result.rentRatio).toBe(38); // 4 / 10.5 = 38%
  });

  it("detects budget deficit when expenses exceed budget", () => {
    const result = calculateBudgetBreakdown({
      monthlyBudget: 8.0,
      rent: 4.5,
      food: 3.0,
      transportation: 1.0,
      electricity: 0.4,
      water: 0.2,
      internet: 0.2,
      personalExpenses: 1.0,
      contingencyExpenses: 0.5,
    });

    expect(result.totalCost).toBe(10.8);
    expect(result.surplusDeficit).toBe(-2.8);
    expect(result.status).toBe("deficit");
  });
});
