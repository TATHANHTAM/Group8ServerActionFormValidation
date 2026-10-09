import { z } from "zod";

export const feedbackSchema = z.object({
  content: z
    .string()
    .trim()
    .min(21, "Nội dung phải dài hơn 20 ký tự."),
  phone: z
  .string()
  .trim()
  .regex(
    /^(?:0[35789]\d{8}|\+84[35789]\d{8})$/,
    "Số điện thoại phải đúng định dạng Việt Nam, ví dụ 0312345678, 0912345678 hoặc +84912345678.",
  ),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;