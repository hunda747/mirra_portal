
import { Heading, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { columns } from "./components/deliveryFee/deliveryfee-column";
import { DeliveryFee } from "@/features/deliveryFee/deliveryFeeApiSlice";
import { useDeliveryFeeModal } from "@/hooks/use-delivery-fee-modal";

interface DeliveryFeePresentationProps {
  data: DeliveryFee[];
  isLoading: boolean;
}

export default function DeliveryFeePresentation({
  data,
  isLoading,
}: DeliveryFeePresentationProps) {
  const deliveryFeeModal = useDeliveryFeeModal();

  return (
    <>
      <div className="flex items-center justify-between">
        <div></div>
        <Button onClick={() => deliveryFeeModal.onOpen("create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        type="delivery-fee"
        searchKey="minDistance"
        clickable={true}
        columns={columns}
        data={data || []}
        onUrl={false}
      />
    </>
  );
}

