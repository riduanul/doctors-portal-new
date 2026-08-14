import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userAuthSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try{
          const result = await queryFulfilled;
          // Store with correct keys matching what useAuthCheck reads
          localStorage.setItem("accessToken", JSON.stringify({
            access_token: result?.data?.access_token,
            user: result?.data?.user
          }))

          dispatch(userLoggedIn({
            access_token: result?.data?.access_token,
            user: result?.data?.user
          }))
        }catch(err){
          console.log(err)
        }
      }
    }),
  
    loginUser: builder.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: "POST",
        body: body
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try{
          const result = await queryFulfilled;
          // Use consistent keys: access_token and user
          localStorage.setItem("accessToken", JSON.stringify({
            access_token: result?.data?.access_token,
            user: result?.data?.currentUser
          }))
          sessionStorage.setItem("accessToken", JSON.stringify({
            access_token: result?.data?.access_token,
            user: result?.data?.currentUser
          }))

          dispatch(userLoggedIn({
            access_token: result?.data?.access_token,
            user: result?.data?.currentUser
          }))
        }catch(err){
          console.log(err)
        }
      }
    }),
    updateUser: builder.mutation({
      query: ({ email, currentUser }) => ({
        url: `/user/${email}`,
        method: "POST",
        body: currentUser,
      }),
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`
    }),
    getUserByEmail: builder.query({
      query: (email) => `/user/email/${email}`
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: body
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // We could potentially update the Redux auth state here 
          // if we add a userUpdated action, or just rely on refetching.
          // Since userAuthSlice might not have userUpdated, we just log or ignore.
        } catch(err) {
          console.log(err)
        }
      }
    }),
    allUsers: builder.query({
      query:() => `/user`
    }),
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/user/admin/${id}`,
        method: "PUT",
      })
    }),
    isAdmin: builder.query({
      query: (email) => `/user/admin/${email}`
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method:"DELETE"
      })
    })
  }),
});

export const {
  useSignupMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useUpdateUserProfileMutation,
  useMakeAdminMutation,
  useAllUsersQuery,
  useIsAdminQuery,
  useDeleteUserMutation,
} = userApi;
