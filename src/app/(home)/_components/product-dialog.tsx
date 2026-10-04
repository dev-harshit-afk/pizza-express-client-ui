import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ToppingList from "./topping-list";
import { Button } from "@/components/ui/button";
import { CircleCheck, ShoppingCart } from "lucide-react";
import { Product as ProductType, Topping } from "@/lib/types";
import { Suspense, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart, CartItem } from "@/lib/store/features/cart/cart-slice";
import { hashTheItem } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

const SuccessToastForAddToCart = () => {
  return (
    <div className=" flex gap-2">
      <CircleCheck className=" text-primary items-center" />
      <p>Item Added to the cart </p>
    </div>
  );
};

const ProductDialog = ({ product }: { product: ProductType }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const dispatch = useAppDispatch();

  const defaultChoosenConfig: Record<string, string> = Object.fromEntries(
    Object.entries(product.category.priceConfiguration).map(([key, value]) => [
      key,
      value.availableOptions[0],
    ]),
  );

  const [choosenConfig, setChoosenConfig] =
    useState<Record<string, string>>(defaultChoosenConfig);

  const handleRadioChange = (key: string, value: string) => {
    setChoosenConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };
  const handleToppingClick = (topping: Topping) => {
    const isAlreadyClicked = selectedToppings.some(
      (curr) => curr.id === topping.id,
    );
    if (isAlreadyClicked) {
      setSelectedToppings((prev) =>
        prev.filter((item) => item.id !== topping.id),
      );
      return;
    }
    setSelectedToppings((prev) => [...prev, topping]);
  };

  const alreadyHasInCart = useMemo(() => {
    const currentConfiguration = {
      _id: product._id,
      name: product.name,
      image: product.imageUrl!,
      priceConfiguration: product.priceConfiguration,
      choosenConfiguration: {
        priceConfiguration: choosenConfig,
        selectedToppings,
      },
      qty: 1,
    };
    const hash = hashTheItem(currentConfiguration);
    return cartItems.some((item) => item.hash === hash);
  }, [product, choosenConfig, selectedToppings, cartItems]);
  const handleAddToCart = () => {
    const cartItemToBeAdded: CartItem = {
      _id: product._id,
      name: product.name,
      image: product.imageUrl!,
      priceConfiguration: product.priceConfiguration,
      choosenConfiguration: {
        priceConfiguration: choosenConfig,
        selectedToppings,
      },
      qty: 1,
    };
    dispatch(addToCart(cartItemToBeAdded));
    toast.add({
      title: <SuccessToastForAddToCart />,
    });
    setSelectedToppings([]);
    setDialogOpen(false);
  };

  const TotalPrice = useMemo(() => {
    const TotalToppingsPrice = selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0,
    );

    const TotalChosenConfigPrice = Object.entries(choosenConfig).reduce(
      (acc, [key, value]) => {
        const priceConfig = product.priceConfiguration[key];
        return acc + (priceConfig?.availableOptions[value] || 0);
      },
      0,
    );

    return TotalToppingsPrice + TotalChosenConfigPrice;
  }, [choosenConfig, selectedToppings, product]);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                    onValueChange={(selectedValue) =>
                      handleRadioChange(key, selectedValue)
                    }
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

            {product.category.name === "Pizza" && (
              <Suspense fallback={<div>Loading toppings...</div>}>
                <ToppingList
                  selectedToppings={selectedToppings}
                  handleToppingClick={handleToppingClick}
                />
              </Suspense>
            )}

            <div className=" flex mt-12 justify-between">
              <p className=" font-bold">{TotalPrice.toFixed(2)}</p>
              <Button
                className={alreadyHasInCart ? "bg-gray-700" : "bg-primary"}
                disabled={alreadyHasInCart}
                onClick={handleAddToCart}
              >
                <ShoppingCart />
                {alreadyHasInCart ? "Already in cart" : "Add to cart"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
