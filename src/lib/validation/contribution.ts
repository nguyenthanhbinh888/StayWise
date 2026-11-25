import { z } from "zod";

export const contributionFormSchema = z.object({
  authorName: z
    .string()
    .min(2, "Vui lòng nhập tên người đóng góp (ít nhất 2 ký tự)")
    .max(50, "Tên không được vượt quá 50 ký tự"),
  areaId: z.string().min(1, "Vui lòng chọn khu vực"),
  category: z.enum([
    "security",
    "quietness",
    "flooding",
    "traffic",
    "utilities",
    "rental",
    "general",
  ], {
    required_error: "Vui lòng chọn chủ đề đóng góp",
  }),
  rating: z.number().min(1, "Điểm tối thiểu là 1 sao").max(5, "Điểm tối đa là 5 sao"),
  content: z
    .string()
    .min(10, "Nội dung đóng góp phải có ít nhất 10 ký tự")
    .max(1000, "Nội dung không được dài quá 1000 ký tự"),
});

export type ContributionFormData = z.infer<typeof contributionFormSchema>;
