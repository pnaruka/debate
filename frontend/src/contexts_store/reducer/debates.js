import { createSlice } from '@reduxjs/toolkit'

export const debateSlice = createSlice({
    name:'debates',
    initialState:{
        value: []
    },
    reducers: {
        assignDebates: (state, action) => {
            state.value = action.payload;
        },
        appendDebate: (state, action) => {
            state.value = [...state.value, action.payload];
        }
    }
})

export const {assignDebates, appendDebate} = debateSlice.actions;
export const getCurrDebate = (state)=>state.debates.selectedDebate;
export const getDebates = (state)=>state.debates.value;
export default debateSlice.reducer;