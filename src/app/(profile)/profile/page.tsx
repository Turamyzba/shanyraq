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
import styles from "./Profile.module.scss";
import "./Profile.scss";

export default function Page() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    if (isEditing) {
      // Здесь можно отправить данные на сервер, если нужно
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  return (
    <>
      <div className={styles.profileContainer}>
        <Form layout="vertical">
          <div className={styles.formRow}>
            <Form.Item label="Имя">
              <Input defaultValue="Алихан" disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Фамилия">
              <Input defaultValue="Оспанов" disabled={!isEditing} />
            </Form.Item>
          </div>

          <div className={styles.formRow}>
            <Form.Item label="Email">
              <Input defaultValue="alikhaaaan96@gmail.com" disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Номер телефона">
              <Input defaultValue="+7 747 447 54 40" disabled={!isEditing} />
            </Form.Item>
          </div>

          <div className={styles.formRow}>
            <Form.Item label="Дата рождения">
              <Calendar
                showMonthAndYearPickers
                aria-label="Date (Show Month and Year Picker)"
                className="hero-calendar"
                isDisabled={!isEditing}
              />
            </Form.Item>
            <Form.Item label="Гендер">
              <Select placeholder="Выберите" defaultValue="male" disabled={!isEditing}>
                <Select.Option value="male">Мужчина</Select.Option>
                <Select.Option value="female">Женщина</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={styles.btnRow}>
            <Button onClick={() => setIsPasswordModalOpen(true)}>Изменить пароль</Button>
            <Button
              type="primary"
              style={isEditing ? { backgroundColor: "#1AA683", borderColor: "#1AA683" } : {}}
              onClick={handleEdit}
            >
              {isEditing ? "Сохранить" : "Редактировать"}
            </Button>
          </div>
        </Form>
      </div>

      <HeroModal
        isOpen={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <h3>Поменяйте свой пароль</h3>
                <HeroInput
                  label="Старый пароль"
                  type="password"
                  placeholder="Введите старый пароль"
                />
                <HeroInput
                  label="Новый пароль"
                  type="password"
                  placeholder="Введите новый пароль"
                />
                <HeroInput
                  label="Повторите пароль"
                  type="password"
                  placeholder="Повторите новый пароль"
                />
              </ModalBody>
              <ModalFooter>
                <HeroUIButton color="primary" onPress={() => setIsPasswordModalOpen(false)}>
                  Подтвердить
                </HeroUIButton>
                <HeroUIButton variant="ghost" onPress={() => setIsPasswordModalOpen(false)}>
                  Отменить
                </HeroUIButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HeroModal>
    </>
  );
}
