"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import MyButton from "@/components/ui/MyButton";
import { useAppSelector } from "@/store/store";
import { useSaveFilterMutation } from "@/store/features/filter/filterApi";
import { mapStateToFilterRequest } from "@/store/features/filter/filterApi";
import { showToast } from "@/utils/notification";
import styles from "./SaveFilterModal.module.scss";

interface SaveFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaveFilterModal: React.FC<SaveFilterModalProps> = ({ isOpen, onClose }) => {
  const [saveFilter, { isLoading }] = useSaveFilterMutation();
  const filterState = useAppSelector((state) => state.filter);

  const handleSave = async () => {
    try {
      // Convert Redux state to API request format
      const filterRequest = mapStateToFilterRequest(filterState);

      // Call the API to save the filter
      await saveFilter(filterRequest).unwrap();
      onClose();
    } catch (error) {
      showToast({
        title: "Не удалось сохранить фильтр",
        color: "danger",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" placement="center" backdrop="blur">
      <ModalContent>
        <ModalHeader className={styles.modalHeader}>
          <h2>Сохранить фильтр</h2>
        </ModalHeader>
        <ModalBody>
          <div className={styles.modalBody}>
            <p className={styles.modalDescription}>
              Вы хотите сохранить текущий фильтр для будущего использования?
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <MyButton onClick={onClose} variant="bordered" className={styles.cancelButton}>
            Отмена
          </MyButton>
          <MyButton onClick={handleSave} isLoading={isLoading} className={styles.saveButton}>
            Сохранить
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveFilterModal;
