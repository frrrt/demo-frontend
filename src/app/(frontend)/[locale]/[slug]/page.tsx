import Page from "@/components/page/Page";
import { DEFAULT_LOCALE, LOCALES } from "@/const/locales";
import { fetchPages } from "@/fetch/fetchPages";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await fetchPages(DEFAULT_LOCALE);
  return LOCALES.flatMap((locale) => pages.map(({ id }) => ({ locale, slug: id })));
}

export default Page;

export { generateMetadata } from "@/components/page/generateMetadata";
