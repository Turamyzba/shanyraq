// import { configureStore } from "@reduxjs/toolkit"
// import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
// import authReducer from "./slices/authSlice"

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     // Add other reducers here as needed
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// // Re-export from store.ts for backward compatibility
// export * from "./store"
