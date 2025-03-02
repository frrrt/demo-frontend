"use client";

import PageContent from "@/components/page/PageContent";
import { useLivePreview } from "@payloadcms/live-preview-react";

// Fetch the page in a server component, pass it to the client component, then thread it through the hook
// The hook will take over from there and keep the preview in sync with the changes you make
// The `data` property will contain the live data of the document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LivePreviewPage({ initialData }: any) {
  const { data } = useLivePreview({
    initialData,
    serverURL: String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST),
    depth: 2,
  });

  return <PageContent {...data} />;
}
