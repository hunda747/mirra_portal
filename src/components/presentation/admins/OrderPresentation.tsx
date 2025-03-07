import { Order } from "@/features/order/orderApiSlice";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { orderColumns } from "./components/orders/orderColumns";
import { DateRange } from "react-day-picker";
import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import { Dispatch, SetStateAction } from "react";

interface OrderPresentationProps {
  orders: Order[];
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
}

export default function OrderPresentation({
  orders,
  dateRange,
  setDateRange
}: OrderPresentationProps) {
  return (
    <div>
      <div className="flex mb-6 pb-2 items-center justify-between">
        <div className="flex items-center space-x-2">
          <DateRangeDropdown
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>
        <div>
          <Button
            size="sm"
            className="bg-primary relative"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Order
          </Button>
        </div>
      </div>
      <DataTable
        type="order"
        searchKey="name"
        clickable={true}
        columns={orderColumns}
        data={orders || []}
        onUrl={false}
      />
    </div>
  );
}
