import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserNotifications: builder.query({
            query: (email) => `/notification/${email}`,
            providesTags: ['Notifications']
        }),
        markNotificationAsRead: builder.mutation({
            query: (id) => ({
                url: `/notification/${id}/read`,
                method: "PATCH"
            }),
            invalidatesTags: ['Notifications']
        }),
        createNotification: builder.mutation({
            query: (data) => ({
                url: `/notification`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Notifications']
        })
    })
});

export const {
    useGetUserNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useCreateNotificationMutation
} = notificationApi;
