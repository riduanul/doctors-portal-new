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
  }),
});

export const {
  useSignupMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} = userApi;
