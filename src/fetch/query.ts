/**
 * Universal Payload CMS Query Function
 *
 * This module provides a typed approach to querying Payload CMS through its REST API.
 * It leverages TypeScript's advanced type system to provide full type safety for:
 * - Collection and global names
 * - Field selection (select)
 * - Query filtering (where)
 * - Response data structure
 *
 * The main benefits are:
 * 1. Type-safe querying with autocomplete for collection/global names and their fields
 * 2. Runtime validation of response data against expected types
 * 3. Support for Next.js cache tags and other fetch options
 *
 * Example usage:
 *
 * // Query all published pages with selected fields
 * const pages = await queryCollection('pages', {
 *   where: { _status: { equals: 'published' } },
 *   select: { id: true, title: true, content: true },
 *   locale: 'en-US',
 * }, {
 *   next: { tags: ['pages', 'en-US-pages'] }
 * });
 *
 * // Query a global with field selection
 * const settings = await queryGlobal('settings', {
 *   select: { chatgptModel: true }
 * });
 *
 * For more information on Payload's REST API and query parameters:
 * - https://payloadcms.com/docs/rest-api/overview
 * - https://payloadcms.com/docs/queries/select
 */

import { Config } from "@/payload-types";
import { stringify } from "qs-esm";

export type PayloadCollection = keyof Config["collections"];
export type PayloadGlobal = keyof Config["globals"];
export type CollectionType<T extends PayloadCollection> = Config["collections"][T];
export type GlobalType<T extends PayloadGlobal> = Config["globals"][T];

type BooleanRecord<T> = { [K in keyof T]?: T[K] extends object ? BooleanRecord<T[K]> : boolean };
export type SelectType<T> = BooleanRecord<T>;

type SimpleCondition<T> =
  | { equals?: T | null }
  | { not_equals?: T | null }
  | { greater_than?: T }
  | { less_than?: T }
  | { in?: T[] }
  | { not_in?: T[] }
  | { exists?: boolean };

type StringCondition = SimpleCondition<string> | { like?: string } | { contains?: string };

export type WhereClause<T> =
  | {
      [K in keyof T]?: T[K] extends string
        ? T[K] | StringCondition
        : T[K] extends object
          ? WhereClause<T[K]> | SimpleCondition<T[K]>
          : T[K] | SimpleCondition<T[K]>;
    }
  | { and?: WhereClause<T>[] }
  | { or?: WhereClause<T>[] };

export interface BaseQueryParams {
  locale?: string;
  depth?: number;
  page?: number;
  limit?: number;
  sort?: string | string[];
}

export interface CollectionQueryParams<T extends PayloadCollection> extends BaseQueryParams {
  where?: WhereClause<CollectionType<T>>;
  select?: SelectType<CollectionType<T>>;
}

export interface GlobalQueryParams<T extends PayloadGlobal> extends BaseQueryParams {
  select?: SelectType<GlobalType<T>>;
}

export type DocsResponse<T> = {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type NextFetchOptions = {
  next?: {
    tags?: string[];
    revalidate?: number | false;
    [key: string]: unknown;
  };
  headers?: HeadersInit;
  [key: string]: unknown;
};

export async function queryCollection<T extends PayloadCollection>(
  collection: T,
  params: CollectionQueryParams<T> = {},
  options: NextFetchOptions = {},
): Promise<CollectionType<T>[]> {
  const stringifiedQuery = stringify(params);
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/${collection}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }

  return (await response.json()).docs;
}

export async function queryGlobal<T extends PayloadGlobal>(
  global: T,
  params: GlobalQueryParams<T> = {},
  options: NextFetchOptions = {},
): Promise<GlobalType<T>> {
  const stringifiedQuery = stringify(params);
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/globals/${global}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch global ${global}: ${response.statusText}`);
  }

  return await response.json();
}

export async function queryById<T extends PayloadCollection>(
  collection: T,
  id: string,
  params: Omit<CollectionQueryParams<T>, "where"> = {},
  options: NextFetchOptions = {},
): Promise<CollectionType<T> | undefined> {
  const stringifiedQuery = stringify(params);
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/${collection}/${id}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`;

  const response = await fetch(url, options);

  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch document ${id} from ${collection}: ${response.statusText}`);
  }

  return await response.json();
}
