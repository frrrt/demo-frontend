import { LivePreviewPage } from "@/components/page/LivePreviewPage";
import fetchUiStrings from "@/fetch/fetchUistrings";
import { localeSchema } from "@/validation/localeSchema";
import { slugSchema } from "@/validation/slugSchema";
import { notFound } from "next/navigation";
import { object, parse, string } from "valibot";
import { fetchPage } from "../../../../fetch/fetchPage";

const pagePreviewSchema = object({
  token: string(),
  slug: slugSchema,
  locale: localeSchema,
});

export default async function PagePreview({
  params,
  searchParams,
}: {
  params: Record<string, unknown>;
  searchParams: Record<string, unknown>;
}) {
  const resolvedParams = {
    ...(await params),
    ...(await searchParams),
  };

  const { token, slug, locale } = parse(pagePreviewSchema, resolvedParams);

  if (token !== process.env.PREVIEW_TOKEN) {
    notFound();
  }

  const page = await fetchPage(slug, locale);

  if (!page) {
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

  return <LivePreviewPage initialData={page} uistrings={uistrings} />;
}
