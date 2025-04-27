import { queryCollection } from "./query";

export async function fetchComments(pageId: string) {
  return await queryCollection(
    "comments",
    {
      where: {
        page: {
          equals: pageId,
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
    { next: { tags: [`comments-page-${pageId}`] } },
  );
}
