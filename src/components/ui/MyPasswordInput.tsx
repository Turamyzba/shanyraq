'use client'

import React from 'react';
import {Input as NextInput} from "@heroui/react";
import {Eye, EyeClosed} from "lucide-react";
import {NextUiColors} from "@/components/ui/consts";

interface Props {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    name?: string,
    label?: string,
    labelPlacement?: "inside" | "outside" | "outside-left",
    isRequired?: boolean,
    errorMessage?: string,
    placeholder?: string,
    validate?: (value: any) => string | boolean;
    variant?: "bordered",
    color?: NextUiColors
}

export const MyPasswordInput: React.FC<Props> = ({
                                                     value,
                                                     onChange,
                                                     name,
                                                     label = name,
                                                     labelPlacement,
                                                     isRequired,
                                                     errorMessage,
                                                     placeholder,
                                                     validate,
                                                     variant = "bordered",
                                                     color = "primary"
                                                 }
) => {

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
            classNames={{
                inputWrapper: "border-olive-500",
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
                        <EyeClosed className="text-xl text-default-400 pointer-events-none"/>
                    ) : (
                        <Eye className="text-xl text-default-400 pointer-events-none"/>
                    )}
                </button>

            }
        />
    );
}
