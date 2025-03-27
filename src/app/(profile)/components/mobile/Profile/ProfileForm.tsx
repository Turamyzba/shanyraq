"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, DatePicker, Spin } from "antd";
import { UserOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import moment from "moment";
import styles from "./ProfileForm.module.scss";
import {
  Modal as HeroModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input as HeroInput,
  Button as HeroUIButton,
} from "@heroui/react";
import { useEditProfileMutation, useGetProfileWithFiltersQuery, useUpdatePasswordMutation } from "@/store/features/profile/profileApi";
import MyPhoneInput from "@/components/ui/MyPhoneInput";

export default function MobileProfileForm() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  // Get profile data
  const { data: profileData, isLoading, isError } = useGetProfileWithFiltersQuery();
  
  // API mutations
  const [editProfile, { isLoading: isUpdating }] = useEditProfileMutation();
  const [updatePassword, { isLoading: isPasswordUpdating }] = useUpdatePasswordMutation();

  // Fill form with profile data when it loads
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
      
      // Prepare data for API
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: phone,
        gender: values.gender?.toUpperCase(),
        birthDate: values.birthDate ? moment(values.birthDate).format('YYYY-MM-DD') : undefined,
      };
      
      // Call edit profile API
      await editProfile(updateData).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  }

  async function handlePasswordSave() {
    try {
      if (!oldPassword || !newPassword) {
        return;
      }
      
      await updatePassword({
        oldPassword,
        newPassword,
      });
      
      setPasswordModalOpen(false);
      setOldPassword('');
      setNewPassword('');
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
    <div className={styles.mobileContainer}>
      <div className={styles.mobileHeader}>
        <UserOutlined className={styles.userIcon} />
        <h1 className={styles.mobileTitle}>Профиль пользователя</h1>
      </div>

      <Form 
        form={form}
        layout="vertical" 
        className={styles.mobileForm}
      >
        <Form.Item 
          label="Имя" 
          name="firstName"
          className={styles.mobileFormItem}
          rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
        >
          <Input 
            placeholder="Введите имя" 
            disabled={!isEditing} 
            className={styles.mobileInput} 
          />
        </Form.Item>

        <Form.Item 
          label="Фамилия" 
          name="lastName"
          className={styles.mobileFormItem}
          rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
        >
          <Input 
            placeholder="Введите фамилию" 
            disabled={!isEditing} 
            className={styles.mobileInput} 
          />
        </Form.Item>

        <Form.Item 
          label="Email" 
          name="email"
          className={styles.mobileFormItem}
        >
          <Input
            placeholder="example@example.com"
            disabled={true} // Email cannot be changed
            className={styles.mobileInput}
          />
        </Form.Item>

        <Form.Item 
          label="Номер телефона" 
          className={styles.mobileFormItem}
        >
          <MyPhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            labelPlacement="outside-left"
            variant="bordered"
            placeholder="+7 ___ ___ ____"
            className={styles.phoneInput}
            color="primary"
          />
        </Form.Item>

        <Form.Item 
          label="Гендер" 
          name="gender"
          className={styles.mobileFormItem}
        >
          <Select
            placeholder="Выберите"
            disabled={!isEditing}
            className={styles.mobileSelect}
          >
            <Select.Option value="male">Мужчина</Select.Option>
            <Select.Option value="female">Женщина</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label="Дата рождения" 
          name="birthDate" 
          className={styles.mobileFormItem}
        >
          <DatePicker 
            disabled={!isEditing} 
            placeholder="Выберите дату"
            className={styles.mobileInput}
            format="DD.MM.YYYY"
          />
        </Form.Item>

        <div className={styles.mobileButtons}>
          {profileData?.data?.profile?.isPasswordHas && (
            <Button 
              className={styles.mobilePasswordBtn}
              onClick={() => setPasswordModalOpen(true)}
            >
              Изменить пароль
            </Button>
          )}
          
          <Button
            className={isEditing ? styles.mobileSaveBtn : styles.mobileEditBtn}
            onClick={isEditing ? handleSave : handleEdit}
            loading={isUpdating}
          >
            {isEditing ? "Сохранить" : "Редактировать"}
          </Button>
        </div>
      </Form>

      {/* Password Change Modal */}
      <HeroModal
        isOpen={passwordModalOpen}
        onOpenChange={setPasswordModalOpen}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
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
                  onPress={() => setPasswordModalOpen(false)}
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