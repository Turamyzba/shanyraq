// services/myAnnouncementApi.ts

import { api } from "@/store/api";
import { MyAnnouncementsListResponse } from "@/types/response/myAnnouncementResponses";
import type { Response } from "@/types/response/response";

export const myAnnouncementApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyActiveAnnouncements: build.query<Response<MyAnnouncementsListResponse>, void>({
      query: () => ({
        url: "announcement/my-active-announcements",
        method: "GET",
      }),
    }),

    getMyArchivedAnnouncements: build.query<Response<MyAnnouncementsListResponse>, void>({
      query: () => ({
        url: "announcement/my-archive-announcements",
        method: "GET",
      }),
    }),

    archiveAnnouncement: build.mutation<Response<MyAnnouncementsListResponse>, number>({
      query: (id) => ({
        url: `announcement/archive-announcement/${id}`,
        method: "POST",
      }),
    }),

    restoreAnnouncement: build.mutation<Response<MyAnnouncementsListResponse>, number>({
      query: (id) => ({
        url: `announcement/restore-announcement/${id}`,
        method: "POST",
      }),
    }),

    deleteAnnouncement: build.mutation<Response<MyAnnouncementsListResponse>, number>({
        query: (id) => ({
            url: `announcement/delete-announcement/${id}`,
            method: "DELETE",
        }),
    }),
  
  }),
});

export const {
  useGetMyActiveAnnouncementsQuery,
  useGetMyArchivedAnnouncementsQuery,
  useArchiveAnnouncementMutation,
  useRestoreAnnouncementMutation,
  useDeleteAnnouncementMutation
} = myAnnouncementApi;