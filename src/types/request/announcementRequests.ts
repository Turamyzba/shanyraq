// Unified announcement request type
export interface AnnouncementRequest {
  role: string;
  title?: string;
  selectedGender?: string;
  doYouLiveInThisHouse?: boolean;
  consideringOnlyNPeople?: boolean;
  howManyPeopleLiveInThisApartment?: string;
  numberOfPeopleAreYouAccommodating?: number;
  minAge?: number;
  maxAge?: number;
  region?: number;
  district?: number;
  microDistrict?: number;
  address?: string;
  arriveDate?: string;
  cost?: number;
  quantityOfRooms?: string;
  isDepositRequired?: boolean;
  deposit?: number;
  arePetsAllowed?: boolean;
  isCommunalServiceIncluded?: boolean;
  minAmountOfCommunalService?: number;
  maxAmountOfCommunalService?: number;
  intendedForStudents?: boolean;
  areBadHabitsAllowed?: boolean;
  apartmentsInfo?: string;
  images?: string[];
  typeOfHousing?: string;
  numberOfFloor?: number;
  maxFloorInTheBuilding?: number;
  areaOfTheApartment?: number;
  forALongTime?: boolean;
  ownersName?: string;
  ownersPhoneNumbers?: string[];
  residentsData?: {
    name: string;
    phoneNumbers: string[];
  }[];
  preferences?: string[];
}
