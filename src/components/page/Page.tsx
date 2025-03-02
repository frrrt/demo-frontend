import PageContent from "./PageContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${
      slug || "index"
    }?locale=en-US`
  );
  const result = await response.json();

  return <PageContent {...result} />;
}
