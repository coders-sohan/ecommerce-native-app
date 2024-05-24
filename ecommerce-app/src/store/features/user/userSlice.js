import apiSlice from "../../api/apiSlice";
const { createSlice } = require("@reduxjs/toolkit");

let initialState = {
    value: {
        token: '',
        user: {},
        frist: true,
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        addUserData: (state, action) => {
            const data = { frist: state.value.frist, token: action?.payload?.token, user: action?.payload?.user }
            return { value: data }
        },
        removeUserData: (state, action) => {
            const data = {
                frist: state.value.frist,
                user: {},
                token: ''
            }
            return { value: data }
        },
        fristUser: (state, action) => {
            const data = { ...state.value, frist: action.payload }
            return { value: data };
        }
        // addToke: (state, payload) => ({ ...state.value, token: payload })
    }
});
const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRegister: builder.mutation({
            query: (payload) => ({
                url: '/register',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            // query: payload => console.log(payload)
        }),
        loginUser: builder.mutation({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                }
            })
        }),
        uploadProfileImage: builder.mutation({
            query: (payload) => ({
                url: `/upload/single-image-upload`,
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'multipart/form-data'
                }

            })
        }),
        updateProfile: builder.mutation({
            query: (payload) => ({
                url: `/user/${payload?.id}`,
                method: 'PUT',
                body: JSON.stringify(payload?.data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        getUserHistory: builder.query({
            query: (id) => ({
                url: `/user/history/${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            })

        })
    })
})
// console.log(userApi.apiSlice.injectEndpoints.endpoints.builder.useUserRegisterMutation.)
export const {
    useUserRegisterMutation,
    useLoginUserMutation,
    useUploadProfileImageMutation,
    useUpdateProfileMutation,
    useGetUserHistoryQuery,
} = userApi;
// export const userValue = state => state.user.value;
export const { addUserData, removeUserData, fristUser } = userSlice.actions
export default userSlice.reducer;