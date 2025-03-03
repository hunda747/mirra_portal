import { Order } from "@/features/order/orderApiSlice";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { orderColumns } from "./components/orders/orderColumns";
export default function OrderPresentation({ orders }: { orders: Order[] }) {
  return (
    <div>
      <div className="flex -mb-12 pb-2 items-center justify-between">
        <div></div>
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
