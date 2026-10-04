"use client";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";

const Cart = () => {
  const value = useAppSelector((state) => state.cart.cartItems?.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingBasket className="hover:text-primary" />
      </Link>
      <span className="absolute -top-4 -right-5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-white">
        {mounted ? (value ?? 0) : 0}
      </span>
    </div>
  );
};

export default Cart;
