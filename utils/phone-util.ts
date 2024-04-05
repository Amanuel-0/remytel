import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

// export function validatePhoneNumber(phoneNumber: string): boolean {
//   const pattern = /^(?:\+251\d{10}|0\d{9})$/;
//   return pattern.test(phoneNumber);
// }
