import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducer/user';
import debateReducer from './reducer/debates';
import argsReducer from './reducer/args';

const store = configureStore({
    reducer: {
        user: userReducer,
        debates: debateReducer,
        args: argsReducer
    }
})

export default store;