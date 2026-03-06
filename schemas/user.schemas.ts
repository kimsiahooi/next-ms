import { z } from "zod";

const userRoleSchema = z.enum(["admin", "user"]);

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: userRoleSchema.optional(),
  image: z
    .file()
    .max(10 * 1024 * 1024)
    .mime(["image/gif", "image/webp"])
    .nullable(),
});
