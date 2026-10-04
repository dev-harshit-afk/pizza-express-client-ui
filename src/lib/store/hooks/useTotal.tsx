import { useMemo } from "react";
import { CartItem } from "../features/cart/cart-slice";
import { getItemTotal } from "@/lib/utils";

export function useTotal(product: CartItem) {
    const totalPrice = useMemo(() => {
        return getItemTotal(product)
    },[product])

    return totalPrice
}