import CommentFormWrapper from "@/components/page/CommentFormWrapper";
import CommentList from "@/components/page/CommentList";
import { LivePreviewPage } from "@/components/page/LivePreviewPage";
import { fetchPage } from "@/fetch/fetchPage";
import { localeSchema } from "@/schemas/localeSchema";
import { slugSchema } from "@/schemas/slugSchema";
import { notFound } from "next/navigation";
import { object, parse, string } from "valibot";

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

  // This forwards an "empty" page object if the fetch is a 404, this is usefull
  // if it is only a draft during live preview for example.
  const page = (await fetchPage(slug, locale)) ?? { id: "none", image: "test", content: [{}] };

  return (
    <>
      <LivePreviewPage initialData={page} />
      <CommentList pageId={page.id} locale={locale} />
      <CommentFormWrapper pageId={page.id} locale={locale} />
    </>
  );
}
