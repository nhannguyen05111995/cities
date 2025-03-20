import { createSlice } from '@reduxjs/toolkit';

export const focusCitySlice = createSlice({
    name: 'focusCity',
    initialState: { value: {} },
    reducers: {
        setFocusCity: (state, action) => {
            state.value = action.payload

        },
    },
});

export const { setFocusCity } = focusCitySlice.actions;

export default focusCitySlice.reducer;