import { useAuth } from "../../../hooks/auth/useAuth"
import wishlishtApiSlice from "../../api/wishlishtApiSlice"

const { createSlice } = require("@reduxjs/toolkit")
const { createApi } = require("@reduxjs/toolkit/dist/query")


const initialState = {
    value: {
        item: []
    }
}

const wishtLishtSlice = createSlice({
    name: 'wishlisht',
    initialState,
    reducers: {
        addWishlistItem: (state, action) => {
            (state?.value?.item?.push(action.payload))
        },
        addWishlistItemAll: (state, action) => {
            (state.value.item = action.payload)
        }
    }
})

const wishLishtApi = wishlishtApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addWishlishtData: builder.mutation({
            query: (payload) => ({
                url: '/wishlist',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            // query: payload => console.log(payload)
        }),
        getWishlishtItem: builder.query({
            query: (id) => (`/wishlist/${id}`)
        }),
        deleteWishlishtItem: builder.mutation({
            query: (payload) => ({
                url: `/wishlist/${payload.userId}/${payload.ItemId}`,
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }

            })
        })
    })
})
export const { useAddWishlishtDataMutation, useGetWishlishtItemQuery, useDeleteWishlishtItemMutation, useLazyGetWishlishtItemQuery } = wishLishtApi;

export const { addWishlistItem, addWishlistItemAll } = wishtLishtSlice.actions
export default wishtLishtSlice.reducer;