import { apiSlice } from "../api/apiSlice";


const doctorApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getDoctors : builder.query({
            query: () => `/doctor`
        }),
        addDoctor: builder.mutation({
            query: (body) => ({
                url: `/doctor`,
                method:"POST",
                body: body
            })
        }),
        deleteDoctor: builder.mutation({
            query:(id) => ({
                url:`/doctor/${id}`,
                method:"DELETE",
                
            })
        })
    })
})

export const {
    useGetDoctorsQuery,
    useAddDoctorMutation,
    useDeleteDoctorMutation
} = doctorApi;