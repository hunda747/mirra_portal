import { Shop } from "@/features/shops/shopApiSlice";
import { create } from "zustand";

interface ShopModalStore {
  isOpen: boolean;
  shop?: Shop;
  onOpen: (shop?: Shop) => void;
  onClose: () => void;
}

export const useShopModal = create<ShopModalStore>((set) => ({
  isOpen: false,
  shop: undefined,
  onOpen: (shop) => set({ isOpen: true, shop }),
  onClose: () => set({ isOpen: false, shop: undefined }),
}));