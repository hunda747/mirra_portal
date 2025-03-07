import { apiSlice } from "../api/apiSlice";

interface Role {
  _id: number;
  name: string; 
  description: string;
  createdAt: string;
  updatedAt: string;
}


export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET - Get all roles
    getAllRoles: builder.query<Role[], void>({
      query: () => "/api/roles",
    }),

    // GET - Get role by ID
    getRoleById: builder.query<Role, string>({
      query: (id) => `/api/roles/${id}`,
      providesTags: (_, __, id) => [{ type: "Roles", id }],
    }),

    // POST - Create a new role
    createRole: builder.mutation<Role, Partial<Role>>({
      query: (data) => ({
        url: "/api/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Roles", id: "ROLE_LIST" }],
    }),

    // PUT - Update role details
    updateRole: builder.mutation<Role, Partial<Role>>({
      query: (data) => ({
        url: "/api/roles",
        method: "PUT",
        body: data,
      }),
    }),

    // PUT - Toggle role status
    toggleRoleStatus: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/api/v1/roles/${id}/toggle-status`,
        method: "PUT",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Roles", id }],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useToggleRoleStatusMutation,
} = roleApiSlice;

export type { Role };
