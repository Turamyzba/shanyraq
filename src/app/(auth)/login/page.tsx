"use client";

import { useState } from "react";
import { Checkbox, Form } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { MyPasswordInput } from "@/components/ui/MyPasswordInput";
import styles from "./Login.module.scss";
import { useLoginMutation } from "@/store/features/auth/authApi";
import { useDispatch } from "react-redux";
import { showToast } from "@/utils/notification";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      showToast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        color: "danger",
      });
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();

      if (result.data) {
        router.push("/apartments");
      }
    } catch (error) {
      // Error is handled by middleware
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
