import { union, literal } from "valibot";
import { LOCALES } from "@/const/locales";

export const localeSchema = union(LOCALES.map((locale) => literal(locale)));
