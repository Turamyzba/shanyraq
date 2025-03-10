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
  type?: "email" | "password" | "text" | "number";
  variant?: "bordered";
  className?: string;
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
}: Props) => {
  return (
    <NextInput
      name={name}
      label={label}
      labelPlacement={labelPlacement}
      color={color}
      isRequired={isRequired}
      errorMessage={errorMessage}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      variant={variant}
      className={className}
      classNames={{
        inputWrapper: "border-[#EBEBEB] border-1 rounded-[5px]",
        label: "text-foreground",
      }}
    />
  );
};

export default MyInput;
