
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitFeedbackAction } from "@/app/actions/feedback";
import { FormAlert } from "@/components/ui/FormAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import {
  feedbackSchema,
  type FeedbackInput,
} from "@/lib/validations/feedback";

export function FeedbackForm() {
  const [formError, setFormError] = useState<string>();
  const [formSuccess, setFormSuccess] = useState<string>();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
      phone: "",
    },
  });

  async function onSubmit(values: FeedbackInput) {
    setFormError(undefined);
    setFormSuccess(undefined);

    try {
      const result = await submitFeedbackAction(values);

      if (result.fieldErrors?.content?.[0]) {
        setError("content", {
          type: "server",
          message: result.fieldErrors.content[0],
        });
      }

      if (result.fieldErrors?.phone?.[0]) {
        setError("phone", {
          type: "server",
          message: result.fieldErrors.phone[0],
        });
      }

      if (result.status === "success") {
        reset();
        setFormSuccess(result.formSuccess ?? "Gửi góp ý thành công!");
      } else {
        setFormError(result.formError);
      }
    } catch {
      setFormError("Không thể gửi góp ý lúc này. Vui lòng thử lại.");
    }
  }

  return (
    <section className="composer-card" aria-labelledby="feedback-title">
      <div className="composer-heading">
        <div>
          <p className="eyebrow">Góp ý khách hàng</p>
          <h1 id="feedback-title">Chia sẻ ý kiến của bạn</h1>
        </div>
      </div>

      <form
        className="composer-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormAlert message={formError} />

        {formSuccess && (
          <p className="field-success" role="status">
            {formSuccess}
          </p>
        )}

        <div className="field-group">
          <label htmlFor="feedback-content">Nội dung góp ý</label>
          <textarea
            id="feedback-content"
            rows={5}
            placeholder="Nhập nội dung góp ý (trên 20 ký tự)..."
            aria-invalid={Boolean(errors.content)}
            aria-describedby={
              errors.content ? "feedback-content-error" : undefined
            }
            {...register("content")}
          />
          {errors.content && (
            <p id="feedback-content-error" className="field-error">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="feedback-phone">Số điện thoại</label>
          <input
            id="feedback-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Ví dụ: 0912345678"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? "feedback-phone-error" : undefined
            }
            {...register("phone")}
          />
          {errors.phone && (
            <p id="feedback-phone-error" className="field-error">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="composer-actions">
          <p>Thông tin sẽ được dùng để tiếp nhận góp ý của bạn.</p>
          <SubmitButton
            isPending={isSubmitting}
            pendingLabel="Đang gửi..."
          >
            Gửi góp ý
          </SubmitButton>
        </div>
      </form>
    </section>
  );
}