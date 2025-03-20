"use client";
import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./ProfileForm.module.scss";

export default function MobileProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function handleSave() {
    // Save logic would go here
    setIsEditing(false);
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
          <Button
            className={isEditing ? styles.mobileSaveBtn : styles.mobileEditBtn}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? "Сохранить" : "Редактировать"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
