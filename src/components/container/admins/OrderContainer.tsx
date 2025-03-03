import { useGetOrdersQuery } from "@/features/order/orderApiSlice";
import OrderPresentation from "@/components/presentation/admins/OrderPresentation";

export default function OrderContainer() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <OrderPresentation orders={orders?.data || []} />
    </div>
  );
}

