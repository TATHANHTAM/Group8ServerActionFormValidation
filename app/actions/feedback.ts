
"use server";

import { revalidatePath } from "next/cache";
import { insertFeedback } from "@/lib/data/feedback";
import type { FormActionState } from "@/lib/types/forms";
import { feedbackSchema } from "@/lib/validations/feedback";

export async function submitFeedbackAction(
  input: unknown,
): Promise<FormActionState> {
  const parsed = feedbackSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await insertFeedback({
      content: parsed.data.content,
      phone: parsed.data.phone,
    });
  } catch {
    return {
      status: "error",
      formError: "Không thể gửi góp ý lúc này. Vui lòng thử lại.",
    };
  }

  revalidatePath("/feedback");

  return {
    status: "success",
    formSuccess: "Cảm ơn bạn đã gửi góp ý!",
  };
}
