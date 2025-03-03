import { useGetShopsQuery } from "@/features/shops/shopSlice";
import ShopPresentation from "@/components/presentation/admins/ShopPresentation";
import { useGetCurrentUserQuery } from "@/features/user/userApiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopContainer = () => {
  const { data: shops } = useGetShopsQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is a SHOP_OWNER, redirect to their shop detail page
    if (currentUser?.role?.name === "SHOP_OWNER" && currentUser?.shop?._id) {
      navigate(`/shops/${currentUser.shop._id}`);
    }
  }, [currentUser, navigate]);

  // If user is a SHOP_OWNER, don't render the shops list
  if (currentUser?.role?.name === "SHOP_OWNER") {
    return null; // Will be redirected by the useEffect
  }

  return <ShopPresentation shops={shops} />;
};

export default ShopContainer;


