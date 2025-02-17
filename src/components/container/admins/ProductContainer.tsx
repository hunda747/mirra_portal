import ProductPresentation from "@/components/presentation/admins/ProductPresentation";
import { useGetProductsQuery } from "@/features/product/productApiSlice";

export default function ProductContainer() {
  const { data: products } = useGetProductsQuery();
  return (
    <div>
      <ProductPresentation products={products} />
    </div>
  );
}

