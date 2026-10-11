import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getSession } from "@/lib/session";
import { Coins, CreditCard, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customer-form";

export default async function Checkout({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) {
  const session = await getSession();
  const awaitedSearchParams: { restaurantId: string } = await searchParams;

  const sParams = new URLSearchParams(awaitedSearchParams);
  const existingQueryString = sParams.toString();
  console.log("exsiting", existingQueryString);
  console.log("before", sParams);

  sParams.append("return-to", `/checkout`);
  console.log("after", sParams.toString());

  if (!session) {
    return redirect(`/login?${sParams.toString()}`);
  }

  return <CustomerForm />;
}
