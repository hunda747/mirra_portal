import OrderDetailPresentation from "@/components/presentation/admins/OrderDetailPresentation";
import { useGetOrderQuery } from "@/features/order/orderApiSlice";
import { useParams } from "react-router-dom";

const OrderDetailContainer = () => {
  const { id } = useParams();
  const { data: order } = useGetOrderQuery(id as string);
  return <OrderDetailPresentation order={order?.data} />;
};

export default OrderDetailContainer;


