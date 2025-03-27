
export interface MyAnnouncementResponse {
    announcementId: number;
    image: string;
    title: string;
    address: string;
    arriveDate: string;
    roomCount: string;
    selectedGender: "MALE" | "FEMALE" | "ANY";
    roommates: number;
    cost: number;
    coordsX: string;
    coordsY: string;
    isArchived: boolean;
    consideringOnlyNPeople: boolean;
    applicationCount?: number; // Adding this field for future use
  }
  
  export type MyAnnouncementsListResponse = MyAnnouncementResponse[];