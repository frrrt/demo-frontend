import { fetchPages } from "@/fetch/fetchPages";
import type { Locale } from "@/const/locales";
import DrawerMenu from "./DrawerMenu";

export default async function Menu({ locale }: { locale: Locale }) {
  // Automatically gets type
  //    const pages: Pick<Page, "id" | "title">[]
  // from fetchPages (and the queryCollection() utility underneath)
  const pages = await fetchPages(locale);
  const filteredPages = pages.filter(({ id }) => id !== "index");
  // DrawerMenu expects pages to be of type { id: string; title: string }[]
  // TypeScript's structural typing allows these types to be compatible
  // since both types have the same shape (contain the same properties)
  return <DrawerMenu pages={filteredPages} locale={locale} />;
}
