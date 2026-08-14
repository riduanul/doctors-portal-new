import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://doctors-portal-backend-rose.vercel.app
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    prepareHeaders: async (headers,{getState, endpoint}) => {
      const token = getState()?.auth?.access_token;
      
      if(token){
        headers.set("Authorization", `Bearer ${token}`)
       
      } 
      return headers;
    }
  }),

  tagTypes: ['Notifications'],
  endpoints: (builder) => ({}),
});
