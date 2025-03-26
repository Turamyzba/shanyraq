"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./StepApartmentFullDetails.module.scss";
import MyInput from "@/components/ui/MyInput";
import MyPhoneInput from "@/components/ui/MyPhoneInput";
import { Button as MyButton } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import Images from "@/components/common/Images";
import { Plus, X, User, Phone } from "lucide-react";
import { propertyTypeOptions } from "@/types/common";

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
  const roomSize = watch("apartmentDetails.roomSize") || 0;
  const longTerm = watch("apartmentDetails.longTerm") || false;
  const ownerName = watch("apartmentDetails.ownerName") || "";
  const ownerPhones = watch("apartmentDetails.ownerPhones") || [];
  const residents: Resident[] = watch("apartmentDetails.residents") || [];
  const peopleInApartment = watch("peopleInApartment") || "1";

  // Local state for UI
  const [showAddOwnerPhone, setShowAddOwnerPhone] = useState(false);
  const [newOwnerPhone, setNewOwnerPhone] = useState("+7 ");
  const [showAddResidentForm, setShowAddResidentForm] = useState(false);
  const [newResidentName, setNewResidentName] = useState("");
  const [newResidentPhone, setNewResidentPhone] = useState("+7 ");
  const [showAddResidentPhone, setShowAddResidentPhone] = useState(false);
  const [selectedResidentIndex, setSelectedResidentIndex] = useState<number | null>(null);
  const [newPhoneForResident, setNewPhoneForResident] = useState("+7 ");

  // Get max number of residents allowed
  const getMaxResidents = () => {
    if (peopleInApartment === "5+") return 5;
    return parseInt(peopleInApartment);
  };

  // Form validation helpers
  const isPhoneValid = (phone: string) => {
    // Remove all non-digit characters and check if it has at least 10 digits
    return phone.replace(/\D/g, "").length >= 11; // +7 plus 10 digits
  };

  // Handle adding a new owner phone
  const handleAddOwnerPhone = () => {
    if (newOwnerPhone && isPhoneValid(newOwnerPhone)) {
      // Preserve the exact format of the phone as entered by the user
      const updatedPhones = [...ownerPhones, newOwnerPhone];
      setValue("apartmentDetails.ownerPhones", updatedPhones);
      setNewOwnerPhone("+7 ");
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
      // Preserve the exact format of the phone as entered by the user
      const newResident: Resident = {
        name: newResidentName,
        phones: [newResidentPhone],
      };

      const updatedResidents = [...residents, newResident];
      setValue("apartmentDetails.residents", updatedResidents);

      // Reset form
      setNewResidentName("");
      setNewResidentPhone("+7 ");
      setShowAddResidentForm(false);
    }
  };

  // Handle adding a phone to an existing resident
  const handleAddPhoneToResident = (residentIndex: number) => {
    if (newPhoneForResident && isPhoneValid(newPhoneForResident)) {
      // Preserve the exact format of the phone as entered by the user
      const updatedResidents = [...residents];
      updatedResidents[residentIndex].phones.push(newPhoneForResident);
      setValue("apartmentDetails.residents", updatedResidents);

      // Reset
      setNewPhoneForResident("+7 ");
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

  // Handle phone input change for owner
  const handleOwnerPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Preserve the exact format returned by MyPhoneInput
    setNewOwnerPhone(e.target.value);
  };

  // Handle phone input change for resident
  const handleResidentPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Preserve the exact format returned by MyPhoneInput
    setNewResidentPhone(e.target.value);
  };

  // Handle phone input change for adding to existing resident
  const handlePhoneForResidentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Preserve the exact format returned by MyPhoneInput
    setNewPhoneForResident(e.target.value);
  };

  return (
    <div className={styles.container}>
      {/* Property Type Selection */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Тип жилья:</label>
        <div className={styles.propertyTypeContainer}>
          {propertyTypeOptions.map((option) => (
            <div key={option.id} className={styles.radioRow}>
              <button
                onClick={() => {
                  setValue("apartmentDetails.propertyType", option.code);
                }}
              >
                {propertyType === option.code ? (
                  <Images.radioSelected />
                ) : (
                  <Images.radioNotSelected />
                )}
              </button>
              <input
                type="radio"
                id={option.code}
                name="propertyType"
                value={option.code}
                checked={propertyType === option.code}
                onChange={() => {
                  setValue("apartmentDetails.propertyType", option.code);
                }}
                className={styles.radioInput}
              />
              <label
                htmlFor={option.code}
                className={`${styles.radioLabel} ${
                  propertyType === option.code ? styles.selected : ""
                }`}
              >
                {option.namerus}
              </label>
            </div>
          ))}
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

      <div className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Контактная информация владельца</h2>

        <div className={styles.inputGroup}>
          <label className={styles.secondaryLabel}>Имя владельца</label>
          <MyInput
            type="text"
            placeholder="Введите имя владельца"
            value={ownerName}
            startContent={<User className="h-4 w-4 text-default-400" />}
            onChange={(e) => setValue("apartmentDetails.ownerName", e.target.value)}
          />
        </div>

        <h3 className={styles.secondaryLabel}>Контактные телефоны</h3>

        <div className={styles.phoneNumberList}>
          {ownerPhones.map((phone: any, index: any) => (
            <div key={index} className={styles.phoneItem}>
              <div className={styles.phoneNumber}>
                <Phone className="h-4 w-4 text-default-400 mr-2" />
                <span>{phone}</span>
              </div>
              <button
                onClick={() => handleRemoveOwnerPhone(index)}
                className={styles.removePhoneButton}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {showAddOwnerPhone ? (
          <div className={styles.addPhoneForm}>
            <MyPhoneInput
              value={newOwnerPhone}
              onChange={handleOwnerPhoneChange}
              placeholder="+7 ___ ___ ____"
              variant="bordered"
              color="primary"
              labelPlacement="outside"
            />
            <div className={styles.addPhoneButtons}>
              <MyButton
                onPress={handleAddOwnerPhone}
                className={styles.addButton}
                isDisabled={!isPhoneValid(newOwnerPhone)}
              >
                Добавить
              </MyButton>
              <MyButton
                onPress={() => {
                  setShowAddOwnerPhone(false);
                  setNewOwnerPhone("+7 ");
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
            <Plus size={16} color="#1AA683" />
            <span className={styles.addPhoneText}>Добавить телефон</span>
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
              <X size={16} />
            </button>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.secondaryLabel}>Имя в личных сообщениях</label>
            <MyInput
              type="text"
              placeholder="Введите имя"
              value={resident.name}
              startContent={<User className="h-4 w-4 text-default-400" />}
              onChange={(e) => {
                const updatedResidents = [...residents];
                updatedResidents[residentIndex].name = e.target.value;
                setValue("apartmentDetails.residents", updatedResidents);
              }}
            />
          </div>

          <div className={styles.contactSection}>
            <h4 className={styles.secondaryLabel}>Контактные телефоны</h4>

            <div className={styles.phoneNumberList}>
              {resident.phones.map((phone, phoneIndex) => (
                <div key={phoneIndex} className={styles.phoneItem}>
                  <div className={styles.phoneNumber}>
                    <Phone className="h-4 w-4 text-default-400 mr-2" />
                    <span>{phone}</span>
                  </div>
                  {phoneIndex > 0 && (
                    <button
                      onClick={() => handleRemoveResidentPhone(residentIndex, phoneIndex)}
                      className={styles.removePhoneButton}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {selectedResidentIndex === residentIndex && showAddResidentPhone ? (
              <div className={styles.addPhoneForm}>
                <MyPhoneInput
                  value={newPhoneForResident}
                  onChange={handlePhoneForResidentChange}
                  placeholder="+7 ___ ___ ____"
                  variant="bordered"
                  color="primary"
                  labelPlacement="outside"
                />
                <div className={styles.addPhoneButtons}>
                  <MyButton
                    onPress={() => handleAddPhoneToResident(residentIndex)}
                    className={styles.addButton}
                    isDisabled={!isPhoneValid(newPhoneForResident)}
                  >
                    Добавить
                  </MyButton>
                  <MyButton
                    onPress={() => {
                      setShowAddResidentPhone(false);
                      setNewPhoneForResident("+7 ");
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
                <Plus size={16} color="#1AA683" />
                <span className={styles.addPhoneText}>Добавить еще телефоны</span>
              </button>
            )}
          </div>

          <hr className={styles.divider} />
        </div>
      ))}

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
              startContent={<User className="h-4 w-4 text-default-400" />}
              onChange={(e) => setNewResidentName(e.target.value)}
            />
          </div>

          {/* Resident Phone */}
          <div className={styles.contactSection}>
            <h4 className={styles.secondaryLabel}>Контактные телефоны</h4>

            <div className={styles.addPhoneForm}>
              <MyPhoneInput
                value={newResidentPhone}
                onChange={handleResidentPhoneChange}
                placeholder="+7 ___ ___ ____"
                variant="bordered"
                color="primary"
                labelPlacement="outside"
              />
            </div>

            <div className={styles.addPhoneButtons}>
              <MyButton
                onPress={handleAddResident}
                className={styles.addButton}
                isDisabled={!newResidentName || !isPhoneValid(newResidentPhone)}
              >
                Добавить
              </MyButton>
              <MyButton
                onClick={() => {
                  setShowAddResidentForm(false);
                  setNewResidentName("");
                  setNewResidentPhone("+7 ");
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

      {!showAddResidentForm && residents.length < getMaxResidents() && (
        <MyButton
          onClick={() => setShowAddResidentForm(true)}
          className={styles.addContactButton}
          variant="bordered"
        >
          <Plus size={16} />
          <span>Добавить контакты жителей</span>
        </MyButton>
      )}

      {residents.length >= getMaxResidents() && !showAddResidentForm && (
        <div className={styles.maxResidentsMessage}>
          <p>Достигнуто максимальное количество жителей ({getMaxResidents()})</p>
        </div>
      )}
    </div>
  );
};

export default StepApartmentFullDetails;
