import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { setCredentials, setUser } from "../user/userSlice";

export const loginMiddleware = createListenerMiddleware();

// Listen for successful login, register, or Google auth
loginMiddleware.startListening({
  matcher: isAnyOf(
    authApi.endpoints.login.matchFulfilled,
    authApi.endpoints.googleAuth.matchFulfilled
  ),
  effect: async (action, { dispatch }) => {
    if (action.payload.data) {
      // Set credentials in the user slice
      dispatch(
        setCredentials({
          accessToken: action.payload.data.accessToken,
          isSurveyCompleted: action.payload.data.isSurveyCompleted || false,
        })
      );

      // Fetch user profile after successful login
      dispatch(authApi.endpoints.getProfile.initiate());
    }
  },
});

// Listen for successful profile fetch
loginMiddleware.startListening({
  matcher: authApi.endpoints.getProfile.matchFulfilled,
  effect: async (action, { dispatch }) => {
    if (action.payload.data) {
      dispatch(setUser(action.payload.data));
    }
  },
});

// Listen for logout to clear any stored state
loginMiddleware.startListening({
  matcher: authApi.endpoints.logout.matchFulfilled,
  effect: async (action, { dispatch }) => {
    // No additional action needed as the logout reducer in userSlice
    // already handles cleaning up the state and cookies
  },
});
