import { defaulSortCondition } from '@/configuration/Constant';
import { SortCondition } from '@/configuration/Type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: { value: SortCondition } = { value: defaulSortCondition }

export const sortReducer = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortValue: (state: { value: SortCondition }, action: PayloadAction<SortCondition>) => {
            state.value = action.payload
        },
    },
});

export const { setSortValue } = sortReducer.actions;

export default sortReducer.reducer;