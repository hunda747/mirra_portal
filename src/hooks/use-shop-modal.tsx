import { create } from "zustand";

interface useShopModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useShopModal = create<useShopModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
