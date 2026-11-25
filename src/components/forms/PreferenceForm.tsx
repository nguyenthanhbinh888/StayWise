"use client";

import React from "react";
import { RecommendationPreferences } from "@/types/recommendation";
import { Destination } from "@/types/destination";
import { Slider } from "@/components/common/Slider";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { Sparkles } from "lucide-react";

export const PreferenceForm: React.FC<{
  preferences: RecommendationPreferences;
  destinations: Destination[];
  onChange: (prefs: RecommendationPreferences) => void;
  onSubmit: () => void;
}> = ({ preferences, destinations, onChange, onSubmit }) => {
  const currentCityDests = destinations.filter((d) => d.city === preferences.city);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-card space-y-5 text-left">
      <div className="pb-3 border-b border-border">
        <h4 className="text-base font-bold text-navy">Khảo sát tiêu chí chọn nơi ở</h4>
        <p className="text-xs text-textMuted mt-0.5">
          Hệ thống sẽ chấm điểm và gợi ý các khu vực tối ưu ngân sách và quãng đường của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Thành phố */}
        <Select
          label="Thành phố mục tiêu"
          value={preferences.city}
          onChange={(e) => {
            const newCity = e.target.value as "hanoi" | "hcm";
            const firstDest = destinations.find((d) => d.city === newCity);
            onChange({
              ...preferences,
              city: newCity,
              destination: firstDest
                ? { label: firstDest.name, latitude: firstDest.latitude, longitude: firstDest.longitude }
                : null,
            });
          }}
          options={[
            { label: "Hà Nội", value: "hanoi" },
            { label: "TP. Hồ Chí Minh", value: "hcm" },
          ]}
        />

        {/* Điểm đến */}
        <Select
          label="Nơi học tập hoặc làm việc mục tiêu"
          value={preferences.destination?.label || ""}
          onChange={(e) => {
            const selected = currentCityDests.find((d) => d.name === e.target.value);
            onChange({
              ...preferences,
              destination: selected
                ? { label: selected.name, latitude: selected.latitude, longitude: selected.longitude }
                : null,
            });
          }}
          options={[
            { label: "-- Chọn điểm đến tham chiếu --", value: "" },
            ...currentCityDests.map((d) => ({ label: d.name, value: d.name })),
          ]}
        />
      </div>

      {/* Ngân sách & Tiền thuê tối đa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Slider
          label="Tổng ngân sách tối đa hàng tháng"
          min={6}
          max={20}
          step={0.5}
          value={preferences.monthlyBudget}
          valueDisplay={`${preferences.monthlyBudget} triệu`}
          onChange={(e) =>
            onChange({ ...preferences, monthlyBudget: parseFloat(e.target.value) })
          }
        />

        <Slider
          label="Giá thuê phòng tối đa chấp nhận"
          min={2.5}
          max={8.0}
          step={0.5}
          value={preferences.maximumRent}
          valueDisplay={`${preferences.maximumRent} triệu`}
          onChange={(e) =>
            onChange({ ...preferences, maximumRent: parseFloat(e.target.value) })
          }
        />
      </div>

      {/* Khoảng cách tối đa */}
      <Slider
        label="Khoảng cách tối đa chấp nhận (đường chim bay)"
        min={3}
        max={25}
        step={1}
        value={preferences.maximumDistanceKm}
        valueDisplay={`≤ ${preferences.maximumDistanceKm} km`}
        onChange={(e) =>
          onChange({ ...preferences, maximumDistanceKm: parseInt(e.target.value, 10) })
        }
      />

      {/* Trọng số ưu tiên */}
      <div className="pt-3 border-t border-border space-y-3">
        <span className="text-xs font-bold text-navy uppercase tracking-wider block">
          Trọng số ưu tiên (Hệ thống tự động chuẩn hóa về 100%)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Slider
            label="Ưu tiên tiết kiệm chi phí"
            min={10}
            max={100}
            step={5}
            value={preferences.priorities.affordableCost}
            valueDisplay={`${preferences.priorities.affordableCost}%`}
            onChange={(e) =>
              onChange({
                ...preferences,
                priorities: {
                  ...preferences.priorities,
                  affordableCost: parseInt(e.target.value, 10),
                },
              })
            }
          />

          <Slider
            label="Ưu tiên khoảng cách di chuyển gần"
            min={10}
            max={100}
            step={5}
            value={preferences.priorities.commute}
            valueDisplay={`${preferences.priorities.commute}%`}
            onChange={(e) =>
              onChange({
                ...preferences,
                priorities: {
                  ...preferences.priorities,
                  commute: parseInt(e.target.value, 10),
                },
              })
            }
          />

          <Slider
            label="Ưu tiên tiện ích xung quanh phong phú"
            min={10}
            max={100}
            step={5}
            value={preferences.priorities.amenities}
            valueDisplay={`${preferences.priorities.amenities}%`}
            onChange={(e) =>
              onChange({
                ...preferences,
                priorities: {
                  ...preferences.priorities,
                  amenities: parseInt(e.target.value, 10),
                },
              })
            }
          />

          <Slider
            label="Ưu tiên môi trường sống (an ninh, không ngập)"
            min={10}
            max={100}
            step={5}
            value={preferences.priorities.environment}
            valueDisplay={`${preferences.priorities.environment}%`}
            onChange={(e) =>
              onChange({
                ...preferences,
                priorities: {
                  ...preferences.priorities,
                  environment: parseInt(e.target.value, 10),
                },
              })
            }
          />
        </div>
      </div>

      <div className="pt-3">
        <Button onClick={onSubmit} className="w-full gap-2" size="lg">
          <Sparkles className="w-4 h-4" /> Tìm khu vực phù hợp nhất
        </Button>
      </div>
    </div>
  );
};
