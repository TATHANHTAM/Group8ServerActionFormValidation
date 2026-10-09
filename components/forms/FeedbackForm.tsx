"use client";

import { useActionState, useState } from "react";
import { submitFeedback } from "@/app/actions/feedback";
import { FormAlert } from "@/components/ui/FormAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { FormActionState } from "@/lib/types/forms";

const initialState: FormActionState = { status: "idle" };

export function FeedbackForm() {
  const [content, setContent] = useState("");
  const [phone, setPhone] = useState("");

  const [state, formAction, isPending] = useActionState(submitFeedback, initialState);
  const contentError = state.fieldErrors?.content?.[0];
  const phoneError = state.fieldErrors?.phone?.[0];

  return (
    <form className="stack-form" action={formAction}>
      <FormAlert message={state.formError} />
      <FormAlert message={state.formSuccess} variant="success" />

      <div className="field-group">
        <label htmlFor="feedback-content">Nội dung góp ý</label>
        <textarea
        id="feedback-content"
        name="content"
       rows={5}
       value={content}
       onChange={(event) => setContent(event.target.value)}
       placeholder="Chia sẻ ý kiến của bạn (trên 20 ký tự)"
       aria-invalid={Boolean(contentError)}
       aria-describedby={
       contentError
      ? "feedback-content-error"
      : "feedback-content-hint"
       }
       required
/>
        <p id="feedback-content-hint" className="field-hint">
          Nội dung cần dài hơn 20 ký tự.
        </p>
        {contentError && (
          <p id="feedback-content-error" className="field-error">{contentError}</p>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="feedback-phone">Số điện thoại</label>
        <input
          id="feedback-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="0912345678"
          aria-invalid={Boolean(phoneError)}
          aria-describedby={phoneError ? "feedback-phone-error" : "feedback-phone-hint"}
          required
        />
        <p id="feedback-phone-hint" className="field-hint">
          Nhập số di động Việt Nam, ví dụ 0912345678 hoặc +84912345678.
        </p>
        {phoneError && (
          <p id="feedback-phone-error" className="field-error">{phoneError}</p>
        )}
      </div>

      <SubmitButton isPending={isPending} pendingLabel="Đang kiểm tra…">
        Gửi góp ý
      </SubmitButton>
    </form>
  );
}
