import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    channelData: null,
}

const channelAuthSlice = createSlice({
    name: "channelAuth",
    initialState,
    reducers: {
        channelLogin: (state, action) => {
            (state.status = true),
            (state.channelData = action.payload.channelData)
        },
        channelLogout: (state) => {
            (state.status = false),
            (state.channelData = action.channelData)
        }
    }
})

export const { channelLogin, channelLogout} = channelAuthSlice.actions;
export default channelAuthSlice.reducer;