import convertToRichText from "@/components/convertRichText";
import ResponsiveImage from "@/components/ResponsiveImage";
import type { Page } from "@/payload-types";
import CommentForm from "./CommentForm";

export default function PageContent({
  image,
  content,
  uistrings,
}: Page & { uistrings: Record<string, string> }) {
  return (
    <>
      {image && typeof image !== "string" && (
        <ResponsiveImage
          src={String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST) + image.url}
          alt={image.alt}
          width={image.width ?? 0}
          height={image.height ?? 0}
          priority
        />
      )}

      {content && convertToRichText(content)}

      <CommentForm uistrings={uistrings} />
    </>
  );
}
