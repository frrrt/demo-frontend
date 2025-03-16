import convertToRichText from "@/components/convertRichText";
import ResponsiveImage from "@/components/ResponsiveImage";
import CommentForm from "./CommentForm";
import { Page } from "@/schemas/PageSchema";

export default function PageContent({
  image,
  content,
  uistrings,
}: Page & { uistrings: Record<string, string> }) {
  return (
    <>
      {image && (
        <ResponsiveImage
          src={String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST) + image.url}
          alt={image.alt ?? ""}
          width={image.width ?? 0}
          height={image.height ?? 0}
          priority
        />
      )}

      {content && convertToRichText(Array.isArray(content) ? content : [content])}

      <CommentForm uistrings={uistrings} />
    </>
  );
}
