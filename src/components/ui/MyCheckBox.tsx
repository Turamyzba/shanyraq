"use client";
import React from "react";
import { Checkbox } from "@heroui/react";

interface MyCheckBoxProps {
  /** The text label shown on the left side. */
  label: string;
  labelClassName: string;
  /** Whether the checkbox is checked. */
  checked: boolean;
  /** Callback fired when the checkbox changes. */
  onChange: (checked: boolean) => void;
  /** Optional additional className. */
  className?: string;
}

export default function MyCheckBox({
  label,
  checked,
  onChange,
  className = "",
  labelClassName =""
}: MyCheckBoxProps) {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <span className={labelClassName}>
        {label}
      </span>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={checked}
          onChange={() => onChange(!checked)}
          aria-label={label}
        />
        <span className={`${labelClassName} min-w-[30px]`}>
          {checked ? "Да" : "Нет"}
        </span>
      </label>
    </div>
  );
}
