"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import ToppingList from "./topping-list";
import { Product as ProductType } from "@/lib/types";

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
          <span className="text-lg font-bold text-primary">
            ₹ 100
          </span>
        </p>
        <Dialog>
          <DialogTrigger className=" rounded-3xl bg-orange-200 hover:bg-primary cursor-pointer text-primary hover:text-white px-6 py-3 text-lg font-semibold">
            Choose
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-3xl sm:max-w-3xl p-0 h-[80vh]">
            <div className=" flex ">
              <div className="p-8">
                <Image
                  src={product.imageUrl || "/pizza-main.png"}
                  width={250}
                  height={250}
                  alt={product.name}
                />
              </div>
              <div className="bg-background w-full p-8">
                <h2 className=" text-lg font-bold">{product.name}</h2>
                <h2>{product.description}</h2>
                <div>
                  <h4 className="mt-6">Choose the size</h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <FieldLabel
                      htmlFor="small"
                      className="cursor-pointer rounded-md border-2 p-1"
                    >
                      <Field
                        orientation="vertical"
                        className="items-center justify-center"
                      >
                        <FieldTitle>Small</FieldTitle>
                        <RadioGroupItem
                          value="small"
                          id="small"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>

                    <FieldLabel
                      htmlFor="medium"
                      className="cursor-pointer rounded-md border-2 p-1"
                    >
                      <Field
                        orientation="vertical"
                        className="items-center justify-center"
                      >
                        <FieldTitle>Medium</FieldTitle>
                        <RadioGroupItem
                          value="medium"
                          id="medium"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>

                    <FieldLabel
                      htmlFor="large"
                      className="cursor-pointer rounded-md border-2 p-1"
                    >
                      <Field
                        orientation="vertical"
                        className="items-center justify-center"
                      >
                        <FieldTitle>Large</FieldTitle>
                        <RadioGroupItem
                          value="large"
                          id="large"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </div>
                <div>
                  <h4 className="mt-6">Choose the crust</h4>
                  <RadioGroup
                    defaultValue="thin"
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <FieldLabel
                      htmlFor="thin"
                      className="cursor-pointer rounded-md border-2 p-1"
                    >
                      <Field
                        orientation="vertical"
                        className="items-center justify-center"
                      >
                        <FieldTitle>Thin</FieldTitle>
                        <RadioGroupItem
                          value="thin"
                          id="thin"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>

                    <FieldLabel
                      htmlFor="thick"
                      className="cursor-pointer rounded-md border-2 p-1"
                    >
                      <Field
                        orientation="vertical"
                        className="items-center justify-center"
                      >
                        <FieldTitle>Thick</FieldTitle>
                        <RadioGroupItem
                          value="thick"
                          id="thick"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </div>
                <ToppingList />
                <div className=" flex mt-12 justify-between">
                  <p className=" font-bold">Total:400</p>
                  <Button className="">
                    <ShoppingCart />
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default Product;
