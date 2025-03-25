import { createSlice } from '@reduxjs/toolkit';
const initialState: { value: number } = { value: 0 }
export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        goToNextPage: (state: { value: number }) => {
            state.value += 10
        },
        goToPrevPage: (state: { value: number }) => {
            state.value -= 10
        },
    },
});

export const { goToNextPage, goToPrevPage } = pageSlice.actions;

export default pageSlice.reducer;