// src/hooks/useAuth.ts
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  register, 
  forgotPassword, 
  verifyResetCode, 
  updatePassword, 
  verifyEmail, 
  resendVerificationCode,
  googleAuth
} from "@/lib/api/authService";
import type { 
  RegisterCredentials, 
  ForgotPasswordCredentials, 
  ResetPasswordCredentials, 
  VerificationCredentials,
  GoogleLoginCredentials
} from "@/lib/api/authService";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        setError(result.error);
        return false;
      }
      
      // Redirect to the profile page upon successful login
      router.push("/profile");
      return true;
    } catch (err) {
      setError("An unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const signup = async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await register(credentials);
      // Redirect to verification page
      router.push("/verification?email=" + encodeURIComponent(credentials.email));
      return true;
    } catch (err: any) {
      setError(err.response?.data || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  // Forgot Password function
  const handleForgotPassword = async (credentials: ForgotPasswordCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await forgotPassword(credentials);
      return true;
    } catch (err: any) {
      setError(err.response?.data || "Failed to send reset link");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verify Reset Code function
  const verifyCode = async (credentials: VerificationCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await verifyResetCode(credentials);
      return true;
    } catch (err: any) {
      setError(err.response?.data || "Invalid verification code");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reset Password function
  const handleResetPassword = async (credentials: ResetPasswordCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await updatePassword(credentials);
      router.push("/login");
      return true;
    } catch (err: any) {
      setError(err.response?.data || "Failed to reset password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verify Email function
  const verifyEmailAddress = async (credentials: VerificationCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await verifyEmail(credentials);
      router.push("/login");
      return true;
    } catch (err: any) {
      setError(err.response?.data || "Email verification failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Resend Verification code function
  const resendCode = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await resendVerificationCode(email);
      return true;
    } catch (err: any) {
      setError(err.response?.data || "Failed to resend code");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Google Authentication
  const handleGoogleAuth = async (code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await googleAuth({ code });
      router.push("/profile");
      return true;
    } catch (err: any) {
      setError(err.response?.data || "Google authentication failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user: session?.user,
    isAuthenticated,
    isLoading,
    loading,
    error,
    login,
    signup,
    logout,
    handleForgotPassword,
    verifyCode,
    handleResetPassword,
    verifyEmailAddress,
    resendCode,
    handleGoogleAuth,
  };
};