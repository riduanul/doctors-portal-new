import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import userReducer from "../features/services/userSlice";
import userAuthReducer from '../features/user/userAuthSlice'


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    auth: userAuthReducer,
  },
  // devTools: !process.env.NODE_ENV === 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
