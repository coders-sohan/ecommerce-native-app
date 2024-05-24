import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config";

const wishlishtApiSlice = createApi({
    reducerPath: 'wishlishtApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    endpoints: () => ({}),
})


export default wishlishtApiSlice;