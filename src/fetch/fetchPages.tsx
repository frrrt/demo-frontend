import type { Locale } from "@/const/locales";
import { Page, validatePages } from "@/schemas/PageSchema";

export async function fetchPages(locale: Locale): Promise<Page[]> {
  const url = new URL(`/api/pages`, process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST);
  url.searchParams.append("locale", locale);

  const response = await fetch(url.toString(), {
    next: { tags: [`${locale}-pages`] },
  });

  return validatePages(await response.json()).docs;
}
