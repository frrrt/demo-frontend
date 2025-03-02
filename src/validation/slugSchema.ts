import { regex, string, pipe, fallback } from "valibot";

export const slugSchema = pipe(
  fallback(string(), "index"),
  regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain only lowercase letters, numbers, and hyphens",
  ),
);
