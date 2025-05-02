import PageContent from "./PageContent";
import { parse } from "valibot";
import { pageParamsSchema } from "@/schemas/pageParamsSchema";
import { fetchPage } from "@/fetch/fetchPage";
import { notFound } from "next/navigation";
import CommentList from "./CommentList";
import CommentFormWrapper from "./CommentFormWrapper";

export default async function Page({ params }: { params: Promise<unknown> }) {
  const { slug, locale } = parse(pageParamsSchema, await params);

  const pageData = await fetchPage(slug, locale);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <PageContent {...pageData} />
      <CommentList pageId={slug} locale={locale} />
      <CommentFormWrapper pageId={slug} locale={locale} />
    </>
  );
}
