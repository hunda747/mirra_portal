import { useGetShopsQuery } from "@/features/shops/shopSlice";
import ShopPresentation from "@/components/presentation/admins/ShopPresentation";
const ShopContainer = () => {
  const { data: shops } = useGetShopsQuery();
  return <ShopPresentation shops={shops} />;
};

export default ShopContainer;


