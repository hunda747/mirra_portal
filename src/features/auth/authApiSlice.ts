import { apiSlice } from "../api/apiSlice";

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Login>({
      query: (userInfo) => ({
        url: "/api/admins/login",
        method: "POST",
        body: {
          email: userInfo.username,
          password: userInfo.password,
        },
      }),
      invalidatesTags: [{ type: "Auth" }],
    }),
  }),
});

export const { useLoginMutation } = authApi;
