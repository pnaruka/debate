import { useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { assignUser } from "../contexts_store/reducer/user";

export const useSignup = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const signup = async (user)=>{
        setIsLoading(true);
        setError(null);
        
        var response= await axios.post('http://localhost:5000/user/signup',user)
        .then((res)=>{
            setIsLoading(false);
            return res.data;
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data.message);
            //console.log(error);
        });
        //console.log(response);
        if(response)
        localStorage.setItem('user-auth',JSON.stringify(response));

        dispatch(assignUser(response));
        setIsLoading(false);
    }
    return {signup, isLoading, error};
};