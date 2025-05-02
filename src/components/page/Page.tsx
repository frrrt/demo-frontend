import PageContent from "./PageContent";
import { parse } from "valibot";
import { pageParamsSchema } from "@/schemas/pageParamsSchema";
import fetchUiStrings from "@/fetch/fetchUistrings";
import { fetchPage } from "@/fetch/fetchPage";
import { notFound } from "next/navigation";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default async function Page({ params }: { params: Promise<unknown> }) {
  const { slug, locale } = parse(pageParamsSchema, await params);

  const pageData = await fetchPage(slug, locale);

  if (!pageData) {
    notFound();
  }

  const uistrings = await fetchUiStrings(
    [
      "comment-form-title",
      "comment-form-button",
      "comment-form-email-helper",
      "comment-form-email",
      "comment-form-name",
      "comment-form-comment",
    ],
    locale,
  );

  return (
    <>
      <PageContent {...pageData} />
      <CommentList pageId={slug} locale={locale} />
      <CommentForm uistrings={uistrings} pageId={slug} locale={locale} />
    </>
  );
}
