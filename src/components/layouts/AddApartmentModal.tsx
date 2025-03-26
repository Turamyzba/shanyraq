"use client";

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import styles from "./AddApartmentModal.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { validateFormStep } from "@/utils/formValidation";
import { shouldSubmitStep, ApiDataTracker } from "@/utils/enhancedFormChangeDetector";

import { 
  StepRole, 
  StepBasicInfo, 
  StepApartmentDetails, 
  StepApartmentAdditionalDetails, 
  StepApartmentFullDetails, 
  StepSuccess 
} from "../AddApartmentSteps";
import { 
  mapFormToApiRequest, 
  useCreateAnnouncementStep1Mutation, 
  useCreateAnnouncementStep2Mutation, 
  useCreateAnnouncementStep3Mutation, 
  useCreateAnnouncementStep4Mutation, 
  useCreateAnnouncementStep5Mutation, 
  useCreateAnnouncementStep6Mutation 
} from "@/store/features/addAnnouncement/announcementApi";
import { showToast } from "@/utils/notification";
import { AddressType } from "@/types/common";
import { useLazyGetAddressesQuery } from "@/store/features/landing/landingApi";

const defaultValues = {
  role: "",
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

const AddApartmentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const methods = useForm({ defaultValues });
  const apiDataTracker = ApiDataTracker.getInstance();

  const [currentStep, setCurrentStep] = useState(5);
  const [announcementId, setAnnouncementId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [createStep1] = useCreateAnnouncementStep1Mutation();
  const [createStep2] = useCreateAnnouncementStep2Mutation();
  const [createStep3] = useCreateAnnouncementStep3Mutation();
  const [createStep4] = useCreateAnnouncementStep4Mutation();
  const [createStep5] = useCreateAnnouncementStep5Mutation();
  const [createStep6] = useCreateAnnouncementStep6Mutation();
  
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [citiesData, setCitiesData] = useState<AddressType[]>([]);
  const [districtsData, setDistrictsData] = useState<AddressType[]>([]);
  const [microDistrictsData, setMicroDistrictsData] = useState<AddressType[]>([]);

  const [getAddresses, { isLoading: getAddressIsLoading }] = useLazyGetAddressesQuery();

  const fetchCities = async () => {
    setIsAddressLoading(true);
    getAddresses(1)
      .then(({ data }) => {
        setCitiesData(data?.data as AddressType[]);
      })
      .finally(() => {
        setIsAddressLoading(false);
      });
  };

  const fetchDistricts = async (cityId: number) => {
    setIsAddressLoading(true);
    getAddresses(cityId)
      .then(({ data }) => {
        setDistrictsData(data?.data as AddressType[]);
      })
      .finally(() => {
        setIsAddressLoading(false);
      });
  };

  const fetchMicroDistricts = async (districtId: number) => {
    setIsAddressLoading(true);
    getAddresses(districtId)
      .then(({ data }) => {
        setMicroDistrictsData(data?.data as AddressType[]);
      })
      .finally(() => {
        setIsAddressLoading(false);
      });
  };

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
      component: <StepApartmentDetails 
        citiesData={citiesData}
        districtsData={districtsData}
        setDistrictsData={setDistrictsData}
        microDistrictsData={microDistrictsData}
        setMicroDistrictsData={setMicroDistrictsData}
        fetchCities={fetchCities}
        fetchDistricts={fetchDistricts}
        fetchMicroDistricts={fetchMicroDistricts}
        isAddressLoading={isAddressLoading}
      />,
    },
    {
      id: 4,
      name: "Дополнительные детали",
      component: <StepApartmentAdditionalDetails />,
    },
    {
      id: 5,
      name: "Полные детали",
      component: <StepApartmentFullDetails />,
    },
    {
      id: 6,
      name: "Успех",
      component: <StepSuccess />,
    },
  ];

  useEffect(() => {
    const formData = methods.getValues();
    if (currentStep > 1) {
      const changed = shouldSubmitStep(formData, currentStep);
      setHasChanges(changed);
    } else {
      setHasChanges(true);
    }
  }, [currentStep, methods]);

  const handleFormChange = () => {
    const formData = methods.getValues();
    const changed = shouldSubmitStep(formData, currentStep);
    setHasChanges(changed);
  };

  useEffect(() => {
    const subscription = methods.watch(handleFormChange);
    return () => subscription.unsubscribe();
  }, [currentStep, methods]);

  const handleSubmit = async (step: number) => {
    try {
      setIsLoading(true);
      const formData = methods.getValues();

      const needsSubmission = shouldSubmitStep(formData, step);
      
      if (step === 1 || needsSubmission) {
        const apiData = mapFormToApiRequest(formData, step);
        let response;

        switch (step) {
          case 1:
            response = await createStep1(apiData).unwrap();
            if (response) {
              setAnnouncementId(response.data);
              apiDataTracker.setStepApiData(step, apiData);
            }
            break;
          case 2:
            if (!announcementId) return false;
            response = await createStep2({ 
              announcementId, 
              data: apiData 
            }).unwrap();
            if (response) {
              apiDataTracker.setStepApiData(step, apiData);
            }
            break;
          case 3:
            if (!announcementId) return false;
            response = await createStep3({ 
              announcementId, 
              data: apiData 
            }).unwrap();
            if (response) {
              apiDataTracker.setStepApiData(step, apiData);
            }
            break;
          case 4:
            if (!announcementId) return false;
            response = await createStep4({ 
              announcementId, 
              data: apiData 
            }).unwrap();
            if (response) {
              apiDataTracker.setStepApiData(step, apiData);
            }
            break;
          case 5:
            if (!announcementId) return false;
            response = await createStep5({ 
              announcementId, 
              data: apiData 
            }).unwrap();
            if (response) {
              apiDataTracker.setStepApiData(step, apiData);
            }
            break;
          case 6:
            if (!announcementId) return false;
            response = await createStep6({ 
              announcementId, 
              data: apiData 
            }).unwrap();
            if (response) {
              apiDataTracker.setStepApiData(step, apiData);
            }
            break;
        }
      } 

      return true;
    } catch (error) {
      showToast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке данных",
        color: "danger",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const formData = methods.getValues();
    
    if (!validateFormStep(formData, currentStep)) {
      return;
    }
    
    if (currentStep === 1 && announcementId) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    
    if (hasChanges || currentStep === 1) {
      const success = await handleSubmit(currentStep);
      if (success && currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    const success = await handleSubmit(currentStep);
    if (success) {
      methods.reset(defaultValues);
      setCurrentStep(1);
      setAnnouncementId(0);
      setHasChanges(false);
      apiDataTracker.reset();
      onClose();
    }
  };
  
  useEffect(() => {
    if (!isOpen) {
      methods.reset(defaultValues);
      setCurrentStep(1);
      setAnnouncementId(0);
      setHasChanges(false);
      apiDataTracker.reset();
    }
  }, [isOpen, methods]);

  const renderFooterButtons = () => {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.leftButtons}>
          {currentStep > 1 ? (
            <Button 
              className={styles.backButton} 
              onPress={handleBack}
              isDisabled={isLoading}
            >
              Назад
            </Button>
          ) : (
            <Button 
              className={styles.cancelButton} 
              onPress={onClose}
              isDisabled={isLoading}
            >
              Отмена
            </Button>
          )}
        </div>
        <div className={styles.rightButtons}>
          {currentStep < steps.length && (
            <Button 
              className={styles.nextButton} 
              onPress={handleNext}
              isDisabled={isLoading}
            >
              {isLoading ? "Загрузка..." : (currentStep === 1 ? "Далее" : (hasChanges ? "Сохранить и далее" : "Далее"))}
            </Button>
          )}
          {currentStep === steps.length && (
            <Button 
              className={styles.finishButton} 
              onPress={handleFinish}
              isDisabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Завершить"}
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
        style={{ zIndex: 9000 }}
      >
        <ModalContent className={styles.modalContent}>
          <ModalHeader className={styles.modalHeader}>
            <h2>{steps[currentStep - 1].name}</h2>
          </ModalHeader>
          <ModalBody className={styles.modalBody}>{steps[currentStep - 1].component}</ModalBody>
          <ModalFooter className={styles.modalFooter}>{renderFooterButtons()}</ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
};

export default AddApartmentModal;