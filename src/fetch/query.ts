/**
 * Universal Payload CMS Query Utility
 *
 * This module provides a type-safe approach to querying Payload CMS through its REST API
 * with support for field selection, filtering, and relationship population.
 *
 * Key Features:
 * - Type-safe querying with autocomplete for collection/global names and fields
 * - Select specific fields to reduce response payload size
 * - Type-safe population of relationships with field-level control
 * - Support for field filtering via "where" clauses with dot notation
 * - Integration with Next.js cache tags and revalidation
 *
 * Important Behaviors:
 *
 * 1. `select` vs `populate` parameter differences:
 *    - `select` specifies which fields to include in the response using FIELD names
 *    - `populate` controls which related documents to populate and which fields to include
 *      using COLLECTION names (the value of relationTo in your schema)
 *
 * 2. When using `populate`, a default depth of 1 is set if not specified
 *
 * Examples:
 *
 * Basic query with field selection:
 * ```
 * const pages = await queryCollection("pages", {
 *   select: { title: true, slug: true },
 *   where: { _status: { equals: "published" } }
 * });
 * ```
 *
 * Query with relationship population:
 * ```
 * const page = await queryById("pages", "home", {
 *   populate: {
 *     // "authors" is the collection name from relationTo, not the field name
 *     authors: {
 *       name: true,
 *       email: true
 *     },
 *     // "media" is the collection for Upload fields
 *     media: {
 *       url: true,
 *       alt: true
 *     }
 *   }
 * });
 * ```
 *
 * Combined select and populate:
 * ```
 * const posts = await queryCollection("posts", {
 *   select: { title: true, content: true, author: true },
 *   populate: {
 *     authors: {
 *       name: true,
 *       avatar: true
 *     }
 *   }
 * });
 * ```
 *
 * With Next.js cache options:
 * ```
 * const globalSettings = await queryGlobal("settings", {
 *   select: { siteTitle: true, theme: true }
 * }, {
 *   next: { tags: ["settings"], revalidate: 60 }
 * });
 * ```
 */
import { Config } from "@/payload-types";
import { stringify } from "qs-esm";

export type PayloadCollection = keyof Config["collections"];
export type PayloadGlobal = keyof Config["globals"];
export type CollectionType<T extends PayloadCollection> = Config["collections"][T];
export type GlobalType<T extends PayloadGlobal> = Config["globals"][T];

type BooleanRecord<T> = {
  [K in keyof T]?: T[K] extends unknown[]
    ? boolean
    : T[K] extends object
      ? BooleanRecord<T[K]>
      : boolean;
};

export type SelectType<T> = BooleanRecord<T>;

export type CollectionPopulateType = {
  [C in PayloadCollection]?: SelectType<CollectionType<C>> | boolean;
};

type SelectKeysOf<T, S> = {
  [K in keyof S]: S[K] extends true ? K : never;
}[keyof S] &
  keyof T;

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
  | ({
      [K in keyof T]?: T[K] extends string
        ? T[K] | StringCondition
        : T[K] extends object
          ? WhereClause<T[K]> | SimpleCondition<T[K]>
          : T[K] | SimpleCondition<T[K]>;
    } & {
      [key: string]: StringCondition | SimpleCondition<unknown> | WhereClause<unknown> | unknown;
    })
  | { and?: WhereClause<T>[] }
  | { or?: WhereClause<T>[] };

export interface BaseQueryParams {
  locale?: string;
  depth?: number;
  page?: number;
  limit?: number;
  sort?: string | string[];
}

export interface CollectionQueryParams<
  T extends PayloadCollection,
  S extends SelectType<CollectionType<T>> | undefined = undefined,
> extends BaseQueryParams {
  where?: WhereClause<CollectionType<T>>;
  select?: S;
  populate?: CollectionPopulateType;
}

export interface GlobalQueryParams<
  T extends PayloadGlobal,
  S extends SelectType<GlobalType<T>> | undefined = undefined,
> extends BaseQueryParams {
  select?: S;
  populate?: CollectionPopulateType;
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

export async function queryCollection<
  T extends PayloadCollection,
  S extends SelectType<CollectionType<T>>,
>(
  collection: T,
  params: CollectionQueryParams<T, S> & { select: S },
  options?: NextFetchOptions,
): Promise<Pick<CollectionType<T>, SelectKeysOf<CollectionType<T>, S> | "id">[]>;

export async function queryCollection<T extends PayloadCollection>(
  collection: T,
  params?: CollectionQueryParams<T, undefined>,
  options?: NextFetchOptions,
): Promise<CollectionType<T>[]>;

export async function queryCollection<
  T extends PayloadCollection,
  S extends SelectType<CollectionType<T>> | undefined = undefined,
>(
  collection: T,
  params: CollectionQueryParams<T, S> = {} as CollectionQueryParams<T, S>,
  options: NextFetchOptions = {},
): Promise<unknown[]> {
  if (params.populate && params.depth === undefined) {
    params.depth = 1;
  }

  const stringifiedQuery = stringify(params);
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/${collection}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }

  return (await response.json()).docs;
}

export async function queryGlobal<T extends PayloadGlobal, S extends SelectType<GlobalType<T>>>(
  global: T,
  params: GlobalQueryParams<T, S> & { select: S },
  options?: NextFetchOptions,
): Promise<Pick<GlobalType<T>, SelectKeysOf<GlobalType<T>, S> | "id">>;

export async function queryGlobal<T extends PayloadGlobal>(
  global: T,
  params?: GlobalQueryParams<T, undefined>,
  options?: NextFetchOptions,
): Promise<GlobalType<T>>;

export async function queryGlobal<
  T extends PayloadGlobal,
  S extends SelectType<GlobalType<T>> | undefined = undefined,
>(
  global: T,
  params: GlobalQueryParams<T, S> = {} as GlobalQueryParams<T, S>,
  options: NextFetchOptions = {},
): Promise<unknown> {
  if (params.populate && params.depth === undefined) {
    params.depth = 1;
  }

  const stringifiedQuery = stringify(params);
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/globals/${global}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch global ${global}: ${response.statusText}`);
  }

  return await response.json();
}

export async function queryById<
  T extends PayloadCollection,
  S extends SelectType<CollectionType<T>>,
>(
  collection: T,
  id: string,
  params: Omit<CollectionQueryParams<T, S>, "where"> & { select: S },
  options?: NextFetchOptions,
): Promise<Pick<CollectionType<T>, SelectKeysOf<CollectionType<T>, S> | "id"> | undefined>;

export async function queryById<T extends PayloadCollection>(
  collection: T,
  id: string,
  params?: Omit<CollectionQueryParams<T, undefined>, "where">,
  options?: NextFetchOptions,
): Promise<CollectionType<T> | undefined>;

export async function queryById<
  T extends PayloadCollection,
  S extends SelectType<CollectionType<T>> | undefined = undefined,
>(
  collection: T,
  id: string,
  params: Omit<CollectionQueryParams<T, S>, "where"> = {} as Omit<
    CollectionQueryParams<T, S>,
    "where"
  >,
  options: NextFetchOptions = {},
): Promise<unknown | undefined> {
  if (params.populate && params.depth === undefined) {
    params.depth = 1;
  }

  const stringifiedQuery = stringify(params);
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST}/api/${collection}/${id}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`;

  const response = await fetch(url, options);

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch document ${id} from ${collection}: ${response.statusText}`);
  }

  return await response.json();
}
