

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storage from 'redux-persist/lib/storage'
import jobSlice from "./jobSlice"
import companySlice from "./companySlice"
import applicationSlice from "./applicationSlice"

import {
    // eslint-disable-next-line no-unused-vars
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
 


const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// export const persist = persistStore(store);
export default store;