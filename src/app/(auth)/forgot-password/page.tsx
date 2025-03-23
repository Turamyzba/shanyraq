"use client";

import React, { useState } from "react";
import { Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { forgotPassword } from "@/lib/api/authService";
import { addToast } from "@heroui/react";
import styles from "./ForgotPassword.module.scss";

function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, введите email",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return;
    }

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
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword({ email });

      addToast({
        title: "Инструкции отправлены!",
        description: "Проверьте вашу электронную почту для восстановления пароля",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "success",
      });

      // Redirect to verification page with email
      router.push(`/verification?email=${encodeURIComponent(email)}&type=reset`);
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description:
          err?.response?.data || err.message || "Произошла ошибка при отправке инструкций",
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
          <h2>Забыли пароль?</h2>
          <p>
            Не волнуйтесь, такое случается со всеми нами. Введите свой адрес электронной почты ниже,
            чтобы восстановить пароль
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <MyInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              isRequired
            />
          </div>

          <div className={styles.buttonGroup}>
            <MyButton type={"submit"} className={styles.continueButton} isLoading={isLoading}>
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

export default ForgotPasswordPage;
