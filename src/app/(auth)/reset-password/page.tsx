"use client";

import React, { useState, useEffect } from "react";
import { Form } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { MyPasswordInput } from "@/components/ui/MyPasswordInput";
import MyButton from "@/components/ui/MyButton";
import { updatePassword } from "@/lib/api/authService";
import { addToast } from "@heroui/react";
import styles from "./ResetPassword.module.scss";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get email from URL parameters
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  // Check if we have required parameters
  useEffect(() => {
    if (!email || !token) {
      addToast({
        title: "Ошибка",
        description: "Отсутствуют необходимые параметры для сброса пароля",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
    }
  }, [email, token]);

  const validateForm = () => {
    if (!password || !passwordConfirm) {
      addToast({
        title: "Ошибка",
        description: "Все поля обязательны для заполнения",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return false;
    }

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

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!hasUpperCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
      addToast({
        title: "Ошибка",
        description: "Пароль должен содержать как минимум одну заглавную букву, один символ, один чисел и быть длиной как минимум 8",
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

    try {
      setIsLoading(true);

      await updatePassword({
        email: email,
        password: password,
      });

      addToast({
        title: "Пароль успешно обновлен!",
        description: "Теперь вы можете войти в систему с новым паролем",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "success",
      });

      // Redirect to login page
      router.push("/login");
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description: err?.response?.data || err.message || "Произошла ошибка при сбросе пароля",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h2>Восстановление пароля</h2>
          <p>Пожалуйста, установите новый пароль для своей учетной записи.</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <MyPasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Создайте новый пароль"
              isRequired
            />

            <MyPasswordInput
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              label="Потвердите новый пароль"
              isRequired
            />
          </div>

          <div className={styles.buttonGroup}>
            <MyButton
              type={"submit"}
              className={styles.continueButton}
              isLoading={isLoading}
              isDisabled={!email || !token}
            >
              Продолжить
            </MyButton>
            <MyButton className={styles.backButton} onClick={() => router.push("/login")}>
              Назад
            </MyButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
