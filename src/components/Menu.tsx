import { Page } from "@/payload-types";
import DrawerMenu from "./DrawerMenu";

export default async function Menu() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/pages?locale=en-US`,
  );
  const result: { docs: Page[] } = await response.json();

  return <DrawerMenu pages={result.docs} />;
}
