import CryptoJS from "crypto-js";
import { CartItem } from "./store/features/cart/cart-slice";

export { cn } from "cn";

export function hashTheItem(payload: CartItem): string {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });
  const hash = CryptoJS.SHA256(jsonString).toString();

  return hash;
}
