import Page from "@/components/page/Page";
import { DEFAULT_LOCALE, LOCALES } from "@/const/locales";
import { fetchPages } from "@/fetch/fetchPages";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await fetchPages(DEFAULT_LOCALE);
  const slugs = pages.map(({ id }) => id);
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default Page;

export { generateMetadata } from "@/components/page/generateMetadata";
