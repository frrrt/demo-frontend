import { queryCollection } from "./query";

export async function fetchPages(locale: string) {
  return await queryCollection(
    "pages",
    {
      locale,
      select: {
        id: true,
        title: true,
      },
      sort: "-createdAt",
    },
    {
      next: { tags: [`pages`] },
    },
  );
}
