import DrawerMenu from "./DrawerMenu";
import type { Locale } from "@/const/locales";
import { fetchPages } from "../fetch/fetchPages";

export default async function Menu({ locale }: { locale: Locale }) {
  const pages = await fetchPages(locale);
  const filteredPages = pages.filter(({ id }) => id !== "index");
  return <DrawerMenu pages={filteredPages} locale={locale} />;
}
