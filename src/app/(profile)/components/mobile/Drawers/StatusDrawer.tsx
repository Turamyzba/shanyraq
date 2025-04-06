import React from "react";
import { Drawer } from "@heroui/react";
import { RadioGroup, Radio } from "@heroui/react";
import { StatusKey } from "../../common/StatusLabels";
import styles from "./Drawers.module.scss";

interface StatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  status: StatusKey;
  onStatusChange: (value: StatusKey) => void;
}

const StatusDrawer: React.FC<StatusDrawerProps> = ({ isOpen, onClose, status, onStatusChange }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" isDismissable={true}>
      <div className={styles.drawerContainer}>
        <div className={styles.handle}></div>
        <h3 className={styles.drawerTitle}>Твой статус</h3>
        <p className={styles.drawerSubtitle}>Укажите ваш статус для поиска квартиры или сожителя</p>

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
      </div>
    </Drawer>
  );
};

export default StatusDrawer;
