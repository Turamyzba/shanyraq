"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, DatePicker, Spin, Avatar } from "antd";
import {
  Modal as HeroModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input as HeroInput,
  Button as HeroUIButton,
} from "@heroui/react";
import { 
  EyeOutlined, 
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import styles from "./ProfileForm.module.scss";
import { useEditProfileMutation, useGetProfileWithFiltersQuery, useUpdatePasswordMutation } from "@/store/features/profile/profileApi";
import MyPhoneInput from "@/components/ui/MyPhoneInput";

export default function DesktopProfileForm() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const { data: profileData, isLoading, isError } = useGetProfileWithFiltersQuery();
  
  const [editProfile, { isLoading: isUpdating }] = useEditProfileMutation();
  const [updatePassword, { isLoading: isPasswordUpdating }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (profileData?.data?.profile) {
      const profile = profileData.data.profile;
      form.setFieldsValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        gender: profile.gender?.toLowerCase(),
        birthDate: profile.birthDate ? moment(profile.birthDate) : null,
      });
      setPhone(profile.phoneNumber || "+7 ");
    }
  }, [profileData, form]);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  async function handleSave() {
    try {
      const values = await form.validateFields();
      
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: phone,
        gender: values.gender?.toUpperCase(),
        birthDate: values.birthDate ? moment(values.birthDate).format('YYYY-MM-DD') : undefined,
      };
      
      await editProfile(updateData).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  }

  async function handlePasswordSave() {
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        return;
      }

      if (newPassword !== confirmPassword) {
        return;
      }
      
      await updatePassword({
        oldPassword,
        newPassword,
      });
      
      setIsPasswordModalOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Password update failed:", error);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" className={styles.customSpin} />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Form 
        form={form}
        layout="vertical" 
        className={styles.wrapper}
      >
        <div className={styles.wrapperInner}>
          <div className={styles.formRow}>
            <Form.Item 
              label="Имя" 
              name="firstName"
              className={styles.formItem}
              rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
            >
              <Input placeholder="Введите имя" disabled={!isEditing} className={styles.formInput} />
            </Form.Item>
            <Form.Item 
              label="Фамилия" 
              name="lastName"
              className={styles.formItem}
              rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
            >
              <Input placeholder="Введите фамилию" disabled={!isEditing} className={styles.formInput} />
            </Form.Item>
          </div>
          <div className={styles.formRow}>
            <Form.Item 
              label="Email" 
              name="email"
              className={styles.formItem}
            >
              <Input
                placeholder="example@example.com"
                disabled={true} // Email cannot be changed
                className={styles.formInput}
              />
            </Form.Item>
            <Form.Item 
              label="Номер телефона" 
              className={styles.formItem}
            >
              <MyPhoneInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label=""
                placeholder="+7 ___ ___ ____"
              />
            </Form.Item>
          </div>
          <div className={styles.formRow}>
            <Form.Item 
              label="Гендер" 
              name="gender"
              className={styles.formItem}
            >
              <Select
                placeholder="Выберите"
                className={styles.formSelect}
                disabled={!isEditing}
              >
                <Select.Option value="MALE">Мужчина</Select.Option>
                <Select.Option value="FEMALE">Женщина</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item 
              label="Дата рождения" 
              name="birthDate" 
              className={styles.formItem}
            >
              <DatePicker 
                disabled={!isEditing} 
                placeholder="Выберите дату"
                className={styles.formInput}
                format="DD.MM.YYYY"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.btnRow}>
          {profileData?.data?.profile?.isPasswordHas && (
            <Button 
              className={styles.editPassword} 
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Изменить пароль
            </Button>
          )}
          <Button
            className={isEditing ? styles.saveBtn : styles.editBtn}
            onClick={isEditing ? handleSave : handleEdit}
            loading={isUpdating}
          >
            {isEditing ? "Сохранить" : "Редактировать"}
          </Button>
        </div>
      </Form>

      {/* Password Change Modal */}
      <HeroModal
        isOpen={isPasswordModalOpen}
        className={styles.modalPassword}
        onOpenChange={setIsPasswordModalOpen}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className={styles.modalBodyPassword}>
                <h3 className={styles.modalTitle}>Поменяйте свой пароль</h3>
                <div className={styles.passwordField}>
                  <HeroInput
                    label="Старый пароль"
                    type={oldPasswordVisible ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className={styles.inputStyle}
                  />
                  {oldPasswordVisible ? (
                    <EyeInvisibleOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setOldPasswordVisible(false)}
                    />
                  ) : (
                    <EyeOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setOldPasswordVisible(true)}
                    />
                  )}
                </div>
                <div className={styles.passwordField}>
                  <HeroInput
                    label="Новый пароль"
                    type={newPasswordVisible ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={styles.inputStyle}
                  />
                  {newPasswordVisible ? (
                    <EyeInvisibleOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setNewPasswordVisible(false)}
                    />
                  ) : (
                    <EyeOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setNewPasswordVisible(true)}
                    />
                  )}
                </div>
                <div className={styles.passwordField}>
                  <HeroInput
                    label="Повторите пароль"
                    type={confirmPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.inputStyle}
                  />
                  {confirmPasswordVisible ? (
                    <EyeInvisibleOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setConfirmPasswordVisible(false)}
                    />
                  ) : (
                    <EyeOutlined
                      className={styles.passwordToggleIcon}
                      onClick={() => setConfirmPasswordVisible(true)}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter className={styles.modalFooter}>
                <HeroUIButton
                  color="primary"
                  onPress={handlePasswordSave}
                  className={styles.confirmPassword}
                  isLoading={isPasswordUpdating}
                >
                  Подтвердить
                </HeroUIButton>
                <HeroUIButton
                  variant="ghost"
                  onPress={() => setIsPasswordModalOpen(false)}
                  className={styles.cancelPassword}
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