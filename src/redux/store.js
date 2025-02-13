import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer, { rootPersistConfig } from './rootReducer';
import { UserApi } from './api/User.Api';
import { FeedbackApi } from './api/Feedback.Api';
import { ordersApi } from "./api/Order.Api";
// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware,FeedbackApi.middleware,ordersApi.middleware),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
