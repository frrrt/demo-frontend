"use client";

import PageContent from "@/components/page/PageContent";
import type { Page } from "@/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";

export function LivePreviewPage({ initialData }: { initialData: Page }) {
  const { data } = useLivePreview({
    initialData,
    serverURL: String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST),
    depth: 2,
  });

  return <PageContent {...data} />;
}
