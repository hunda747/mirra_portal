import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Modal } from "../modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useProductPriceModal } from "@/hooks/use-product-price-modal";
import { useGetProductsQuery } from "@/features/product/productApiSlice";
import { useAddProductToShopMutation } from "@/features/shops/shopApiSlice";
const formSchema = z.object({
  productId: z.string().min(1, "Shop name is required"),
  price: z.number().min(1, "Price is required"),
  inStock: z.boolean().optional(),
});

export const ProductPriceModal = ({ shopId }: { shopId: string }) => {
  const productPriceModal = useProductPriceModal();
  const { data: products } = useGetProductsQuery();
  const [loading, setLoading] = useState(false);
  const [addProductToShop] = useAddProductToShopMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      price: 0,
      inStock: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);

    try {
      setLoading(true);
      const response = await addProductToShop({ shopId: shopId, productId: values.productId, price: values.price, inStock: values.inStock || false }).unwrap();
      if (response) {
        toast.success("Product Added");
      }
      productPriceModal.onClose();
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setLoading(false);
    }

    console.log("Form errors:", form.formState.errors);
  };

  return (
    <Modal
      title="Add Product"
      description="Add a new product to the shop"
      isOpen={productPriceModal.isOpen}
      onClose={productPriceModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4 w-full max-h-[calc(100vh-200px)] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product:</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value?.toString() || ""}
                      defaultValue={field.value?.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a product"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products &&
                          products.map((product) => (
                            <SelectItem
                              key={product._id}
                              value={product._id?.toString() || ""}
                            >
                              {product.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="price"
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                name="inStock"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>In Stock:</FormLabel>
                    <FormControl>
                      <Switch />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={productPriceModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-500"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
