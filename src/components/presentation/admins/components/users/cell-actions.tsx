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
import { useNavigate } from "react-router-dom";
import { SuspendAlertModal } from "@/components/ui/modals/suspend-alert-modal";
import { Button } from "@/components/ui/button";
import { Shop } from "@/features/shops/shopSlice";
import { useShopModal } from "@/hooks/use-shop-modal";
import { User, useUpdateUserMutation } from "@/features/user/userApiSlice";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isShopActive = data.status;
  const actionLabel = isShopActive ? "Suspend" : "Activate";
  const confirmMessage = isShopActive
    ? "Do you want to suspend this user?"
    : "Do you want to activate this user?";

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("User ID copied to the clipboard");
  };

  const onToggleStatus = async () => {
    try {
      setLoading(true);
      await updateUser({ _id: data._id, status: !isShopActive ? "active" : "inactive" }).unwrap();
      toast.success(`User ${isShopActive ? "suspended" : "activated"}.`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <StopCircle className="mr-2 h-4 w-4" />
            {actionLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
