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
          localStorage.setItem("accessToken", JSON.stringify({
            accesToken: result?.data?.access_token,
            user:result?.data?.currentUser
          }))

          dispatch(userLoggedIn({
            access_token: result?.data?.access_token,
            user:result?.data?.currentUser
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
          localStorage.setItem("accessToken", JSON.stringify({
            token: result?.data?.access_token,
            user:result?.data?.user
          }))
          sessionStorage.setItem("accessToken", JSON.stringify({
            token: result?.data?.access_token,
            user:result?.data?.user
          }))
          

          dispatch(userLoggedIn({
            access_token: result?.data?.access_token,
            user:result?.data?.currentUser
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
  useMakeAdminMutation,
  useAllUsersQuery,
  useIsAdminQuery,
  useDeleteUserMutation,
} = userApi;
