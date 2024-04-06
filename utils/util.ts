const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}
