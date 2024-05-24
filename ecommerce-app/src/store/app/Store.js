import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,

} from 'redux-persist';

import apiSlice from '../api/apiSlice';
import userReducer from '../features/user/userSlice'
import productApiSlice from '../api/productsApiSlice';
import cartReducer from '../features/cartData/cartItemSlice';
import notificationReducer from '../features/notification/notificationSlice'
import wishLishtReducer from '../features/wishlishtData/wishlishtDataSlice';
import wishlishtApiSlice from '../api/wishlishtApiSlice';
import publicAddressApi from '../api/publicAddressapi';
import checkoutApiSlice from '../api/checkoutApiSlice';

//persistant configuration
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,

};
//persistnat reducrs
const rootPersistReducer = combineReducers({
    userReducer,
    cartReducer,

})
export const store = configureStore({
    reducer: {
        persist: persistReducer(persistConfig, rootPersistReducer),
        [apiSlice.reducerPath]: apiSlice.reducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer,
        [wishlishtApiSlice.reducerPath]: wishlishtApiSlice.reducer,
        [publicAddressApi.reducerPath]: publicAddressApi.reducer,
        [checkoutApiSlice.reducerPath]: checkoutApiSlice.reducer,
        notificationReducer,
        wishLishtReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([apiSlice.middleware, productApiSlice.middleware, wishlishtApiSlice.middleware, publicAddressApi.middleware, checkoutApiSlice.middleware]),

});

export const persistor = persistStore(store);

setupListeners(store.dispatch);


