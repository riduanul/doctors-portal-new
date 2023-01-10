import { createSlice } from "@reduxjs/toolkit"

const initialState={
    access_token: undefined,
    user:undefined
}

const userAuthSlice = createSlice({
    name: "userAuthSlice",
    initialState,
    reducers:{
        userLoggedIn:(state, action)=> {
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
        },
        userLoggedOut:(state)=> {
            state.access_token = undefined;
            state.user = undefined
        }
    }
})

export const {userLoggedIn, userLoggedOut} = userAuthSlice.actions;
export default userAuthSlice.reducer;