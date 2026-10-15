import { getSession } from "@/lib/session";
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
