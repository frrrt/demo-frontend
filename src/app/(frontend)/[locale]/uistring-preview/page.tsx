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

  const { success, output } = safeParse(uiStringPreviewSchema, resolvedParams);

  if (!success) {
    notFound();
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        UI String Preview
      </Typography>

      <ICUMessagePreviewer locale={output.locale} icuMessage={output.icuMessage} />
    </>
  );
}
