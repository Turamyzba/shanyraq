"use client";

import type React from "react";
import { useEffect } from "react";
import MyInput from "./MyInput";
import { Phone } from "lucide-react";
import type { NextUiColors } from "./consts";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  labelPlacement?: "inside" | "outside" | "outside-left";
  isRequired?: boolean;
  errorMessage?: string;
  placeholder?: string;
  color?: NextUiColors;
  variant?: "bordered";
  className?: string;
  isInvalid?: boolean;
  style?: string;
};

const MyPhoneInput = ({
  name = "phone",
  label = "Телефон",
  labelPlacement = "inside",
  isRequired = false,
  errorMessage,
  placeholder = "+7 ___ ___ ____",
  color = "primary",
  variant = "bordered",
  className,
  isInvalid,
  style,
  value,
  onChange,
}: Props) => {
  // Initialize with +7 if empty
  useEffect(() => {
    if (!value) {
      const event = {
        target: {
          name,
          value: "+7 ",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Always ensure it starts with +7
    if (!inputValue.startsWith("+7")) {
      if (inputValue.startsWith("+")) {
        inputValue = "+7" + inputValue.substring(1);
      } else {
        inputValue = "+7" + inputValue;
      }
    }

    // Remove all non-digit characters except + and spaces
    inputValue = inputValue.replace(/[^\d\s+]/g, "");

    // Format the phone number with spaces
    let formattedValue = "";
    const digitsOnly = inputValue.replace(/\D/g, "");

    if (digitsOnly.length <= 1) {
      formattedValue = "+7 ";
    } else {
      // Format as +7 XXX XXX XXXX
      formattedValue = "+7 ";

      if (digitsOnly.length > 1) {
        formattedValue += digitsOnly.substring(1, Math.min(4, digitsOnly.length));
      }

      if (digitsOnly.length > 4) {
        formattedValue += " " + digitsOnly.substring(4, Math.min(7, digitsOnly.length));
      }

      if (digitsOnly.length > 7) {
        formattedValue += " " + digitsOnly.substring(7, Math.min(11, digitsOnly.length));
      }
    }

    // Create a new event with the formatted value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: formattedValue,
      },
    };

    onChange(newEvent);
  };

  return (
    <MyInput
      name={name}
      label={label}
      labelPlacement={labelPlacement}
      isRequired={isRequired}
      errorMessage={errorMessage}
      placeholder={placeholder}
      type="tel"
      value={value}
      isInvalid={isInvalid}
      onChange={handleInputChange}
      variant={variant}
      color={color}
      className={className}
      startContent={<Phone className="h-4 w-4 text-default-400" />}
    />
  );
};

export default MyPhoneInput;
