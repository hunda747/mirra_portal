import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";
import { format } from "date-fns";
import { Order } from "@/features/order/orderApiSlice";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const orderColumns: ColumnDef<Order>[] = [
  // {
  //   accessorKey: "_id",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   enableHiding: true,
  // },
  {
    accessorKey: "shop",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Shop Name
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.shop.name}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.shop.name || id);
    },
  },
  // {
  //   accessorKey: "user",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         User
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return <span>{row.original.user.email}</span>;
  //   },
  // },
  {
    accessorKey: "items",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Products
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.items.length}</span>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total Amount
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.totalAmount} ETB</span>;
    },
  },
  {
    accessorKey: "deliveryCharge",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Delivery Charge
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.deliveryCharge} ETB</span>;
    },
  },
  // {
  //   accessorKey: "platformFee",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Platform Fee
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return <span>{row.original.platformFee} ETB</span>;
  //   },
  // },
  {
    accessorKey: "deliveryAddress",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Delivery Address
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.deliveryAddress}</span>;
    },
  },
  {
    accessorKey: "distance",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Distance
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.distance.toFixed(2)} km</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <span>
          {createdAt ? format(new Date(createdAt), "MM/dd/yyyy") : "N/A"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
