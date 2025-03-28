import { api } from "@/store/api";

/**
 * Interface for apartment details based on the API response.
 */
export interface ApartmentDetail {
  id: number;
  role: string;
  title: string;
  selectedGender: string;
  doYouLiveInThisHouse: boolean;
  howManyPeopleLiveInThisApartment: string;
  numberOfPeopleAreYouAccommodating: number;
  minAge: number;
  maxAge: number;
  regionText: string;
  districtText: string;
  microDistrictText: string;
  address: string;
  arriveDate: string;
  cost: number;
  quantityOfRooms: string;
  isDepositRequired: boolean;
  deposit: number;
  arePetsAllowed: boolean;
  isCommunalServiceIncluded: boolean;
  minAmountOfCommunalService: number;
  maxAmountOfCommunalService: number;
  intendedForStudents: boolean;
  areBadHabitsAllowed: boolean;
  apartmentsInfo: string;
  typeOfHousing: string;
  numberOfFloor: number;
  maxFloorInTheBuilding: number;
  areaOfTheApartment: number;
  forALongTime: boolean;
  preferences: string[];
  coordsX: string;
  coordsY: string;
  photos: {
    id: number;
    url: string;
  }[];
  user: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
  };
  consideringOnlyNPeople: boolean;
  ownersName: string;
  ownersPhoneNumbers: string[];
  residentsDataResponse: {
    id: number;
    name: string;
    profilePhoto: string;
    residentType: string;
  }[];
  groupDataResponse: {
    id: number;
    freeSlots: number;
    group: string;
    groupMembers: {
      id: number;
      name: string;
      age: number | null;
      phoneNumbers: string[] | null;
      appliedDate: string | null;
      profilePhoto: string | null;
      permissionStatus: string | null;
      coverLetter: string | null;
      me: boolean | null;
    }[];
  }[];
}

export interface Response<T> {
  data: T;
  message: string | null;
  error: string | null;
  code: number;
}

export interface CreateGroupRequest {
  capacity: number;
  countOfPeople: number;
  memberData: {
    name: string;
    phoneNumbers: string[];
  }[];
}

export interface CreateApplicationRequest {
  countOfPeople: number;
  memberData: {
    name: string;
    phoneNumbers: string[];
  }[];
}

export interface GroupOrApplicationCreateResponse {
  token: string;
  message: string;
}

export const apartmentApi = api.injectEndpoints({
  endpoints: (build) => ({

    getApartmentDetail: build.query<Response<ApartmentDetail>, number>({
      query: (id) => ({
        url: `/announcement/detail/${id}`,
        method: "GET",
      })
    }),

    createGroup: build.mutation<
      GroupOrApplicationCreateResponse,
      { announcementId: number; body: CreateGroupRequest }
    >({
      query: ({ announcementId, body }) => ({
        url: `/group/create/${announcementId}`,
        method: "POST",
        body,
      })
    }),

    createApplication: build.mutation<
      GroupOrApplicationCreateResponse,
      { groupId: number; body: CreateApplicationRequest }
    >({
      query: ({ groupId, body }) => ({
        url: `/application/create/${groupId}`,
        method: "POST",
        body,
      })
    }),
  }),
});

export const {
  useGetApartmentDetailQuery,
  useCreateGroupMutation,
  useCreateApplicationMutation,
} = apartmentApi;