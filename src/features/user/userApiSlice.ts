import { apiSlice } from "../api/apiSlice";

interface User {
  _id: number;
  fullName: string;
  email: string;
  phone?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Admin {
  _id: string;
  username: string;
  email: string;
  role: {
    _id: string;
    name: string;
  };
  shop: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}


type UserRequest = {
  fullName: string;
  email: string;
  password: string;
  roleId: number;
  clientId: number;
  branchIds: number[] | [];
  mainBranchId: number;
};

type AdminRequest = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  roleId: string;
  shopId: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "/api/users",
      providesTags: [{ type: "Users", id: "USER_LIST" }],
    }),
    // POST - Create a new user
    createAdmin: builder.mutation<Admin, AdminRequest>({
      query: (data) => ({
        url: "/api/admins",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: [{ type: "Admin", id: "USER_LIST" }],
    }),

    updateAdmin: builder.mutation<Admin, AdminRequest>({
      query: (data) => ({
        url: `/api/admins/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Admin", id: "ADMIN_LIST" }],
    }),

    // PUT - Update user details
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ _id, ...data }) => ({
        url: `/api/users/profile/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { _id }) => [{ type: "Users", id: _id }],
    }),

    // GET - Get current user (self) details
    getCurrentUser: builder.query<Admin, void>({
      query: () => "/api/admins/profile",
      providesTags: [{ type: "Users", id: "CURRENT_USER" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} = userApiSlice;
export type { User, Admin };
