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

export function getItemTotal(product: CartItem) {
  const toppingsTotal = product.choosenConfiguration.selectedToppings.reduce(
    (acc, curr) => acc + curr.price,
    0,
  );

  const configPricing = Object.entries(
    product.choosenConfiguration.priceConfiguration,
  ).reduce((acc, [key, value]: [string, string]) => {
    const price = product.priceConfiguration[key].availableOptions[value];
    return acc + price;
  }, 0);
  return configPricing + toppingsTotal;
}
