import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

export const metadata: Metadata = { title: "Góp ý khách hàng" };

export default function FeedbackPage() {
  return (
    <main className="feedback-page">
      <section className="feedback-card" aria-labelledby="feedback-title">
        <Link className="feedback-back" href="/login">Nexus Social Network</Link>
        <p className="eyebrow">Chúng tôi luôn lắng nghe</p>
        <h1 id="feedback-title">Góp ý khách hàng</h1>
        <p className="feedback-description">
          Chia sẻ ý kiến của bạn để giúp chúng tôi cải thiện trải nghiệm.
        </p>
        <FeedbackForm />
        <p className="feedback-note">
          Biểu mẫu hiện chỉ kiểm tra dữ liệu, chưa lưu góp ý.
        </p>
      </section>
    </main>
  );
}
