import { stringify } from "qs-esm";
import {
  PayloadCollection,
  CollectionType,
  CollectionQueryParams,
  NextFetchOptions,
} from "./query";

export type MutationMethod = "create" | "update" | "delete";

export interface MutationOptions extends NextFetchOptions {
  method?: MutationMethod;
}

/**
 * Creates, updates, or deletes documents in a Payload CMS collection
 *
 * @param collection - The collection name to mutate
 * @param data - The data to send to the CMS
 * @param params - Query parameters (e.g. for filtering when updating multiple documents)
 * @param options - Additional fetch options
 * @returns The created or updated document
 */
export async function mutateCollection<T extends PayloadCollection>(
  collection: T,
  data: Partial<CollectionType<T>>,
  params: CollectionQueryParams<T, undefined> = {},
  options: MutationOptions = {},
): Promise<CollectionType<T>> {
  const { method = "create", ...fetchOptions } = options;

  // Determine HTTP method based on the operation
  const httpMethod =
    method === "create"
      ? "POST"
      : method === "update"
        ? "PATCH"
        : method === "delete"
          ? "DELETE"
          : "POST";

  // For updates we need to handle where clauses
  const stringifiedQuery = stringify(params);
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/${collection}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`;

  const response = await fetch(url, {
    method: httpMethod,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    },
    body: JSON.stringify(data),
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error(`Failed to ${method} document in ${collection}: ${response.statusText}`);
  }

  return await response.json();
}
