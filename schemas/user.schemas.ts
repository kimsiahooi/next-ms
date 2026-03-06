import { z } from "zod";

const userRoleSchema = z.enum(["admin", "user"]);

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: userRoleSchema.optional(),
});
