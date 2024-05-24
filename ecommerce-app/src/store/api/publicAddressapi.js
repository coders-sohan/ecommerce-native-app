
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config";

const publicAddressApi = createApi({
    reducerPath: 'publicAddressApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bdapi.p.rapidapi.com/v1.1' }),
    endpoints: () => ({}),
});

export default publicAddressApi;