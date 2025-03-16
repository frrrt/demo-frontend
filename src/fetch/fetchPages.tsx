import type { Locale } from "@/const/locales";
import { Page, validatePages } from "@/schemas/PageSchema";

export async function fetchPages(locale: Locale): Promise<Page[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages?locale=${locale}`,
  );

  return validatePages(await response.json()).docs;
}
