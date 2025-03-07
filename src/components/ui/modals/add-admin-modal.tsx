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
import { Modal } from "../modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useGetAllRolesQuery } from "@/features/roles/roleApiSlice";
import { useCreateAdminMutation, useUpdateAdminMutation } from "@/features/user/userApiSlice";
import { useAdminModal } from "@/hooks/use-admin-modal";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleId: z.string().min(1, "Role is required"),
});

interface AdminModalProps {
  shopId: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({ shopId }) => {
  const adminModal = useAdminModal();
  const [loading, setLoading] = useState(false);
  const { data: roles } = useGetAllRolesQuery();
  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      roleId: "",
    },
  });

  // Reset form when modal opens with admin data for editing
  useEffect(() => {
    if (adminModal.admin) {
      form.reset({
        username: adminModal.admin.username.toString(),
        email: adminModal.admin.email.toString(),
        password: "", // Don't populate password for security
        roleId: adminModal.admin.role._id.toString(),
      });
    } else {
      form.reset({
        username: "",
        email: "",
        password: "",
        roleId: "",
      });
    }
  }, [adminModal.admin, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      if (adminModal.admin) {
        // Update existing admin
        const response = await updateAdmin({
          _id: adminModal.admin._id.toString(),
          ...values,
          shopId: shopId,
        }).unwrap();

        if (response) {
          toast.success("Admin updated successfully");
        }
      } else {
        // Create new admin
        const response = await createAdmin({
          ...values,
          shopId: shopId,
        }).unwrap();

        if (response) {
          toast.success("Admin created successfully");
        }
      }

      adminModal.onClose();
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const title = adminModal.admin ? "Edit Admin" : "Add Admin";
  const description = adminModal.admin ? "Update admin information" : "Add a new admin to your shop";
  const buttonText = adminModal.admin ? "Update" : "Continue";

  return (
    <Modal
      title={title}
      description={description}
      isOpen={adminModal.isOpen}
      onClose={adminModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles?.map((role) => (
                          <SelectItem key={role._id} value={role._id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={adminModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 hover:bg-green-800"
                >
                  {buttonText}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
