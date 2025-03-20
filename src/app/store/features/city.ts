import { GeoDBAPI } from '@/configuration/Type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: { value: GeoDBAPI.City[] } = { value: [] }

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state: { value: GeoDBAPI.City[] }, action: PayloadAction<GeoDBAPI.City[]>) => {
            state.value = action.payload

        },
    },
});

export const { setCity } = citySlice.actions;

export default citySlice.reducer;