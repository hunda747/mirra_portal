import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

import { TProductWithPrice } from "@/features/shops/shopApiSlice";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductWithPricePresentationProps {
  products: TProductWithPrice[] | String;
}

const ProductWithPricePresentation: FC<ProductWithPricePresentationProps> = ({
  products,
}) => {
  return (
    <Card className="w-full rounded-xl shadow-lg bg-white">
      {/* <CardHeader className="p-6 border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Products and Prices
        </CardTitle>
      </CardHeader> */}
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(products) && products.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {item.product.name}
                </TableCell>
                <TableCell>{item.price.toFixed(2)} ETB</TableCell>
                <TableCell>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </TableCell>
                <TableCell>
                  <Button variant="outline">
                    <Pencil />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductWithPricePresentation; 