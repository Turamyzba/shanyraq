"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./StepApartmentDetails.module.scss";
import MySelect from "../ui/MySelect";
import MyCalendar from "../ui/MyCalendar";
import { CalendarDate, parseDate } from "@internationalized/date";
import MyInput from "../ui/MyInput";
import MyButton from "../ui/MyButton";
import MyCheckBox from "../ui/MyCheckBox";
import { AddressType, roommateOptions } from "@/types/common";
import { formatDate } from "@/utils/helpers";

interface StepApartmentDetailsProps {
  citiesData: AddressType[];
  districtsData: AddressType[];
  setDistrictsData: React.Dispatch<React.SetStateAction<AddressType[]>>;
  microDistrictsData: AddressType[];
  setMicroDistrictsData: React.Dispatch<React.SetStateAction<AddressType[]>>;
  fetchCities: () => Promise<void>;
  fetchDistricts: (cityId: number) => Promise<void>;
  fetchMicroDistricts: (districtId: number) => Promise<void>;
  isAddressLoading: boolean;
}

const StepApartmentDetails: React.FC<StepApartmentDetailsProps> = ({
  citiesData,
  districtsData,
  setDistrictsData,
  microDistrictsData,
  setMicroDistrictsData,
  fetchCities,
  fetchDistricts,
  fetchMicroDistricts,
  isAddressLoading,
}) => {
  const { watch, setValue } = useFormContext();

  const address = watch("address") || "";
  const regionValue = watch("region") || "";
  const districtValue = watch("district") || "";
  const microDistrictValue = watch("microDistrict") || "";
  const monthlyPayment = watch("monthlyPayment") || "";
  const rooms = watch("rooms") || "1";
  const deposit = watch("deposit") || false;
  const depositAmount = watch("depositAmount") || 0;
  const moveInDateValue = watch("moveInDate");

  console.log("Form values:", {
    region: regionValue,
    district: districtValue,
    microDistrict: microDistrictValue,
  });

  const regionValueStr = regionValue ? regionValue.toString() : "";
  const districtValueStr = districtValue ? districtValue.toString() : "";
  const microDistrictValueStr = microDistrictValue ? microDistrictValue.toString() : "";

  const [moveInDate, setMoveInDate] = useState<CalendarDate>(
    moveInDateValue ? parseDate(moveInDateValue) : parseDate(formatDate(new Date()))
  );

  useEffect(() => {
    const loadInitialData = async () => {
      if (citiesData.length === 0) {
        await fetchCities();
      }

      if (regionValue && districtsData.length === 0) {
        await fetchDistricts(Number(regionValue));
      }

      if (districtValue && microDistrictsData.length === 0) {
        await fetchMicroDistricts(Number(districtValue));
      }
    };

    loadInitialData();
  }, []);

  const handleRegionSelect = (value: string) => {
    const selectedRegion = citiesData.find((reg) => reg.id.toString() === value);

    setDistrictsData([]);
    setMicroDistrictsData([]);

    setValue("region", selectedRegion?.id || null);
    setValue("district", null);
    setValue("microDistrict", null);

    if (selectedRegion && selectedRegion.haschild) {
      fetchDistricts(selectedRegion.id);
    }
  };

  const handleDistrictSelect = (value: string) => {
    const selectedDistrict = districtsData.find((dist) => dist.id.toString() === value);

    setMicroDistrictsData([]);

    setValue("district", selectedDistrict?.id || null);
    setValue("microDistrict", null);

    if (selectedDistrict && selectedDistrict.haschild) {
      fetchMicroDistricts(selectedDistrict.id);
    }
  };

  const handleMicroDistrictSelect = (value: string) => {
    const selectedMicroDistrict = microDistrictsData.find((micro) => micro.id.toString() === value);

    setValue("microDistrict", selectedMicroDistrict?.id || null);
  };

  const handleCalendarChange = (date: CalendarDate | null) => {
    const newDate = date || parseDate(formatDate(new Date()));
    setMoveInDate(newDate);
    setValue("moveInDate", formatDate(newDate.toDate("UTC")));
  };

  return (
    <div className={styles.container}>
      {/* Region Selection */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Регион</label>
        <MySelect
          placeholder="Выберите регион"
          options={citiesData.map((reg) => ({
            value: reg.id.toString(),
            label: reg.namerus,
          }))}
          value={regionValueStr}
          onChange={handleRegionSelect}
          isLoading={isAddressLoading && !citiesData.length}
        />
      </div>

      {/* District Section */}
      {districtsData.length > 0 && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>Район</label>
          <MySelect
            placeholder="Выберите район"
            options={districtsData.map((dist) => ({
              value: dist.id.toString(),
              label: dist.namerus,
            }))}
            value={districtValueStr}
            onChange={handleDistrictSelect}
            isLoading={isAddressLoading && !districtsData.length}
          />
        </div>
      )}

      {/* Microdistrict Section */}
      {microDistrictsData.length > 0 && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>Микрорайон</label>
          <MySelect
            placeholder="Выберите микрорайон"
            options={microDistrictsData.map((micro) => ({
              value: micro.id.toString(),
              label: micro.namerus,
            }))}
            value={microDistrictValueStr}
            onChange={handleMicroDistrictSelect}
            isLoading={isAddressLoading && !microDistrictsData.length}
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
            {roommateOptions.map((option) => (
              <MyButton
                key={option.id}
                isIconOnly
                className={`${styles.roomsItem} ${
                  rooms === option.id ? styles.roomsItemSelected : ""
                }`}
                onClick={() => setValue("rooms", option.id)}
              >
                {option.name}
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
