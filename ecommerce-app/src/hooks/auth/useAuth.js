import { useSelector } from "react-redux";


export const useAuth = () => {
    const data = useSelector(state => state?.persist?.userReducer.value)
    return data;
}

