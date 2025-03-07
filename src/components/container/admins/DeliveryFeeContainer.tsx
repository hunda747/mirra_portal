import { useGetDeliveryFeesQuery } from "@/features/deliveryFee/deliveryFeeApiSlice";
import DeliveryFeePresentation from "@/components/presentation/admins/DeliveryFeePresentation";
import { DeliveryFeeModal } from "@/components/ui/modals/delivery-fee-modal";

const DeliveryFeeContainer = () => {
  const { data = [], isLoading } = useGetDeliveryFeesQuery();

  return (
    <>
      <DeliveryFeeModal />
      <DeliveryFeePresentation data={data} isLoading={isLoading} />
    </>
  );
};

export default DeliveryFeeContainer;


