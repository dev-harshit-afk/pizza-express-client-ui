import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Product from "./_components/Product";

const pizza = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic delight with 100% real mozzarella cheese",
    price: 10.99,
    image: "/pizza-main.png",
  },
  {
    id: 2,
    name: "Margherita",
    description: "Classic delight with 100% real mozzarella cheese",
    price: 10.99,
    image: "/pizza-main.png",
  },
  {
    id: 3,
    name: "Margherita",
    description: "Classic delight with 100% real mozzarella cheese",
    price: 10.99,
    image: "/pizza-main.png",
  },
  {
    id: 4,
    name: "Margherita",
    description: "Classic delight with 100% real mozzarella cheese",
    price: 10.99,
    image: "/pizza-main.png",
  },
  {
    id: 5,
    name: "Margherita",
    description: "Classic delight with 100% real mozzarella cheese",
    price: 10.99,
    image: "/pizza-main.png",
  },
];

export default function Home() {
  return (
    <>
      <section className=" bg-white">
        <div className="mx-auto container flex justify-between items-center py-20">
          <div>
            <h1 className="text-7xl font-black font-manrope ">
              Super Delicious Pizza in
              <br />
              <span className=" text-primary">Only 45 Minutes!</span>
            </h1>
            <p className=" text-2xl mt-8 max-w-lg leading-snug">
              Enjoy free meal if Your order Takes more than 45 minutes to
              arrive.
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-5">
              Get Your Pizza Now
            </Button>
          </div>
          <div>
            <Image
              width={400}
              height={400}
              src="/pizza-main.png"
              alt="Delicious Pizza"
            />
          </div>
        </div>
      </section>
      <section>
        <div className=" mx-auto container py-12">
          <Tabs defaultValue="account" className="">
            <TabsList>
              <TabsTrigger value="pizza" className="text-lg">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-lg">
                Beverage
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {pizza.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              {" "}
              <div className="grid grid-cols-4 gap-6 mt-6">
                {pizza.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
