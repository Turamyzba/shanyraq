export interface ProfileResponse {
    firstName: string;
    lastName: string;
    email: string;
    birthDate?: string;
    phoneNumber?: string;
    gender?: string;
    profilePhoto?: string;
    isPasswordHas?: boolean;
  }
  
  export interface SavedFilter {
    id: number;
    selectedGender: string;
    regionText: string;
    districtText: string;
    microDistrictText: string;
    minPrice: number;
    maxPrice: number;
    numberOfPeopleAreYouAccommodating: number;
    quantityOfRooms: string;
    minAge: number;
    maxAge: number;
    arriveDate: string;
    minArea: number;
    maxArea: number;
    notTheFirstFloor: boolean;
    notTheTopFloor: boolean;
    arePetsAllowed: boolean;
    isCommunalServiceIncluded: boolean;
    intendedForStudents: boolean;
    typeOfHousing: string;
    forALongTime: boolean;
    minFloor: number;
    maxFloor: number;
    onlyApartmentsWithoutResidents: boolean;
    areBadHabitsAllowed: boolean;
    role: string;
  }
  
  export interface ProfileWithFiltersResponse {
    profile: ProfileResponse;
    savedFilters: SavedFilter[];
  }
  
  export interface PasswordChangeResponse {
    message: string;
  }
  
  export interface DeletePhotoResponse {
    message: string;
  }
  
  export interface UploadPhotoResponse {
    url: string;
  }