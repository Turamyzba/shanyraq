import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import { logout, setCredentials } from "./features/user/userSlice";
import type { LoginResponse } from "../types/response/authResponses";
import type { Response } from "../types/response/response";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   let result = await baseQueryWithRetry(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     // Try to get a new token
//     try {
//       const refreshResult = await baseQuery(
//         {
//           url: "auth/refresh",
//           method: "POST",
//         },
//         api,
//         extraOptions
//       );

//       const refreshData = refreshResult.data as Response<LoginResponse>;

//       if (refreshData && refreshData.data?.accessToken) {
//         // Store the new token
//         api.dispatch(
//           setCredentials({
//             accessToken: refreshData.data.accessToken,
//             isSurveyCompleted: refreshData.data.isSurveyCompleted,
//           })
//         );

//         // Retry the original query with new access token
//         result = await baseQueryWithRetry(args, api, extraOptions);
//       } else {
//         api.dispatch(logout());
//       }
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Profile"],
});
