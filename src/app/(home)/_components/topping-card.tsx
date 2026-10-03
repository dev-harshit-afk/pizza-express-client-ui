import { Button } from "@/components/ui/button"
import { CircleCheck } from "lucide-react"
import Image from "next/image"
import { Topping } from "@/lib/types"

type propType={
    topping:Topping,
    selectedToppings:Topping[];
    handleClick:(topping:Topping)=>void
}
const ToppingCard = ({topping,selectedToppings,handleClick}:propType) => {

    const isSelected=selectedToppings.some((curr)=>curr.id===topping.id)
  return (
    <Button onClick={()=>handleClick(topping)}  className={` relative flex flex-col h-42 p-2 ${isSelected?"border-primary":""}`} variant="outline">
        <Image src={topping.image} alt="toping" width={80} height={80}/>
        <h3>{topping.name}</h3>
        <p>&#8377;{topping.price}</p>
        {isSelected&& <CircleCheck className=" absolute  top-1 right-1 text-primary " />
}
    </Button>

  )
}

export default ToppingCard