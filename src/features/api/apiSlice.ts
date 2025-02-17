import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://miraserver.rockgamestech.com",
  // baseUrl: "http://localhost:7000",
  // baseUrl: "http://localhost:9060",
  // baseUrl: "http://10.2.125.41:9060",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
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
  ],
  endpoints: () => ({}),
});
