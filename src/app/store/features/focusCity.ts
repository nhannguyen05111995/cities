import { GeoDBAPI } from '@/configuration/Type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: { value: GeoDBAPI.City | null } = { value: null }

export const focusCitySlice = createSlice({
    name: 'focusCity',
    initialState,
    reducers: {
        setFocusCity: (state: { value: GeoDBAPI.City | null }, action: PayloadAction<GeoDBAPI.City | null>) => {
            state.value = action.payload

        },
    },
});

export const { setFocusCity } = focusCitySlice.actions;

export default focusCitySlice.reducer;