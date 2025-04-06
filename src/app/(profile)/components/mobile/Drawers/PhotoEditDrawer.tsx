import React from "react";
import { Drawer, Button } from "@heroui/react";
import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./Drawers.module.scss";

interface PhotoEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: () => void;
  onDeletePhoto: () => void;
}

const PhotoEditDrawer: React.FC<PhotoEditDrawerProps> = ({
  isOpen,
  onClose,
  onAddPhoto,
  onDeletePhoto,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" isDismissable={true}>
      <div className={styles.drawerContainer}>
        <div className={styles.handle}></div>

        <div className={styles.photoPreview}>
          <img src="/avatar/image.png" alt="Profile Photo" className={styles.photo} />
        </div>

        <div className={styles.buttonGroup}>
          <Button className={styles.photoButton} onPress={onAddPhoto}>
            <CameraOutlined className={styles.buttonIcon} />
            <span>Добавить фото</span>
          </Button>

          <Button className={styles.deleteButton} onPress={onDeletePhoto}>
            <DeleteOutlined className={styles.buttonIcon} />
            <span>Удалить</span>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default PhotoEditDrawer;
