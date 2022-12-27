import { apiSlice } from "../api/apiSlice";

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => "/booking/",
    }),
    getBooking: builder.query({
      query: (email) => `/booking?patientEmail=${email}`,
    }),
    addBooking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
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
  }),
});

export const {
  useGetBookingQuery,
  useGetBookingsQuery,
  useAddBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
