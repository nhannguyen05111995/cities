import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './features/city';
import queryReducer from './features/query';
import sortReducer from './features/sort';
import pageReducer from './features/paging';
import loadingReducer from './features/loading';
import focusCityReducer from './features/focusCity';

export const store = configureStore({
    reducer: {
        city: cityReducer,
        focusCity: focusCityReducer,
        query: queryReducer,
        sort: sortReducer,
        page: pageReducer,
        loading: loadingReducer
    },
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

