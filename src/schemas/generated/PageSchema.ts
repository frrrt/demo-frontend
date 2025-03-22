/**
 * THIS FILE IS AUTO-GENERATED. DO NOT MODIFY.
 */

import * as v from "valibot";
import { MediaSchema } from "./MediaSchema";

export const PageSchema = v.object({
  id: v.string(),
  title: v.nullish(v.string()),
  metaDescription: v.nullish(v.string()),
  image: v.nullish(MediaSchema),
  content: v.nullish(v.any()),
  updatedAt: v.nullish(v.string()),
  createdAt: v.nullish(v.string()),
  _status: v.nullish(v.string()),
});

export type Page = v.InferOutput<typeof PageSchema>;

export function validatePage(data: unknown): Page {
  return v.parse(PageSchema, data);
}

export function validatePages(data: unknown): { docs: Page[] } {
  return v.parse(v.object({ docs: v.array(PageSchema) }), data);
}
