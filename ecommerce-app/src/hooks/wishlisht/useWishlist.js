import { useSelector } from "react-redux";



const useWishLisht = () => {
    const data = useSelector(state => (state.wishLishtReducer.value.item))
    return data
}



export default useWishLisht;