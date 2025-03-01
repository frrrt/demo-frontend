import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Revalidation request", body);
  const { token, path } = body;

  if (token !== process.env.REVALIDATION_TOKEN) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    revalidatePath(path === "index" ? "/" : path);
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log("Error revalidating", error);
    return Response.json({ message: "Error revalidating" }, { status: 500 });
  }
}
