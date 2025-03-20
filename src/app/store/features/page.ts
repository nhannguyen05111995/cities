import { createSlice } from '@reduxjs/toolkit';
const initialState: { value: number } = { value: 0 }
export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        next: (state: { value: number }) => {
            state.value += 10
        },
        prev: (state: { value: number }) => {
            state.value -= 10
        },
    },
});

export const { next, prev } = pageSlice.actions;

export default pageSlice.reducer;