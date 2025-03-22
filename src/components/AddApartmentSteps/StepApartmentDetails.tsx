"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./StepApartmentDetails.module.scss";
import Images from "@/components/common/Images";
import MySelect from "../ui/MySelect";
import MyCalendar from "../ui/MyCalendar";
import { Checkbox } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import MyInput from "../ui/MyInput";
import MyButton from "../ui/MyButton";
import MyCheckBox from "../ui/MyCheckBox";

interface AddressNode {
  Id: number;
  ParentId?: number;
  AteTypeId?: number;
  GeonimTypeId?: number;
  NameRus: string;
  NameKaz: string;
  HasChild: boolean;
  AteTypeNameKaz: string;
  AteTypeNameRus: string;
  GeonimTypeNameKaz?: string;
  GeonimTypeNameRus?: string;
  Children: AddressNode[];
}

const roomOptions = ["1", "2", "3", "4", "5+"];

const StepApartmentDetails: React.FC = () => {
  const { watch, setValue } = useFormContext();

  // Watch form values from react-hook-form
  const address = watch("address") || "";
  const monthlyPayment = watch("monthlyPayment") || "";
  const rooms = watch("rooms") || "1";
  const deposit = watch("deposit") || false;
  const depositAmount = watch("depositAmount") || 0;

  // Local state for selected items
  const [selectedRegion, setSelectedRegion] = useState<AddressNode | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<AddressNode | null>(null);
  const [selectedMicroDistrict, setSelectedMicroDistrict] = useState<AddressNode | null>(null);
  const regions: AddressNode[] = [];

  const [moveInDate, setMoveInDate] = useState(parseDate("2024-03-07"));
  // Called when the calendar date is changed.
  const handleCalendarChange = (date: any) => {
    const newDate = date || parseDate("2024-03-07");
    setMoveInDate(newDate);
    setValue("moveInDate", newDate);
  };
  return (
    <div className={styles.container}>
      {/* Region Selection */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Регион</label>
        <MySelect
          placeholder="Выберите регион"
          options={regions.map((reg) => ({
            value: reg.HasChild ? reg.Id.toString() : `${reg.Id}$`,
            label: reg.NameKaz || "",
          }))}
          value={selectedRegion?.Id ? selectedRegion.Id.toString() : ""}
          onChange={(optionValue) => {
            const found = regions.find((reg) => reg.Id.toString() === optionValue);
            setSelectedRegion(found || null);
            // reset district & microdistrict
            setSelectedDistrict(null);
            setSelectedMicroDistrict(null);
            // also update react-hook-form field if needed
            setValue("region", found?.NameKaz || "");
          }}
        />
      </div>

      {/* District Section */}
      {selectedRegion && selectedRegion.HasChild && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>Район</label>
          <MySelect
            placeholder="Выберите район"
            options={selectedRegion.Children.map((dist) => ({
              value: dist.HasChild ? dist.Id.toString() : `${dist.Id}$`,
              label: dist.NameKaz || "",
            }))}
            value={selectedDistrict?.Id ? selectedDistrict.Id.toString() : ""}
            onChange={(optionValue) => {
              const foundDist = selectedRegion.Children.find(
                (d) => d.Id.toString() === optionValue
              );
              setSelectedDistrict(foundDist || null);
              // reset microDistrict
              setSelectedMicroDistrict(null);
              setValue("district", foundDist?.NameKaz || "");
            }}
          />
        </div>
      )}

      {/* Microdistrict Section */}
      {selectedDistrict && selectedDistrict.HasChild && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>Микрорайон</label>
          <MySelect
            placeholder="Выберите микрорайон"
            options={selectedDistrict.Children.map((micro) => ({
              value: micro.HasChild ? micro.Id.toString() : `${micro.Id}$`,
              label: micro.NameKaz,
            }))}
            value={selectedMicroDistrict?.Id?.toString() || ""}
            onChange={(option) => {
              const foundMicro = selectedDistrict.Children.find((m) => m.Id.toString() === option);
              setSelectedMicroDistrict(foundMicro || null);
              setValue("microDistrict", foundMicro?.NameKaz || "");
            }}
          />
        </div>
      )}

      {/* Address Input */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Адрес:</label>
        <MyInput
          type="text"
          value={address}
          onChange={(e) => setValue("address", e.target.value)}
          placeholder="Введите адрес"
          className={styles.inputField}
        />
      </div>

      {/* Move-in Date */}
      <div className={styles.inputGroup}>
        <p className={styles.label}>Дата начала заселения</p>
        <MyCalendar
          aria-label="Дата заселения"
          value={moveInDate}
          variant="bordered"
          color={"primary"}
          onChange={handleCalendarChange}
          size="md"
          radius="sm"
        />
      </div>

      {/* Monthly Payment */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Ежемесячный платеж:</label>
        <MyInput
          type="number"
          value={monthlyPayment}
          onChange={(e) => setValue("monthlyPayment", e.target.value)}
          placeholder="Введите сумму"
          className={styles.inputField}
        />
      </div>

      {/* Rooms */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Сколько комнат в квартире?</label>
        <ul className={styles.roomsList}>
          <div className={styles.roomsList}>
            {roomOptions.map((option) => (
              <MyButton
                key={option}
                isIconOnly
                className={`${styles.roomsItem} ${
                  rooms === option ? styles.roomsItemSelected : ""
                }`}
                onClick={() => setValue("rooms", option)}
              >
                {option}
              </MyButton>
            ))}
          </div>
        </ul>
      </div>

      {/* Deposit Checkbox */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Есть ли депозит?</label>
        <div className={styles.depositRow}>
          <MyCheckBox checked={deposit} onChange={(checked) => setValue("deposit", checked)} />
          <div className={`${styles.depositAmountWrapper} ${deposit ? "" : styles.hidden}`}>
            <MyInput
              type="number"
              value={depositAmount}
              onChange={(e) => setValue("depositAmount", e.target.valueAsNumber || 0)}
              placeholder="Введите сумму"
              className={styles.inputField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepApartmentDetails;
