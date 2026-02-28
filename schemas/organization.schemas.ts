import { z } from "zod";
import { auth } from "@/lib/auth";

export const createOrganizationSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(191)
    .refine((slug) => !slug.includes(" "), {
      error: "String cannot contain any whitespace",
    })
    .refine(
      async (slug) => {
        try {
          const { status } = await auth.api.checkOrganizationSlug({
            body: {
              slug,
            },
          });

          return status;
        } catch {
          return false;
        }
      },
      { error: "Slug has been taken" },
    ),
});
