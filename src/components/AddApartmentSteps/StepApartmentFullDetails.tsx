"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./StepApartmentFullDetails.module.scss";
import MyInput from "@/components/ui/MyInput";
// import MyButton from "@/components/ui/MyButton";
import { Button as MyButton } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import Images from "@/components/common/Images";

interface Resident {
  name: string;
  phones: string[];
}

const StepApartmentFullDetails: React.FC = () => {
  const { watch, setValue } = useFormContext();

  // Watch form values
  const propertyType = watch("apartmentDetails.propertyType") || "";
  const floorsFrom = watch("apartmentDetails.floorsFrom") || 1;
  const floorsTo = watch("apartmentDetails.floorsTo") || 3;
  const roomSize = watch("apartmentDetails.roomSize") || 0; // Changed to single value
  const longTerm = watch("apartmentDetails.longTerm") || false;
  const ownerPhones = watch("apartmentDetails.ownerPhones") || []; // Array of phone numbers
  const residents: Resident[] = watch("apartmentDetails.residents") || []; // Array of residents
  const peopleInApartment = watch("peopleInApartment") || "1"; // Number of people in apartment

  // Local state for UI
  const [showAddOwnerPhone, setShowAddOwnerPhone] = useState(false);
  const [newOwnerPhone, setNewOwnerPhone] = useState("");
  const [showAddResidentForm, setShowAddResidentForm] = useState(false);
  const [newResidentName, setNewResidentName] = useState("");
  const [newResidentPhone, setNewResidentPhone] = useState("");
  const [showAddResidentPhone, setShowAddResidentPhone] = useState(false);
  const [selectedResidentIndex, setSelectedResidentIndex] = useState<number | null>(null);
  const [newPhoneForResident, setNewPhoneForResident] = useState("");

  // Get max number of residents allowed
  const getMaxResidents = () => {
    if (peopleInApartment === "5+") return 5;
    return parseInt(peopleInApartment);
  };

  // Form validation helpers
  const isPhoneValid = (phone: string) => {
    // Remove all non-digit characters and check if it has at least 10 digits
    return phone.replace(/\D/g, "").length >= 10;
  };

  // Handle adding a new owner phone
  const handleAddOwnerPhone = () => {
    if (newOwnerPhone && isPhoneValid(newOwnerPhone)) {
      const updatedPhones = [...ownerPhones, newOwnerPhone];
      setValue("apartmentDetails.ownerPhones", updatedPhones);
      setNewOwnerPhone("");
      setShowAddOwnerPhone(false);
    }
  };

  // Handle removing an owner phone
  const handleRemoveOwnerPhone = (index: number) => {
    const updatedPhones = ownerPhones.filter((_: any, i: any) => i !== index);
    setValue("apartmentDetails.ownerPhones", updatedPhones);
  };

  // Handle adding a new resident
  const handleAddResident = () => {
    if (newResidentName && newResidentPhone && isPhoneValid(newResidentPhone)) {
      const newResident: Resident = {
        name: newResidentName,
        phones: [newResidentPhone],
      };

      const updatedResidents = [...residents, newResident];
      setValue("apartmentDetails.residents", updatedResidents);

      // Reset form
      setNewResidentName("");
      setNewResidentPhone("");
      setShowAddResidentForm(false);
    }
  };

  // Handle adding a phone to an existing resident
  const handleAddPhoneToResident = (residentIndex: number) => {
    if (newPhoneForResident && isPhoneValid(newPhoneForResident)) {
      const updatedResidents = [...residents];
      updatedResidents[residentIndex].phones.push(newPhoneForResident);
      setValue("apartmentDetails.residents", updatedResidents);

      // Reset
      setNewPhoneForResident("");
      setShowAddResidentPhone(false);
      setSelectedResidentIndex(null);
    }
  };

  // Handle removing a phone from a resident
  const handleRemoveResidentPhone = (residentIndex: number, phoneIndex: number) => {
    const updatedResidents = [...residents];
    updatedResidents[residentIndex].phones = updatedResidents[residentIndex].phones.filter(
      (_, i) => i !== phoneIndex
    );
    setValue("apartmentDetails.residents", updatedResidents);
  };

  // Handle removing a resident
  const handleRemoveResident = (index: number) => {
    const updatedResidents = residents.filter((_, i) => i !== index);
    setValue("apartmentDetails.residents", updatedResidents);
  };

  return (
    <div className={styles.container}>
      {/* Property Type Selection */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Тип жилья:</label>
        <div className={styles.propertyTypeContainer}>
          <div className={styles.radioRow}>
            <button onClick={() => setValue("apartmentDetails.propertyType", "Квартира")}>
              {propertyType === "Квартира" ? <Images.radioSelected /> : <Images.radioNotSelected />}
            </button>
            <input
              type="radio"
              id="apartment"
              name="propertyType"
              value="Квартира"
              checked={propertyType === "Квартира"}
              onChange={() => setValue("apartmentDetails.propertyType", "Квартира")}
              className={styles.radioInput}
            />
            <label
              htmlFor="apartment"
              className={`${styles.radioLabel} ${
                propertyType === "Квартира" ? styles.selected : ""
              }`}
            >
              Квартира
            </label>
          </div>

          <div className={styles.radioRow}>
            <button onClick={() => setValue("apartmentDetails.propertyType", "Дом")}>
              {propertyType === "Дом" ? <Images.radioSelected /> : <Images.radioNotSelected />}
            </button>
            <input
              type="radio"
              id="house"
              name="propertyType"
              value="Дом"
              checked={propertyType === "Дом"}
              onChange={() => setValue("apartmentDetails.propertyType", "Дом")}
              className={styles.radioInput}
            />
            <label
              htmlFor="house"
              className={`${styles.radioLabel} ${propertyType === "Дом" ? styles.selected : ""}`}
            >
              Дом
            </label>
          </div>
        </div>
      </div>

      {/* Floor Information */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Этаж:</label>
        <div className={styles.floorsContainer}>
          <MyInput
            type="number"
            placeholder="Текущий этаж"
            value={floorsFrom.toString()}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1) {
                setValue("apartmentDetails.floorsFrom", value);
              }
            }}
            className={styles.floorInput}
          />
          <span className={styles.floorDivider}>из</span>
          <MyInput
            type="number"
            placeholder="Всего этажей"
            value={floorsTo.toString()}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= floorsFrom) {
                setValue("apartmentDetails.floorsTo", value);
              }
            }}
            className={styles.floorInput}
          />
        </div>
        {floorsFrom > floorsTo && (
          <p className={styles.errorText}>
            Текущий этаж не может быть больше общего количества этажей
          </p>
        )}
      </div>

      {/* Room Size - Single Input */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Площадь комнаты (кв. м):</label>
        <MyInput
          type="number"
          placeholder="Введите площадь"
          value={roomSize ? roomSize.toString() : ""}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 0) {
              setValue("apartmentDetails.roomSize", value);
            } else {
              setValue("apartmentDetails.roomSize", 0);
            }
          }}
        />
      </div>

      {/* Long Term Option */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>На долгий срок?</label>
        <Checkbox
          isSelected={longTerm}
          onValueChange={(checked) => setValue("apartmentDetails.longTerm", checked)}
          radius="sm"
          color="primary"
        >
          <span className={styles.checkboxLabel}>Да</span>
        </Checkbox>
      </div>

      <hr className={styles.divider} />

      {/* Owner Phone Numbers Section */}
      <div className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Контактные телефоны</h2>

        {/* Display existing phone numbers */}
        <div className={styles.phoneNumberList}>
          {ownerPhones.map((phone: any, index: any) => (
            <div key={index} className={styles.phoneItem}>
              <div className={styles.phoneNumber}>
                <Checkbox
                  isSelected={true}
                  onValueChange={() => {}}
                  radius="sm"
                  color="primary"
                  className={styles.phoneCheckbox}
                />
                <span>{phone}</span>
              </div>
              <button
                onClick={() => handleRemoveOwnerPhone(index)}
                className={styles.removePhoneButton}
              >
                <Images.closeIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Add new phone section */}
        {showAddOwnerPhone ? (
          <div className={styles.addPhoneForm}>
            <MyInput
              value={newOwnerPhone}
              onChange={(e: any) => setNewOwnerPhone(e.target.value)}
            />
            <div className={styles.addPhoneButtons}>
              <MyButton onPress={handleAddOwnerPhone} className={styles.addButton}>
                Добавить
              </MyButton>
              <MyButton
                onPress={() => {
                  setShowAddOwnerPhone(false);
                  setNewOwnerPhone("");
                }}
                className={styles.cancelButton}
                variant="bordered"
              >
                Отмена
              </MyButton>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAddOwnerPhone(true)} className={styles.addPhoneButton}>
            <Images.Plus size={16} color="#1AA683" />
            <span className={styles.addPhoneText}>Добавить еще телефоны</span>
          </button>
        )}
      </div>

      <hr className={styles.divider} />

      {/* Residents Section */}
      {residents.map((resident, residentIndex) => (
        <div key={residentIndex} className={styles.residentBlock}>
          <div className={styles.residentHeader}>
            <h3 className={styles.contactTitle}>Добавление контактов жителей</h3>
            <button
              onClick={() => handleRemoveResident(residentIndex)}
              className={styles.removeButton}
            >
              <Images.closeIcon />
            </button>
          </div>

          {/* Resident Name */}
          <div className={styles.inputGroup}>
            <label className={styles.secondaryLabel}>Имя в личных сообщениях</label>
            <MyInput
              type="text"
              placeholder="Введите имя"
              value={resident.name}
              onChange={(e) => {
                const updatedResidents = [...residents];
                updatedResidents[residentIndex].name = e.target.value;
                setValue("apartmentDetails.residents", updatedResidents);
              }}
            />
          </div>

          {/* Resident Phones */}
          <div className={styles.contactSection}>
            <h4 className={styles.secondaryLabel}>Контактные телефоны</h4>

            <div className={styles.phoneNumberList}>
              {resident.phones.map((phone, phoneIndex) => (
                <div key={phoneIndex} className={styles.phoneItem}>
                  <div className={styles.phoneNumber}>
                    <Checkbox
                      isSelected={true}
                      onValueChange={() => {}}
                      radius="sm"
                      color="primary"
                      className={styles.phoneCheckbox}
                    />
                    <span>{phone}</span>
                  </div>
                  {phoneIndex > 0 && (
                    <button
                      onClick={() => handleRemoveResidentPhone(residentIndex, phoneIndex)}
                      className={styles.removePhoneButton}
                    >
                      <Images.closeIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add phone for existing resident */}
            {selectedResidentIndex === residentIndex && showAddResidentPhone ? (
              <div className={styles.addPhoneForm}>
                <MyInput
                  value={newPhoneForResident}
                  onChange={(e: any) => setNewPhoneForResident(e.target.value)}
                />
                <div className={styles.addPhoneButtons}>
                  <MyButton
                    onPress={() => handleAddPhoneToResident(residentIndex)}
                    className={styles.addButton}
                  >
                    Добавить
                  </MyButton>
                  <MyButton
                    onPress={() => {
                      setShowAddResidentPhone(false);
                      setNewPhoneForResident("");
                      setSelectedResidentIndex(null);
                    }}
                    className={styles.cancelButton}
                    variant="bordered"
                  >
                    Отмена
                  </MyButton>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSelectedResidentIndex(residentIndex);
                  setShowAddResidentPhone(true);
                }}
                className={styles.addPhoneButton}
              >
                <Images.Plus size={16} color="#1AA683" />
                <span className={styles.addPhoneText}>Добавить еще телефоны</span>
              </button>
            )}
          </div>

          <hr className={styles.divider} />
        </div>
      ))}

      {/* Add New Resident Form */}
      {showAddResidentForm && (
        <div className={styles.residentBlock}>
          <h3 className={styles.contactTitle}>Добавление контактов жителей</h3>

          {/* Resident Name */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Имя в личных сообщениях</label>
            <MyInput
              type="text"
              placeholder="Введите имя"
              value={newResidentName}
              onChange={(e) => setNewResidentName(e.target.value)}
            />
          </div>

          {/* Resident Phone */}
          <div className={styles.contactSection}>
            <h4 className={styles.secondaryLabel}>Контактные телефоны</h4>

            <div className={styles.addPhoneForm}>
              <MyInput
                value={newResidentPhone}
                onChange={(e: any) => setNewResidentPhone(e.target.value)}
              />
            </div>

            <div className={styles.addPhoneButtons}>
              <MyButton onPress={handleAddResident} className={styles.addButton}>
                Добавить
              </MyButton>
              <MyButton
                onClick={() => {
                  setShowAddResidentForm(false);
                  setNewResidentName("");
                  setNewResidentPhone("");
                }}
                className={styles.cancelButton}
                variant="bordered"
              >
                Отмена
              </MyButton>
            </div>
          </div>

          <hr className={styles.divider} />
        </div>
      )}

      {/* Add more residents button - only show if we haven't reached the limit */}
      {!showAddResidentForm && residents.length < getMaxResidents() && (
        <MyButton
          onClick={() => setShowAddResidentForm(true)}
          className={styles.addContactButton}
          variant="bordered"
        >
          <Images.Plus size={16} />
          <span>Добавить контакты жителей</span>
        </MyButton>
      )}
    </div>
  );
};

export default StepApartmentFullDetails;
