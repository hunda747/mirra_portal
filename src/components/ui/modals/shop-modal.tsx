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
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Modal } from "../modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useShopModal } from "@/hooks/use-shop-modal";
import { useCreateShopMutation, useUpdateShopMutation } from "@/features/shops/shopApiSlice";
const formSchema = z.object({
  image: z.string().optional(),
  shopName: z.string().min(1, "Shop name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(1, "Latitude is required"),
  longitude: z.number().min(1, "Longitude is required"),
  category: z.string().min(1, "Category is required"),
  openingTime: z.string().min(1, "Opening time is required").optional(),
  closingTime: z.string().min(1, "Closing time is required").optional(),
});

export const ShopModal = () => {
  const shopModal = useShopModal();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>("");
  const [createShop] = useCreateShopMutation();
  const [updateShop] = useUpdateShopMutation();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setError(""); // Clear any previous error
      return;
    }

    // Image type validation
    if (!selectedFile.type.startsWith("image/")) {
      setError("Selected file is not an image.");
      return;
    }

    // Image size validation (in bytes)
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (selectedFile.size > maxSize) {
      setError("Selected image is too large.");
      return;
    }

    // Load image to check width
    const img = new Image();
    img.onload = () => {
      setFile(selectedFile);
      setError("");
    };
    img.src = URL.createObjectURL(selectedFile);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      shopName: "",
      address: "",
      category: undefined,
      latitude: 0,
      longitude: 0,
      openingTime: "",
      closingTime: "",
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (shopModal.isOpen) {
      form.reset({
        image: shopModal.shop?.image || "",
        shopName: shopModal.shop?.name || "",
        address: shopModal.shop?.address || "",
        category: shopModal.shop?.category || "",
        latitude: shopModal.shop?.location.coordinates[1] || 0,
        longitude: shopModal.shop?.location.coordinates[0] || 0,
        // openingTime: shopModal.shop?.openingTime?.open || "",
        // closingTime: shopModal.shop?.closingTime?.close || "",
      });
    }
  }, [shopModal.isOpen, shopModal.shop, form]);

  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ];

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
          setIsGettingLocation(false);
        },
        (error) => {
          toast.error("Error getting location: " + error.message);
          setIsGettingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Don't require image upload when editing if no new image is selected
    if (!file && !shopModal.shop?.image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("name", values.shopName);
    formData.append("address", values.address);
    formData.append("category", values.category?.toString() || "");
    formData.append("openingTime", values.openingTime || "");
    formData.append("closingTime", values.closingTime || "");
    formData.append("latitude", values.latitude.toString());
    formData.append("longitude", values.longitude.toString());

    try {
      setLoading(true);
      if (shopModal.shop) {
        // Update shop
        const response = await updateShop({
          id: shopModal.shop._id,
          shop: formData
        }).unwrap();
        if (response) {
          toast.success("Shop Updated");
        }
      } else {
        // Create shop
        const response = await createShop(formData).unwrap();
        if (response) {
          toast.success("Shop Created");
        }
      }
      shopModal.onClose();
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setLoading(false);
    }

    console.log("Form errors:", form.formState.errors);
  };

  return (
    <Modal
      title={shopModal.shop ? "Edit Shop" : "Add Shop"}
      description={shopModal.shop ? "Edit your shop details" : "Add a new shop"}
      isOpen={shopModal.isOpen}
      onClose={shopModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4 w-full max-h-[calc(100vh-200px)] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center justify-center w-full mb-2">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <input
                    type="file"
                    id="dropzone-file"
                    hidden
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {file ? (
                      <img
                        width={300}
                        height={150}
                        style={{
                          width: "100%",
                          height: "200",
                        }}
                        src={URL.createObjectURL(file)}
                        className="h-24"
                        alt={file.name}
                      />
                    ) : shopModal.shop?.image ? (
                      <img
                        width={300}
                        height={150}
                        style={{
                          width: "100%",
                          height: "200",
                        }}
                        src={`${import.meta.env.VITE_API_URL}${shopModal.shop.image}`}
                        className="h-24"
                        alt="Current shop image"
                      />
                    ) : (
                      <>
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 1200px)
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
              <FormField
                name="shopName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="shop name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your address here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude:</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={getCurrentLocation}
                          disabled={isGettingLocation}
                        >
                          {isGettingLocation ? "Getting Location..." : "Get Current Location"}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude:</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category:</FormLabel>
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
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories &&
                          categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.name?.toString() || ""}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="openingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Time:</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="closingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing Time:</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={shopModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 hover:bg-green-800"
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
