"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Product as ProductType } from "@/lib/types";
import ProductDialog from "./product-dialog";

const Product = ({ product }: { product: ProductType }) => {
  console.log("product", product);
  return (
    <Card className="border-none rouneded-xl">
      <CardHeader className="flex justify-center items-center">
        <Image
          src={product.imageUrl || "/pizza-main.png"}
          width={150}
          height={150}
          alt={product.name}
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-muted-foreground mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p>
          <span className="">From</span>
          <span className="text-lg font-bold text-primary">₹ 100</span>
        </p>
        <ProductDialog product={product} />
      </CardFooter>
    </Card>
  );
};

export default Product;
