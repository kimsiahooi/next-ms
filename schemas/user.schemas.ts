import { z } from "zod";

const userRoleSchema = z.enum(["admin", "user"]);

export const createUserSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: userRoleSchema.optional(),
});

export const updateUserSchema = z.strictObject({
  name: z.string().optional(),
  email: z.email().optional(),
  image: z.file().mime(["image/webp", "image/gif"]).optional(),
  role: userRoleSchema.optional(),
});
