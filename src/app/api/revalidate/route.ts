import { revalidateTag } from "next/cache";
import * as v from "valibot";

const RevalidationSchema = v.object({
  token: v.string(),
  tags: v.array(v.string()),
});

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { token, tags } = v.parse(RevalidationSchema, body);

    if (token !== process.env.REVALIDATION_TOKEN) {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    for (const tag of tags) {
      revalidateTag(tag);
    }

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    if (error instanceof v.ValiError) {
      return Response.json(
        { message: "Invalid request data", issues: error.issues },
        { status: 400 },
      );
    }

    console.log("Error revalidating", error);
    return Response.json({ message: "Error revalidating" }, { status: 500 });
  }
}
