import { apiSlice } from "../api/apiSlice";

interface Product {
  _id: string;
  name: string;
  image: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  _id: string;
}

interface DeliveryLocation {
  type: string;
  coordinates: number[];
}

interface User {
  _id: string;
  email: string;
}

interface Shop {
  _id: string;
  name: string;
}

interface Order {
  _id: string;
  user: User;
  shop: Shop;
  items: OrderItem[];
  deliveryLocation: DeliveryLocation;
  distance: number;
  totalAmount: number;
  deliveryCharge: number;
  platformFee: number;
  deliveryAddress: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  current: number;
  total: number;
  count: number;
  totalRecords: number;
}

interface OrderResponse {
  success: boolean;
  data: Order[];
  pagination: PaginationData;
}

interface OrderDetailResponse {
  success: boolean;
  data: Order;
}

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse, { startDate?: string; endDate?: string } | void>({
      query: (params) => {
        if (params) {
          const { startDate, endDate } = params;
          return `/api/orders?startDate=${startDate}&endDate=${endDate}`;
        }
        return "/api/orders";
      },
      providesTags: ['Orders'],
    }),
    getOrder: builder.query<OrderDetailResponse, string>({
      query: (id) => `/api/orders/${id}`,
      providesTags: ['Orders'],
    }),
    updateOrder: builder.mutation<OrderDetailResponse, Order>({
      query: (order) => ({
        url: `/api/orders/${order._id}/status`,
        method: "PATCH",
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { 
  useGetOrdersQuery, 
  useGetOrderQuery,
  useUpdateOrderMutation 
} = orderApiSlice;
export type { Order, PaginationData, Product, OrderItem, DeliveryLocation, User, Shop };
