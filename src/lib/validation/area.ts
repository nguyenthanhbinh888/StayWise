import { z } from "zod";

export const areaFormSchema = z.object({
  name: z.string().min(2, "Tên khu vực tối thiểu 2 ký tự"),
  slug: z.string().min(2, "Slug không được để trống"),
  city: z.enum(["hanoi", "hcm"]),
  displayCity: z.string().min(2, "Tên hiển thị thành phố không được để trống"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  rentMin: z.number().min(0, "Giá tối thiểu phải >= 0"),
  rentMax: z.number().min(0, "Giá tối đa phải >= 0"),
  rentAverage: z.number().min(0, "Giá trung bình phải >= 0"),
  food: z.number().min(0),
  transportation: z.number().min(0),
  utilities: z.number().min(0),
  other: z.number().min(0),
  safety: z.number().min(1).max(5),
  quietness: z.number().min(1).max(5),
  trafficConvenience: z.number().min(1).max(5),
  environment: z.number().min(1).max(5),
  floodRisk: z.number().min(1).max(5),
  description: z.string().min(10, "Mô tả tối thiểu 10 ký tự"),
});

export type AreaFormData = z.infer<typeof areaFormSchema>;
