// src/lib/api/authService.ts
import { post } from './apiService';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  email: string;
  password: string;
}

export interface VerificationCredentials {
  email: string;
  code: string;
}

export interface GoogleLoginCredentials {
  code: string;
}

export interface AuthResponse {
  accessToken: string;
  isSurveyCompleted: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Login function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/login', credentials);
  
  // Store token
  if (response.accessToken) {
    localStorage.setItem('token', response.accessToken);
  }
  
  return response;
};

// Register function
export const register = async (credentials: RegisterCredentials): Promise<string> => {
  return post<string>('/auth/signup', credentials);
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    await post('/auth/logout');
  } finally {
    // Always remove the token from localStorage
    localStorage.removeItem('token');
  }
};

// Forgot password function
export const forgotPassword = async (credentials: ForgotPasswordCredentials): Promise<string> => {
  return post<string>('/auth/forgot-password', credentials);
};

// Verify reset code function
export const verifyResetCode = async (credentials: VerificationCredentials): Promise<object> => {
  return post<object>('/auth/verify-code', credentials);
};

// Update password after verification
export const updatePassword = async (credentials: ResetPasswordCredentials): Promise<object> => {
  return post<object>('/auth/update-password', credentials);
};

// Verify email for registration
export const verifyEmail = async (credentials: VerificationCredentials): Promise<string> => {
  return post<string>('/auth/verify-email', credentials);
};

// Resend verification code
export const resendVerificationCode = async (email: string): Promise<string> => {
  return post<string>('/auth/resendCode', { email });
};

// Google login/register
export const googleAuth = async (credentials: GoogleLoginCredentials): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/google', credentials);
  
  // Store token
  if (response.accessToken) {
    localStorage.setItem('token', response.accessToken);
  }
  
  return response;
};

// Get current user function
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // This endpoint is an assumption - you'll need to check if your API
    // has a specific endpoint to get the current user's information
    const response = await post<{ user: User }>('/auth/me');
    return response.user;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};