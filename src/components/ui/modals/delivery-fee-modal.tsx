import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDeliveryFeeModal } from "@/hooks/use-delivery-fee-modal";
import {
  useAddDeliveryFeeMutation,
  useUpdateDeliveryFeeMutation,
} from "@/features/deliveryFee/deliveryFeeApiSlice";

const formSchema = z.object({
  minDistance: z.coerce.number().min(0, "Minimum distance must be at least 0"),
  maxDistance: z.coerce.number().min(0, "Maximum distance must be at least 0"),
  charge: z.coerce.number().min(0, "Charge must be at least 0"),
});

type DeliveryFeeFormValues = z.infer<typeof formSchema>;

export const DeliveryFeeModal = () => {
  const deliveryFeeModal = useDeliveryFeeModal();
  const [loading, setLoading] = useState(false);
  const [addDeliveryFee] = useAddDeliveryFeeMutation();
  const [updateDeliveryFee] = useUpdateDeliveryFeeMutation();

  const title = deliveryFeeModal.mode === "create" ? "Add Delivery Fee" : "Edit Delivery Fee";
  const description = deliveryFeeModal.mode === "create"
    ? "Add a new delivery fee range"
    : "Edit existing delivery fee range";
  const action = deliveryFeeModal.mode === "create" ? "Create" : "Save changes";

  const defaultValues = deliveryFeeModal.mode === "create"
    ? {
      minDistance: 0,
      maxDistance: 0,
      charge: 0,
    }
    : {
      minDistance: deliveryFeeModal.data?.minDistance || 0,
      maxDistance: deliveryFeeModal.data?.maxDistance || 0,
      charge: deliveryFeeModal.data?.charge || 0,
    };

  const form = useForm<DeliveryFeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: DeliveryFeeFormValues) => {
    try {
      setLoading(true);

      if (deliveryFeeModal.mode === "create") {
        await addDeliveryFee(data).unwrap();
        toast.success("Delivery fee created!");
      } else if (deliveryFeeModal.data?._id) {
        await updateDeliveryFee({
          id: deliveryFeeModal.data._id,
          data,
        }).unwrap();
        toast.success("Delivery fee updated!");
      }

      deliveryFeeModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={deliveryFeeModal.isOpen} onOpenChange={deliveryFeeModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="minDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Distance (km)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Distance (km)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="charge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charge (ETB)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type="submit">
                {action}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}; 