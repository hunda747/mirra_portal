import ShopDetailPresentation from "@/components/presentation/admins/ShopDetailPresentation";
import { useParams } from "react-router-dom";
import { useGetShopQuery } from "@/features/shops/shopApiSlice";

const ShopDetailContainer = () => {
  const { id } = useParams();
  const { data: shop } = useGetShopQuery(id as string);
  if (!shop) return <div>Shop not found</div>;
  return <ShopDetailPresentation shop={shop} />;
};

export default ShopDetailContainer;


