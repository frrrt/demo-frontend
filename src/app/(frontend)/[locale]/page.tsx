import Page from "@/components/page/Page";
import { LOCALES } from "@/const/locales";

export const revalidate = false;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default Page;

export { generateMetadata } from "@/components/page/generateMetadata";
