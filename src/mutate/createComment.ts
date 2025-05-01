"use server";
import { CREATE_COMMENT_ERROR, CREATE_COMMENT_SUCCESS } from "@/components/page/Notification";
import { mutateCollection } from "@/fetch/mutate";

export default async function createComment(
  pageId: string,
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
      page: pageId,
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
