// src/lib/api/services/loginService.ts
import { post } from "../apiService";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  isSurveyCompleted: boolean;
}

// Login function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await post<AuthResponse>("/auth/login", credentials);

  // Store token and survey status
  if (response.accessToken) {
    localStorage.setItem("token", response.accessToken);
  }
  
  if (response.isSurveyCompleted !== undefined) {
    localStorage.setItem("isSurveyCompleted", response.isSurveyCompleted.toString());
  }

  return response;
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    await post("/auth/logout");
  } finally {
    // Always remove items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("isSurveyCompleted");
  }
};

// Get current user function (common for all auth services)
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await post<{ user: User }>("/auth/me");
    return response.user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};

// User interface (common for all auth services)
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}