"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { formatCurrencyMillion } from "@/lib/formatting/currency";

export interface ExpensePieData {
  name: string;
  value: number;
  color: string;
}

export const ExpensePieChart: React.FC<{ data: ExpensePieData[]; title?: string }> = ({
  data,
  title,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-gray-50 rounded-xl animate-pulse" />;
  }

  const validData = data.filter((d) => d.value > 0);

  return (
    <div className="w-full flex flex-col items-center">
      {title && <h4 className="text-sm font-bold text-navy mb-2">{title}</h4>}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={validData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {validData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${formatCurrencyMillion(value)}/tháng`, "Chi phí"]}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                borderColor: "#E5EAF0",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(val) => <span className="text-xs text-textSecondary font-medium">{val}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
