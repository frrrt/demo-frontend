import type { Locale } from "@/const/locales";
import type { Page } from "@/payload-types";

export async function fetchPages(locale: Locale): Promise<Page[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages?locale=${locale}`,
  );

  return (await response.json()).docs;
}
