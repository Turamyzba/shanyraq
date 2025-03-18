"use client";
import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { Calendar } from "@heroui/react";
import {
  Modal as HeroModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input as HeroInput,
  Button as HeroUIButton,
} from "@heroui/react";
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./MobileLayout.module.scss";

export default function MobileLayout() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  return (
    <div className={styles.mobileContainer}>
      <div className={styles.mobileHeader}>
        <UserOutlined className={styles.userIcon} />
        <h1 className={styles.mobileTitle}>Профиль пользователя</h1>
      </div>

      <Form layout="vertical" className={styles.mobileForm}>
        <Form.Item label="Имя" className={styles.mobileFormItem}>
          <Input placeholder="Мейірман" disabled={!isEditing} className={styles.mobileInput} />
        </Form.Item>

        <Form.Item label="Фамилия" className={styles.mobileFormItem}>
          <Input placeholder="Сәрсенбай" disabled={!isEditing} className={styles.mobileInput} />
        </Form.Item>

        <Form.Item label="Email" className={styles.mobileFormItem}>
          <Input
            placeholder="sarsenbaymeyirman@gmail.com"
            disabled={!isEditing}
            className={styles.mobileInput}
          />
        </Form.Item>

        <Form.Item label="Номер телефона" className={styles.mobileFormItem}>
          <Input
            placeholder="+7 707 707 70 70"
            disabled={!isEditing}
            className={styles.mobileInput}
          />
        </Form.Item>

        <Form.Item label="Гендер" className={styles.mobileFormItem}>
          <Select
            placeholder="Выберите"
            defaultValue="female"
            disabled={!isEditing}
            className={styles.mobileSelect}
          >
            <Select.Option value="male">Мужчина</Select.Option>
            <Select.Option value="female">Женщина</Select.Option>
          </Select>
        </Form.Item>

        <div className={styles.mobileButtons}>
          <Button className={styles.mobilePasswordBtn} onClick={() => setIsPasswordModalOpen(true)}>
            Изменить пароль
          </Button>

          <Button
            className={isEditing ? styles.mobileSaveBtn : styles.mobileEditBtn}
            onClick={handleEdit}
          >
            {isEditing ? "Сохранить" : "Редактировать"}
          </Button>
        </div>
      </Form>

      {/* Модальное окно для смены пароля */}
      <HeroModal isOpen={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <ModalContent className={styles.mobileModal}>
          {() => (
            <>
              <ModalBody className={styles.mobileModalBody}>
                <h3 className={styles.mobileModalTitle}>Поменяйте свой пароль</h3>
                <div className={styles.passwordField}>
                  <HeroInput
                    label="Пароль"
                    type={passwordVisible ? "text" : "password"}
                    className={styles.mobilePasswordInput}
                  />
                  {passwordVisible ? (
                    <EyeInvisibleOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <EyeOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter className={styles.mobileModalFooter}>
                <HeroUIButton
                  color="primary"
                  onPress={() => setIsPasswordModalOpen(false)}
                  className={styles.mobileConfirmBtn}
                >
                  Подтвердить
                </HeroUIButton>
                <HeroUIButton
                  variant="ghost"
                  onPress={() => setIsPasswordModalOpen(false)}
                  className={styles.mobileCancelBtn}
                >
                  Отменить
                </HeroUIButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HeroModal>
    </div>
  );
}
