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

export interface ComparisonBarItem {
  areaName: string;
  "Tiền thuê": number;
  "Ăn uống": number;
  "Đi lại": number;
  "Điện nước & Net": number;
  "Khác": number;
}

export const ComparisonBarChart: React.FC<{ data: ComparisonBarItem[] }> = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-80 w-full bg-gray-50 rounded-xl animate-pulse" />;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 15, right: 10, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
          <XAxis dataKey="areaName" tick={{ fontSize: 11, fill: "#182230", fontWeight: 600 }} />
          <YAxis tick={{ fontSize: 11, fill: "#667085" }} unit=" tr" />
          <Tooltip
            formatter={(val: number) => [`${formatCurrencyMillion(val)}`, ""]}
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
          <Bar dataKey="Tiền thuê" stackId="a" fill="#16A36A" />
          <Bar dataKey="Ăn uống" stackId="a" fill="#F5A623" />
          <Bar dataKey="Đi lại" stackId="a" fill="#3B82F6" />
          <Bar dataKey="Điện nước & Net" stackId="a" fill="#8B5CF6" />
          <Bar dataKey="Khác" stackId="a" fill="#98A2B3" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
