import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    setUserLogOutState: (state) => {
      state.userName = null;
      state.email = null;
    },
  },
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions;



export default userSlice.reducer;
