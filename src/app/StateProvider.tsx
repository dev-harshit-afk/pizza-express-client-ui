"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { initializeCart } from "@/lib/store/features/cart/cart-slice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create the store instance the first time this renders
  const [store] = useState<AppStore>(makeStore);

  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  if (isLocalStorageAvailable) {
    const cartItems = window.localStorage.getItem("cartItems");
    if (cartItems) {
      try {
        const parseItems = JSON.parse(cartItems as string);
        store.dispatch(initializeCart(parseItems));
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
      }
    }
  }

  return <Provider store={store}>{children}</Provider>;
}
