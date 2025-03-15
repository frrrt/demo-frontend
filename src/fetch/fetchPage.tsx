export async function fetchPage(slug: string, locale: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages/${slug}?locale=${locale}`,
  );

  return await response.json();
}
