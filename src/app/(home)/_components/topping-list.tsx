"use client";
import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

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

const ToppingList = ({
  selectedToppings,
  handleToppingClick,
}: {
  selectedToppings: Topping[];
  handleToppingClick: (topping: Topping) => void;
}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=4`,
        );
        const toppings = await response.json();
        setToppings(toppings);
      } catch (error) {
        console.error("Error fetching toppings:", error);
      }
    };
    fetchToppings();
  }, []);

  return (
    <section className=" mt-6">
      <h3>Extra Topping</h3>
      <div className=" grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => (
          <ToppingCard
            selectedToppings={selectedToppings}
            handleClick={handleToppingClick}
            key={topping.id}
            topping={topping}
          />
        ))}
      </div>
    </section>
  );
};

export default ToppingList;
