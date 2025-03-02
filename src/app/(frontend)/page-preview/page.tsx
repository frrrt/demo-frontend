import { LivePreviewPage } from "@/components/page/LivePreviewPage";
import { notFound } from "next/navigation";

export default async function PagePreview({
  searchParams,
}: {
  searchParams: Promise<{ token: string; slug: string }>;
}) {
  const { token, slug } = await searchParams;

  if (token !== process.env.PREVIEW_TOKEN) {
    notFound();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${
      slug || "index"
    }?locale=en-US`
  );
  const result = await response.json();

  return <LivePreviewPage initialData={result} />;
}
