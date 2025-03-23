// src/lib/api/services/passwordService.ts
import { post } from "../apiService";
import { VerificationCredentials } from "./registerService";

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  email: string;
  password: string;
}

// Forgot password function
export const forgotPassword = async (credentials: ForgotPasswordCredentials): Promise<string> => {
  return post<string>("/auth/forgot-password", credentials);
};

// Verify reset code function
export const verifyResetCode = async (credentials: VerificationCredentials): Promise<object> => {
  return post<object>("/auth/verify-code", credentials);
};

// Update password after verification
export const updatePassword = async (credentials: ResetPasswordCredentials): Promise<object> => {
  return post<object>("/auth/update-password", credentials);
};