"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { formatCurrencyMillion } from "@/lib/formatting/currency";

export interface BudgetBarData {
  name: string;
  "Ngân sách": number;
  "Chi phí thực tế": number;
}

export const BudgetBarChart: React.FC<{ data: BudgetBarData[] }> = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-gray-50 rounded-xl animate-pulse" />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} />
          <YAxis tick={{ fontSize: 11, fill: "#667085" }} unit=" tr" />
          <Tooltip
            formatter={(value: number) => [`${formatCurrencyMillion(value)}`, ""]}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              borderColor: "#E5EAF0",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(val) => <span className="text-xs text-textSecondary font-medium">{val}</span>}
          />
          <Bar dataKey="Ngân sách" fill="#17324D" radius={[6, 6, 0, 0]} barSize={24} />
          <Bar dataKey="Chi phí thực tế" fill="#16A36A" radius={[6, 6, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
