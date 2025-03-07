import { Admin } from "@/features/admin/adminApiSlice";
import { create } from "zustand";

interface AdminModalStore {
  isOpen: boolean;
  admin?: Admin;
  onOpen: (admin?: Admin) => void;
  onClose: () => void;
}

export const useAdminModal = create<AdminModalStore>((set) => ({
  isOpen: false,
  admin: undefined,
  onOpen: (admin) => set({ isOpen: true, admin }),
  onClose: () => set({ isOpen: false, admin: undefined }),
}));
