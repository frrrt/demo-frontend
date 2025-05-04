import ICUMessagePreviewer from "@/components/page/ICUMessagePreviewer";
import { localeSchema } from "@/schemas/localeSchema";
import { Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { object, parse, string } from "valibot";

const uiStringPreviewSchema = object({
  token: string(),
  locale: localeSchema,
  icuMessage: string(),
});

export default async function UIStringPreview({
  params,
  searchParams,
}: {
  params: Record<string, unknown>;
  searchParams: Record<string, unknown>;
}) {
  const resolvedParams = {
    ...(await params),
    ...(await searchParams),
  };

  const { token, locale, icuMessage } = parse(uiStringPreviewSchema, resolvedParams);

  if (token !== process.env.PREVIEW_TOKEN) {
    notFound();
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        UI String Preview
      </Typography>

      <ICUMessagePreviewer icuMessage={icuMessage} locale={locale} />
    </>
  );
}
