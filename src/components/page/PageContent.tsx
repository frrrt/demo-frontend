import convertToRichText from "@/components/convertRichText";
import ResponsiveImage from "@/components/ResponsiveImage";
import type { Page } from "@/payload-types";
import Head from "next/head";

export default function PageContent({ title, image, content }: Page) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {image && typeof image !== "string" && (
        <ResponsiveImage
          src={String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST) + image.url}
          alt={image.alt}
          width={image.width ?? 0}
          height={image.height ?? 0}
        />
      )}

      {content && convertToRichText(content)}
    </>
  );
}
