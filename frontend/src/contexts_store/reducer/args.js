import { createSlice } from '@reduxjs/toolkit'

export const argsSlice = createSlice({
    name:'args',
    initialState:{
        value: [],
        debate:{}
    },
    reducers: {
        assignArgs: (state, action) => {
            state.value = action.payload.args;
            state.debate = action.payload.debate;
            //console.log(state);
        },
        assignDebateInfo: (state, action)=>{
            state.debate = action.payload
        },
        appendArg: (state, action)=>{
            if(action.payload.argType === 'AGAINST'){
            state.value = {
                favour: state.value.favour,
                against: [...state.value.against, action.payload]
            }
        }
        else{
            state.value = {
                favour: [...state.value.favour, action.payload],
                against: state.value.against
            }
        }
        }
    }
})

export const {assignArgs, assignDebateInfo, appendArg} = argsSlice.actions;
export const getArgs = (state)=>state.args.value;
export const getDebateInfo = (state)=>state.args.debate;
export default argsSlice.reducer;