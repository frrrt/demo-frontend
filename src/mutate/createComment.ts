"use server";

import { mutateCollection } from "@/fetch/mutate";

export async function createComment(pageId: string, formData: FormData) {
  try {
    const result = await mutateCollection("comments", {
      commentText: (formData.get("commentText") || "").toString(),
      authorEmail: (formData.get("authorEmail") || "").toString(),
      authorName: (formData.get("authorName") || "").toString(),
      page: pageId,
    });
    console.log("Comment submitted successfully:", result);
  } catch (error) {
    console.error("Failed to submit comment:", error);
    throw error;
  }
}
