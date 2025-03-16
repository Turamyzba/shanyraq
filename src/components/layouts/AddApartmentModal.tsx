"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import styles from "./AddApartmentModal.module.scss";
import { useForm, FormProvider } from "react-hook-form";

import StepRole, { UserRole } from "../AddApartmentSteps/StepRole";
import StepBasicInfo from "../AddApartmentSteps/StepBasicInfo";
import StepApartmentDetails from "../AddApartmentSteps/StepApartmentDetails";
// import StepApartmentAdditionalDetails from "../AddApartmentSteps/StepApartmentAdditionalDetails";
// import StepApartmentFullDetails from "../AddApartmentSteps/StepApartmentFullDetails";
// import StepSuccess from "../AddApartmentSteps/StepSuccess";

const defaultValues = {
    role: UserRole.TENANT,
    title: "",
    gender: "",
    roommates: 1,
    peopleInApartment: 0,
    region: "",
    district: "",
    microDistrict: "",
    address: "",
    moveInDate: "",
    monthlyPayment: "",
    livingInHome: true,
    ageRange: [18, 50],
    deposit: false,
    depositAmount: 0,
    apartmentDetails: {
      petsAllowed: false,
      utilitiesIncluded: false,
      utilitiesAmount: [0, 5000],
      forStudents: false,
      badHabitsAllowed: false,
      description: "",
      photos: [],
      rooms: "1",
      propertyType: "",
      floorsFrom: 1,
      floorsTo: 3,
      ownerPhone: "",
      longTerm: false,
      roomSize: 0,
    },
    selectedAdjectives: [],
  };  

const AddApartmentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  // Form state shared across all steps
  const methods = useForm({ defaultValues });

  const [currentStep, setCurrentStep] = useState(3);

  // List of steps with the respective component.
  // Note that each step component now receives the form state and updater.
  const steps = [
    {
      id: 1,
      name: "Создание нового объявления",
      component: <StepRole />,
    },
    {
      id: 2,
      name: "Основная информация",
      component: <StepBasicInfo />,
    },
    {
      id: 3,
      name: "Детали квартиры",
      component: <StepApartmentDetails />,
    },
    // {
    //   id: 4,
    //   name: "Дополнительные детали",
    //   component: <StepApartmentAdditionalDetails formData={formData} setFormData={setFormData} />,
    // },
    // {
    //   id: 5,
    //   name: "Полные детали",
    //   component: <StepApartmentFullDetails formData={formData} setFormData={setFormData} />,
    // },
    // {
    //   id: 6,
    //   name: "Успех",
    //   component: <StepSuccess />,
    // },
  ];

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    // Here you can perform your final submission logic.
    const values = methods.getValues();
    console.log("Form values:", values);
    onClose();
  };

  const renderFooterButtons = () => {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.leftButtons}>
          {currentStep > 1 ? (
            <Button className={styles.backButton} onPress={handleBack}>
              Назад
            </Button>
          ):
          (
            <Button className={styles.cancelButton} onPress={onClose}>
                Отмена
            </Button>
          )
          }
        </div>
        <div className={styles.rightButtons}>
          {currentStep < steps.length && (
            <Button className={styles.nextButton} onPress={handleNext}>
              Далее
            </Button>
          )}
          {currentStep === steps.length && (
            <Button className={styles.finishButton} onPress={handleFinish}>
              Завершить
            </Button>
          )}
        </div>
      </div>
    );
  };  

  return (
    <FormProvider {...methods}>
        <Modal
        backdrop="blur"
        onClose={onClose}
        size="4xl"
        isOpen={isOpen}
        isDismissable={false}
        scrollBehavior="outside" 
        >
        <ModalContent className={styles.modalContent}>
            <ModalHeader className={styles.modalHeader}>
            <h2>{steps[currentStep - 1].name}</h2>
            </ModalHeader>
            <ModalBody className={styles.modalBody}>
            {steps[currentStep - 1].component}
            </ModalBody>
            <ModalFooter className={styles.modalFooter}>
            {renderFooterButtons()}
            </ModalFooter>
        </ModalContent>
        </Modal>
    </FormProvider>

  );
};

export default AddApartmentModal;
