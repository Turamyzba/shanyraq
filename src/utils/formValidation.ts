// utils/formValidation.ts
import { showToast } from "@/utils/notification";

export const validateStepRole = (formData: any): boolean => {
  if (!formData.role) {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, выберите роль перед продолжением",
      color: "danger",
    });
    return false;
  }
  return true;
};

export const validateStepBasicInfo = (formData: any): boolean => {
  if (!formData.title || formData.title.trim() === "" || formData.title.trim().length < 10) {
    showToast({
      title: "Ошибка",
      description: "Заголовок должен содержать минимум 10 символов",
      color: "danger",
    });
    return false;
  }

  if (!formData.gender) {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, выберите пол для подселения",
      color: "danger",
    });
    return false;
  }

  if (!formData.peopleInApartment) {
    showToast({
      title: "Ошибка",
      description: "Укажите количество людей, проживающих в квартире",
      color: "danger",
    });
    return false;
  }

  const [minAge, maxAge] = formData.ageRange || [18, 50];
  if (minAge > maxAge) {
    showToast({
      title: "Ошибка",
      description: "Минимальный возраст не может быть больше максимального",
      color: "danger",
    });
    return false;
  }

  return true;
};

export const validateStepApartmentDetails = (formData: any): boolean => {
  if (!formData.address || formData.address.trim() === "") {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, укажите адрес",
      color: "danger",
    });
    return false;
  }

  if (!formData.monthlyPayment) {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, укажите ежемесячный платеж",
      color: "danger",
    });
    return false;
  }

  if (formData.deposit && (!formData.depositAmount || formData.depositAmount <= 0)) {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, укажите сумму депозита",
      color: "danger",
    });
    return false;
  }

  return true;
};

export const validateStepApartmentAdditionalDetails = (formData: any): boolean => {
  const apartmentDetails = formData.apartmentDetails || {};

  if (!apartmentDetails.description || apartmentDetails.description.trim().length < 10) {
    showToast({
      title: "Ошибка",
      description: "Описание должно содержать минимум 10 символов",
      color: "danger",
    });
    return false;
  }

  if (!apartmentDetails.photos || apartmentDetails.photos.length < 5) {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, добавьте минимум 5 фотографий",
      color: "danger",
    });
    return false;
  }

  if (apartmentDetails.utilitiesIncluded) {
    const [min, max] = apartmentDetails.utilitiesAmount || [0, 0];
    if (min >= max) {
      showToast({
        title: "Ошибка",
        description: "Минимальная сумма коммунальных услуг должна быть меньше максимальной",
        color: "danger",
      });
      return false;
    }
  }

  return true;
};

export const validateStepApartmentFullDetails = (formData: any): boolean => {
  const apartmentDetails = formData.apartmentDetails || {};

  if (!apartmentDetails.propertyType) {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, выберите тип жилья",
      color: "danger",
    });
    return false;
  }

  if (apartmentDetails.floorsFrom > apartmentDetails.floorsTo) {
    showToast({
      title: "Ошибка",
      description: "Текущий этаж не может быть больше общего количества этажей",
      color: "danger",
    });
    return false;
  }

  if (!apartmentDetails.ownerPhones || apartmentDetails.ownerPhones.length === 0) {
    showToast({
      title: "Ошибка",
      description: "Пожалуйста, добавьте хотя бы один контактный телефон",
      color: "danger",
    });
    return false;
  }

  return true;
};

export const validateStepSuccess = (formData: any): boolean => {
  return true;
};

export const validateFormStep = (formData: any, step: number): boolean => {
  switch (step) {
    case 1:
      return validateStepRole(formData);
    case 2:
      return validateStepBasicInfo(formData);
    case 3:
      return validateStepApartmentDetails(formData);
    case 4:
      return validateStepApartmentAdditionalDetails(formData);
    case 5:
      return validateStepApartmentFullDetails(formData);
    case 6:
      return validateStepSuccess(formData);
    default:
      return true;
  }
};
