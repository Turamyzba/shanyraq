"use client";
import React from "react";
import { DatePicker } from "@heroui/react";

interface MyCalendarProps {
  label?: React.ReactNode;
  value: any;
  onChange: (value: any) => void;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  placeholderValue?: any;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export default function MyCalendar({
  label,
  value,
  onChange,
  variant = "bordered",
  color = "primary",
  size = "md",
  radius = "sm",
  placeholderValue,
  description,
  errorMessage,
  isRequired = false,
  isReadOnly = false,
  isDisabled = false,
  isInvalid = false,
  className = "",
}: MyCalendarProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <DatePicker
        aria-label="Дата заселения"
        value={value}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        placeholderValue={placeholderValue}
        description={description}
        errorMessage={errorMessage}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        inert={true}
        showMonthAndYearPickers
        onChange={(date) => onChange(date ?? null)}
        classNames={{
          base: "w-full",
          selectorIcon: "text-gray-500",
          popoverContent: "mt-1 border-[#EBEBEB] border-1 rounded-[5px]",
          calendar: "w-full",
          calendarContent: "p-2",
          timeInputLabel: "text-sm text-gray-500",
          timeInput: "p-2 border-[#EBEBEB] border-1 rounded-[5px]",
        }}
      />
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}
