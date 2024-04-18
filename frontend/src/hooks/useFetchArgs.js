import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { assignArgs, assignDebateInfo } from "../contexts_store/reducer/args";


export const useFetchArgs = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const fetchArgs = async (db) => {
        setIsLoading(true);
        setError(null);
        await axios.get(`http://localhost:5000/args/show?debateId=${db._id}`)
            .then((res) => {
                setIsLoading(false);
                const arrArgs = {
                    favour: [],
                    against: []
                }
                res.data.map((arg) => {
                    if (arg.argType === "AGAINST")
                        arrArgs.against.push(arg)
                    else
                        arrArgs.favour.push(arg);
                })
                dispatch(assignArgs(arrArgs));
                dispatch(assignDebateInfo(db));
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.response.data);
            });

        setIsLoading(false);
    }
    return { fetchArgs, isLoading, error };
};