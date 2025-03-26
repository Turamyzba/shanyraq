"use client";

import React, { useState } from "react";
import styles from "./StepRole.module.scss";
import { Button } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { roleOptions } from "@/types/common";

const StepRole: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const selectedRole = watch("role");

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
            onPress={() => setValue("role", option.code)}
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
    </div>
  );
};

export default StepRole;
