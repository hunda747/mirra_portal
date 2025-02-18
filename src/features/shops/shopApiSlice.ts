import { apiSlice } from "../api/apiSlice";

interface TLocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

interface TProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface TProductWithPrice {
  product: TProduct;
  price: number;
  inStock: boolean;
  _id: string;
};

interface Shop {
  _id: string;
    name: string;
    address: string;
    category: string;
    isOpen: boolean;
    image?: string;
    location: TLocation;
    products: TProductWithPrice[] | String;
    distance?: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface CreateShop {
  name: string;
  address: string;
  category: string;
  image?: File;
  latitude: number;
  longitude: number;
  openingTime: {
    open: string;
    close: string;
  }
}

export const shopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<Shop[], void>({
      query: () => "/api/shops",
      providesTags: ['Shops']
    }),
    getShop: builder.query<Shop, string>({
      query: (id) => `/api/shops/${id}`,
      providesTags: (result, error, id) => [{ type: 'Shops', id }]
    }),
    createShop: builder.mutation<CreateShop, FormData>({
      query: (shop) => ({
        url: "/api/shops",
        method: "POST",
        body: shop,
      }),
      invalidatesTags: ['Shops']
    }),
    updateShop: builder.mutation<CreateShop, { id: string; shop: FormData }>({
      query: ({ id, shop }) => ({
        url: `/api/shops/${id}`,
        method: "PUT",
        body: shop,
      }),
      invalidatesTags: ['Shops']
    }),
    addProductToShop: builder.mutation<TProductWithPrice, { shopId: string, productId: string, price: number, inStock: boolean }>({
      query: ({ shopId, productId, price, inStock }) => ({
        url: `/api/shops/${shopId}/products`,
        method: "POST",
        body: { productId, price, inStock },
      }),
      invalidatesTags: ['Shops']
    }),
  }),
});

export const { useGetShopsQuery, useGetShopQuery, useCreateShopMutation, useAddProductToShopMutation, useUpdateShopMutation } = shopApiSlice;
export type { Shop, CreateShop, TProduct, TProductWithPrice };
