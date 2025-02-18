import { Product } from "@/features/product/productApiSlice";
import { create } from "zustand";

interface ProductModalStore {
  isOpen: boolean;
  product?: Product;
  onOpen: (product?: Product) => void;
  onClose: () => void;
}

export const useProductModal = create<ProductModalStore>((set) => ({
  isOpen: false,
  product: undefined,
  onOpen: (product) => set({ isOpen: true, product }),
  onClose: () => set({ isOpen: false, product: undefined }),
}));
