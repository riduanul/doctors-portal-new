import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doctors-portal-backend-rose.vercel.app/api",
    prepareHeaders: async (headers,{getState, endpoint}) => {
      const token = getState()?.auth?.access_token;
      
      if(token){
        headers.set("Authorization", `Bearer ${token}`)
       
      } 
      return headers;
    }
  }),

  endpoints: (builder) => ({}),
});
