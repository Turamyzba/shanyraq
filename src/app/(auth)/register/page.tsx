"use client";

import type React from "react";

import { useState } from "react";
import { Form } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { MyPasswordInput } from "@/components/ui/MyPasswordInput";
import { addToast } from "@heroui/react";
import styles from "./Register.module.scss";
import { useRegisterMutation } from "@/store/features/auth/authApi";
import MyPhoneInput from "@/components/ui/MyPhoneInput";

export default function Register() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const validateForm = () => {
    // Check if all fields are filled
    if (!name || !lastname || !email || !password || !passwordConfirm) {
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return false;
    }

    // Validate FirstName format
    const firstNameRegex = /^[A-ZА-Я][a-zа-я]*$/;
    if (!firstNameRegex.test(name)) {
      addToast({
        title: "Ошибка",
        description:
          "Имя должно начинаться с заглавной буквы и содержать только маленькие буквы после первой",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return false;
    }

    // Validate LastName format
    const lastNameRegex = /^[A-ZА-Я][a-zа-я]*$/;
    if (!lastNameRegex.test(lastname)) {
      addToast({
        title: "Ошибка",
        description:
          "Фамилия должно начинаться с заглавной буквы и содержать только маленькие буквы после первой",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return false;
    }

    // Validate password complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!hasUpperCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
      addToast({
        title: "Ошибка",
        description:
          "Пароль должен содержать как минимум одну заглавную букву, один символ, один чисел и быть длиной как минимум 8",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return false;
    }

    // Confirm passwords match
    if (password !== passwordConfirm) {
      addToast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    register({
      firstName: name,
      lastName: lastname,
      email: email,
      password: password,
    }).then((res) => {
      router.push(
        `/verification?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(name)}&lastName=${encodeURIComponent(lastname)}&password=${encodeURIComponent(password)}`
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h2>Присоединяйтесь к Shanyraq!</h2>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <MyInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              label="Имя"
              isRequired
            />
            <MyInput
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              label="Фамилия"
              isRequired
            />
            <MyInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              isRequired
            />
            <MyPasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
              isRequired
            />
            <MyPasswordInput
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              label="Подтвердите пароль"
              isRequired
            />
          </div>

          <MyButton type={"submit"} className={styles.submitButton} isLoading={isLoading}>
            Зарегистрироваться
          </MyButton>
        </Form>
        <div className={styles.footer}>
          Уже есть учетная запись?
          <Link href={"/login"}>Войдите</Link>
        </div>
      </div>
    </div>
  );
}
