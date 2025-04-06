import React, { useState } from "react";
import { Drawer, Button, Input } from "@heroui/react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./Drawers.module.scss";

interface PasswordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordDrawer: React.FC<PasswordDrawerProps> = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = () => {
    console.log({
      oldPassword,
      newPassword,
      confirmPassword,
    });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" isDismissable={true}>
      <div className={styles.drawerContainer}>
        <div className={styles.handle}></div>
        <h3 className={styles.drawerTitle}>Поменяйте свой пароль</h3>

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
                    className={styles.passwordToggleIcon}
                    onClick={() => setOldPasswordVisible(false)}
                  />
                ) : (
                  <EyeOutlined
                    className={styles.passwordToggleIcon}
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
                    className={styles.passwordToggleIcon}
                    onClick={() => setNewPasswordVisible(false)}
                  />
                ) : (
                  <EyeOutlined
                    className={styles.passwordToggleIcon}
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
                    className={styles.passwordToggleIcon}
                    onClick={() => setConfirmPasswordVisible(false)}
                  />
                ) : (
                  <EyeOutlined
                    className={styles.passwordToggleIcon}
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
    </Drawer>
  );
};

export default PasswordDrawer;
