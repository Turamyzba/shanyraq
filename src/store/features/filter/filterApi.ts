import { api } from "@/store/api";
import type { Response } from "@/types/response/response";
import { FilterRequest } from "@/types/request/filterRequests";
import { FilterResponse } from "@/types/response/filterResponses";
import { RootState } from "@/store/store";
import { FilterState } from "./filterSlice";

/**
 * Maps the Redux filter state to the API request format
 * This function handles the transformation between different property names and structures
 */
export const mapStateToFilterRequest = (state: FilterState | RootState): FilterRequest => {
  // Extract filter from state if it exists, otherwise use state directly
  const filter = 'filter' in state ? state.filter : state;
  
  // Start with an empty request object
  const cleanedRequestData = {} as FilterRequest;
  
  // Safely check for and use values
  if (filter.selectedGender?.code) cleanedRequestData.selectedGender = filter.selectedGender.code;
  
  // Address mapping - safely check for address property first
  if (filter.address) {
    if (filter.address.regionId) cleanedRequestData.region = filter.address.regionId;
    if (filter.address.districtId) cleanedRequestData.district = filter.address.districtId;
    if (filter.address.microDistrictId) cleanedRequestData.microDistrict = filter.address.microDistrictId;
  }
  
  // Number filters - always include minPrice
  cleanedRequestData.minPrice = filter.minPrice || 0;
  
  if (filter.maxPrice) cleanedRequestData.maxPrice = filter.maxPrice;
  if (filter.roommates?.id) cleanedRequestData.numberOfPeopleAreYouAccommodating = filter.roommates.id;
  if (filter.rooms) cleanedRequestData.quantityOfRooms = filter.rooms.toString();
  if (filter.minAge) cleanedRequestData.minAge = filter.minAge;
  if (filter.maxAge) cleanedRequestData.maxAge = filter.maxAge;
  
  // Date filter
  if (filter.moveInDate) cleanedRequestData.arriveData = filter.moveInDate;
  
  // Area filters
  if (filter.minArea) cleanedRequestData.minArea = filter.minArea;
  if (filter.maxArea) cleanedRequestData.maxArea = filter.maxArea;
  if (filter.minFloor) cleanedRequestData.minFloor = filter.minFloor;
  if (filter.maxFloor) cleanedRequestData.maxFloor = filter.maxFloor;
  
  // Boolean filters
  if (filter.isNotFirstFloor) cleanedRequestData.notTheFirstFloor = true;
  if (filter.isNotLastFloor) cleanedRequestData.notTheTopFloor = true;
  if (filter.petsAllowed) cleanedRequestData.arePetsAllowed = true;
  if (filter.onlyEmptyApartments) cleanedRequestData.onlyApartmentsWithoutResidents = true;
  if (filter.utilitiesIncluded) cleanedRequestData.isCommunalServiceIncluded = true;
  if (filter.forStudents) cleanedRequestData.intendedForStudents = true;
  
  // Type filters
  if (filter.propertyType) cleanedRequestData.typeOfHousing = filter.propertyType;
  if (filter.termType === 'long') cleanedRequestData.forALongTime = true;
  if (filter.role) cleanedRequestData.role = filter.role;
  
  // Map points - always include this, but ensure it's an array
  cleanedRequestData.selectedMapPoints = Array.isArray(filter.selectedMapPoints) 
    ? filter.selectedMapPoints 
    : [];
  
  return cleanedRequestData;
};

export const filterApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilteredAnnouncements: build.query<Response<FilterResponse>, FilterRequest>({
      query: (params) => {
        // Extract selectedMapPoints from params to avoid sending it twice
        const { selectedMapPoints, ...queryParams } = params;
        
        return {
          url: `announcement/filter-with-search-by-area`,
          method: "POST",
          params: queryParams, // Send filter parameters in query string
          body: selectedMapPoints, // Send map points in request body
        };
      },
    }),
    
    getAllAnnouncements: build.query<Response<FilterResponse>, void>({
      query: () => ({
        url: `announcement/all`,
        method: "GET"
      }),
    }),
  }),
});

export const { 
  useGetFilteredAnnouncementsQuery, 
  useLazyGetFilteredAnnouncementsQuery,
  useGetAllAnnouncementsQuery, 
  useLazyGetAllAnnouncementsQuery
} = filterApi;