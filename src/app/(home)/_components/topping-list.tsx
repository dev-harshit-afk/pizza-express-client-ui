"use client";
import { useEffect, useState } from "react";
import ToppingCard, { Topping } from "./topping-card";

// const toppings: Topping[] = [
//   {
//     id: "1",
//     name: "Chicken",
//     image: "/chicken.png",
//     price: 50,
//     isAvailable: true,
//   },
//   {
//     id: "2",
//     name: "jelapeno",
//     image: "/Jelapeno.png",
//     price: 50,
//     isAvailable: true,
//   },
//   {
//     id: "3",
//     name: "Cheese",
//     image: "/cheese.png",
//     price: 50,
//     isAvailable: true,
//   },
// ];

const ToppingList = () => {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        console.log(
          "Fetching toppings from backend...",
          process.env.NEXT_PUBLIC_BACKEND_URL,
        );
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=4`,
        );
        const toppings = await response.json();
        setToppings(toppings);
        console.log("Fetched toppings:", toppings);
      } catch (error) {
        console.error("Error fetching toppings:", error);
      }
    };
    fetchToppings();
  }, []);

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
  return (
    <section className=" mt-6">
      <h3>Extra Topping</h3>
      <div className=" grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => (
          <ToppingCard
            selectedToppings={selectedToppings}
            handleClick={handleToppingClick}
            key={topping._id}
            topping={topping}
          />
        ))}
      </div>
    </section>
  );
};

export default ToppingList;
