"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contributionFormSchema, ContributionFormData } from "@/lib/validation/contribution";
import { Area } from "@/types/area";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { Star, Send } from "lucide-react";

export const ContributionForm: React.FC<{
  areas: Area[];
  onSubmitSuccess: (data: ContributionFormData) => void;
}> = ({ areas, onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContributionFormData>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: {
      authorName: "",
      areaId: areas[0]?.id || "cau-giay",
      category: "general",
      rating: 5,
      content: "",
    },
  });

  const currentRating = watch("rating");

  const onFormSubmit = (data: ContributionFormData) => {
    onSubmitSuccess(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white rounded-2xl border border-border p-6 shadow-card space-y-4 text-left">
      <div className="pb-3 border-b border-border">
        <h4 className="text-base font-bold text-navy">Chia sẻ trải nghiệm thực tế của bạn</h4>
        <p className="text-xs text-textMuted mt-0.5">
          Đóng góp sẽ được kiểm duyệt trước khi hiển thị công khai để đảm bảo tính xác thực
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tên người đóng góp */}
        <Input
          label="Tên của bạn hoặc biệt danh"
          placeholder="VD: Minh Tuấn (Sinh viên K65)"
          {...register("authorName")}
          error={errors.authorName?.message}
        />

        {/* Chọn khu vực */}
        <Select
          label="Khu vực đóng góp"
          {...register("areaId")}
          options={areas.map((a) => ({
            label: `${a.name} (${a.displayCity})`,
            value: a.id,
          }))}
          error={errors.areaId?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Chủ đề đóng góp */}
        <Select
          label="Chủ đề đánh giá"
          {...register("category")}
          options={[
            { label: "Tổng quan trải nghiệm sinh sống", value: "general" },
            { label: "Mức độ an ninh & trật tự", value: "security" },
            { label: "Độ yên tĩnh & môi trường", value: "quietness" },
            { label: "Tình trạng ngập lụt mùa mưa", value: "flooding" },
            { label: "Tình hình giao thông & kẹt xe", value: "traffic" },
            { label: "Giá điện nước & sinh hoạt phí", value: "utilities" },
            { label: "Giá thuê & kinh nghiệm tìm trọ", value: "rental" },
          ]}
          error={errors.category?.message}
        />

        {/* Xếp hạng sao */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-semibold text-textPrimary">
            Mức độ hài lòng chung ({currentRating} / 5 sao)
          </label>
          <div className="flex items-center gap-1.5 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue("rating", star)}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= currentRating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-xs text-danger">{errors.rating.message}</p>}
        </div>
      </div>

      {/* Nội dung đánh giá */}
      <div className="space-y-1.5 text-left">
        <label className="block text-xs font-semibold text-textPrimary">
          Nội dung chia sẻ chi tiết
        </label>
        <textarea
          rows={4}
          placeholder="Mô tả cụ thể về giá cả thực tế, an ninh, tình trạng ngập nước hoặc lời khuyên cho người mới đến thuê..."
          {...register("content")}
          className="w-full rounded-xl border border-border bg-white p-3.5 text-sm text-textPrimary placeholder:text-textMuted shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {errors.content && <p className="text-xs text-danger font-medium">{errors.content.message}</p>}
      </div>

      <div className="pt-2">
        <Button type="submit" isLoading={isSubmitting} className="w-full gap-2">
          <Send className="w-4 h-4" /> Gửi đóng góp xác thực
        </Button>
      </div>
    </form>
  );
};
