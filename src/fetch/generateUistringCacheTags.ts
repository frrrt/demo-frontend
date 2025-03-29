export function generateUistringCacheTags(ids: string[]) {
  return Array.from(new Set(ids.map((id) => `uistring-${id.split("-")[0]}`)));
}
