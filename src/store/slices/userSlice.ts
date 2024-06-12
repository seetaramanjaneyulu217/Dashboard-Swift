import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../types";

interface InitialState {
    user: UserDetails
}

const initialState: InitialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        sendUserDetailsToStore: (state, action) => {
            state.user = action.payload.user
        }
    }
})

export default userSlice.reducer
export const { sendUserDetailsToStore } = userSlice.actions