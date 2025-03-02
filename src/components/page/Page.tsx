import type { Page } from "@/payload-types";
import PageContent from "./PageContent";

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;

  // validate slug and locale

  const id = slug || "index";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${id}?locale=${locale}`,
    {
      next: { tags: [`${locale}-${id}`] },
    },
  );

  const result: Page = await response.json();

  return <PageContent {...result} />;
}
