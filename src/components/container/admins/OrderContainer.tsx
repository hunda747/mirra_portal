import { useGetOrdersQuery } from "@/features/order/orderApiSlice";
import OrderPresentation from "@/components/presentation/admins/OrderPresentation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function OrderContainer() {
  // Set default date to today
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: today
  });

  // Format dates for API
  const startDate = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : formattedToday;
  const endDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : formattedToday;

  const { data: orders, isLoading, error } = useGetOrdersQuery({ startDate, endDate });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <OrderPresentation
        orders={orders?.data || []}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </div>
  );
}

