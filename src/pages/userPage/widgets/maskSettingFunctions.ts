export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  const maskedUser = user.charAt(0) + "*".repeat(user.length - 1);
  const [firstPart, secondPart] = domain.split(".");
  const maskedDomain =
    firstPart.charAt(0) + "*".repeat(firstPart.length - 1) + "." + secondPart;
  return maskedUser + "@" + maskedDomain;
}

export function maskRsyaAuthorizationToken(value: string): string {
  const visibleLengthStart = 7;
  const visibleLengthEnd = 4;

  const visibleStart = value.substring(0, visibleLengthStart);
  const visibleEnd = value.substring(value.length - visibleLengthEnd);

  const maskedLength = value.length - visibleLengthStart - visibleLengthEnd;
  const maskedPart = "*".repeat(maskedLength);

  return visibleStart + maskedPart + visibleEnd;
}