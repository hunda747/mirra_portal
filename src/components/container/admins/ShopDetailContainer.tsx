import ShopDetailPresentation from "@/components/presentation/admins/ShopDetailPresentation";
import { useParams, useNavigate } from "react-router-dom";
import { useGetShopQuery } from "@/features/shops/shopApiSlice";
import { useGetCurrentUserQuery } from "@/features/user/userApiSlice";
import { useEffect } from "react";

const ShopDetailContainer = () => {
  const { id } = useParams();
  const { data: shop, isLoading } = useGetShopQuery(id as string);
  const { data: currentUser } = useGetCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is a SHOP_OWNER and trying to access a shop that is not their own
    if (
      !isLoading &&
      currentUser?.role?.name === "SHOP_OWNER" &&
      currentUser?.shop?._id &&
      id !== currentUser.shop._id
    ) {
      // Redirect to their own shop
      navigate(`/shops/${currentUser.shop._id}`);
    }
  }, [currentUser, id, navigate, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (!shop) return <div>Shop not found</div>;

  return <ShopDetailPresentation shop={shop} />;
};

export default ShopDetailContainer;


