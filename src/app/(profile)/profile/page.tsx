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
  Button as HeroUIButton
} from "@heroui/react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./Profile.module.scss";
import "./Profile.scss";

export default function Page() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  return (
    <>
      <div className={styles.profileContainer}>
        <Form layout="vertical" className={styles.wrapper}>
          <div className={styles.wrapperInner}>
            <div className={styles.formRow}>
              <Form.Item label="Имя" className={styles.formItem}>
                <Input placeholder="Мейірман" disabled={!isEditing} className={styles.formInput} />
              </Form.Item>
              <Form.Item className={styles.formItem} label="Фамилия">
                <Input placeholder="Сәрсенбай" disabled={!isEditing} className={styles.formInput} />
              </Form.Item>
            </div>
            <div className={styles.formRow}>
              <Form.Item label="Email" className={styles.formItem}>
                <Input placeholder="sarsenbaymeyirman@gmail.com" disabled={!isEditing} className={styles.formInput} />
              </Form.Item>
              <Form.Item label="Номер телефона" className={styles.formItem}>
                <Input placeholder="+7 707 707 70 70" disabled={!isEditing} className={styles.formInput} />
              </Form.Item>
            </div>
            <div className={styles.formRow}>
              <Form.Item label="Гендер" className={styles.formItem}>
                <Select placeholder="Выберите" defaultValue="female" className={styles.formSelect} disabled={!isEditing}>
                  <Select.Option value="male">Мужчина</Select.Option>
                  <Select.Option value="female">Женщина</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Дата рождения">
                <Calendar
                  showMonthAndYearPickers
                  aria-label="Date (Show Month and Year Picker)"
                  className="hero-calendar"
                  isDisabled={!isEditing}
                />
              </Form.Item>
            </div>
          </div>
          <div className={styles.btnRow}>
            <Button className={styles.editPassword} onClick={() => setIsPasswordModalOpen(true)}>Изменить пароль</Button>
            <Button className={isEditing ? styles.saveBtn : styles.editBtn} onClick={handleEdit}>
              {isEditing ? "Сохранить" : "Редактировать"}
            </Button>
          </div>
        </Form>
      </div>
      <HeroModal isOpen={isPasswordModalOpen} className={styles.modalPassword} onOpenChange={setIsPasswordModalOpen} isDismissable={false}>
        <ModalContent>
          {() => (
            <>
              <ModalBody className={styles.modalBodyPassword}>
                <h3 className={styles.modalTitle}>Поменяйте свой пароль</h3>
                <div className={styles.passwordField}>
                  <HeroInput
                    label="Старый пароль"
                    type={oldPasswordVisible ? "text" : "password"}
                    className={styles.inputStyle}
                  />
                  {oldPasswordVisible ? (
                    <EyeInvisibleOutlined className={styles.passwordToggleIcon} onClick={() => setOldPasswordVisible(false)} />
                  ) : (
                    <EyeOutlined className={styles.passwordToggleIcon} onClick={() => setOldPasswordVisible(true)} />
                  )}
                </div>
                <div className={styles.passwordField}>
                  <HeroInput
                    label="Новый пароль"
                    type={newPasswordVisible ? "text" : "password"}
                    className={styles.inputStyle}
                  />
                  {newPasswordVisible ? (
                    <EyeInvisibleOutlined className={styles.passwordToggleIcon} onClick={() => setNewPasswordVisible(false)} />
                  ) : (
                    <EyeOutlined className={styles.passwordToggleIcon} onClick={() => setNewPasswordVisible(true)} />
                  )}
                </div>
                <div className={styles.passwordField}>
                  <HeroInput
                    label="Повторите пароль"
                    type={confirmPasswordVisible ? "text" : "password"}
                    className={styles.inputStyle}
                  />
                  {confirmPasswordVisible ? (
                    <EyeInvisibleOutlined className={styles.passwordToggleIcon} onClick={() => setConfirmPasswordVisible(false)} />
                  ) : (
                    <EyeOutlined className={styles.passwordToggleIcon} onClick={() => setConfirmPasswordVisible(true)} />
                  )}
                </div>
              </ModalBody>
              <ModalFooter className={styles.modalFooter}>
                <HeroUIButton color="primary" onPress={() => setIsPasswordModalOpen(false)} className={styles.confirmPassword}>Подтвердить</HeroUIButton>
                <HeroUIButton variant="ghost" onPress={() => setIsPasswordModalOpen(false)}  className={styles.cancelPassword}>Отменить</HeroUIButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HeroModal>
    </>
  );
}
