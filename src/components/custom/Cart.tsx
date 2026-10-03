"use client";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { increment } from "@/lib/store/features/cart/cart-slice";

const Cart = () => {
  const value = useAppSelector((state) => state.cart.value);
  const dispatch = useAppDispatch();
  const handleIncrement = () => {
    // Implement your increment logic here
    console.log("Increment button clicked");
    dispatch(increment());
  };
  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingBasket className="hover:text-primary" />
      </Link>
      <span className="absolute -top-4 -right-5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-white">
        {value}
      </span>
      <Button onClick={handleIncrement}>INC</Button>
    </div>
  );
};

export default Cart;
