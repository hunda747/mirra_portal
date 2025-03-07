// This would be in src/hooks/use-product-price-modal.ts
import { create } from 'zustand';

interface ProductPriceModalData {
  productId?: string;
  price?: number;
  inStock?: boolean;
  quantity?: number;
  isEditing?: boolean;
}

interface ProductPriceModalStore {
  isOpen: boolean;
  data: ProductPriceModalData | null;
  onOpen: (data?: ProductPriceModalData) => void;
  onClose: () => void;
}

export const useProductPriceModal = create<ProductPriceModalStore>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data = null) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: null }),
}));