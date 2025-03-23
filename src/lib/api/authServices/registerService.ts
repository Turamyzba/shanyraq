// src/lib/api/services/registerService.ts
import { post } from "../apiService";

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Register function
export const register = async (credentials: RegisterCredentials): Promise<string> => {
  return post<string>("/auth/signup", credentials);
};

// Verify email for registration
export const verifyEmail = async (credentials: VerificationCredentials): Promise<string> => {
  return post<string>("/auth/verify-email", credentials);
};

// Verification credentials interface (common for all verification services)
export interface VerificationCredentials {
  email: string;
  code: string;
}