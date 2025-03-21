import { createSlice } from '@reduxjs/toolkit';
const initialState: { value: number } = { value: 0 }
export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        goToNextPage22: (state: { value: number }) => {
            state.value += 10
        },
        goToPrevPage22: (state: { value: number }) => {
            state.value -= 10
        },
    },
});

export const { goToNextPage22, goToPrevPage22 } = pageSlice.actions;

export default pageSlice.reducer;