import Page from "@/components/page/Page";
import { LOCALES } from "@/const/locales";

export const revalidate = 60;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default Page;
