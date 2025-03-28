// Survey Types
export interface SurveyAnswer {
  questionId: number;
  optionId: number;
}

export interface SurveyQuestion {
  questionId: number;
  text: string;
  options: SurveyOption[];
}

export interface SurveyOption {
  optionId: number;
  text: string;
}

export interface SurveySubmitFromLinkRequest {
  token: string;
  firstName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  gender: "MALE" | "FEMALE";
  age: number;
  userAnswers: SurveyAnswer[];
  coverLetter?: string;
}

export interface SurveyAnswerResponse {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  gender: "MALE" | "FEMALE";
  surveyAnswer: {
    question: string;
    answer: string;
  }[];
}

export interface AccountDataForLinkResponse {
  firstName: string;
  birthDate: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
  surveyAnswers: {
    question: string;
    answer: string;
  }[];
}

export interface LoginDTO {
  email: string;
  password: string;
}
