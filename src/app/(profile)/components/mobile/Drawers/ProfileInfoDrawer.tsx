import React, { useState, useEffect } from "react";
import { Drawer, Button } from "@heroui/react";
import { Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import styles from "./Drawers.module.scss";

interface ProfileInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileInfoDrawer: React.FC<ProfileInfoDrawerProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("+7 747 447 54 40");

  // Mock profile data
  const mockProfileData = {
    firstName: "Алихан",
    lastName: "Оспанов",
    email: "alikhaaan96@gmail.com",
    gender: "male",
    birthDate: "1996-02-28",
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: mockProfileData.firstName,
      lastName: mockProfileData.lastName,
      email: mockProfileData.email,
      gender: mockProfileData.gender,
      birthDate: mockProfileData.birthDate ? moment(mockProfileData.birthDate) : null,
    });
  }, [form, isOpen]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", {
        ...values,
        phoneNumber: phone,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" isDismissable={true} size="full">
      <div className={styles.profileDrawerContainer}>
        <div className={styles.handle}></div>
        <h3 className={styles.drawerTitle}>Профиль пользователя</h3>

        <Form form={form} layout="vertical" className={styles.profileForm}>
          <Form.Item
            label="Имя"
            name="firstName"
            rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
          >
            <Input placeholder="Введите имя" disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[{ required: true, message: "Пожалуйста, введите фамилию" }]}
          >
            <Input placeholder="Введите фамилию" disabled={!isEditing} />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="example@example.com" disabled={true} />
          </Form.Item>

          <Form.Item label="Номер телефона">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              placeholder="+7 ___ ___ ____"
            />
          </Form.Item>

          <Form.Item label="Гендер" name="gender">
            <Select placeholder="Выберите" disabled={!isEditing}>
              <Select.Option value="male">Мужчина</Select.Option>
              <Select.Option value="female">Женщина</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Дата рождения" name="birthDate">
            <DatePicker
              disabled={!isEditing}
              placeholder="Выберите дату"
              format="DD.MM.YYYY"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <div className={styles.profileButtons}>
            <Button
              className={isEditing ? styles.saveButton : styles.editButton}
              onPress={isEditing ? handleSave : handleEdit}
            >
              {isEditing ? "Сохранить" : "Редактировать"}
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default ProfileInfoDrawer;
