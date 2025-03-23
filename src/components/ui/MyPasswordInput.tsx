"use client";

import React from "react";
import { Input as NextInput } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { NextUiColors } from "@/components/ui/consts";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  labelPlacement?: "inside" | "outside" | "outside-left";
  isRequired?: boolean;
  errorMessage?: string;
  placeholder?: string;
  validate?: (value: any) => string | boolean;
  variant?: "bordered";
  color?: NextUiColors;
  className?: string;
}

export const MyPasswordInput: React.FC<Props> = ({
  value,
  onChange,
  name,
  label = name,
  labelPlacement = "inside",
  isRequired,
  errorMessage,
  placeholder,
  validate,
  variant = "bordered",
  color = "primary",
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <NextInput
      id={name}
      label={label}
      type={isVisible ? "text" : "password"}
      isRequired={isRequired}
      placeholder={placeholder}
      value={value}
      labelPlacement={labelPlacement}
      color={color}
      name={name}
      onChange={onChange}
      errorMessage={errorMessage}
      variant={variant}
      className={className}
      classNames={{
        inputWrapper: "border-[#EBEBEB] border-1 rounded-[5px]",
        label: "text-foreground",
      }}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none rounded-xl transition p-1 hover:bg-white"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <Eye className="text-xl text-default-400 pointer-events-none" />
          ) : (
            <EyeClosed className="text-xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
  );
};
