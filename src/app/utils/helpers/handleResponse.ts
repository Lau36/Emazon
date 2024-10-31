interface responseContext{
  isLoading: boolean;
  showToast: boolean;
  mistakeOcurred: boolean;
  message: string;
}

export function handleResponse(
  context: responseContext,
  message: string,
  isSuccess: boolean
): void {
  context.isLoading = false;
  context.showToast = true;
  context.mistakeOcurred = !isSuccess;
  context.message = message
}
