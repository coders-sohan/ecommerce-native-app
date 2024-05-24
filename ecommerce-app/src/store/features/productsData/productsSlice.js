import productApiSlice from "../../api/productsApiSlice";

const productApi = productApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        topProducts: builder.query({
            query: () => '/products/top'
        }),
        allProducts: builder.query({
            query: () => '/products'
        }),
        searchProducts: builder.query({
            query: (data) => `/products?keyword=${data}`
        }),
        filterProducts: builder.query({
            query: (data) => `/products?${data}`
        }),
        popularProducts: builder.query({
            query: () => '/popular-products'
        }),
        recomandedProducts: builder.query({
            query: () => '/recommended-products'
        }),
        getcategories: builder.query({
            query: () => '/categories'
        }),
    })
});


export const {
    useTopProductsQuery,
    useAllProductsQuery,
    useSearchProductsQuery,
    useFilterProductsQuery,
    useGetcategoriesQuery,
    usePopularProductsQuery,
    useRecomandedProductsQuery,
} = productApi;