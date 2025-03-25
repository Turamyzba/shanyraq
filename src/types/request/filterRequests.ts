// types/request/filterRequests.ts

export interface FilterRequest {
    selectedGender?: string;
    region?: number;
    district?: number;
    microDistrict?: number;
    minPrice: number;
    maxPrice?: number;
    numberOfPeopleAreYouAccommodating?: number;
    quantityOfRooms?: string;
    minAge?: number;
    maxAge?: number;
    arriveData?: string;
    minArea?: number;
    maxArea?: number;
    notTheFirstFloor?: boolean;
    notTheTopFloor?: boolean;
    arePetsAllowed?: boolean;
    onlyApartmentsWithoutResidents?: boolean;
    isCommunalServiceIncluded?: boolean;
    intendedForStudents?: boolean;
    typeOfHousing?: string;
    forALongTime?: boolean;
    role?: string;
    minFloor?: number;
    maxFloor?: number;
    selectedMapPoints: {x: number, y: number}[];
  }
  