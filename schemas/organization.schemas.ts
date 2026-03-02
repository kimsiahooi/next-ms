import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(191)
    .refine((slug) => slug.toLowerCase() !== "admin", {
      error: "This slug cannot be use",
    })
    .refine((slug) => !slug.includes(" "), {
      error: "Slug cannot contain any whitespace",
    }),
  logo: z
    .file()
    .max(10 * 1024 * 1024)
    .mime(["image/gif", "image/webp"])
    .nullable(),
});

export const deleteOrganizationSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});
