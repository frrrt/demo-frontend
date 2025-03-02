import { LivePreviewPage } from "@/components/page/LivePreviewPage";
import { Locale } from "@/const/locales";
import { Page } from "@/payload-types";
import { notFound } from "next/navigation";

export default async function PagePreview({
  searchParams,
}: {
  searchParams: Promise<{ token: string; slug: string; locale: Locale }>;
}) {
  const { token, slug, locale } = await searchParams;

  if (token !== process.env.PREVIEW_TOKEN) {
    notFound();
  }

  // validate token, slug and locale

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${slug || "index"}?locale=${locale}`,
  );
  const result: Page = await response.json();

  return <LivePreviewPage initialData={result} />;
}
