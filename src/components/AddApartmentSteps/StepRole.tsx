"use client";

import React, { useState } from "react";
import Images from "../common/Images";
import styles from "./StepRole.module.scss";
import { Button } from "@heroui/react";
import { useFormContext } from "react-hook-form";

export enum UserRole {
    OWNER = "OWNER",
    TENANT = "TENANT",
  }

  const roleOptions = [
    {
      code: UserRole.OWNER,
      name: "Я хозяин",
      description: "Эта опция для вас, если вы сдаёте жильё или предлагаете услуги",
      image: Images.roleOwner,
    },
    {
      code: UserRole.TENANT,
      name: "Я житель",
      description: "Эта опция для вас, если вы ищете сожителей",
      image: Images.roleTenant,
    },
  ];
  
  

  const StepRole: React.FC = () => {
    const { setValue, watch } = useFormContext();
    const selectedRole = watch("role");
      
  const [error, setError] = useState<boolean>(false);

  const handleSelect = (role: UserRole) => {
    setValue("role", role);
  };
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Кем вы являетесь?</h2>
      <p className={styles.description}>
        Выберите роль, чтобы мы могли предложить подходящие функции
      </p>

      <div className={styles.optionsContainer}>

        {roleOptions.map((option) => (
          <Button
            key={option.code}
            type="button"
            onPress={() => handleSelect(option.code)}
            className={`${styles.optionButton} ${
              selectedRole === option.code ? styles.selected : styles.notSelected
            }`}
          >
            <div className={styles.optionContent}>
              <div className={styles.imageContainer}>
                <option.image />
              </div>
              <div className={styles.textContainer}>
                <p className={styles.optionTitle}>{option.name}</p>
                <p className={styles.optionDescription}>{option.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>

      {error && (
        <p className={styles.errorMessage}>
          Пожалуйста, выберите роль перед продолжением
        </p>
      )}
    </div>
  );
};

export default StepRole;
