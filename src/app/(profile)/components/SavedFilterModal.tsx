// SavedFilterModal.tsx
import React from "react";
import { Modal } from "@heroui/react";
import { MapPin, DollarSign, Users, Home } from "lucide-react";
import styles from "./SavedFilterModal.module.scss";

interface SavedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavedFilterModal: React.FC<SavedFilterModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
      classNames={{
        backdrop: styles.modalBackdrop,
        base: styles.modalBase,
        body: styles.modalBody,
        header: styles.modalHeader,
        footer: styles.modalFooter,
      }}
    >
      <div className={styles.container}>
        <div className={styles.handle}></div>
        <h3 className={styles.title}>Сохраненный фильтр</h3>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <MapPin size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Город</div>
              <div className={styles.filterValue}>Астана</div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Район</div>
              <div className={styles.filterValue}>Алматинский район</div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Микрорайон</div>
              <div className={styles.filterValue}>Мкр. Чубары</div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <DollarSign size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Цена</div>
              <div className={styles.filterValue}>150 000 - 200 000тг</div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <Home size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Количество комнат</div>
              <div className={styles.filterValue}>До 3 комнат</div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <Users size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Количество сожителей</div>
              <div className={styles.filterValue}>2</div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Гендер</div>
              <div className={styles.filterValue}>Мужской пол</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SavedFilterModal;
