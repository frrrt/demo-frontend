import { queryById } from "./query";

export async function fetchPage(slug: string, locale: string) {
  const response = await queryById(
    "pages",
    slug,
    { locale },
    { next: { tags: [`${locale}-page-${slug}`] } },
  );

  return response;
}
