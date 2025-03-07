import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://miraserver.rockgamestech.com",
  baseUrl: "http://localhost:7000",
  // baseUrl: "http://localhost:9060",
  // baseUrl: "http://10.2.125.41:9060",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// Create a custom base query with error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  // Check if we receive a 401 error
  if (result.error && result.error.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("clientId");
    // Dispatch logout action
    api.dispatch({type: "auth/logout"});
    
    // Redirect to login page
    window.location.href = '/sign-in'; // Adjust this path if your login route is different
  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Examples",
    "Clients",
    "Users",
    "Agents",
    "Accounts",
    "Branches",
    "Districts",
    "Targets",
    "Roles",
    "Auth",
    "Meeting",
    "HPC",
    "Case",
    "Lead",
    "Task",
    "RTGS",
    "Shops",
    "Products",
    "Orders",
    "DeliveryFee",
    "Admin",
  ],
  endpoints: () => ({}),
});
