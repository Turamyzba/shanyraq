import { api } from "@/store/api";
import type { Response } from "@/types/response/response";
import type {
  ProfileResponse,
  ProfileWithFiltersResponse,
  PasswordChangeResponse,
  DeletePhotoResponse,
  UploadPhotoResponse
} from "@/types/response/profileResponses";
import type {
  EditProfileRequest,
  UpdatePasswordRequest,
  AddPasswordRequest,
  UploadPhotoRequest
} from "@/types/request/profileRequests";

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfileWithFilters: build.query<Response<ProfileWithFiltersResponse>, void>({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    editProfile: build.mutation<Response<ProfileResponse>, EditProfileRequest>({
      query: (body) => ({
        url: "profile/edit",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Profile"],
    }),

    updatePassword: build.mutation<Response<PasswordChangeResponse>, UpdatePasswordRequest>({
      query: (body) => ({
        url: "profile/update-password",
        method: "POST",
        body: body,
      }),
    }),

    addPassword: build.mutation<Response<PasswordChangeResponse>, AddPasswordRequest>({
      query: (body) => ({
        url: "profile/add-password",
        method: "POST",
        body: body,
      }),
    }),

    uploadPhoto: build.mutation<Response<UploadPhotoResponse>, UploadPhotoRequest>({
      query: (body) => ({
        url: "profile/upload-photo",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteProfilePhoto: build.mutation<Response<DeletePhotoResponse>, void>({
      query: () => ({
        url: "profile/delete-profile-photo",
        method: "PATCH",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProfileWithFiltersQuery,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useAddPasswordMutation,
  useUploadPhotoMutation,
  useDeleteProfilePhotoMutation,
} = profileApi;