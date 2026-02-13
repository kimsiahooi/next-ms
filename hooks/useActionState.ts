import { useActionState as useReactActionState } from "react";
import type { FormState } from "@/schemas/form.schemas";

export const useActionState = <T>(
  action: (
    state: FormState<T>,
    formData: FormData,
  ) => FormState<T> | Promise<FormState<T>>,
  initialState: Omit<FormState<T>, "errors" | "success">,
  permalink?: string,
) =>
  useReactActionState(
    action,
    { ...initialState, errors: null, success: false },
    permalink,
  );
