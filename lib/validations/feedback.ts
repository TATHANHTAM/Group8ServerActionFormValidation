
import { z } from "zod";

export const feedbackSchema = z.object({
  content: z
    .string()
    .trim()
    .min(21, "Nội dung góp ý phải có nhiều hơn 20 ký tự."),

  phone: z
    .string()
    .trim()
    .regex(
      /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
      "Số điện thoại Việt Nam không hợp lệ."
    ),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
