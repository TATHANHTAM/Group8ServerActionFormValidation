"use server";

import { feedbackSchema } from "@/lib/validations/feedback";
import type { FormActionState } from "@/lib/types/forms";

export async function submitFeedback(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const input = {
    content: formData.get("content"),
    phone: formData.get("phone"),
  };

  const parsed = feedbackSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    status: "success",
    formSuccess: "Dữ liệu hợp lệ. Bài tập hiện chỉ kiểm tra dữ liệu, chưa lưu góp ý.",
  };
}