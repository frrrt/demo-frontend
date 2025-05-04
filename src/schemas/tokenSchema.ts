import { literal } from "valibot";

export const tokenSchema = literal(process.env.PREVIEW_TOKEN as string);
