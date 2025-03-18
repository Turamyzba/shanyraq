import React from "react";
import styles from "./MobileProfileMenu.module.scss";
import { HomeFilled, CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "@heroui/react";

interface MobileProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEditPhoto: () => void;
  onDeletePhoto: () => void;
  onChangeStatus: () => void;
}

const MobileProfileMenu: React.FC<MobileProfileMenuProps> = ({
  isOpen,
  onClose,
  onEditPhoto,
  onDeletePhoto,
  onChangeStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menuContainer} onClick={(e) => e.stopPropagation()}>
        <Button className={styles.menuButton} onPress={onChangeStatus}>
          <HomeFilled className={styles.menuIcon} />
          <span>Поменять статус</span>
        </Button>

        <div className={styles.divider}></div>

        <div className={styles.buttonGroup}>
          <Button className={styles.menuButton} onPress={onEditPhoto}>
            <CameraOutlined className={styles.menuIcon} />
            <span>Добавить фото</span>
          </Button>

          <Button className={styles.menuButton} onPress={onDeletePhoto}>
            <DeleteOutlined className={styles.menuIcon} />
            <span>Удалить</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileProfileMenu;
