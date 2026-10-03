"use client";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import {  useAppSelector } from "@/lib/store/hooks";

const Cart = () => {
  const value = useAppSelector((state) => state.cart.cartItems.length);
 
  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingBasket className="hover:text-primary" />
      </Link>
      <span className="absolute -top-4 -right-5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-white">
        {value}
      </span>
    </div>
  );
};

export default Cart;
