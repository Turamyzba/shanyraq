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
  yourAge: number; // Added your age field
  questionnaire?: Questionnaire;
  coverLetter?: string;
}

export interface Group {
  id: number;
  name: string;
  members: User[];
  newApplications: User[];
}

export interface ApartmentDetails {
  id: number;
  title: string;
  address: string;
  district: string;
  city: string;
  roomDetails: string;
  moveInDate: string;
  deposit: string;
  description: string;
  applicationCount: number;
  price: number;
  image: string;
}
