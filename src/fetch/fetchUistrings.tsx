import { stringify } from "qs-esm";
import { generateUistringCacheTags } from "./generateUistringCacheTags";
import { UiString, validateUiStrings } from "@/schemas/generated/UiStringSchema";

export default async function fetchUiStrings(ids: string[], locale: string) {
  const tags = generateUistringCacheTags(ids);

  const stringifiedQuery = stringify({
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
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/ui-strings?${stringifiedQuery}`,
    { next: { tags, revalidate: false } },
  );

  const uistrings = validateUiStrings(await response.json());

  return uistrings.docs.reduce((lookup: Record<string, string>, item: UiString) => {
    lookup[item.id] = item.text ?? "";
    return lookup;
  }, {});
}
