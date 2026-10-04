"use client";

import { Tenant } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
const SelectTenant = ({ restaurants }: { restaurants: Tenant[] }) => {
  const router = useRouter();
  const handleValueChange = (val: string) => {
    router.push(`/?restaurantId=${val}`);
  };

  const searhParams = useSearchParams();
  const check = restaurants.some(
    (item) => item.id == searhParams.get("restaurantId"),
  );
  return (
    <Select
      onValueChange={(val) => handleValueChange(val as string)}
      defaultValue={check?searhParams.get("restaurantId"): ""}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Tenant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {restaurants.map((tenant: Tenant) => (
            <SelectItem key={tenant.id} value={tenant.id}>
              {tenant.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectTenant;
