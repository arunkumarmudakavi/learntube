import {configureStore} from '@reduxjs/toolkit'
import userAuthSlice from "../features/userAuthSlice.js"
import channelAuthSlice from '../features/channelAuthSlice.js';

const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        channelAuth: channelAuthSlice,
    }
})

export default store;