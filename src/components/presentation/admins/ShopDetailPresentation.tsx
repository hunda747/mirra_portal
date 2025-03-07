import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Shop } from "@/features/shops/shopApiSlice";
import { HomeIcon, PhoneIcon } from "lucide-react";
import { MailIcon } from "lucide-react";
import { FC } from "react";
import ProductWithPricePresentation from "./ProductWithPricePresentation";
import { Button } from "@/components/ui/button";
import { useProductPriceModal } from "@/hooks/use-product-price-modal";
import { ProductPriceModal } from "@/components/ui/modals/product-price-modal";
import AdminListPresentation from "./AdminListPresentation";
import { AdminModal } from "@/components/ui/modals/add-admin-modal";
import { useAdminModal } from "@/hooks/use-admin-modal";
interface ShopDetailPresentationProps {
  shop: Shop;
}

const ShopDetailPresentation: FC<ShopDetailPresentationProps> = ({ shop }) => {
  const productPriceModal = useProductPriceModal();
  const adminModal = useAdminModal();
  return <div>
    <ProductPriceModal shopId={shop._id} />
    <AdminModal shopId={shop._id} />

    <Card className="w-full rounded-xl shadow-lg bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-x-6 p-6 border-b">
        <div className="flex space-x-6 items-center">
          <img
            src={`${import.meta.env.VITE_API_URL || "http://localhost:7000"}${shop?.image}`}
            alt="Signature"
            className="w-16 h-16 rounded-lg shadow-md"
          />
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {shop?.name}
            </CardTitle>
            <Badge
              variant={
                shop?.isOpen ? "default" : "destructive"
              }
              className="mt-2"
            >
              {shop?.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>
        {/* <div className="text-2xl text-primary">{shop?.address}</div> */}
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="space-y-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Contact Information
          </CardTitle>
          <div className="flex items-center space-x-2">
            <MailIcon className="h-5 w-5 text-gray-400" />
            <p className="text-gray-700">{shop?.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5 text-gray-400" />
            <p className="text-gray-700">{shop?.name}</p>
          </div>
        </div>
        <div className="space-y-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Address
          </CardTitle>
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-5 w-5 text-gray-400" />
            <p className="text-gray-700">{shop?.address}</p>
          </div>
          <p className="text-gray-700">
            {shop?.location.coordinates[0]}, {shop?.location.coordinates[1]}
          </p>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold text-gray-800">
            ID Front
          </CardTitle>
          <div className="flex space-x-4">
            <img
              src={`${import.meta.env.VITE_API_URL || "http://localhost:7000"}${shop?.image}`}
              alt="Residence Card"
              className="w-80 h-40 rounded-lg shadow-md"
            />
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t w-full">
        <div className="flex items-center justify-between py-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Products
          </CardTitle>
          <Button variant="outline" onClick={() => productPriceModal.onOpen()}>Add Product</Button>
        </div>
        <ProductWithPricePresentation products={shop?.products} shopId={shop._id} />
      </CardContent>
      <CardContent className="border-t w-full">
        <div className="flex items-center justify-between py-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Admins
          </CardTitle>
          <Button variant="outline" onClick={() => adminModal.onOpen()}>Add admin</Button>
        </div>
        <AdminListPresentation admins={shop?.admins || []} />
      </CardContent>

    </Card>
  </div>;
};

export default ShopDetailPresentation;


