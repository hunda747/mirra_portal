import {
  BookUser,
  Calendar,
  LayoutDashboard,
  LucideWorkflow,
  Mail,
  MessageSquareText,
  Package,
  PackageOpen,
  // Notebook,
  Settings,
  ShieldAlert,
  SquareUserRound,
  Store,
  Target,
  Telescope,
  Truck,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Admin } from "@/features/user/userApiSlice";

// Define the menu item type
export type MenuItem = {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  authorizedRoles?: string[];
  items?: MenuItem[];
};

// Function to generate menu based on current user
const getSidebarMenu = (currentUser?: Admin) => {
  return {
    "SUPER_ADMIN": [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        isActive: true,
        authorizedRoles: ["SUPER-ADMIN"],
      },
      {
        title: "Shops",
        url: "/shops",
        icon: Store,
        authorizedRoles: ["SUPER-ADMIN"],
      },
      {
        title: "Products",
        url: "/products",
        icon: Package,
        authorizedRoles: ["SUPER-ADMIN"],
      },
      {
        title: "Orders",
        url: "/orders",
        icon: PackageOpen,
        authorizedRoles: ["SUPER-ADMIN"],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        authorizedRoles: ["SUPER-ADMIN"],
        items: [
          {
            title: "Delivery Fee",
            url: "/settings/delivery-fee",
            icon: Truck,
          },
          {
            title: "Profile",
            url: "/settings/profile",
            icon: User,
          },
        ],
      },
    ],
    "SHOP_OWNER": [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        isActive: true,
        authorizedRoles: ["SHOP_OWNER"],
      },
      {
        title: "My Shop",
        url: currentUser?.shop?._id ? `/shops/${currentUser.shop._id}` : "/shops",
        icon: Store,
        authorizedRoles: ["SHOP_OWNER"],
      },
      {
        title: "Orders",
        url: "/orders",
        icon: PackageOpen,
        authorizedRoles: ["SHOP_OWNER"],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        authorizedRoles: ["SHOP_OWNER"],
        items: [
          {
            title: "Profile",
            url: "/settings/profile",
            icon: User,
          },
        ],
      },
    ],
  };
};

export default getSidebarMenu;
