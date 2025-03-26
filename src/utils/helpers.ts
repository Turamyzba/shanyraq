import { CalendarDate } from "@internationalized/date";

export const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isCalendarDate = (value: any): boolean => {
  return (
    value && typeof value === "object" && "year" in value && "month" in value && "day" in value
  );
};
