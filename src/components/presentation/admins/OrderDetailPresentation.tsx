import { Order } from "@/features/order/orderApiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUpdateOrderMutation } from "@/features/order/orderApiSlice";
import { toast } from "react-hot-toast";

const OrderDetailPresentation = ({ order }: { order: Order | undefined }) => {
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Define valid status transitions
  const validTransitions = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['preparing', 'cancelled'],
    preparing: ['out_for_delivery'],
    out_for_delivery: ['delivered'],
    delivered: [],
    cancelled: []
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  // Format date
  const formattedDate = order.createdAt
    ? format(new Date(order.createdAt), "PPP 'at' p")
    : "N/A";

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-indigo-100 text-indigo-800";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Payment status badge color
  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get available status transitions for current order
  const getAvailableStatusTransitions = () => {
    const currentStatus = order.status.toLowerCase();
    return validTransitions[currentStatus as keyof typeof validTransitions] || [];
  };

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;

    try {
      await updateOrder({
        ...order,
        status: selectedStatus
      }).unwrap();

      toast.success(`Order status updated to ${selectedStatus}`);
      setSelectedStatus("");
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
        <Badge className={getStatusColor(order.status)}>
          {order.status}
        </Badge>
      </div>

      {/* Status Update Section */}
      <Card>
        <CardHeader>
          <CardTitle>Update Order Status</CardTitle>
          <CardDescription>
            Change the current status of this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-muted-foreground">Current Status</p>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>

            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-muted-foreground">New Status</p>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
                disabled={getAvailableStatusTransitions().length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableStatusTransitions().map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getAvailableStatusTransitions().length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  No further status changes allowed for {order.status} orders
                </p>
              )}
            </div>
            {/* <div className="space-y-2 flex-1 flex-col justify-end h-full"> */}
            <Button
              onClick={handleStatusUpdate}
              disabled={!selectedStatus || isUpdating}
              className="mt-6 sm:mt-0"
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
            {/* </div> */}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>
              Order #{order._id} • Placed on {formattedDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p className="text-sm">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Delivery Address</p>
                <p className="text-sm">{order.deliveryAddress}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-medium">${order.totalAmount - order.deliveryCharge - order.platformFee}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Delivery Charge</p>
                  <p className="text-sm font-medium">${order.deliveryCharge}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Platform Fee</p>
                  <p className="text-sm font-medium">${order.platformFee}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-base font-medium">Total</p>
                  <p className="text-base font-bold">${order.totalAmount}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer & Shop Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Customer & Shop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
              <p className="text-sm">{order.user.email}</p>
              <p className="text-sm text-muted-foreground">ID: {order.user._id}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Shop</p>
              <p className="text-sm">{order.shop.name}</p>
              <p className="text-sm text-muted-foreground">ID: {order.shop._id}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Delivery Distance</p>
              <p className="text-sm">{order.distance} km</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>
            List of items in this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <p>{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {item.product._id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailPresentation;


