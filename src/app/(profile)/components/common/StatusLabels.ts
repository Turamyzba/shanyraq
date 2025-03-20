export type StatusKey =
  | "findingApartment"
  | "notFindingApartment"
  | "findingRoommate"
  | "notFindingRoommate";

export const statusLabels: Record<StatusKey, string> = {
  findingApartment: "#ИЩУ КВАРТИРУ",
  notFindingApartment: "#НЕ ИЩУ КВАРТИРУ",
  findingRoommate: "#ИЩУ СОЖИТЕЛЯ",
  notFindingRoommate: "#НЕ ИЩУ СОЖИТЕЛЯ",
};
