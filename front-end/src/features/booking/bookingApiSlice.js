import { apiSlice } from "../api/apiSlice";

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBooking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
    }),
    getBookings: builder.query({
      query: () => "/booking",
    }),
    getABooking: builder.query({
      query: (id) => `/booking/${id}`
    }),
    getSingleBooking: builder.query({
      query: (email) => `/booking/single?patientEmail=${email}`,
    }),
    updateBooking: builder.mutation({
      query: (id, data ) => ({
        url: `/booking/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "delete",
      }),
    }),
   statusUpdate: builder.mutation({
    query:( id, status) => ({
    url: `/booking/updateStatus/${id}`,
    method:"PUT",
    body: status   
    })
   })
  }),
});

export const {
  useGetBookingsQuery,
  useGetSingleBookingQuery,
  useGetABookingQuery,
  useAddBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useStatusUpdateMutation
} = bookingApi;
