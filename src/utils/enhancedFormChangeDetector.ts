// utils/enhancedFormChangeDetector.ts

import { AnnouncementRequest } from "@/types/request/announcementRequests";

/**
 * Maps fields for each step to the corresponding API model properties
 */
const stepToApiFieldsMap = {
  1: ["role"],
  2: [
    "title",
    "selectedGender",
    "doYouLiveInThisHouse",
    "howManyPeopleLiveInThisApartment",
    "numberOfPeopleAreYouAccommodating",
    "minAge",
    "maxAge",
  ],
  3: [
    "region",
    "district",
    "microDistrict",
    "address",
    "arriveDate",
    "cost",
    "quantityOfRooms",
    "isDepositRequired",
    "deposit",
  ],
  4: [
    "arePetsAllowed",
    "isCommunalServiceIncluded",
    "minAmountOfCommunalService",
    "maxAmountOfCommunalService",
    "intendedForStudents",
    "areBadHabitsAllowed",
    "apartmentsInfo",
    "images",
  ],
  5: [
    "typeOfHousing",
    "numberOfFloor",
    "maxFloorInTheBuilding",
    "areaOfTheApartment",
    "forALongTime",
    "ownersName",
    "ownersPhoneNumbers",
    "residentsData",
  ],
  6: ["preferences"],
};

/**
 * Maps form fields to API request fields
 */
const formToApiFieldMapping = {
  role: "role",
  title: "title",
  gender: "selectedGender",
  livingInHome: "doYouLiveInThisHouse",
  peopleInApartment: "howManyPeopleLiveInThisApartment",
  roommates: "numberOfPeopleAreYouAccommodating",
  "ageRange[0]": "minAge",
  "ageRange[1]": "maxAge",
  region: "region",
  district: "district",
  microDistrict: "microDistrict",
  address: "address",
  moveInDate: "arriveDate",
  monthlyPayment: "cost",
  rooms: "quantityOfRooms",
  deposit: "isDepositRequired",
  depositAmount: "deposit",
  "apartmentDetails.petsAllowed": "arePetsAllowed",
  "apartmentDetails.utilitiesIncluded": "isCommunalServiceIncluded",
  "apartmentDetails.utilitiesAmount[0]": "minAmountOfCommunalService",
  "apartmentDetails.utilitiesAmount[1]": "maxAmountOfCommunalService",
  "apartmentDetails.forStudents": "intendedForStudents",
  "apartmentDetails.badHabitsAllowed": "areBadHabitsAllowed",
  "apartmentDetails.description": "apartmentsInfo",
  "apartmentDetails.photos": "images",
  "apartmentDetails.propertyType": "typeOfHousing",
  "apartmentDetails.floorsFrom": "numberOfFloor",
  "apartmentDetails.floorsTo": "maxFloorInTheBuilding",
  "apartmentDetails.roomSize": "areaOfTheApartment",
  "apartmentDetails.longTerm": "forALongTime",
  "apartmentDetails.ownerPhones": "ownersPhoneNumbers",
  "apartmentDetails.residents": "residentsData",
  selectedAdjectives: "preferences",
};

/**
 * Get a value from an object using a path string
 * e.g., getNestedValue(obj, 'a.b.c') will return obj.a.b.c
 */
const getNestedValue = (obj: any, path: string): any => {
  if (!obj) return undefined;

  // Handle array indexing in the path (e.g., 'ageRange[0]')
  const arrayMatch = path.match(/(.+)\[(\d+)\]$/);
  if (arrayMatch) {
    const [_, arrayPath, indexStr] = arrayMatch;
    const index = parseInt(indexStr, 10);
    const array = getNestedValue(obj, arrayPath);
    return Array.isArray(array) ? array[index] : undefined;
  }

  // Handle regular nested paths
  return path.split(".").reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
};

/**
 * Check if two values are equal (handles arrays and objects)
 */
const isEqual = (value1: any, value2: any): boolean => {
  // Handle both being null or undefined
  if (value1 == null && value2 == null) return true;

  // Handle one being null/undefined but not the other
  if (value1 == null || value2 == null) return false;

  // Handle arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) return false;

    // Simple array of primitives
    if (typeof value1[0] !== "object") {
      return JSON.stringify(value1) === JSON.stringify(value2);
    }

    // Array of objects
    for (let i = 0; i < value1.length; i++) {
      if (!isEqual(value1[i], value2[i])) return false;
    }
    return true;
  }

  // Handle objects
  if (typeof value1 === "object" && typeof value2 === "object") {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!isEqual(value1[key], value2[key])) return false;
    }
    return true;
  }

  // Handle string representation of numbers vs actual numbers
  if (typeof value1 === "number" && typeof value2 === "string") {
    return value1 === parseFloat(value2);
  }
  if (typeof value1 === "string" && typeof value2 === "number") {
    return parseFloat(value1) === value2;
  }

  // Handle date objects
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() === value2.getTime();
  }

  // Handle date vs string
  if (value1 instanceof Date && typeof value2 === "string") {
    return value1.toISOString() === new Date(value2).toISOString();
  }
  if (typeof value1 === "string" && value2 instanceof Date) {
    return new Date(value1).toISOString() === value2.toISOString();
  }

  // Handle primitives
  return value1 === value2;
};

/**
 * Convert a form value to the appropriate type for API comparison
 */
const normalizeValue = (value: any, fieldName: string): any => {
  // Handle specific field conversions
  if (fieldName === "howManyPeopleLiveInThisApartment" && typeof value === "number") {
    return value.toString();
  }

  if (fieldName === "cost" && typeof value === "string") {
    return parseFloat(value);
  }

  // Handle date conversions
  if (fieldName === "arriveDate" && value && typeof value !== "string") {
    return value.toString();
  }

  return value;
};

/**
 * Compare current form data with previous API request for a specific step
 * Returns true if there are changes, false if no changes
 */
export const hasStepDataChanged = (
  currentFormData: any,
  previousApiData: AnnouncementRequest | null,
  step: number
): boolean => {
  if (!previousApiData) return true;

  const relevantApiFields = stepToApiFieldsMap[step as keyof typeof stepToApiFieldsMap] || [];

  // Check each API field that corresponds to this step
  for (const apiField of relevantApiFields) {
    // Find corresponding form field(s)
    const formFields = Object.entries(formToApiFieldMapping)
      .filter(([_, apiName]) => apiName === apiField)
      .map(([formField]) => formField);

    for (const formField of formFields) {
      const currentValue = getNestedValue(currentFormData, formField);
      // Get the API field value from previous API data
      const previousValue = previousApiData[apiField as keyof AnnouncementRequest];

      // Normalize values for comparison
      const normalizedCurrentValue = normalizeValue(currentValue, apiField);
      const normalizedPreviousValue = normalizeValue(previousValue, apiField);

      if (!isEqual(normalizedCurrentValue, normalizedPreviousValue)) {
        return true;
      }
    }
  }

  return false;
};

export const extractStepFormData = (formData: any, step: number): any => {
  const relevantApiFields = stepToApiFieldsMap[step as keyof typeof stepToApiFieldsMap] || [];
  const extractedData: Record<string, any> = {};

  const relevantFormFields = Object.entries(formToApiFieldMapping)
    .filter(([_, apiName]) => relevantApiFields.includes(apiName))
    .map(([formField]) => formField);

  for (const formField of relevantFormFields) {
    const value = getNestedValue(formData, formField);
    if (value !== undefined) {
      const parts = formField.split(".");

      if (parts.length === 1) {
        const arrayMatch = formField.match(/(.+)\[(\d+)\]$/);
        if (arrayMatch) {
          const [_, arrayName, index] = arrayMatch;
          if (!extractedData[arrayName]) {
            extractedData[arrayName] = [];
          }
          extractedData[arrayName][parseInt(index, 10)] = value;
        } else {
          extractedData[formField] = value;
        }
      } else {
        let current = extractedData;
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
        current[parts[parts.length - 1]] = value;
      }
    }
  }

  return extractedData;
};

export class ApiDataTracker {
  private static instance: ApiDataTracker;
  private lastApiData: Record<number, AnnouncementRequest> = {};

  private constructor() {}

  public static getInstance(): ApiDataTracker {
    if (!ApiDataTracker.instance) {
      ApiDataTracker.instance = new ApiDataTracker();
    }
    return ApiDataTracker.instance;
  }

  public setStepApiData(step: number, apiData: AnnouncementRequest): void {
    this.lastApiData[step] = { ...apiData };
  }

  public getStepApiData(step: number): AnnouncementRequest | null {
    return this.lastApiData[step] || null;
  }

  public getAllApiData(): Record<number, AnnouncementRequest> {
    return { ...this.lastApiData };
  }

  public reset(): void {
    this.lastApiData = {};
  }
}

export const shouldSubmitStep = (currentFormData: any, step: number): boolean => {
  const apiDataTracker = ApiDataTracker.getInstance();
  const previousApiData = apiDataTracker.getStepApiData(step);

  return hasStepDataChanged(currentFormData, previousApiData, step);
};
