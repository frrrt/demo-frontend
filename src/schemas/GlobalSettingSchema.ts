/**
 * THIS FILE IS AUTO-GENERATED. DO NOT MODIFY.
 */

import * as v from "valibot";

export const GlobalSettingSchema = v.object({
  id: v.string(),
  chatgptModel: v.nullish(v.string()),
  askChatgptPrompt: v.nullish(v.string()),
  updatedAt: v.nullish(v.string()),
  createdAt: v.nullish(v.string()),
});

export type GlobalSetting = v.InferOutput<typeof GlobalSettingSchema>;

export function validateGlobalSetting(data: unknown): GlobalSetting {
  return v.parse(GlobalSettingSchema, data);
}
