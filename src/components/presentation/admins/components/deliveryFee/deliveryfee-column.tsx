import { ColumnDef } from "@tanstack/react-table";
import { DeliveryFee } from "@/features/deliveryFee/deliveryFeeApiSlice";
import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const columns: ColumnDef<DeliveryFee>[] = [
  {
    accessorKey: "minDistance",
    header: "Min Distance (km)",
  },
  {
    accessorKey: "maxDistance",
    header: "Max Distance (km)",
  },
  {
    accessorKey: "charge",
    header: "Charge (ETB)",
    cell: ({ row }) => {
      const charge = parseFloat(row.getValue("charge"));
      const formatted = new Intl.NumberFormat("en-ET", {
        style: "currency",
        currency: "ETB",
      }).format(charge);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "MMMM do, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
