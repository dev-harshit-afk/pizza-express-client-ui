import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Field, FieldError } from "@/components/ui/field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "@/lib/http/api";
import { useState } from "react";

const formSchema = z.object({
  address: z.string().min(5, "Bug title must be at least 5 characters."),
});

const AddAddress = ({ customerId }: { customerId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["address"],
    mutationFn: async (address: string) => {
      return await addAddress(customerId, address);
    },
    onSuccess: () => {
      addressForm.reset();
      setIsModalOpen(false);
      return queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
  const handleAddressAdd = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.stopPropagation();
    return addressForm.handleSubmit((data: z.infer<typeof formSchema>) => {
      console.log("data", data);
      mutate(data.address);
    })(e);
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button className={"flex items-center"} variant={"link"}>
          <Plus size={"16"} />
          <span className="ml-2">Add New Address</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddressAdd}>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
              We can save your address for next time order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Controller
                name="address"
                control={addressForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Textarea className="mt-2" {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
