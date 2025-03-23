// src/lib/api/services/greatDealsService.ts
import { get } from "./apiService";

export interface LandingCard {
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

export const getGreatDeals = async (): Promise<LandingCard[]> => {
  return get<LandingCard[]>("/announcement/great-deals");
};