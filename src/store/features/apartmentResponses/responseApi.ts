// src/store/features/apartmentResponses/responseApi.ts
import { api } from "../../api";
import type { Response } from "../../../types/response/response";

export interface ApartmentResponseData {
  address: string;
  regionText: string;
  districtText: string;
  microDistrictText: string;
  quantityOfRooms: string;
  areaOfTheApartment: number;
  numberOfFloor: number;
  maxFloorInTheBuilding: number;
  deposit: number;
  title: string;
  cost: number;
  residentsDataResponse: {
    id: number;
    name: string;
    profilePhoto: string | null;
    residentType: string;
  }[];
  groups: {
    groupId: number;
    groupMembers: {
      id: number;
      name: string;
      age: number | null;
      phoneNumbers: string[];
      appliedDate: string | null;
      profilePhoto: string | null;
      permissionStatus: string;
      coverLetter: string | null;
      me: boolean | null;
    }[];
    newApplications: any[];
    newApplicationsWithPeople: {
      applicationBatchId: string;
      people: {
        id: number;
        name: string;
        age: number | null;
        phoneNumbers: string[];
        appliedDate: string;
        profilePhoto: string | null;
        coverLetter: string | null;
      }[];
    }[];
    capacityOfGroup: number;
    freeSlots: number;
    status: string;
  }[];
  newApplications: any[];
  newApplicationsWithPeople: any[];
}

export interface ApartmentResponseResponse {
  data: ApartmentResponseData;
  message: string;
  error: null | string;
  code: number;
}

export const responseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApartmentResponses: build.query<ApartmentResponseResponse, number>({
      query: (announcementId) => ({
        url: `/response/all/${announcementId}`,
        method: "GET",
      }),
    }),
    acceptApplication: build.mutation<Response<any>, { applicationId: number }>({
      query: ({ applicationId }) => ({
        url: `/response/accept/${applicationId}`,
        method: "POST",
      }),
    }),
    rejectApplication: build.mutation<Response<any>, { applicationId: number }>({
      query: ({ applicationId }) => ({
        url: `/response/reject/${applicationId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetApartmentResponsesQuery,
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
} = responseApi;
