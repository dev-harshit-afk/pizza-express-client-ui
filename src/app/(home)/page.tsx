import { Button } from "@/components/ui/button";
import Image from "next/image";
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
    </>
  );
}
