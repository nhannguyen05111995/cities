import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: { value: string } = { value: "" }
export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQuery: (state: { value: string }, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
});

export const { setQuery } = querySlice.actions;

export default querySlice.reducer;