// PhotoEditModal.tsx
import React from "react";
import { Modal, Button } from "@heroui/react";
import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./PhotoEditModal.module.scss";

interface PhotoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoEditModal: React.FC<PhotoEditModalProps> = ({
  isOpen,
  onClose,
  onAddPhoto,
  fileInputRef,
  handleFileChange,
}) => {
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
        <div className={styles.photoPreview}>
          <img src="/avatar/image.png" alt="Profile Photo" className={styles.photo} />
        </div>
        <div className={styles.buttonGroup}>
          <Button className={styles.photoButton} onPress={onAddPhoto}>
            <CameraOutlined className={styles.buttonIcon} />
            <span>Добавить фото</span>
          </Button>
          <Button className={styles.deleteButton}>
            <DeleteOutlined className={styles.buttonIcon} />
            <span>Удалить</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      </div>
    </Modal>
  );
};

export default PhotoEditModal;
