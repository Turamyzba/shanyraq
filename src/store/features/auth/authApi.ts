import type {
  LoginResponse,
  VerifyEmailResponse,
  RegisterResponse,
  ResendCodeResponse,
  ForgotPasswordResponse,
  VerifyCodeResponse,
  UpdatePasswordResponse,
  GoogleAuthResponse,
  UserProfile,
} from "../../../types/response/authResponses";

import type {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  ResendCodeRequest,
  ForgotPasswordRequest,
  VerifyCodeRequest,
  UpdatePasswordRequest,
  GoogleAuthRequest,
} from "../../../types/request/authRequests";

import { api } from "../../api";
import type { Response } from "../../../types/response/response";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Response<LoginResponse>, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body: body,
      }),
    }),

    register: build.mutation<Response<RegisterResponse>, RegisterRequest>({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body: body,
      }),
    }),

    verifyEmail: build.mutation<Response<VerifyEmailResponse>, VerifyEmailRequest>({
      query: (body) => ({
        url: "auth/verify-email",
        method: "POST",
        body: body,
      }),
    }),

    resendCode: build.mutation<Response<ResendCodeResponse>, ResendCodeRequest>({
      query: (body) => ({
        url: "auth/resendCode",
        method: "POST",
        body: body,
      }),
    }),

    forgotPassword: build.mutation<Response<ForgotPasswordResponse>, ForgotPasswordRequest>({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: body,
      }),
    }),

    verifyCode: build.mutation<Response<VerifyCodeResponse>, VerifyCodeRequest>({
      query: (body) => ({
        url: "auth/verify-code",
        method: "POST",
        body: body,
      }),
    }),

    updatePassword: build.mutation<Response<UpdatePasswordResponse>, UpdatePasswordRequest>({
      query: (body) => ({
        url: "auth/update-password",
        method: "POST",
        body: body,
      }),
    }),

    googleAuth: build.mutation<Response<GoogleAuthResponse>, GoogleAuthRequest>({
      query: (body) => ({
        url: "auth/google",
        method: "POST",
        body: body,
      }),
    }),

    logout: build.mutation<Response<void>, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    getProfile: build.query<Response<UserProfile>, void>({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendCodeMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useUpdatePasswordMutation,
  useGoogleAuthMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
