// types/response/myAnnouncementResponce.ts

export interface ResidentData {
  id: number;
  name: string;
  profilePhoto: string | null;
  residentType: "OWNER" | "RESIDENT";
}

export interface GroupMember {
  id: number;
  name: string;
  age: number;
  phoneNumbers: string[];
  appliedDate: string;
  profilePhoto: string | null;
  permissionStatus: "MEMBER" | "ADMIN" | "SUPERADMIN";
  me: boolean;
}

export interface Applicant {
  id: number;
  name: string;
  age: number;
  phoneNumbers: string[];
  appliedDate: string;
  profilePhoto: string | null;
  userId: number;
}

export interface ApplicationWithPeople {
  applicationBatchId: string;
  people: {
    id: number;
    name: string;
    age: number;
    phoneNumbers: string[];
    appliedDate: string;
    profilePhoto: string | null;
  }[];
}

export interface Group {
  groupId: number;
  groupMembers: GroupMember[];
  newApplications: Applicant[];
  newApplicationsWithPeople: ApplicationWithPeople[];
  capacityOfGroup: number;
  freeSlots: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface AnnouncementResponsesData {
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
  residentsDataResponse: ResidentData[];
  groups: Group[];
  newApplications: Applicant[];
  newApplicationsWithPeople: ApplicationWithPeople[];
}

// The response from the API might come in this format
export interface AnnouncementResponsesResponse {
  data: AnnouncementResponsesData;
  message: string;
  error: string | null;
  code: number;
}

// Or it might come directly as the data
export type AnnouncementResponsesDirectResponse = AnnouncementResponsesData;