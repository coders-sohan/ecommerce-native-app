import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config";

const checkoutApiSlice = createApi({
    reducerPath: 'checkoutApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    endpoints: () => ({}),
});

export default checkoutApiSlice;