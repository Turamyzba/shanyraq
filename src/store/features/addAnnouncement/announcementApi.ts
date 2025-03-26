// services/api/endpoints/announcementApi.ts

import { api } from "../../api";
import type { Response } from "../../../types/response/response";
import { AnnouncementRequest } from "@/types/request/announcementRequests";
import { FinalStepResponse } from "@/types/response/announcementResponses";

export const mapFormToApiRequest = (formData: any, step: number = 1): AnnouncementRequest => {
  const baseRequest: AnnouncementRequest = {
    role: formData.role
  };

  if (step === 2) {
    Object.assign(baseRequest, {
        title: formData.title,
        selectedGender: formData.gender,
        doYouLiveInThisHouse: formData.livingInHome,
        consideringOnlyNPeople: false, // Fixed value based on your form design
        howManyPeopleLiveInThisApartment: formData.peopleInApartment?.toString(),
        numberOfPeopleAreYouAccommodating: formData.roommates,
        minAge: formData.ageRange?.[0],
        maxAge: formData.ageRange?.[1],
    });
  }
  if (step === 3) {
    Object.assign(baseRequest, {
        region: formData.region,
        district: formData.district,
        microDistrict: formData.microDistrict,
        address: formData.address,
        arriveDate: formData.moveInDate,
        cost: Number(formData.monthlyPayment),
        quantityOfRooms: formData.rooms,
        isDepositRequired: formData.deposit,
        deposit: formData.deposit ? formData.depositAmount : undefined,
    });
  }

  if (step === 4) {
    Object.assign(baseRequest, {
      arePetsAllowed: formData.apartmentDetails?.petsAllowed,
      isCommunalServiceIncluded: formData.apartmentDetails?.utilitiesIncluded,
      minAmountOfCommunalService: formData.apartmentDetails?.utilitiesAmount?.[0],
      maxAmountOfCommunalService: formData.apartmentDetails?.utilitiesAmount?.[1],
      intendedForStudents: formData.apartmentDetails?.forStudents,
      areBadHabitsAllowed: formData.apartmentDetails?.badHabitsAllowed,
      apartmentsInfo: formData.apartmentDetails?.description,
      images: formData.apartmentDetails?.photos,
    });
  }

  if (step === 5) {
    Object.assign(baseRequest, {
      typeOfHousing: formData.apartmentDetails?.propertyType,
      numberOfFloor: formData.apartmentDetails?.floorsFrom,
      maxFloorInTheBuilding: formData.apartmentDetails?.floorsTo,
      areaOfTheApartment: formData.apartmentDetails?.roomSize,
      forALongTime: formData.apartmentDetails?.longTerm,
      ownersName: "", // Owner Name
      ownersPhoneNumbers: formData.apartmentDetails?.ownerPhones,
      residentsData: formData.apartmentDetails?.residents?.map((resident: any) => ({
        name: resident.name,
        phoneNumbers: resident.phones
      })),
    });
  }

  if (step === 6) {
    Object.assign(baseRequest, {
      preferences: formData.selectedAdjectives,
    });
  }

  return baseRequest;
};


export const announcementApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Step 1: Start the announcement creation process
    createAnnouncementStep1: build.mutation<Response<number>, AnnouncementRequest>({
      query: (body) => ({
        url: "announcement/create/step1",
        method: "POST",
        body: body,
      }),
    }),

    // Step 2: Update announcement with basic info
    createAnnouncementStep2: build.mutation<Response<number>, { announcementId: number; data: AnnouncementRequest }>({
      query: ({ announcementId, data }) => ({
        url: `announcement/create/step2/${announcementId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Step 3: Update with apartment details
    createAnnouncementStep3: build.mutation<Response<number>, { announcementId: number; data: AnnouncementRequest }>({
      query: ({ announcementId, data }) => ({
        url: `announcement/create/step3/${announcementId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Step 4: Update with additional details
    createAnnouncementStep4: build.mutation<Response<number>, { announcementId: number; data: AnnouncementRequest }>({
      query: ({ announcementId, data }) => ({
        url: `announcement/create/step4/${announcementId}`,
        method: "POST",
        body: data,
      }),
    }),

    uploadFiles: build.mutation<Response<string[]>, FormData>({
      query: (formData) => ({
        url: "/file/upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),

    // Step 5: Update with full details
    createAnnouncementStep5: build.mutation<Response<number>, { announcementId: number; data: AnnouncementRequest }>({
      query: ({ announcementId, data }) => ({
        url: `announcement/create/step5/${announcementId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Step 6: Final step with preferences
    createAnnouncementStep6: build.mutation<Response<FinalStepResponse>, { announcementId: number; data: AnnouncementRequest }>({
      query: ({ announcementId, data }) => ({
        url: `announcement/create/step6/${announcementId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateAnnouncementStep1Mutation,
  useCreateAnnouncementStep2Mutation,
  useCreateAnnouncementStep3Mutation,
  useCreateAnnouncementStep4Mutation,
  useCreateAnnouncementStep5Mutation,
  useCreateAnnouncementStep6Mutation,
  useUploadFilesMutation
} = announcementApi;