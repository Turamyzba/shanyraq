import React, { useState } from "react";
import { Modal, Input, Button } from "@heroui/react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./PasswordModal.module.scss";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = () => {
    // Обработка смены пароля
    console.log({
      oldPassword,
      newPassword,
      confirmPassword,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      classNames={{
        backdrop: styles.modalBackdrop,
        base: styles.modalBase,
        body: styles.modalBody,
        header: styles.modalHeader,
        footer: styles.modalFooter,
      }}
    >
      <div className={styles.container}>
        <h3 className={styles.title}>Поменяйте свой пароль</h3>

        <div className={styles.passwordFields}>
          <div className={styles.passwordField}>
            <Input
              label="Старый пароль"
              type={oldPasswordVisible ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={styles.passwordInput}
              endContent={
                oldPasswordVisible ? (
                  <EyeInvisibleOutlined
                    className={styles.eyeIcon}
                    onClick={() => setOldPasswordVisible(false)}
                  />
                ) : (
                  <EyeOutlined
                    className={styles.eyeIcon}
                    onClick={() => setOldPasswordVisible(true)}
                  />
                )
              }
            />
          </div>

          <div className={styles.passwordField}>
            <Input
              label="Новый пароль"
              type={newPasswordVisible ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.passwordInput}
              endContent={
                newPasswordVisible ? (
                  <EyeInvisibleOutlined
                    className={styles.eyeIcon}
                    onClick={() => setNewPasswordVisible(false)}
                  />
                ) : (
                  <EyeOutlined
                    className={styles.eyeIcon}
                    onClick={() => setNewPasswordVisible(true)}
                  />
                )
              }
            />
          </div>

          <div className={styles.passwordField}>
            <Input
              label="Подтвердите пароль"
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.passwordInput}
              endContent={
                confirmPasswordVisible ? (
                  <EyeInvisibleOutlined
                    className={styles.eyeIcon}
                    onClick={() => setConfirmPasswordVisible(false)}
                  />
                ) : (
                  <EyeOutlined
                    className={styles.eyeIcon}
                    onClick={() => setConfirmPasswordVisible(true)}
                  />
                )
              }
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <Button className={styles.confirmButton} color="primary" onPress={handleSubmit}>
            Подтвердить
          </Button>
          <Button className={styles.cancelButton} variant="flat" onPress={onClose}>
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordModal;
