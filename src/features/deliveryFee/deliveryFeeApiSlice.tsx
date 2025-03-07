import { apiSlice } from "../api/apiSlice";

export interface DeliveryFee {
  _id: string;
  minDistance: number;
  maxDistance: number;
  charge: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DeliveryFeeRequest {
  minDistance: number;
  maxDistance: number;
  charge: number;
}

export const deliveryFeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryFees: builder.query<DeliveryFee[], void>({
      query: () => "/api/delivery-charges",
      providesTags: ["DeliveryFee"],
    }),
    getDeliveryFeeById: builder.query<DeliveryFee, string>({
      query: (id) => `/api/delivery-charges/${id}`,
      providesTags: ["DeliveryFee"],
    }),
    addDeliveryFee: builder.mutation<DeliveryFee, DeliveryFeeRequest>({
      query: (deliveryFee) => ({
        url: "/api/delivery-charges",
        method: "POST",
        body: deliveryFee,
      }),
      invalidatesTags: ["DeliveryFee"],
    }),
    updateDeliveryFee: builder.mutation<
      DeliveryFee,
      { id: string; data: DeliveryFeeRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/delivery-charges/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["DeliveryFee"],
    }),
    deleteDeliveryFee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/delivery-charges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliveryFee"],
    }),
  }),
});

export const {
  useGetDeliveryFeesQuery,
  useGetDeliveryFeeByIdQuery,
  useAddDeliveryFeeMutation,
  useUpdateDeliveryFeeMutation,
  useDeleteDeliveryFeeMutation,
} = deliveryFeeApiSlice;
