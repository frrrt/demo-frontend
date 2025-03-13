import type { Page } from "@/payload-types";
import PageContent from "./PageContent";
import { parse } from "valibot";
import { pageParamsSchema } from "@/validation/pageParamsSchema";
import fetchUiStrings from "@/fetch/fetchUistrings";

export default async function Page({ params }: { params: Promise<unknown> }) {
  const { slug, locale } = parse(pageParamsSchema, await params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${slug}?locale=${locale}`,
    {
      next: { tags: [`${locale}-${slug}`] },
    },
  );

  const result: Page = await response.json();

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
