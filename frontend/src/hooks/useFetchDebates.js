import { useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { assignDebates } from "../contexts_store/reducer/debates";


export const useFetchDebates = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const fetchDebates = async ()=>{
        setIsLoading(true);
        setError(null);
        await axios.get('http://localhost:5000/debate/show')
        .then((res)=>{
            setIsLoading(false);
            dispatch(assignDebates(res.data));
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data);
        });

        setIsLoading(false);
    }
    return {fetchDebates, isLoading, error};
};