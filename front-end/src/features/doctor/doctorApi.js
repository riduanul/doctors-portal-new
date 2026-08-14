import { apiSlice } from "../api/apiSlice";

const doctorApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getDoctors : builder.query({
            query: () => `/doctor`
        }),
        getDoctorById: builder.query({
            query: (id) => `/doctor/${id}`
        }),
        addDoctor: builder.mutation({
            query: (body) => ({
                url: `/doctor`,
                method:"POST",
                body: body
            })
        }),
        updateDoctor: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/doctor/${id}`,
                method: "PATCH",
                body: body
            })
        }),
        deleteDoctor: builder.mutation({
            query:(id) => ({
                url:`/doctor/${id}`,
                method:"DELETE",
            })
        }),
        getDoctorReviews: builder.query({
            query: (doctorId) => `/review/${doctorId}`
        }),
        addDoctorReview: builder.mutation({
            query: (body) => ({
                url: `/review`,
                method: "POST",
                body: body
            })
        })
    })
})

export const {
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useAddDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
    useGetDoctorReviewsQuery,
    useAddDoctorReviewMutation
} = doctorApi;