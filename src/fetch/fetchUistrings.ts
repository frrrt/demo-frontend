import { generateUistringCacheTags } from "./generateUistringCacheTags";
import { queryCollection } from "./query";

export default async function fetchUiStrings(ids: string[], locale: string) {
  const uistrings = await queryCollection(
    "ui-strings",
    {
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        text: true,
      },
      locale,
      limit: ids.length,
    },
    {
      next: { tags: generateUistringCacheTags(ids), revalidate: false },
    },
  );

  return uistrings.reduce<Record<string, string>>((lookup, item) => {
    lookup[item.id] = item.text ?? "";
    return lookup;
  }, {});
}
