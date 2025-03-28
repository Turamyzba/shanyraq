import { api } from "@/store/api";
import type {
  SurveyAnswer,
  SurveyQuestion,
  SurveySubmitFromLinkRequest,
  SurveyAnswerResponse,
  AccountDataForLinkResponse,
  LoginDTO,
} from "@/types/request/surwayRequests";
import type { Response } from "../../../types/response/response";

export const landingApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Submit survey answers
    submitSurvey: build.mutation<Response<boolean>, SurveyAnswer[]>({
      query: (body) => ({
        url: "/survey/submit",
        method: "POST",
        body,
      }),
    }),

    // Submit survey from link
    submitSurveyFromLink: build.mutation<void, SurveySubmitFromLinkRequest>({
      query: (body) => ({
        url: "/survey/submit-from-link",
        method: "POST",
        body,
      }),
    }),

    // Get all survey questions
    getSurveyQuestions: build.query<Response<SurveyQuestion[]>, void>({
      query: () => "/survey/questions",
    }),

    // Get survey answers of residents
    getSurveyAnswersOfResidents: build.query<
      SurveyAnswerResponse,
      { announcementId: number; residentId: number }
    >({
      query: ({ announcementId, residentId }) =>
        `/survey/get-survey-answers-of-residents/${announcementId}/${residentId}`,
    }),

    // Get survey answers of group members
    getSurveyAnswersOfGroupMembers: build.query<Response<SurveyAnswerResponse>, number>({
      query: (groupMemberId) => `/survey/get-survey-answers-of-group-members/${groupMemberId}`,
    }),

    // Get survey answers of applications
    getSurveyAnswersOfApplications: build.query<Response<SurveyAnswerResponse>, number>({
      query: (applicationId) => `/survey/get-survey-answers-of-applications/${applicationId}`,
    }),

    // Get names for link
    getNamesForLink: build.query<Response<string[]>, string>({
      query: (token) => `/survey/get-names-for-link/${token}`,
    }),

    // Get account data for link
    getAccountDataForLink: build.query<Response<AccountDataForLinkResponse>, LoginDTO>({
      query: (loginDTO) => ({
        url: "/survey/get-account-data-for-link",
        method: "GET",
        params: loginDTO,
      }),
    }),

    // Check email existence
    checkEmail: build.query<Response<boolean>, string>({
      query: (email) => `/survey/check-email/${email}`,
    }),
  }),
});

export const {
  useSubmitSurveyMutation,
  useSubmitSurveyFromLinkMutation,
  useLazyGetSurveyQuestionsQuery,
  useGetSurveyAnswersOfResidentsQuery,
  useGetSurveyAnswersOfGroupMembersQuery,
  useGetSurveyAnswersOfApplicationsQuery,
  useLazyGetNamesForLinkQuery,
  useGetAccountDataForLinkQuery,
  useCheckEmailQuery,
} = landingApi;
