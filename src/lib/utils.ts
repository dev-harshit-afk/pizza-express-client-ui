import CryptoJS from "crypto-js";
import { CartItem } from "./store/features/cart/cart-slice";
import { Product } from "./types";

export { cn } from "cn";

export function hashTheItem(payload: CartItem): string {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });
  const hash = CryptoJS.SHA256(jsonString).toString();

  return hash;
}

export function getFromPrice(product: Product): number {
  console.log("prouct", product);
  const basePrice = Object.entries(product.priceConfiguration)
    .filter(([Key, value]) => value.priceType === "base")
    .reduce((acc, [Key, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions));
      return acc + smallestPrice;
    }, 0);
  return basePrice;
}
