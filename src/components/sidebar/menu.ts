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
  UserPlus,
  Users,
} from "lucide-react";

const sidebarMenu = {
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
      url: "/kyc-admins",
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
          title: "Email",
          url: "/settings/email",
          icon: Mail,
        },
        {
          title: "SMS",
          url: "/settings/sms",
          icon: MessageSquareText,
        },
      ],
    },
  ],
  "CLIENT_ADMIN": [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Targets",
      url: `/targets`,
      icon: Target,
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: BookUser,
    },
    {
      title: "Inactive Accounts",
      url: "/inactive",
      icon: ShieldAlert,
    },
    {
      title: "Prospective",
      url: "/prospective",
      icon: Telescope,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Agents",
      url: "/agents",
      icon: UserPlus,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  "ACCOUNT_APPROVER": [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    // {
    //   title: "Targets",
    //   url: `/targets`,
    //   icon: Target,
    // },
    {
      title: "Accounts",
      url: "/accounts",
      icon: BookUser,
    },
    {
      title: "Inactive Accounts",
      url: "/inactive",
      icon: ShieldAlert,
    },
    {
      title: "Prospective",
      url: "/prospective",
      icon: Telescope,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  "ACCOUNT-CREATOR": [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    // {
    //   title: "Targets",
    //   url: `/targets`,
    //   icon: Target,
    // },
    {
      title: "Accounts",
      url: "/accounts",
      icon: BookUser,
    },
    {
      title: "Inactive Accounts",
      url: "/inactive",
      icon: ShieldAlert,
    },
    {
      title: "Prospective",
      url: "/prospective",
      icon: Telescope,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  "BRANCH-ADMIN": [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Targets",
      url: `/targets`,
      icon: Target,
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: BookUser,
    },
    {
      title: "Inactive Accounts",
      url: "/inactive",
      icon: ShieldAlert,
    },
    {
      title: "Prospective",
      url: "/prospective",
      icon: Telescope,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Agents",
      url: "/agents",
      icon: UserPlus,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  CRM: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Meetings",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: LucideWorkflow,
    },
    // {
    //   title: "Notes",
    //   url: "/notes",
    //   icon: Notebook,
    // },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/crm-settings",
      icon: Settings,
    },
  ],
  "CRM-ADMIN": [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "CRM",
      url: "/crm",
      icon: SquareUserRound,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/crm-settings",
      icon: Settings,
    },
  ],
};

export default sidebarMenu;
