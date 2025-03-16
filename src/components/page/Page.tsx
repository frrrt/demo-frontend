import PageContent from "./PageContent";
import { parse } from "valibot";
import { pageParamsSchema } from "@/validation/pageParamsSchema";
import fetchUiStrings from "@/fetch/fetchUistrings";
import { fetchPage } from "@/fetch/fetchPage";

export default async function Page({ params }: { params: Promise<unknown> }) {
  const { slug, locale } = parse(pageParamsSchema, await params);

  const result = await fetchPage(slug, locale);

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

  return <PageContent {...result} uistrings={uistrings} />;
}
