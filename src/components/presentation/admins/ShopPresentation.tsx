import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useShopModal } from "@/hooks/use-shop-modal";
import { Shop } from "@/features/shops/shopSlice";
import { shopColumns } from "./components/shops/shop-column";

interface ShopPresentationProps {
  shops: Shop[] | undefined;
}

const ShopPresentation: FC<ShopPresentationProps> = ({ shops }) => {
  const shopModal = useShopModal();
  console.log(shopModal);

  return (
    <div>
      <div className="flex -mb-12 pb-2 items-center justify-between">
        <div></div>
        <div>
          <Button
            size="sm"
            className="bg-primary relative"
            onClick={() => {
              shopModal.onOpen();
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Shop
          </Button>
        </div>
      </div>
      <DataTable
        type="shop"
        searchKey="name"
        clickable={true}
        columns={shopColumns as any}
        data={shops || []}
        onUrl={false}
      />
    </div>
  );
};

export default ShopPresentation;
