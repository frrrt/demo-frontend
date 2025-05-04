import CommentFormServer from "@/components/page/CommentFormServer";
import CommentList from "@/components/page/CommentList";
import { LivePreviewPage } from "@/components/page/LivePreviewPage";
import { fetchPage } from "@/fetch/fetchPage";
import { localeSchema } from "@/schemas/localeSchema";
import { slugSchema } from "@/schemas/slugSchema";
import { tokenSchema } from "@/schemas/tokenSchema";
import { notFound } from "next/navigation";
import { object, safeParse } from "valibot";

const pagePreviewSchema = object({
  token: tokenSchema,
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

  const { success, output } = safeParse(pagePreviewSchema, resolvedParams);

  if (!success) {
    notFound();
  }

  const { slug, locale } = output;

  // This forwards an "empty" page object if the fetch is a 404, this is usefull
  // if it is only a draft during live preview for example.
  const page = (await fetchPage(slug, locale)) ?? { id: "none", image: "test", content: [{}] };

  return (
    <>
      <LivePreviewPage initialData={page} />
      <CommentList pageId={page.id} locale={locale} />
      <CommentFormServer pageId={page.id} locale={locale} />
    </>
  );
}
