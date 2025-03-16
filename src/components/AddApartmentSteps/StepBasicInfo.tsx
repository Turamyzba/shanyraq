"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import MyInput from "@/components/ui/MyInput";
import MySlider from "@/components/ui/MySlider";
import MyCalendar from "@/components/ui/MyCalendar";
import MyCheckBox from "@/components/ui/MyCheckBox";
import Images from "@/components/common/Images";
import { parseDate } from "@internationalized/date";
import styles from "./StepBasicInfo.module.scss";
import MyButton from "../ui/MyButton";
import { UserRole } from "../AddApartmentSteps/StepRole";

const housematesOptions = ["1", "2", "3", "4", "5+"];

// Gender.ts
export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    ANY = "ANY",
  }
  
  export const genderOptions = [
    { code: Gender.MALE, label: "Мужчина" },
    { code: Gender.FEMALE, label: "Женщина" },
    { code: Gender.ANY, label: "Любой" },
  ];
  

const StepBasicInfo: React.FC = () => {
  const { control, watch, setValue } = useFormContext();

  // Watch current form values
  const title = watch("title");
  const gender = watch("gender");
  const livingInHome = watch("livingInHome");
  const peopleInApartment = watch("peopleInApartment");
  const roommates = watch("roommates") || 1;
  const ageRange = watch("ageRange") || [18, 50];
  const selectedRole = watch("role") === UserRole.TENANT;

  return (
    <div className={styles.container}>
      {/* Title Input */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Заголовок объявления:
        </label>
        <MyInput
          placeholder="Введите заголовок"
          className={styles.inputField}
          value={title || ""}
          onChange={(newValue) => setValue("title", newValue.target.value)}
        />
      </div>

      {/* Gender Selection using RadioGroup/Radio */}
      <div className={styles.inputGroup}>
      <label className={styles.label}>Кого вы подселяете?</label>
      <div className={styles.genderContainer}>
        {genderOptions.map((option) => (
          <div key={option.code} className={styles.radioRow}>
            {/* Show different icons based on whether selected */}
            <button onClick={() => setValue("gender", option.code)}>
                {gender === option.code ? (
                <Images.radioSelected />
                ) : (
                <Images.radioNotSelected />
                )}
            </button>

            <input
              type="radio"
              id={option.code}
              name="gender"
              value={option.code}
              checked={gender === option.code}
              onChange={(e) => setValue("gender", e.target.value)}
              className={styles.radioInput}
            />

            <label
              htmlFor={option.code}
              className={`${styles.radioLabel} ${
                gender === option.code ? styles.selected : ""
              }`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
        </div>

      {/* Living In Home Checkbox */}
      {selectedRole && (
      <div className={styles.inputGroup}>
        <label className={styles.label}>Вы проживаете в этом доме?</label>
        <MyCheckBox
          checked={livingInHome || false}
          onChange={(checked) => setValue("livingInHome", checked)}
        />
      </div>
      )}

      {/* People in Apartment */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Сколько людей проживают в квартире? (не включая вас)
        </label>
        <div className={styles.housemates}>
            {housematesOptions.map((option) => (
              <MyButton
                key={option}
                isIconOnly
                className={`${styles.housemateItem} ${
                    peopleInApartment === option ? styles.selected : ""
                }`}
                onClick={() => setValue("peopleInApartment", option)}
              >
                {option}
              </MyButton>
            ))}
        </div>
      </div>

      {/* Roommates Count */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Сколько человек подселяете?</label>
        <div className={styles.roomControls}>
          <button
            type="button"
            onClick={() => setValue("roommates", Math.max(roommates - 1, 1))}
            className={styles.roomControlButton}
          >
            <Images.MinusIcon size={15}/>
          </button>
          <span className={styles.roomCount}>{roommates}</span>
          <button
            type="button"
            onClick={() => setValue("roommates", Math.min(roommates + 1, 10))}
            className={styles.roomControlButton}
          >
            <Images.PlusIcon size={15} />
          </button>
        </div>
      </div>

      {/* Age Range Slider */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Возрастной диапазон</label>
        <Controller
          name="ageRange"
          control={control}
          render={({ field }) => (
            <MySlider
              value={field.value || [18, 50]}
              handleSliderChange={(_, newValue) => field.onChange(newValue)}
              min={18}
              max={50}
              step={1}
              className={styles.mySlider}
            />
          )}
        />
        <div className={styles.sliderValues}>
          {/* <span className={styles.sliderValue}>{ageRange[0]}</span> */}
          <MyInput
            placeholder={ageRange[0]}
            className={styles.sliderValue}
            value={ageRange[0]}
            onChange={(e) => {
                const newLower = parseInt(e.target.value, 10) || 18;
                const clampedLower = Math.min(Math.max(newLower, 18), ageRange[1]);
                setValue("ageRange", [clampedLower, ageRange[1]]);
              }}
        
            />
            <MyInput
            placeholder={ageRange[1]}
            className={styles.sliderValue}
            value={ageRange[1]}
            onChange={(e) => {
                const newUpper = parseInt(e.target.value, 10) || 50;
                const clampedUpper = Math.max(Math.min(newUpper, 50), ageRange[0]);
                setValue("ageRange", [ageRange[0], clampedUpper]);
              }}
        
            />
        </div>
      </div>
    </div>
  );
};

export default StepBasicInfo;
