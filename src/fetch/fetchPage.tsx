import { queryById } from "./query";

export async function fetchPage(slug: string, locale: string) {
  const response = await queryById(
    "pages",
    slug,
    {
      locale,
      select: {
        image: true,
        title: true,
        slug: true,
        content: true,
        metaDescription: true,
      },
      populate: {
        media: {
          url: true,
          alt: true,
          width: true,
          height: true,
        },
      },
    },
    { next: { tags: [`${locale}-page-${slug}`] } },
  );

  console.log("response", response);

  return response;
}
