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
import { AddressType } from "@/lib/api/filterService";

export const searchBarApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAddresses: build.query<Response<AddressType[]>, number>({
      query: (parentId) => ({
        url: `/address/get-children/${parentId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAddressesQuery, useLazyGetAddressesQuery } = searchBarApi;
