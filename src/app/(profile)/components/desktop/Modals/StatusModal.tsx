import React from "react";
import { Modal } from "antd";
import { RadioGroup, Radio } from "@heroui/react";
import { StatusKey } from "../../common/StatusLabels";
import styles from "../../../layout.module.scss";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: StatusKey;
  onStatusChange: (value: StatusKey) => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, status, onStatusChange }) => {
  return (
    <Modal
      open={isOpen}
      footer={null}
      title="Твой статус"
      closable
      maskClosable={false}
      mask
      className={styles.statusModal}
      onCancel={onClose}
      centered
    >
      <p className={styles.statusModalSubhead}>
        Укажите ваш статус для поиска квартиры или сожителя
      </p>
      <div className={styles.statusModalDivider} />
      <RadioGroup
        label=""
        orientation="vertical"
        color="primary"
        value={status}
        onValueChange={(val) => onStatusChange(val as StatusKey)}
        className={styles.heroRadioGroup}
      >
        <Radio value="findingApartment">Ищу квартиру</Radio>
        <Radio value="notFindingApartment">Не ищу квартиру</Radio>
        <Radio value="findingRoommate">Ищу сожителя</Radio>
        <Radio value="notFindingRoommate">Не ищу сожителя</Radio>
      </RadioGroup>
    </Modal>
  );
};

export default StatusModal;
