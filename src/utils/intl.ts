import type { Locale } from "@/const/locales";
import IntlMessageFormat from "intl-messageformat";

const formatterCache = new Map();

export function formatMessage(message: string, locale: Locale, values = {}) {
  const cacheKey = `${message}_${locale}`;

  let formatter = formatterCache.get(cacheKey);
  if (!formatter) {
    formatter = new IntlMessageFormat(message, locale);
    formatterCache.set(cacheKey, formatter);
  }

  return formatter.format(values);
}
