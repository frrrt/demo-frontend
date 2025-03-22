/**
 * THIS FILE IS AUTO-GENERATED. DO NOT MODIFY.
 */

import * as v from "valibot";

export const UiStringMediaSchema = v.object({
  id: v.string(),
  updatedAt: v.nullish(v.string()),
  createdAt: v.nullish(v.string()),
  url: v.nullish(v.string()),
  thumbnailURL: v.nullish(v.string()),
  filename: v.nullish(v.string()),
  mimeType: v.nullish(v.string()),
  filesize: v.nullish(v.number()),
  width: v.nullish(v.number()),
  height: v.nullish(v.number()),
  focalX: v.nullish(v.number()),
  focalY: v.nullish(v.number()),
});

export type UiStringMedia = v.InferOutput<typeof UiStringMediaSchema>;

export function validateUiStringMedia(data: unknown): UiStringMedia {
  return v.parse(UiStringMediaSchema, data);
}

export function validateUiStringMedias(data: unknown): { docs: UiStringMedia[] } {
  return v.parse(v.object({ docs: v.array(UiStringMediaSchema) }), data);
}
