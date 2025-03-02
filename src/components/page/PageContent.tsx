import convertToRichText from "@/components/convertRichText";
import ResponsiveImage from "@/components/ResponsiveImage";
import Head from "next/head";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PageContent(result: any) {
  return (
    <>
      <Head>
        <title>{result.title}</title>
      </Head>
      {result.image && (
        <ResponsiveImage
          src={process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST + result.image.url}
          alt={result.image.alt}
          width={result.image.width}
          height={result.image.height}
        />
      )}

      {convertToRichText(result.content)}
    </>
  );
}
