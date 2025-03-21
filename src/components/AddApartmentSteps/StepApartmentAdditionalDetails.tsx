"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./StepApartmentAdditionalDetails.module.scss";
import MyInput from "@/components/ui/MyInput";
import MyCheckBox from "@/components/ui/MyCheckBox";
import MyFileUpload from "@/components/ui/MyFileUpload";

const StepApartmentAdditionalDetails: React.FC = () => {
  const { watch, setValue } = useFormContext();

  // Watch form values
  const petsAllowed = watch("apartmentDetails.petsAllowed") || false;
  const utilitiesIncluded = watch("apartmentDetails.utilitiesIncluded") || false;
  const utilitiesAmount = watch("apartmentDetails.utilitiesAmount") || [0, 5000];
  const forStudents = watch("apartmentDetails.forStudents") || true;
  const badHabitsAllowed = watch("apartmentDetails.badHabitsAllowed") || false;
  const description = watch("apartmentDetails.description") || "";
  const photos = watch("apartmentDetails.photos") || [];

  // Handle utilities amount change
  const handleUtilitiesAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAmount = [...utilitiesAmount];
    newAmount[index] = parseInt(e.target.value || "0");
    setValue("apartmentDetails.utilitiesAmount", newAmount);
  };

  return (
    <div className={styles.container}>
        
      {/* Pets Allowed */}
      <div className={styles.inputGroup}>
        <MyCheckBox
          checked={petsAllowed}
          onChange={(checked) => setValue("apartmentDetails.petsAllowed", checked)}
          label="Разрешено ли с животными?"
          labelClassName={styles.secondLabel}
        />
      </div>

      {/* Utilities Included */}
      <div className={styles.inputGroup}>
        <MyCheckBox
          checked={utilitiesIncluded}
          onChange={(checked) => setValue("apartmentDetails.utilitiesIncluded", checked)}
          label="Включены ли коммунальные услуги?"
            labelClassName={styles.secondLabel}
        />
      </div>

      {/* Utilities Amount (conditionally rendered if utilities not included) */}
      {utilitiesIncluded && (
        <div className={styles.inputGroup}>
          <div className={styles.utilitiesInputs}>
            <div className={styles.inputWithLabel}>
              <span className={styles.secondLabel}>от</span>
              <MyInput
                type="number"
                value={utilitiesAmount[0].toString()}
                onChange={(e) => handleUtilitiesAmountChange(e, 0)}
                placeholder="Минимум"
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputWithLabel}>
              <span className={styles.secondLabel}>до</span>
              <MyInput
                type="number"
                value={utilitiesAmount[1].toString()}
                onChange={(e) => handleUtilitiesAmountChange(e, 1)}
                placeholder="Максимум"
                className={styles.inputField}
              />
            </div>
          </div>
        </div>
      )}

      {/* For Students */}
      <div className={styles.inputGroup}>
        <MyCheckBox
          checked={forStudents}
          onChange={(checked) => setValue("apartmentDetails.forStudents", checked)}
          label="Можно ли студентам?"
          labelClassName={styles.secondLabel}
        />
      </div>

      {/* Bad Habits Allowed */}
      <div className={styles.inputGroup}>
        <MyCheckBox
          checked={badHabitsAllowed}
          onChange={(checked) => setValue("apartmentDetails.badHabitsAllowed", checked)}
          label="С вредными привычками"
          labelClassName={styles.secondLabel}
        />
      </div>

      {/* Description */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Описание квартиры:</label>
        <textarea
          value={description}
          onChange={(e) => setValue("apartmentDetails.description", e.target.value)}
          placeholder="Введите описание квартиры..."
          className={styles.textAreaField}
        />
        {description.trim().length < 10 && (
          <p className={styles.errorText}>Минимум 10 символов</p>
        )}
      </div>

      {/* Photos Upload */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Загрузите фотографии:</label>
        <MyFileUpload 
            photos={photos} 
            setPhotos={(newPhotos) => setValue("apartmentDetails.photos", newPhotos)}
            maxCount={8}
          />
        {photos.length < 5 && (
          <p className={styles.errorText}>Добавьте минимум 5 фотографий</p>
        )}
      </div>
    </div>
  );
};

export default StepApartmentAdditionalDetails;