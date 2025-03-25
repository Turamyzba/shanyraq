// types/response/filterResponses.ts
import { Card } from "@/types/common";

export type FilterResponse = {
  announcements: Card[];
  page: number;
};
