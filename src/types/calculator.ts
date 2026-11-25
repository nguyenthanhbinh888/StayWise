export interface CalculatorInputs {
  monthlyBudget: number;
  rent: number;
  food: number;
  transportation: number;
  electricity: number;
  water: number;
  internet: number;
  personalExpenses: number;
  contingencyExpenses: number;
}

export interface CalculatorBreakdown {
  totalCost: number;
  surplusDeficit: number;
  rentRatio: number;          // % chi phí thuê nhà
  livingExpensesRatio: number;// % chi phí sinh hoạt
  budgetUtilizationRatio: number; // % sử dụng ngân sách
  status: "surplus" | "balanced" | "deficit";
}
