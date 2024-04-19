import { useDispatch } from "react-redux";
import { assignUser } from "../contexts_store/reducer/user";

export const useLogout = () =>{
    const dispatch = useDispatch();

    const logout = () =>{
        localStorage.removeItem('user-auth');
        dispatch(assignUser(null));
    }

    return {logout};
}