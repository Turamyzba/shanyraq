// src/lib/api/authService.ts

// Re-export from loginService
export { 
  login, 
  logout, 
  getCurrentUser, 
  type User, 
  type LoginCredentials, 
  type AuthResponse
} from './authServices/loginService';

// Re-export from registerService
export { 
  register, 
  verifyEmail, 
  type RegisterCredentials, 
  type VerificationCredentials 
} from './authServices/registerService';

// Re-export from passwordService
export { 
  forgotPassword, 
  verifyResetCode, 
  updatePassword, 
  type ForgotPasswordCredentials, 
  type ResetPasswordCredentials 
} from './authServices/passwordService';

// Re-export from verificationService
export { 
  resendVerificationCode 
} from './authServices/verificationService';

// Re-export from oauthService
export { 
  googleAuth, 
  type GoogleLoginCredentials 
} from './authServices/oauthService';