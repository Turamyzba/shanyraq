"use client";
import React, { useMemo, useState } from "react";
import { Select as NextSelect, SelectItem } from "@heroui/react";

interface Option {
  value: string;
  label: string;
}

interface MyHeroSelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
  options: Option[];
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function MyHeroSelect({
  label,
  placeholder = "Любой",
  value,
  onChange,
  options,
  className,
  disabled,
  isLoading,
}: MyHeroSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedKeys = useMemo(() => {
    return value ? new Set([value]) : new Set([]);
  }, [value]);

  return (
    <NextSelect
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        // Convert the Set back to a single string value
        const keysArray = Array.from(keys);
        const newValue = keysArray.length > 0 ? keysArray[0].toString() : "";
        console.log("Selection changed to:", newValue);
        onChange(newValue);
      }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className={className}
      disabled={disabled}
      isLoading={isLoading}
      classNames={{
        trigger: `
          w-full
          py-[10px] px-[10px]
          bg-white
          rounded-[5px]
          border border-solid
          flex justify-between items-center
          cursor-pointer
          outline-none
          ${
            isOpen
              ? "border-[#1AA683]" // Green border when open
              : "border-[#EBEBEB]" // Gray border when closed
          }
        `,
        value: `
          text-[14px] font-normal leading-[18px]
          ${value ? "text-[#252525]" : "text-[#B5B7C0]"}
        `,
        selectorIcon: isOpen ? "text-[#1AA683]" : "text-[#B5B7C0]",
        label: "text-[#252525] text-[14px] font-normal leading-[17.5px] mb-1",
        popoverContent: `
          z-10 mt-1
          border border-solid border-[#EBEBEB]
          rounded-[5px]
          bg-white
        `,
      }}
    >
      {options.map((option) => (
        <SelectItem key={option.value} title={option.label}>
          {option.label} hi
        </SelectItem>
      ))}
    </NextSelect>
  );
}
