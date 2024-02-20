import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import UserReducer from "./userReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, UserReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

export const store = configureStore({
  reducer: {
    Elite: persistedReducer,
  },
  middleware,
});

export const persistor = persistStore(store);
