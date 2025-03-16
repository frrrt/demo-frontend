/**
 * THIS FILE IS AUTO-GENERATED. DO NOT MODIFY.
 */

import * as v from "valibot";

export const MediaSchema = v.object({
  id: v.string(),
  alt: v.nullish(v.string()),
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

export type Media = v.InferOutput<typeof MediaSchema>;

export function validateMedia(data: unknown): Media {
  return v.parse(MediaSchema, data);
}

export function validateMedias(data: unknown): { docs: Media[] } {
  return v.parse(v.object({ docs: v.array(MediaSchema) }), data);
}
