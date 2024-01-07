export interface IUserCreditionals {
  email: string;
  password: string;
}

export function validateEmail(email: string): boolean {
  let isValid = false;
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
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
