import { useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { appendDebate } from "../contexts_store/reducer/debates";


export const useCreateDebate = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const createDebate = async (user, title)=>{
        setIsLoading(true);
        setError(null);
        const headers = { 'Authorization': `Bearer ${user.token}` };
        await axios.post('http://localhost:5000/debate/create',{debateName: title}, {
            headers: headers
          })
        .then((res)=>{
            setIsLoading(false);
            //console.log(res.data);
            dispatch(appendDebate(res.data));
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data.message);
        });

        setIsLoading(false);
    }
    
    return {createDebate, isLoading, error};
};