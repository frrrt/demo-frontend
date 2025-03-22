import { fetchPage } from "@/fetch/fetchPage";
import { pageParamsSchema } from "@/validation/pageParamsSchema";
import { parse } from "valibot";

export async function generateMetadata({ params }: { params: Promise<unknown> }) {
  const { slug, locale } = parse(pageParamsSchema, await params);

  // It is okay, that this overfetches the page data, for example the content.
  // This request is done anyway for rendering the page and will be cached by
  // NextJS.
  const { title, metaDescription } = (await fetchPage(slug, locale)) ?? {};

  return {
    title,
    description: metaDescription,
  };
}
