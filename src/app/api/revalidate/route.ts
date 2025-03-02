import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const { token, tag } = body;

  if (token !== process.env.REVALIDATION_TOKEN) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    revalidateTag(tag);
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log("Error revalidating", error);
    return Response.json({ message: "Error revalidating" }, { status: 500 });
  }
}
