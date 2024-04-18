import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user',
    initialState:{
        value: null
    },
    reducers: {
        assignUser: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {assignUser} = userSlice.actions;
export const getUser = (state)=>state.user.value;
export default userSlice.reducer;