import type { Locale } from "@/const/locales";
import createComment from "@/mutate/createComment";
import type { Page } from "@/payload-types";
import CommentForm from "./CommentForm";
import fetchUiStrings from "@/fetch/fetchUistrings";

export default async function CommentFormWrapper({
  pageId,
  locale,
}: {
  pageId: Page["id"];
  locale: Locale;
}) {
  const createCommentAction = createComment.bind(null, pageId).bind(null, locale);

  const uistrings = await fetchUiStrings(
    [
      "comment-form-title",
      "comment-form-button",
      "comment-form-email-helper",
      "comment-form-email",
      "comment-form-name",
      "comment-form-comment",
      "comment-list-no-comments",
      "comment-form-reload",
      "comment-form-success-title",
      "comment-form-success-message",
      "comment-form-error-title",
      "comment-form-error-message",
      "comment-form-button",
    ],
    locale,
  );

  return <CommentForm uistrings={uistrings} createCommentAction={createCommentAction} />;
}
