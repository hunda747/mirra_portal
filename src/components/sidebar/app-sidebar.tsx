import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import sidebarMenu from "./menu";
import { useGetCurrentUserQuery } from "@/features/user/userApiSlice";
// import logo from "@/assets/images/coop-logo.png";
import logo from "@/assets/images/direlogo.png";

import { ShopModal } from "../ui/modals/shop-modal";
import { ProductModal } from "../ui/modals/product-modal";
const roleItems = (
  role: string
): (typeof sidebarMenu)[keyof typeof sidebarMenu] | undefined => {
  return role in sidebarMenu
    ? sidebarMenu[role as keyof typeof sidebarMenu]
    : undefined;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser } = useGetCurrentUserQuery();
  console.log(currentUser);

  return (
    <>
      <ShopModal />
      <ProductModal />
      <Sidebar collapsible="icon" {...props} className="shadow-lg">
        <SidebarHeader className="h-16 justify-center border-b">
          {/* {currentUser?.role === "SUPER-ADMIN" ? (
          <TeamSwitcher clients={clients} />
        ) : ( */}
          <div className="flex items-center w-full justify-center">
            <img src={logo} width={80} height={10} alt="logo" />
          </div>
          {/* // )} */}
        </SidebarHeader>
        <SidebarContent>
          {currentUser?.role && roleItems(currentUser.role) && (
            <NavMain items={roleItems(currentUser.role) || []} />
          )}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
