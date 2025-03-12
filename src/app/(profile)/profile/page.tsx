"use client";
import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import styles from "./Profile.module.scss";

export default function Page() {
  return (
    <div className={styles.profileContainer}>
      <Form layout="vertical">
        <div className={styles.formRow}>
          <Form.Item label="Имя">
            <Input defaultValue="Алихан" />
          </Form.Item>
          <Form.Item label="Фамилия">
            <Input defaultValue="Оспанов" />
          </Form.Item>
        </div>
        <div className={styles.formRow}>
          <Form.Item label="Email">
            <Input defaultValue="alikhaaaan96@gmail.com" />
          </Form.Item>
          <Form.Item label="Номер телефона">
            <Input defaultValue="+7 747 447 54 40" />
          </Form.Item>
        </div>
        <div className={styles.formRow}>
          <Form.Item label="Дата рождения">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Гендер">
            <Select placeholder="Выберите">
              <Select.Option value="male">Мужчина</Select.Option>
              <Select.Option value="female">Женщина</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className={styles.btnRow}>
          <Button>Изменить пароль</Button>
          <Button type="primary">Редактировать</Button>
        </div>
      </Form>
    </div>
  );
}
