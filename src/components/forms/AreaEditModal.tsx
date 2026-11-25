"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { areaFormSchema, AreaFormData } from "@/lib/validation/area";
import { Area } from "@/types/area";
import { Modal } from "@/components/common/Modal";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";

export interface AreaEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  areaToEdit?: Area | null;
  onSave: (data: Partial<Area>) => void;
}

export const AreaEditModal: React.FC<AreaEditModalProps> = ({
  isOpen,
  onClose,
  areaToEdit,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AreaFormData>({
    resolver: zodResolver(areaFormSchema),
  });

  useEffect(() => {
    if (areaToEdit) {
      reset({
        name: areaToEdit.name,
        slug: areaToEdit.slug,
        city: areaToEdit.city,
        displayCity: areaToEdit.displayCity,
        latitude: areaToEdit.latitude,
        longitude: areaToEdit.longitude,
        rentMin: areaToEdit.rent.min,
        rentMax: areaToEdit.rent.max,
        rentAverage: areaToEdit.rent.average,
        food: areaToEdit.monthlyExpenses.food,
        transportation: areaToEdit.monthlyExpenses.transportation,
        utilities: areaToEdit.monthlyExpenses.utilities,
        other: areaToEdit.monthlyExpenses.other,
        safety: areaToEdit.livingScores.safety,
        quietness: areaToEdit.livingScores.quietness,
        trafficConvenience: areaToEdit.livingScores.trafficConvenience,
        environment: areaToEdit.livingScores.environment,
        floodRisk: areaToEdit.livingScores.floodRisk,
        description: areaToEdit.description,
      });
    } else {
      reset({
        name: "",
        slug: "",
        city: "hanoi",
        displayCity: "Hà Nội",
        latitude: 21.028,
        longitude: 105.8,
        rentMin: 3.0,
        rentMax: 5.0,
        rentAverage: 4.0,
        food: 2.5,
        transportation: 0.8,
        utilities: 0.65,
        other: 1.0,
        safety: 4.0,
        quietness: 4.0,
        trafficConvenience: 4.0,
        environment: 4.0,
        floodRisk: 2.0,
        description: "",
      });
    }
  }, [areaToEdit, reset]);

  const onFormSubmit = (data: AreaFormData) => {
    onSave({
      name: data.name,
      slug: data.slug,
      city: data.city,
      displayCity: data.displayCity,
      latitude: data.latitude,
      longitude: data.longitude,
      rent: {
        min: data.rentMin,
        max: data.rentMax,
        average: data.rentAverage,
      },
      monthlyExpenses: {
        food: data.food,
        transportation: data.transportation,
        utilities: data.utilities,
        other: data.other,
      },
      livingScores: {
        safety: data.safety,
        quietness: data.quietness,
        trafficConvenience: data.trafficConvenience,
        environment: data.environment,
        floodRisk: data.floodRisk,
      },
      description: data.description,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={areaToEdit ? `Chỉnh sửa khu vực: ${areaToEdit.name}` : "Thêm khu vực mới"}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Tên khu vực" {...register("name")} error={errors.name?.message} />
          <Input label="Slug định danh" {...register("slug")} error={errors.slug?.message} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Thành phố"
            {...register("city")}
            options={[
              { label: "Hà Nội", value: "hanoi" },
              { label: "TP. Hồ Chí Minh", value: "hcm" },
            ]}
          />
          <Input label="Tên hiển thị thành phố" {...register("displayCity")} error={errors.displayCity?.message} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Vĩ độ (Latitude)"
            type="number"
            step="0.001"
            {...register("latitude", { valueAsNumber: true })}
          />
          <Input
            label="Kinh độ (Longitude)"
            type="number"
            step="0.001"
            {...register("longitude", { valueAsNumber: true })}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Thuê tối thiểu"
            type="number"
            step="0.1"
            {...register("rentMin", { valueAsNumber: true })}
          />
          <Input
            label="Thuê tối đa"
            type="number"
            step="0.1"
            {...register("rentMax", { valueAsNumber: true })}
          />
          <Input
            label="Thuê trung bình"
            type="number"
            step="0.1"
            {...register("rentAverage", { valueAsNumber: true })}
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Input label="Ăn uống" type="number" step="0.1" {...register("food", { valueAsNumber: true })} />
          <Input label="Đi lại" type="number" step="0.05" {...register("transportation", { valueAsNumber: true })} />
          <Input label="Điện nước Net" type="number" step="0.05" {...register("utilities", { valueAsNumber: true })} />
          <Input label="Chi phí khác" type="number" step="0.05" {...register("other", { valueAsNumber: true })} />
        </div>

        <div className="grid grid-cols-5 gap-2">
          <Input label="An ninh" type="number" step="0.1" min="1" max="5" {...register("safety", { valueAsNumber: true })} />
          <Input label="Yên tĩnh" type="number" step="0.1" min="1" max="5" {...register("quietness", { valueAsNumber: true })} />
          <Input label="Giao thông" type="number" step="0.1" min="1" max="5" {...register("trafficConvenience", { valueAsNumber: true })} />
          <Input label="Môi trường" type="number" step="0.1" min="1" max="5" {...register("environment", { valueAsNumber: true })} />
          <Input label="Ngập lụt" type="number" step="0.1" min="1" max="5" {...register("floodRisk", { valueAsNumber: true })} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-textPrimary mb-1">Mô tả tổng quan</label>
          <textarea
            rows={3}
            {...register("description")}
            className="w-full rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-none"
          />
          {errors.description && <p className="text-xs text-danger">{errors.description.message}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" size="sm">
            Lưu khu vực
          </Button>
        </div>
      </form>
    </Modal>
  );
};
