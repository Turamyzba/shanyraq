"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./StepSuccess.module.scss";
import Images from "@/components/common/Images";
import { Checkbox } from "@heroui/react";

const StepSuccess: React.FC = () => {
  const { watch, setValue } = useFormContext();
  
  // Watch form values
  const selectedAdjectives = watch("selectedAdjectives") || [];
  
  // List of adjectives
  const adjectives = [
    "Платежеспособная/ный",
    "Чистоплотная/ный",
    "Ответственная/ный",
    "Порядочная/ный",
    "Неконфликтная/ный",
    "Религиозная/ный",
    "Аккуратная/ный",
  ];

  // Handle adjective selection
  const handleAdjectiveChange = (adj: string) => {
    const updatedAdjectives = selectedAdjectives.includes(adj)
      ? selectedAdjectives.filter((item: string) => item !== adj)
      : [...selectedAdjectives, adj];
    
    setValue("selectedAdjectives", updatedAdjectives);
  };

  return (
    <div className={styles.container}>
      <div className={styles.successWrapper}>
        <Images.Finish size={100} color="#1aa683" />
        <h2 className={styles.successTitle}>
          Поздравляем! Ваше объявление успешно загружено
        </h2>
      </div>

      <div className={styles.adjectivesSection}>
        <h3 className={styles.adjectivesTitle}>
          Каким вы предпочитаете видеть своего соседа?
        </h3>

        <ul className={styles.adjectivesList}>
          {adjectives.map((adj, index) => (
            <li key={index} className={styles.adjectiveItem}>
              <Checkbox
                isSelected={selectedAdjectives.includes(adj)}
                onValueChange={() => handleAdjectiveChange(adj)}
                radius="sm"
                color="primary"
              >
                <span className={styles.adjectiveLabel}>{adj}</span>
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepSuccess;