import React from "react";
import { Modal, Button } from "antd";
import { ModalConfig } from "../../../desktop/MyResponses/GroupDetails/types";
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
        <Button key="cancel" onClick={onCancel} className={styles.modalCancelButton}>
          {modalConfig.cancelText}
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={modalConfig.confirmAction}
          className={styles.modalConfirmButton}
        >
          {modalConfig.confirmText}
        </Button>,
      ]}
      centered
    >
      <p>{modalConfig.message}</p>
    </Modal>
  );
};

export default ActionModals;
