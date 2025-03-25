import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: { value: Record<string, string> } = { value: {} }
export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQuery: (state: { value: Record<string, string> }, action: PayloadAction<Record<string, string>>) => {
            state.value = action.payload
        },
    },
});

export const { setQuery } = querySlice.actions;

export default querySlice.reducer;