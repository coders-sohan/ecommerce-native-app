import { useSelector } from "react-redux"

export const useUserInterection = () => {
    data = useSelector(state => state.notificationReducer?.value?.userInterection)
    return data
}