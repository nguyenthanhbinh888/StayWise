"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface TrendDataPoint {
  date: string;
  contributions: number;
  approved: number;
}

export const AdminTrendLineChart: React.FC<{ data: TrendDataPoint[] }> = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-gray-50 rounded-xl animate-pulse" />;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16A36A" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#16A36A" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorApprove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#17324D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#17324D" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#667085" }} />
          <YAxis tick={{ fontSize: 11, fill: "#667085" }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              borderColor: "#E5EAF0",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="contributions"
            name="Đóng góp gửi lên"
            stroke="#16A36A"
            fillOpacity={1}
            fill="url(#colorContrib)"
          />
          <Area
            type="monotone"
            dataKey="approved"
            name="Đã duyệt"
            stroke="#17324D"
            fillOpacity={1}
            fill="url(#colorApprove)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
