import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import userReducer from "./features/user/userSlice";
import searchBarReducer from "./features/searchBar/searchBar";
import { loginMiddleware } from "./features/auth/authMiddleware";
import { notificationMiddleware } from "./middleware/notificationMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    searchBar: searchBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(loginMiddleware.middleware)
      .concat(notificationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
