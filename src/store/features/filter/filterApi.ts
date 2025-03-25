import { api } from "@/store/api";
import type { Response } from "@/types/response/response";
import { FilterRequest, SavedFilter } from "@/types/request/filterRequests";
import { FilterResponse } from "@/types/response/filterResponses";
import { RootState } from "@/store/store";
import { FilterState } from "./filterSlice";

export const mapStateToFilterRequest = (state: FilterState | RootState): FilterRequest => {
  const filter = "filter" in state ? state.filter : state;

  const cleanedRequestData = {} as FilterRequest;

  cleanedRequestData.page = filter.page;
  cleanedRequestData.sort = filter.sort;

  if (filter.selectedGender?.code) cleanedRequestData.selectedGender = filter.selectedGender.code;

  if (filter.address) {
    if (filter.address.regionId) cleanedRequestData.region = filter.address.regionId;
    if (filter.address.districtId) cleanedRequestData.district = filter.address.districtId;
    if (filter.address.microDistrictId)
      cleanedRequestData.microDistrict = filter.address.microDistrictId;
  }

  if (filter.minPrice) cleanedRequestData.minPrice = filter.minPrice;
  if (filter.maxPrice) cleanedRequestData.maxPrice = filter.maxPrice;
  if (filter.roommates?.id)
    cleanedRequestData.numberOfPeopleAreYouAccommodating = filter.roommates.id;
  if (filter.rooms) cleanedRequestData.quantityOfRooms = filter.rooms.toString();
  if (filter.minAge) cleanedRequestData.minAge = filter.minAge;
  if (filter.maxAge) cleanedRequestData.maxAge = filter.maxAge;

  if (filter.moveInDate) cleanedRequestData.arriveData = filter.moveInDate;

  if (filter.minArea) cleanedRequestData.minArea = filter.minArea;
  if (filter.maxArea) cleanedRequestData.maxArea = filter.maxArea;
  if (filter.minFloor) cleanedRequestData.minFloor = filter.minFloor;
  if (filter.maxFloor) cleanedRequestData.maxFloor = filter.maxFloor;

  if (filter.isNotFirstFloor) cleanedRequestData.notTheFirstFloor = true;
  if (filter.isNotLastFloor) cleanedRequestData.notTheTopFloor = true;
  if (filter.petsAllowed) cleanedRequestData.arePetsAllowed = true;
  if (filter.onlyEmptyApartments) cleanedRequestData.onlyApartmentsWithoutResidents = true;
  if (filter.utilitiesIncluded) cleanedRequestData.isCommunalServiceIncluded = true;
  if (filter.forStudents) cleanedRequestData.intendedForStudents = true;

  if (filter.propertyType) cleanedRequestData.typeOfHousing = filter.propertyType;
  if (filter.termType && filter.termType === "long") cleanedRequestData.forALongTime = true;
  if (filter.role) cleanedRequestData.role = filter.role;

  cleanedRequestData.selectedMapPoints = Array.isArray(filter.selectedMapPoints)
    ? filter.selectedMapPoints
    : [];

  return cleanedRequestData;
};

export const filterApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilteredAnnouncements: build.query<Response<FilterResponse>, FilterRequest>({
      query: (params) => {
        const { selectedMapPoints, ...filterParams } = params;

        return {
          url: `announcement/all`,
          method: "POST",
          params: filterParams,
          body: selectedMapPoints,
        };
      },
    }),

    saveFilter: build.mutation<Response<string>, FilterRequest>({
      query: (filterData) => {
        const { selectedMapPoints, ...filterParams } = filterData;

        return {
          url: `filters/save`,
          method: "POST",
          body: filterParams,
        };
      },
    }),
  }),
});

export const {
  useGetFilteredAnnouncementsQuery,
  useLazyGetFilteredAnnouncementsQuery,
  useSaveFilterMutation,
} = filterApi;
