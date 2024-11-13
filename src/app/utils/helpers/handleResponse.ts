export interface ResponseContext{
  isLoading: boolean;
  showToast: boolean;
  mistakeOcurred: boolean;
  message: string;
}

export function handleResponse(
  context: ResponseContext,
  message: string,
  isSuccess: boolean
): void {
  context.isLoading = false;
  context.showToast = true;
  context.mistakeOcurred = !isSuccess;
  context.message = message
}
