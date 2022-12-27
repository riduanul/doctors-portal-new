import { apiSlice } from "../api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ["booked"] });

export const servicesApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/services/",
    }),
    getAvailableServices: builder.query({
      query: (date) => `/services/available?date=${date}`,
      providesTags: ["booked"],
    }),
    getService: builder.query({
      query: (id) => `/services/${id}`,
    }),
    addService: builder.mutation({
      query: () => ({
        url: "/services/",
        method: "POST",
        body,
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetAvailableServicesQuery,
  useGetServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = servicesApi;
