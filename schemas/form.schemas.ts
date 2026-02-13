import type { z } from "zod";

export type FormState<T = undefined> = {
  values?: z.infer<T>;
  errors: null | Partial<Record<keyof z.infer<T>, string[]>>;
  success: boolean;
  message?: string;
};
