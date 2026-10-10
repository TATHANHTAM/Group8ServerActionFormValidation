
import "server-only";
import { getPool } from "@/lib/server/db";

type InsertFeedbackInput = {
  content: string;
  phone: string;
};

export async function insertFeedback(
  input: InsertFeedbackInput,
): Promise<void> {
  await getPool().query(
    `INSERT INTO feedback (content, phone)
     VALUES ($1, $2)`,
    [input.content, input.phone],
  );
}
