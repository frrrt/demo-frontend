"use client";

import PageContent from "@/components/page/PageContent";
import { Page } from "@/schemas/PageSchema";
import { useLivePreview } from "@payloadcms/live-preview-react";

export function LivePreviewPage({
  initialData,
  uistrings,
}: {
  initialData: Page;
  uistrings: Record<string, string>;
}) {
  const { data } = useLivePreview({
    initialData,
    serverURL: String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST),
    depth: 2,
  });

  return <PageContent {...data} uistrings={uistrings} />;
}
