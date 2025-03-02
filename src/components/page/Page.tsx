import type { Page } from "@/payload-types";
import PageContent from "./PageContent";
import { parse } from "valibot";
import { pageParamsSchema } from "@/validation/pageParamsSchema";

export default async function Page({ params }: { params: Promise<unknown> }) {
  const { slug, locale } = parse(pageParamsSchema, await params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${slug}?locale=${locale}`,
    {
      next: { tags: [`${locale}-${slug}`] },
    },
  );

  const result: Page = await response.json();

  return <PageContent {...result} />;
}
