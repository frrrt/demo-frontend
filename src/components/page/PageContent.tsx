import convertToRichText from "@/components/convertToRichText";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Page } from "@/payload-types";

export default function PageContent({ image, content }: Pick<Page, "image" | "content">) {
  return (
    <>
      {image && typeof image !== "string" && (
        <ResponsiveImage
          src={String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST) + image.url}
          alt={image.alt ?? ""}
          width={image.width ?? 0}
          height={image.height ?? 0}
          priority
        />
      )}

      {content && convertToRichText(Array.isArray(content) ? content : [content], true)}
    </>
  );
}
