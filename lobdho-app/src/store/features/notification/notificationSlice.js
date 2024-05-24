const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    value: {
        userInterection: false
    }
}
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotificationInterection: (state, action) => {
            (state.value.userInterection = action.payload)
        }
    }
});

export const { addNotificationInterection } = notificationSlice.actions;
export default notificationSlice.reducer
