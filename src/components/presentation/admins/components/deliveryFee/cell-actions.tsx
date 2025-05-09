import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/ui/modals/alert-modal";
import { DeliveryFee, useDeleteDeliveryFeeMutation } from "@/features/deliveryFee/deliveryFeeApiSlice";
import { useDeliveryFeeModal } from "@/hooks/use-delivery-fee-modal";

interface CellActionProps {
  data: DeliveryFee;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deliveryFeeModal = useDeliveryFeeModal();
  const [deleteDeliveryFee] = useDeleteDeliveryFeeMutation();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Delivery Fee ID copied to clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteDeliveryFee(data._id).unwrap();
      toast.success("Delivery Fee deleted.");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
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
          <DropdownMenuItem onClick={() => onCopy(data._id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              deliveryFeeModal.onOpen("edit", data);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
