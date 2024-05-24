const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: []
}
const cartItemSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            state?.value?.push({ ...action.payload, quantity: 1 })
        },
        removeCartItem: (state, action) => {
            (state.value = state.value?.filter(item => item._id !== action.payload))
        },
        manageCartItemQuantity: (state, action) => {
            (state.value[state.value.findIndex(item => item._id === action.payload._id)] = action.payload)
        },
    }
});
export const { addCartItem, removeCartItem, manageCartItemQuantity } = cartItemSlice.actions;
export default cartItemSlice.reducer;