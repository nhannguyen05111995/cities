import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: { value: 0 },
    reducers: {
        next: (state) => {
            state.value += 10
        },
        prev: (state) => {
            state.value -= 10
        },
    },
});

export const { next, prev } = pageSlice.actions;

export default pageSlice.reducer;