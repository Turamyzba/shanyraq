"use client";

import { useState, useEffect } from "react";
import { Form } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { MyPasswordInput } from "@/components/ui/MyPasswordInput";
import MyButton from "@/components/ui/MyButton";
import styles from "./ResetPassword.module.scss";
import { useUpdatePasswordMutation } from "@/store/features/auth/authApi";
import { showToast } from "@/utils/notification";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Get required parameters from URL
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  // Check if we have required parameters
  useEffect(() => {
    if (!email || !token) {
      showToast({
        title: "Ошибка",
        description: "Отсутствуют необходимые параметры для сброса пароля",
        color: "danger",
      });
    }
  }, [email, token]);

  const validateForm = () => {
    if (!password || !passwordConfirm) {
      showToast({
        title: "Ошибка",
        description: "Все поля обязательны для заполнения",
        color: "danger",
      });
      return false;
    }

    if (password !== passwordConfirm) {
      showToast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        color: "danger",
      });
      return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!hasUpperCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
      showToast({
        title: "Ошибка",
        description:
          "Пароль должен содержать как минимум одну заглавную букву, один символ, один чисел и быть длиной как минимум 8",
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
      await updatePassword({
        email: email,
        password: password,
        token: token,
      }).unwrap();

      showToast({
        title: "Успешно",
        description: "Пароль успешно изменен. Теперь вы можете войти с новыми данными.",
        color: "success",
      });

      router.push("/login");
    } catch (error) {
      // Error handling is done by middleware
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
