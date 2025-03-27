// store/features/myAnnouncements/myAnnouncementResponces/myAnnouncementResponceApi.ts

import { api } from "@/store/api";
import { 
  AnnouncementResponsesResponse, 
  AnnouncementResponsesDirectResponse 
} from "@/types/response/myAnnouncementResponce";

export const myAnnouncementResponseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnnouncementResponses: build.query<AnnouncementResponsesResponse | AnnouncementResponsesDirectResponse, number>({
      query: (announcementId) => ({
        url: `response/all/${announcementId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnnouncementResponsesQuery } = myAnnouncementResponseApi;