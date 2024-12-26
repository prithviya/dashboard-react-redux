import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';

// Create the Redux store
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, // Add the API slice reducer
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
export default store;
