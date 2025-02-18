import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Backpack, Copy, MoreHorizontal, Pencil, StopCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Product
} from "@/features/product/productApiSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SuspendAlertModal } from "@/components/ui/modals/suspend-alert-modal";
import { useProductModal } from "@/hooks/use-product-modal";

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();
  const productModal = useProductModal();
  // const [toggleClientStatus] = useToggleClientStatusMutation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isProductActive = false;
  const actionLabel = isProductActive ? "Suspend" : "Activate";
  const confirmMessage = isProductActive
    ? "Do you want to suspend this product?"
    : "Do you want to activate this product?";

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to the clipboard");
  };

  const onToggleStatus = async () => {
    try {
      setLoading(true);
      // await createProduct(data).unwrap();
      toast.success(`Product created successfully.`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onEdit = () => {
    productModal.onOpen(data);
  };

  return (
    <>
      <SuspendAlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onToggleStatus}
        loading={loading}
        message={confirmMessage}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data._id.toString())}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/shops/${data._id}`)}>
            <Backpack className="mr-2 h-4 w-4" />
            Preview
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <StopCircle className="mr-2 h-4 w-4" />
            {actionLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
