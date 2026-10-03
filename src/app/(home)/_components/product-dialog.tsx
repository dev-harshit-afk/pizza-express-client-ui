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
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ToppingList from "./topping-list";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product as ProductType } from "@/lib/types";
import { Suspense } from "react";

const ProductDialog = ({ product }: { product: ProductType }) => {
  return (
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

            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => (
                <div key={key}>
                  <h4 className="mt-6">Choose the {key}</h4>
                  <RadioGroup
                    defaultValue={value.availableOptions[0]}
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    {value.availableOptions.map((option) => (
                      <FieldLabel
                        key={option}
                        htmlFor={option}
                        className="cursor-pointer rounded-md border-2 p-1"
                      >
                        <Field
                          orientation="vertical"
                          className="items-center justify-center"
                        >
                          <FieldTitle>{option}</FieldTitle>
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="hidden"
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </div>
              ),
            )}
            {/* <div>
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
                    <RadioGroupItem value="thin" id="thin" className="hidden" />
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
            </div> */}
            <Suspense fallback={<div>Loading toppings...</div>}>
              <ToppingList />
            </Suspense>

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
  );
};

export default ProductDialog;
