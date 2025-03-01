import convertToRichText from "@/components/convertRichText";
import ResponsiveImage from "@/components/ResponsiveImage";
import Head from "next/head";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.PAYLOAD_CMS_HOST}/api/pages/${slug || "index"}?locale=en-US`
  );
  const result = await response.json();

  return (
    <>
      <Head>
        <title>{result.title}</title>
      </Head>
      <ResponsiveImage
        src={process.env.PAYLOAD_CMS_HOST + result.image.url}
        alt={result.image.alt}
        width={result.image.width}
        height={result.image.height}
      />

      {convertToRichText(result.content)}
    </>
  );
}
