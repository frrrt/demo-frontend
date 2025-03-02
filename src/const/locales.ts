import { Config } from "@/payload-types";

export type Locale = Config["locale"];

export const LOCALES: Locale[] = ["en-US", "de-DE", "fr-FR", "ja-JP", "ar-SA"];
export const DEFAULT_LOCALE: Locale = "en-US";
