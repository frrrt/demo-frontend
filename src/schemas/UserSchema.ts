/**
 * THIS FILE IS AUTO-GENERATED. DO NOT MODIFY.
 */

import * as v from "valibot";

export const UserSchema = v.object({
  id: v.string(),
  roles: v.number(),
  updatedAt: v.nullish(v.string()),
  createdAt: v.nullish(v.string()),
  email: v.string(),
  resetPasswordToken: v.nullish(v.string()),
  resetPasswordExpiration: v.nullish(v.string()),
  salt: v.nullish(v.string()),
  hash: v.nullish(v.string()),
  loginAttempts: v.nullish(v.number()),
  lockUntil: v.nullish(v.string()),
});

export type User = v.InferOutput<typeof UserSchema>;

export function validateUser(data: unknown): User {
  return v.parse(UserSchema, data);
}

export function validateUsers(data: unknown): { docs: User[] } {
  return v.parse(v.object({ docs: v.array(UserSchema) }), data);
}
