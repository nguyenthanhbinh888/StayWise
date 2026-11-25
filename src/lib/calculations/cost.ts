import { MonthlyExpenses } from "@/types/area";
import { CalculatorInputs, CalculatorBreakdown } from "@/types/calculator";

/**
 * Tính tổng chi phí sinh hoạt hàng tháng (triệu VNĐ)
 * Công thức bắt buộc: Tiền thuê + Ăn uống + Đi lại + Điện nước/Internet + Khác
 */
export function calculateMonthlyCost(
  rent: number,
  food: number,
  transportation: number,
  utilities: number,
  other: number
): number {
  const sum = (rent || 0) + (food || 0) + (transportation || 0) + (utilities || 0) + (other || 0);
  return Math.round(sum * 100) / 100;
}

/**
 * Tính tổng chi phí từ object MonthlyExpenses và tiền thuê
 */
export function calculateAreaTotalCost(
  averageRent: number,
  expenses: MonthlyExpenses
): number {
  return calculateMonthlyCost(
    averageRent,
    expenses.food,
    expenses.transportation,
    expenses.utilities,
    expenses.other
  );
}

/**
 * Phân tích cơ cấu ngân sách và chi tiêu của người dùng
 */
export function calculateBudgetBreakdown(inputs: CalculatorInputs): CalculatorBreakdown {
  const totalCost = calculateMonthlyCost(
    inputs.rent,
    inputs.food,
    inputs.transportation,
    (inputs.electricity || 0) + (inputs.water || 0) + (inputs.internet || 0),
    (inputs.personalExpenses || 0) + (inputs.contingencyExpenses || 0)
  );

  const budget = inputs.monthlyBudget || 0;
  const surplusDeficit = Math.round((budget - totalCost) * 100) / 100;

  const rentRatio = totalCost > 0 ? Math.round((inputs.rent / totalCost) * 100) : 0;
  const livingExpensesRatio = 100 - rentRatio;
  const budgetUtilizationRatio = budget > 0 ? Math.round((totalCost / budget) * 100) : 100;

  let status: "surplus" | "balanced" | "deficit" = "balanced";
  if (surplusDeficit > 0.1) {
    status = "surplus";
  } else if (surplusDeficit < -0.1) {
    status = "deficit";
  }

  return {
    totalCost,
    surplusDeficit,
    rentRatio,
    livingExpensesRatio,
    budgetUtilizationRatio,
    status,
  };
}
