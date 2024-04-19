import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { assignArgs } from "../contexts_store/reducer/args";


export const useFetchArgs = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const fetchArgs = async (debateId) => {
        setIsLoading(true);
        setError(null);
        const args = await axios.get(`http://localhost:5000/args/show?debateId=${debateId}`)
            .then((res) => {
                setIsLoading(false);
                //console.log(res.data);
                const arrArgs = {
                    favour: [],
                    against: []
                }
                res.data.forEach((arg) => {
                    if (arg.argType === "AGAINST")
                        arrArgs.against.push(arg)
                    else
                        arrArgs.favour.push(arg);
                });
                return arrArgs;
                //dispatch(assignArgs(arrArgs));
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.response.data);
            });

            const debate = await axios.get(`http://localhost:5000/debate/showThis?debateId=${debateId}`)
            .then((res) => {
                setIsLoading(false);
                //console.log(res.data);
                //dispatch(assignDebateInfo(res.data));
                return res.data;
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.response.data);
            });

        dispatch(assignArgs({args, debate}));
        setIsLoading(false);
    }
    return { fetchArgs, isLoading, error };
};