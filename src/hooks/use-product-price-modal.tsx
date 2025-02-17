import { create } from "zustand";

interface useProductPriceModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProductPriceModal = create<useProductPriceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
