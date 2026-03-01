export interface ApiZodErrors {
  formErrors: string[];
  fieldErrors: Record<string, string[] | undefined>;
}

export interface ApiFailResponse {
  success: false;
  message: string;
  errors?: ApiZodErrors;
}

export interface ApiSuccessResponse<T = undefined> {
  data: T;
  success: true;
  message: string;
}

export type ApiResponse<T = undefined> =
  | ApiSuccessResponse<T>
  | ApiFailResponse;
