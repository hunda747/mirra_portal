import { apiSlice } from "../api/apiSlice";

export interface DashboardData {
  orders?: {
    totalOrders: number;
    todayOrders: number;
    ordersByStatus: Array<{ _id: string; count: number }>;
  };
  users?: {
    totalUsers: number;
    newUsersToday: number;
    usersByStatus: Array<{ _id: string; count: number }>;
  };
  revenue?: {
    totalRevenue: number;
    totalPlatformFees: number;
    todayRevenue: number;
    revenueByPaymentMethod: Array<any>;
    monthlyRevenueTrend: Array<any>;
  };
  products?: {
    totalProducts: number;
    productsByCategory: Array<{ _id: string; count: number }>;
    topProducts: Array<{
      _id: string;
      orderCount: number;
      totalQuantity: number;
      name: string;
      category: string;
    }>;
  };
  shops?: {
    totalShops: number;
    openShops: number;
    shopsByCategory: Array<{ _id: string; count: number }>;
    topShops: Array<{
      _id: string;
      orderCount: number;
      totalRevenue: number;
      name: string;
      category: string;
    }>;
  };
}

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => "/api/dashboard",
      providesTags: ["Orders", "Users", "Products", "Shops"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApiSlice; 