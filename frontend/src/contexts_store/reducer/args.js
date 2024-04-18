import { createSlice } from '@reduxjs/toolkit'

export const argsSlice = createSlice({
    name:'args',
    initialState:{
        value: [],
        debate:{}
    },
    reducers: {
        assignArgs: (state, action) => {
            state.value = action.payload
        },
        assignDebateInfo: (state, action)=>{
            state.debate = action.payload
        }
    }
})

export const assignArgs = argsSlice.actions.assignArgs;
export const assignDebateInfo = argsSlice.actions.assignDebateInfo;
export const getArgs = (state)=>state.args.value;
export const getDebateInfo = (state)=>state.args.debate;
export default argsSlice.reducer;