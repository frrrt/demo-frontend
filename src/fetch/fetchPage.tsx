import { Page, validatePage } from "@/schemas/PageSchema";

export async function fetchPage(slug: string, locale: string): Promise<Page | undefined> {
  const url = new URL(`/api/pages/${slug}`, process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST);
  url.searchParams.append("locale", locale);

  const response = await fetch(url.toString(), {
    next: { tags: [`${locale}-page-${slug}`] },
  });

  if (response.status === 404) {
    return;
  }

  return validatePage(await response.json());
}
