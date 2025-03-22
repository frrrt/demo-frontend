import { object } from "valibot";
import { localeSchema } from "../schemas/localeSchema";
import { slugSchema } from "./slugSchema";

export const pageParamsSchema = object({
  slug: slugSchema,
  locale: localeSchema,
});
