"use client";

import PageContent from "@/components/page/PageContent";
import { Page } from "@/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";

export function LivePreviewPage({
  initialData,
  uistrings,
}: {
  initialData: Pick<Page, "image" | "content">;
  uistrings: Record<string, string>;
}) {
  const { data } = useLivePreview({
    initialData,
    serverURL: String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST),
    depth: 2,
  });

  return <PageContent {...data} uistrings={uistrings} />;
}
