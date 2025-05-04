import PageContent from "./PageContent";
import { parse } from "valibot";
import { pageParamsSchema } from "@/schemas/pageParamsSchema";
import { fetchPage } from "@/fetch/fetchPage";
import { notFound } from "next/navigation";
import CommentList from "./CommentList";
import CommentFormServer from "./CommentFormServer";

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
      <CommentFormServer pageId={slug} locale={locale} />
    </>
  );
}
