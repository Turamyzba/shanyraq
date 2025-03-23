"use client";

import { useState } from "react";
import { Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { addToast } from "@heroui/react";
import styles from "./ForgotPassword.module.scss";
import { useForgotPasswordMutation } from "@/store/features/auth/authApi";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

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

    forgotPassword({ email }).then((res) => {
      router.push(`/verification?email=${encodeURIComponent(email)}&type=reset`);
    });
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
