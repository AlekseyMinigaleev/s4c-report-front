export function getErrorMessage(
  defaultErrorMessage: string,
  errorMessages: string[]
): string {
  const a = errorMessages.length == 0 ? defaultErrorMessage : errorMessages[0];
  return a;
}
