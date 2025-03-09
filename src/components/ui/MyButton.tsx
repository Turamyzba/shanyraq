"use client";

import { JSX, useEffect, useState } from "react";
import type React from "react";
import { Button as NextButton, CircularProgress } from "@heroui/react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  icon?: JSX.Element | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  circularClass?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "flat" | "solid" | "bordered" | "light" | "faded" | "shadow" | "ghost" | undefined;
};

const MyButton = ({
  children,
  icon,
  className,
  type,
  onClick,
  isDisabled,
  isLoading,
  circularClass,
  variant,
}: Props) => {
  const [startContent, setStartContent] = useState(icon);

  useEffect(() => {
    if (isLoading) {
      setStartContent(
        <CircularProgress size={"sm"} className={circularClass} classNames={{ svg: "w-6 h-6" }} />
      );
    } else {
      setStartContent(icon);
    }
  }, [isLoading]);

  return (
    <NextButton
      startContent={startContent}
      onPress={onClick}
      className={className}
      type={type}
      isDisabled={isDisabled || isLoading}
      variant={variant}
    >
      {children}
    </NextButton>
  );
};

export default MyButton;
