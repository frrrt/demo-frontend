import Page from "@/components/page/Page";
import { LOCALES } from "@/const/locales";

export const revalidate = 3600;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default Page;

export { generateMetadata } from "@/components/page/generateMetadata";
