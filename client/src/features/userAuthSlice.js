import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        userLogout: (state) => {
            state.status = false;
            state.userData = action.userData;
        }
    }
})

export const { userLogin, userLogout} = userAuthSlice.actions;
export default userAuthSlice.reducer