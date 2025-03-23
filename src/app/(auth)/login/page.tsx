"use client";

import type React from "react";

import { useState } from "react";
import { Checkbox, Form, useSelect } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { MyPasswordInput } from "@/components/ui/MyPasswordInput";
import { addToast } from "@heroui/react";
import styles from "./Login.module.scss";
import { useLoginMutation } from "@/store/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/user/userSlice";
import { RootState, useAppSelector } from "@/store/store";
import { ConsoleSqlOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const state = useAppSelector((state) => state.user);

  console.log(state);

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

    login({ email, password }).then((res) => {
      console.log(res.data);
      router.push("/apartments");
    });
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
