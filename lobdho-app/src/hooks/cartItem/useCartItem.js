import { useSelector } from "react-redux"

export const useCartItem = () => {
    const data = useSelector(state => state?.persist?.cartReducer?.value)
    return data;
}

export const UseBadgeNumber = () => {
    const data = useCartItem();
    return data?.length;
}

export const useCheckCartItem = () => {

    const data = useCartItem();
    const checkItem = (id) => {
        const find = data.find(item => (item._id == id))
        if (find) {
            return true
        } else {
            return false
        }
    }

    return checkItem
}