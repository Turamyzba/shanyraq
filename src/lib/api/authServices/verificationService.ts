// src/lib/api/services/verificationService.ts
import { post } from "../apiService";
import { VerificationCredentials } from "./registerService";

// Resend verification code
export const resendVerificationCode = async (email: string): Promise<string> => {
  return post<string>("/auth/resendCode", { email });
};

// Export verifyEmail for consistency
export { verifyEmail } from "./registerService";

// Export verifyResetCode for consistency
export { verifyResetCode } from "./passwordService";
