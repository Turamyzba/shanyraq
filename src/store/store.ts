"use client";

import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import userReducer from "./features/user/userSlice";
import filterReducer from "./features/filter/filterSlice";
import searchBarReducer from "./features/searchBar/searchBar";
import { loginMiddleware } from "./features/auth/authMiddleware";
import { notificationMiddleware } from "./middleware/notificationMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Безопасное создание store
const createSafeStore = () => {
  try {
    return configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        user: userReducer,
        searchBar: searchBarReducer,
        filter: filterReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(api.middleware)
          .concat(loginMiddleware.middleware)
          .concat(notificationMiddleware),
    });
  } catch (e) {
    console.error("Error creating store:", e);
    return configureStore({
      reducer: {},
    });
  }
};

export const store = createSafeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
