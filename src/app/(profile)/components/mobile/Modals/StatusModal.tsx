import React from "react";
import { Modal, Radio, RadioGroup } from "@heroui/react";
import { StatusKey } from "../../common/StatusLabels";
import styles from "./StatusModal.module.scss";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: StatusKey;
  onStatusChange: (value: StatusKey) => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, status, onStatusChange }) => {
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
        <h3 className={styles.title}>Твой статус</h3>
        <p className={styles.subtitle}>Укажите ваш статус для поиска квартиры или сожителя</p>

        <div className={styles.divider}></div>

        <RadioGroup
          orientation="vertical"
          color="primary"
          value={status}
          onValueChange={(val) => onStatusChange(val as StatusKey)}
          className={styles.radioGroup}
        >
          <Radio value="findingApartment">Ищу квартиру</Radio>
          <Radio value="notFindingApartment">Не ищу квартиру</Radio>
          <Radio value="findingRoommate">Ищу сожителя</Radio>
          <Radio value="notFindingRoommate">Не ищу сожителя</Radio>
        </RadioGroup>

        <div className={styles.footer}>
          <button className={styles.exitButton} onClick={onClose}>
            <ExitIcon />
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

function ExitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
        stroke="#252525"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.334 14.1668L17.5007 10.0002L13.334 5.8335"
        stroke="#252525"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 10H7.5"
        stroke="#252525"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default StatusModal;
