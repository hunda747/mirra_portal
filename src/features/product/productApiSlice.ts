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
    }),
    createProduct: builder.mutation<CreateProduct, FormData>({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApiSlice;
export type { Product, CreateProduct };
