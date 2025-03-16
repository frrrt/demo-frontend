/**
 * THIS FILE IS AUTO-GENERATED. DO NOT MODIFY.
 */

import * as v from "valibot";
import { UiStringMediaSchema } from "./UiStringMediaSchema";

export const UiStringSchema = v.object({
  id: v.string(),
  defaultLanguageText: v.nullish(v.any()),
  text: v.nullish(v.string()),
  description: v.nullish(v.string()),
  contextImage: v.nullish(UiStringMediaSchema),
  updatedAt: v.nullish(v.string()),
  createdAt: v.nullish(v.string()),
});

export type UiString = v.InferOutput<typeof UiStringSchema>;

export function validateUiString(data: unknown): UiString {
  return v.parse(UiStringSchema, data);
}

export function validateUiStrings(data: unknown): { docs: UiString[] } {
  return v.parse(v.object({ docs: v.array(UiStringSchema) }), data);
}
