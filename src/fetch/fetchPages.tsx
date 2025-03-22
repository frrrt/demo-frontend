import type { Locale } from "@/const/locales";
import { Page, validatePages } from "@/schemas/PageSchema";
import { stringify } from "qs-esm";

export async function fetchPages(locale: Locale): Promise<Page[]> {
  const stringifiedQuery = stringify({
    select: {
      id: true,
      title: true,
    },
    locale,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages?${stringifiedQuery}`,
    {
      next: { tags: [`${locale}-pages`] },
    },
  );

  return validatePages(await response.json()).docs;
}
