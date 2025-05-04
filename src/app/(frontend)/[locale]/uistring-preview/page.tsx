import ICUMessagePreviewer from "@/components/page/ICUMessagePreviewer";
import { localeSchema } from "@/schemas/localeSchema";
import { tokenSchema } from "@/schemas/tokenSchema";
import { Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { object, safeParse, string } from "valibot";

const uiStringPreviewSchema = object({
  token: tokenSchema,
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

  const result = safeParse(uiStringPreviewSchema, resolvedParams);

  if (!result.success) {
    notFound();
  }

  const { locale, icuMessage } = result.output;

  return (
    <>
      <Typography variant="h2" gutterBottom>
        UI String Preview
      </Typography>

      <ICUMessagePreviewer locale={locale} icuMessage={icuMessage} />
    </>
  );
}
