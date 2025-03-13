import { stringify } from "qs-esm";
import { UiString } from "@/payload-types";

export default async function fetchUiStrings(ids: string[], locale: string) {
  const stringifiedQuery = stringify(
    {
      where: {
        id: {
          in: ids,
        },
      },
      locale,
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/ui-strings${stringifiedQuery}`,
    { next: { revalidate: false } },
  );

  const data: { docs: UiString[] } = await response.json();

  const uiStringLookup = data.docs.reduce((lookup: Record<string, string>, item: UiString) => {
    lookup[item.id] = item.text ?? "";
    return lookup;
  }, {});

  return uiStringLookup;
}
