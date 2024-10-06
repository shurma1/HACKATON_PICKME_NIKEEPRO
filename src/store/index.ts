import {combineReducers, configureStore} from "@reduxjs/toolkit";

import reliabilityReducer from './reducers/ReliabilitySlice';

import {api} from "@/services/ApiService";

const rootReducer = combineReducers({
	reliabilityReducer,
	[api.reducerPath]: api.reducer
})

const setupStore = () => {
    return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']