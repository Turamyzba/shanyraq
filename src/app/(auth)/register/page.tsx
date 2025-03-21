"use client";

import { useState } from "react";
import { Form } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { MyPasswordInput } from "@/components/ui/MyPasswordInput";
import { register } from "@/lib/api/authService";
import { addToast } from "@heroui/react";
import styles from "./Register.module.scss";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
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

    if (password.length < 6) {
      addToast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
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

    try {
      setIsLoading(true);
      
      // Use the variables directly instead of shorthand properties
      const result = await register({
        firstName: name,
        lastName: lastname,
        email: email,
        password: password
      });

      if(result)
        addToast({
          title: "Успешная регистрация!",
          description: "Пожалуйста, проверьте вашу электронную почту для подтверждения",
          variant: "flat",
          radius: "sm",
          timeout: 5000,
          color: "success"
        });
      else
        addToast({
          title: "Ошибка",
          description: result || "Произошла ошибка при регистрации",
          variant: "flat",
          radius: "sm",
          timeout: 5000,
          color: "danger"
        });
      // Redirect to verification page or login page depending on your flow
      router.push("/verification?email=" + encodeURIComponent(email));
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description: err.message || "Произошла ошибка при регистрации",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger"
      });
    } finally {
      setIsLoading(false);
    }
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

          <MyButton
            type={"submit"}
            className={styles.submitButton}
            isLoading={isLoading}
          >
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