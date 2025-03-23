"use client";

import { useState } from "react";
import { Checkbox, Form } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { MyPasswordInput } from "@/components/ui/MyPasswordInput";
import { login } from "@/lib/api/authService";
import { addToast } from "@heroui/react";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await login({ email, password });

      addToast({
        title: "Успешный вход!",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "success",
      });

      router.push("/apartments");
    } catch (err: any) {
      const errorMessage = err?.response?.data || "Неверный email или пароль";

      addToast({
        title: "Ошибка",
        description: errorMessage,
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
          <h2>Войдите в аккаунт Shanyraq!</h2>
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
            <MyPasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
              isRequired
            />
          </div>

          <div className={styles.rememberForgot}>
            <Checkbox
              isSelected={rememberMe}
              onValueChange={setRememberMe}
              className={styles.rememberMe}
            >
              Запомнить меня
            </Checkbox>
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Забыли пароль?
            </Link>
          </div>

          <MyButton type={"submit"} className={styles.submitButton} isLoading={isLoading}>
            Войти
          </MyButton>
        </Form>

        <div className={styles.footer}>
          Нет учетной записи?
          <Link href="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
