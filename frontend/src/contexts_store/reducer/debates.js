import { createSlice } from '@reduxjs/toolkit'

export const debateSlice = createSlice({
    name:'debates',
    initialState:{
        value: []
    },
    reducers: {
        assignDebates: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {assignDebates} = debateSlice.actions;
export const getDebates = (state)=>state.debates.value;
export default debateSlice.reducer;