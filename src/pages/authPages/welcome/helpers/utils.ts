
export function getErrorMessage(
  defaultErrorMessage: string,
  errorMessages: string[]
): string {
  return errorMessages.length == 0 ? defaultErrorMessage : errorMessages[0];
}
