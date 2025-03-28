"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "../../../types/response/authResponses";
import { authApi } from "../auth/authApi";
import { setCookie, destroyCookie, parseCookies } from "nookies";

interface UserState {
  user: UserProfile | null;
  accessToken: string | null;
  isSurveyCompleted: boolean;
  isAuthenticated: boolean;
}

// Initialize state from cookies if available (works for both client and SSR)
const getInitialState = (): UserState => {
  let accessToken = null;
  let isAuthenticated = false;

  // Only run this client-side
  if (typeof window !== "undefined") {
    const cookies = parseCookies();
    accessToken = cookies.accessToken || null;
    isAuthenticated = !!accessToken;
  }

  return {
    user: null,
    accessToken,
    isSurveyCompleted: false,
    isAuthenticated,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; isSurveyCompleted: boolean }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.isSurveyCompleted = action.payload.isSurveyCompleted;
      state.isAuthenticated = true;

      // Store token in cookies (works better with SSR than localStorage)
      setCookie(null, "accessToken", action.payload.accessToken, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isSurveyCompleted = false;
      state.isAuthenticated = false;

      // Remove cookies
      destroyCookie(null, "accessToken", { path: "/" });
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      if (action.payload.data) {
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
      }
    }),
});

export const { setCredentials, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
