import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config";

const apiSlice = createApi({
    reducerPath: 'apliSlice',
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    endpoints: () => ({}),
});

export default apiSlice;