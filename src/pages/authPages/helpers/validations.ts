export function validateEmail(login: string): boolean {
  let isValid = false;
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login)) {
    isValid = true;
  }
  return isValid;
}

export function validatePassword(password: string): boolean {
  let isValid = false;
  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    isValid = true;
  }
  return isValid;
}

export function validateDeveloperPageUrl(email: string): boolean {
  let pattern = "https://yandex.ru/games/developer/";
  return email.startsWith(pattern);
}

export function validateRsyaAuthorizationToken(
  rsyaAuthorizationToken: string
): boolean {
  return (
    /^[a-zA-Z0-9_]+$/.test(rsyaAuthorizationToken) ||
    rsyaAuthorizationToken == ""
  );
}

export function validateRepeatPassword(
  repeatPassword: string,
  password: string
): boolean {
  return password == repeatPassword;
}
