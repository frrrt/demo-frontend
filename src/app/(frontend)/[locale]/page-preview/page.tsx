import { LivePreviewPage } from "@/components/page/LivePreviewPage";
import { Page } from "@/payload-types";
import { localeSchema } from "@/validation/localeSchema";
import { slugSchema } from "@/validation/slugSchema";
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${slug}?locale=${locale}`,
  );
  const result: Page = await response.json();

  return <LivePreviewPage initialData={result} />;
}
