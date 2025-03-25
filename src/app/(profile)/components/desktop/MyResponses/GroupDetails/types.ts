export type MemberRole = "member" | "admin" | "owner" | "invited";
export type ApplicationStatus = "pending" | "accepted" | "rejected";
export type GroupStatus = "pending" | "accepted" | "rejected" | "draft";

export interface Member {
  id: number;
  name: string;
  email: string | null;
  age: number | null;
  phone: string | null;
  date: string | null;
  avatar: string;
  role?: MemberRole;
  isCurrentUser?: boolean;
}

export interface Group {
  id: number;
  name: string;
  members: Member[];
  applicants: Member[];
  status: GroupStatus;
  isUserMember: boolean;
  isUserAdmin: boolean;
  isUserSuperAdmin: boolean;
  isUserOwner: boolean;
  isDraft?: boolean;
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
  price: number;
  image: string;
  status: ApplicationStatus;
}

export interface ModalConfig {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmAction: () => void;
}
