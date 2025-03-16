import { Page, validatePage } from "@/schemas/PageSchema";

export async function fetchPage(slug: string, locale: string): Promise<Page> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${slug}?locale=${locale}`,
    {
      next: { tags: [`${locale}-page-${slug}`] },
    },
  );

  return validatePage(await response.json());
}
