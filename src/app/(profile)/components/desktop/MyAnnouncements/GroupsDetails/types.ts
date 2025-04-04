export interface Questionnaire {
  answers: {
    question: string;
    answer: string;
  }[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  telegram: string;
  phone: string;
  date: string;
  isAdmin?: boolean;
  age: number;
  profilePhoto?: string | null;
  questionnaire?: Questionnaire;
  coverLetter?: string;
  groupApplicants?: User[];
  wantsToCreateNewGroup?: boolean;
  forWhat?: string;
  isGroupLead?: boolean;
  batchId?: string;
}

export interface Group {
  id: number;
  name: string;
  members: User[];
  newApplications: User[];
  status: string;
  capacityOfGroup: number;
  freeSlots: number;
}

export interface ApartmentDetails {
  id: number;
  address: string;
  district: string;
  city: string;
  rooms: string;
  moveInDate: string;
  deposit: string;
  description: string;
  price: number;
  image: string;
  applicationsCount: number;
}

export interface ActionModalContent {
  action: "accept" | "reject";
  message: string;
}

export interface BatchApplication {
  batchId: string;
  primaryApplicant: User;
  coapplicants: User[];
}