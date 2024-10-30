import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myUser: {}
}

export const myUserSlice = createSlice({
    name: "myUser",
    initialState,
    reducers: {
        changeMyUser: (state, action) => {
            return {
                ...state,
                myUser: action.payload
            }
        }
    }
})

export const { changeMyUser } = myUserSlice.actions;
export default myUserSlice.reducer;