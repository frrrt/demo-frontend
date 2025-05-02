"use server";
import { CREATE_COMMENT_ERROR, CREATE_COMMENT_SUCCESS } from "@/components/page/Notification";
import type { Locale } from "@/const/locales";
import { mutateCollection } from "@/fetch/mutate";

export default async function createComment(
  page: string,
  locale: Locale,
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  try {
    await mutateCollection("comments", {
      commentText: (formData.get("commentText") || "").toString(),
      authorEmail: (formData.get("authorEmail") || "").toString(),
      authorName: (formData.get("authorName") || "").toString(),
      locale,
      page,
    });

    return {
      message: CREATE_COMMENT_SUCCESS,
    };
  } catch (e) {
    console.error("Error creating comment:", e);
    return {
      message: CREATE_COMMENT_ERROR,
    };
  }
}
