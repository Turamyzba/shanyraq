// src/lib/api/services/oauthService.ts
import { post } from "../apiService";
import { AuthResponse } from "./loginService";

export interface GoogleLoginCredentials {
  code: string;
}

// Google login/register
export const googleAuth = async (credentials: GoogleLoginCredentials): Promise<AuthResponse> => {
  const response = await post<AuthResponse>("/auth/google", credentials);

  // Store token and survey status
  if (response.accessToken) {
    localStorage.setItem("token", response.accessToken);
  }
  
  if (response.isSurveyCompleted !== undefined) {
    localStorage.setItem("isSurveyCompleted", response.isSurveyCompleted.toString());
  }

  return response;
};