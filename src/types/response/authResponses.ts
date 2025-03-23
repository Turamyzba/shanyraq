export interface LoginResponse {
  accessToken: string;
  isSurveyCompleted: boolean;
}

export interface RegisterResponse {
  message: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface ResendCodeResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface VerifyCodeResponse {
  status: string;
  message: string;
}

export interface UpdatePasswordResponse {
  status: string;
  message: string;
}

export interface GoogleAuthResponse {
  accessToken: string;
  isSurveyCompleted: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: string;
  phoneNumber?: string;
  gender?: string;
  profilePhoto?: string;
  isPasswordHas?: boolean;
}
