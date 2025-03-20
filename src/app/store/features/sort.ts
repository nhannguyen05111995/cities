import { createSlice } from '@reduxjs/toolkit';

export const sortReducer = createSlice({
    name: 'sort',
    initialState: { value: "" },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setValue } = sortReducer.actions;

export default sortReducer.reducer;