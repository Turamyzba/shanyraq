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
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
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

    try {
      setIsLoading(true);

      // Use the variables directly instead of shorthand properties
      const result = await register({
        firstName: name,
        lastName: lastname,
        email: email,
        password: password,
      });

      if (result)
        addToast({
          title: "Успешная регистрация!",
          description: "Пожалуйста, проверьте вашу электронную почту для подтверждения",
          variant: "flat",
          radius: "sm",
          timeout: 5000,
          color: "success",
        });
      else
        addToast({
          title: "Ошибка",
          description: result || "Произошла ошибка при регистрации",
          variant: "flat",
          radius: "sm",
          timeout: 5000,
          color: "danger",
        });
      // Redirect to verification page or login page depending on your flow
      router.push(
        `/verification?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(name)}&lastName=${encodeURIComponent(lastname)}&password=${encodeURIComponent(password)}`
      );
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description: err.response?.data || "Произошла ошибка при регистрации",
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
