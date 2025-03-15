import { fetchPage } from "@/fetch/fetchPage";
import { pageParamsSchema } from "@/validation/pageParamsSchema";
import { parse } from "valibot";

export async function generateMetadata({ params }: { params: Promise<unknown> }) {
  const { slug, locale } = parse(pageParamsSchema, await params);

  const { title, metaDescription: description } = await fetchPage(slug, locale);

  return {
    title,
    description,
  };
}
