import { create } from "zustand";
import { DeliveryFee } from "@/features/deliveryFee/deliveryFeeApiSlice";

interface DeliveryFeeModalStore {
  isOpen: boolean;
  mode: "create" | "edit";
  data?: DeliveryFee;
  onOpen: (mode: "create" | "edit", data?: DeliveryFee) => void;
  onClose: () => void;
}

export const useDeliveryFeeModal = create<DeliveryFeeModalStore>((set) => ({
  isOpen: false,
  mode: "create",
  data: undefined,
  onOpen: (mode, data) => set({ isOpen: true, mode, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
})); 