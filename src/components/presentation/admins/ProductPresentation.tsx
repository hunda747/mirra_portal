import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useProductModal } from "@/hooks/use-product-modal";
import { Product } from "@/features/product/productApiSlice";
import { productColumns } from "./components/products/product-column";
interface ProductPresentationProps {
  products: Product[] | undefined;
}

const ProductPresentation: FC<ProductPresentationProps> = ({ products }) => {
  const productModal = useProductModal();

  return (
    <div>
      <div className="flex -mb-12 pb-2 items-center justify-between">
        <div></div>
        <div>
          <Button
            size="sm"
            className="bg-primary relative"
            onClick={() => {
              productModal.onOpen();
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      <DataTable
        type="product"
        searchKey="name"
        clickable={true}
        columns={productColumns}
        data={products || []}
        onUrl={false}
      />
    </div>
  );
};

export default ProductPresentation;
