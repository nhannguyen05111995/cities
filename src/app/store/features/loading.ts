import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: { value: boolean } = { value: false }
export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state: { value: boolean }, action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
    },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;