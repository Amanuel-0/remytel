import Cookies from "js-cookie";

export class LocalStorageUtil {
  static setItem<T>(key: string, value: T) {
    Cookies.set(key, JSON.stringify(value), { expires: 7 });
  }

  static getItem<T>(key: string): T | undefined {
    const cookieValue = Cookies.get(key);
    return cookieValue ? (JSON.parse(cookieValue) as T) : undefined;
  }

  static removeItem(key: string) {
    Cookies.remove(key);
  }
}
