import checkoutApiSlice from "../../api/checkoutApiSlice";


const checkoutApi = checkoutApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        paymentMethod: builder.mutation({
            query: (payload) => ({
                url: '/init',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                }
            })
        }),
        newOrder: builder.mutation({
            query: (payload) => ({
                url: '/order/new',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                }
            })
        }),
        getOrders: builder.query({
            query: (id) => ({
                url: `/orders/me/${id}`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })
        }),
        getOrdersByStatus: builder.query({
            query: (data) => ({
                url: `/orders/me/${data?.id}?filterOrders=${data?.status}`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })
        }),
    })
})

export const {
    usePaymentMethodMutation,
    useGetOrdersQuery,
    useNewOrderMutation,
    useGetOrdersByStatusQuery,
} = checkoutApi;