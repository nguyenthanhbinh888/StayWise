"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";

export interface RadarDataPoint {
  subject: string;
  [key: string]: string | number;
}

export const LivingScoreRadarChart: React.FC<{
  data: RadarDataPoint[];
  areaKeys: { key: string; name: string; color: string }[];
}> = ({ data, areaKeys }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-72 w-full bg-gray-50 rounded-xl animate-pulse" />;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#E5EAF0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#182230" }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10, fill: "#98A2B3" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              borderColor: "#E5EAF0",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(val) => <span className="text-xs text-textSecondary font-medium">{val}</span>}
          />
          {areaKeys.map((item) => (
            <Radar
              key={item.key}
              name={item.name}
              dataKey={item.key}
              stroke={item.color}
              fill={item.color}
              fillOpacity={0.25}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
