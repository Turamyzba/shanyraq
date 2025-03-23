"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "../../../types/response/authResponses";
import { authApi } from "../auth/authApi";

interface UserState {
  user: UserProfile | null;
  accessToken: string | null;
  isSurveyCompleted: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  isSurveyCompleted: false,
  isAuthenticated: false,
};

// Only access localStorage on the client side
if (typeof window !== "undefined") {
  const storedToken = localStorage.getItem("accessToken");
  if (storedToken) {
    initialState.accessToken = storedToken;
    initialState.isAuthenticated = true;
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; isSurveyCompleted: boolean }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.isSurveyCompleted = action.payload.isSurveyCompleted;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isSurveyCompleted = false;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.accessToken = action.payload.data.accessToken;
      state.isAuthenticated = true;
    }),
  // .addMatcher(userApi.endpoints.currentUser.matchFulfilled, (state, action) => {
  //   state.currentUser = action.payload.result.user;
  //   state.isAuthenticated = true;
  // })
  // .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
  //   localStorage.setItem("token", action.payload.result.token);
  //   state.token = action.payload.result.token;
  //   state.isAuthenticated = true;
  // })
  // .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
  //   state.user = action.payload.result.user;
  // }),
});

export const { setCredentials, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
