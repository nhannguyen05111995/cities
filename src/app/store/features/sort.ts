import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: { value: string } = { value: "" }

export const sortReducer = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setValue: (state: { value: string }, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
});

export const { setValue } = sortReducer.actions;

export default sortReducer.reducer;