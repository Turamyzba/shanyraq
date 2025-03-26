import React from "react";
import { Modal, Button } from "antd";
import { ModalConfig } from "./types";
import styles from "./GroupDetails.module.scss";

interface ActionModalsProps {
  modalConfig: ModalConfig | null;
  onCancel: () => void;
}

const ActionModals: React.FC<ActionModalsProps> = ({ modalConfig, onCancel }) => {
  if (!modalConfig || !modalConfig.isOpen) return null;

  return (
    <Modal
      title={modalConfig.title}
      open={modalConfig.isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {modalConfig.cancelText}
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={modalConfig.confirmAction}
          className={styles.confirmButton}
          style={{ backgroundColor: "#1aa683", borderColor: "#1aa683" }}
        >
          {modalConfig.confirmText}
        </Button>,
      ]}
    >
      <p>{modalConfig.message}</p>
    </Modal>
  );
};

export default ActionModals;
