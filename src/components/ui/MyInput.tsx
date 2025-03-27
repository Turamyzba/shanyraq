"use client";

import { Input as NextInput } from "@heroui/react";
import { NextUiColors } from "@/components/ui/consts";

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
  type?: "email" | "password" | "text" | "number" | "tel";
  variant?: "bordered";
  className?: string;
  startContent?: any;
  disabled?: boolean;
};

const MyInput = ({
  name,
  label = name,
  labelPlacement = "inside",
  isRequired,
  errorMessage,
  placeholder,
  type = "text",
  value,
  onChange,
  variant = "bordered",
  color = "primary",
  className,
  startContent,
  disabled
}: Props) => {
  return (
    <NextInput
      name={name}
      label={label}
      labelPlacement={labelPlacement}
      color={color}
      isRequired={isRequired}
      disabled={disabled}
      errorMessage={errorMessage}
      placeholder={placeholder}
      startContent={startContent}
      type={type}
      value={value}
      onChange={onChange}
      variant={variant}
      className={className}
      classNames={className ? {} : {
        inputWrapper: "border-[#EBEBEB] border-1 rounded-[5px]",
        label: "text-foreground",
      }}
    />
  );
};

export default MyInput;
