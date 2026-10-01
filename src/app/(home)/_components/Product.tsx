import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "lucide-react";
import Image from "next/image";
import React from "react";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Product = ({ product }: { product: Product }) => {
  return (
    <Card className="border-none rouneded-xl">
      <CardHeader className="flex justify-center items-center">
        <Image
          src={product.image}
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
          <span className="text-lg font-bold text-primary">
            ₹{product.price}
          </span>
        </p>
        <Button className=" rounded-3xl bg-orange-200 hover:bg-primary cursor-pointer text-primary hover:text-white px-6 py-3 text-lg font-semibold">
          {" "}
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
