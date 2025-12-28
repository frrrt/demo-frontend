import { revalidateTag } from "next/cache";
import * as v from "valibot";

const RevalidationSchema = v.object({
  token: v.string(),
  tags: v.array(v.string()),
});

export async function POST(request: Request) {
  try {
    const { token, tags } = v.parse(RevalidationSchema, await request.json());

    if (token !== process.env.REVALIDATION_TOKEN) {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    if (error instanceof v.ValiError) {
      return Response.json(
        { message: "Invalid request data", issues: error.issues },
        { status: 400 },
      );
    }

    console.error("Error revalidating", error);
    return Response.json({ message: "Error revalidating" }, { status: 500 });
  }
}
