import { apiSlice } from "../api/apiSlice";

interface Product {
  _id: string;
    name: string;
    description: string;
    category: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface CreateProduct {
  name: string;
  description: string;
  category: string;
  image?: File;
}

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/api/products",
      providesTags: ['Products']
    }),
    createProduct: builder.mutation<CreateProduct, FormData>({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ['Products']
    }),
    updateProduct: builder.mutation<CreateProduct, { id: string; product: FormData }>({
      query: ({ id, product }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ['Products']
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation } = productApiSlice;
export type { Product, CreateProduct };
