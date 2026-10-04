import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Product, Topping } from "@/lib/types";

// Define a type for the slice state

export interface CartItem {
  product: Product;
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
}
export interface CartState {
  cartItems: CartItem[];
}

// Define the initial state using that type
const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = {
        product: action.payload.product,
        choosenConfiguration: action.payload.choosenConfiguration,
      };

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem]),
      );
      return {
        cartItems: [...state.cartItems, newItem],
      };
    },
    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      return {
        cartItems: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, initializeCart } = cartSlice.actions;

export default cartSlice.reducer;
