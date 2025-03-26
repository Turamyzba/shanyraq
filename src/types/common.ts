import Images from "@/components/common/Images";

export interface AddressType {
  id: number;
  parentid: number;
  haschild: boolean;
  namerus: string;
  namekaz: string;
}

export interface GenderState {
  id: number;
  namerus: string;
  namekaz: string;
  code: string;
}

export interface RommatesState {
  id: number;
  name: string;
}

export interface AddressState {
  regionId: number | null;
  regionName: string;
  districtId: number | null;
  districtName: string;
  microDistrictId: number | null;
  microDistrictName: string;
}

export interface Card {
  announcementId: number;
  image: string;
  title: string;
  address: string;
  arriveDate: string;
  roomCount: string;
  selectedGender: string;
  roommates: number;
  cost: number;
  coordsX: string;
  coordsY: string;
  isArchived: boolean;
  consideringOnlyNPeople: boolean;
}

export const genderOptions: GenderState[] = [
  { id: 1, namerus: "Мужской", namekaz: "Ер", code: "MALE" },
  { id: 2, namerus: "Женский", namekaz: "Әйел", code: "FEMALE" },
  { id: 3, namerus: "Любой", namekaz: "Кез-келген", code: "OTHER" },
];

export const roommateOptions: RommatesState[] = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5+" },
];

// Property type options for filter
export interface PropertyTypeState {
  id: number;
  namerus: string;
  namekaz: string;
  code: string;
}

// Owner type options for filter
export interface OwnerTypeState {
  id: number;
  namerus: string;
  namekaz: string;
  code: string;
}

// Constants for property types
export const propertyTypeOptions: PropertyTypeState[] = [
  { id: 1, namerus: "Квартира", namekaz: "Пәтер", code: "APARTMENT" },
  { id: 2, namerus: "Дом", namekaz: "Үй", code: "HOUSE" },
];

// Constants for owner types
export const ownerTypeOptions: OwnerTypeState[] = [
  { id: 1, namerus: "От хозяев", namekaz: "Иелерден", code: "OWNER" },
  { id: 2, namerus: "От жителей", namekaz: "Тұрғындардан", code: "RESIDENT" },
];

export const roleOptions = [
  {
    code: "OWNER",
    name: "Я хозяин",
    description: "Эта опция для вас, если вы сдаёте жильё или предлагаете услуги",
    image: Images.roleOwner,
  },
  {
    code: "RESIDENT",
    name: "Я житель",
    description: "Эта опция для вас, если вы ищете сожителей",
    image: Images.roleTenant,
  },
];

