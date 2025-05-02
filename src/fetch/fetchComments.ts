import type { Locale } from "@/const/locales";
import { queryCollection } from "./query";

export async function fetchComments(pageId: string, locale: Locale) {
  return await queryCollection(
    "comments",
    {
      where: {
        page: {
          equals: pageId,
        },
        locale: {
          equals: locale,
        },
      },
      select: {
        authorName: true,
        commentText: true,
        createdAt: true,
      },
      sort: ["-createdAt"],
      limit: 100,
    },
    { next: { tags: [`comments-page-${locale}-${pageId}`] } },
  );
}
