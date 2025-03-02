import type { Page } from "@/payload-types";
import DrawerMenu from "./DrawerMenu";
import type { Locale } from "@/const/locales";

export default async function Menu({ locale }: { locale: Locale }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages?locale=${locale}`,
  );
  const result: { docs: Page[] } = await response.json();
  const pages = result.docs.filter(({ id }) => id !== "index");
  return <DrawerMenu pages={pages} locale={locale} />;
}
