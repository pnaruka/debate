import { useState} from "react";
import axios from 'axios';
import { socketConnect } from "../utils/socketUtil";


export const useCreateArg = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const createArg = async (user, content, argType, debate)=>{
        setIsLoading(true);
        setError(null);
        const headers = { 'Authorization': `Bearer ${user.token}` };
        await axios.post('http://localhost:5000/args/create',{content, argType, debate}, {
            headers: headers
          })
        .then((res)=>{
            setIsLoading(false);
            //console.log(res.data);
            socketConnect().emit('newArgPost',res.data);
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data.message);
        });

        setIsLoading(false);
    }
    
    return {createArg, isLoading, error};
};