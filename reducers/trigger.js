import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
};

export const triggerSlice = createSlice({
    name: 'trigger',
    initialState,
    reducers: {
        inverse: (state, action) => {
            state.value = !action.payload;
        },
    },
});

export const { inverse } = triggerSlice.actions;
export default triggerSlice.reducer