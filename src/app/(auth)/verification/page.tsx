"use client";

import { useState, useEffect } from "react";
import { Form, InputOtp } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import {
  verifyEmail,
  verifyResetCode,
  resendVerificationCode,
  register,
} from "@/lib/api/authService";
import { addToast } from "@heroui/react";
import styles from "./Verification.module.scss";
import { useMediaQuery } from "react-responsive";

export default function VerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [verificationType, setVerificationType] = useState<"register" | "reset">("register");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [updateEmailLoading, setUpdateEmailLoading] = useState(false);

  // Registration data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Initialize from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const typeParam = searchParams.get("type");

    // Look for additional registration data
    const firstNameParam = searchParams.get("firstName");
    const lastNameParam = searchParams.get("lastName");
    const passwordParam = searchParams.get("password");

    if (firstNameParam) setFirstName(firstNameParam);
    if (lastNameParam) setLastName(lastNameParam);
    if (passwordParam) setPassword(passwordParam);

    if (emailParam) {
      setEmail(emailParam);
      setNewEmail(emailParam);
    } else {
      addToast({
        title: "Ошибка",
        description: "Email не указан. Вернитесь на предыдущую страницу.",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
    }

    if (typeParam === "reset") {
      setVerificationType("reset");
    }

    setCountdown(30);
    setCanResend(false);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.length !== 6) {
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, введите 6-значный код",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return;
    }

    if (!email) {
      addToast({
        title: "Ошибка",
        description: "Email не найден, пожалуйста, начните процесс заново",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Different verification based on type
      if (verificationType === "reset") {
        // Verify reset code
        await verifyResetCode({ email, code });

        addToast({
          title: "Код верифицирован!",
          variant: "flat",
          radius: "sm",
          timeout: 5000,
          color: "success",
        });

        // Redirect to reset password page with email
        router.push(`/reset-password?email=${encodeURIComponent(email)}&token=${code}`);
      } else {
        // Verify email for registration
        await verifyEmail({ email, code });

        addToast({
          title: "Email подтвержден!",
          description: "Теперь вы можете войти в систему",
          variant: "flat",
          radius: "sm",
          timeout: 5000,
          color: "success",
        });

        // Redirect to login page
        router.push("/login");
      }
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description: err?.response?.data || err.message || "Неверный код подтверждения",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      addToast({
        title: "Ошибка",
        description: "Email не найден, пожалуйста, начните процесс заново",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
      return;
    }

    try {
      setResendLoading(true);
      await resendVerificationCode(email);

      addToast({
        title: "Код отправлен повторно!",
        description: "Проверьте вашу электронную почту",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "success",
      });

      setCountdown(30);
      setCanResend(false);
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description: err?.response?.data || err.message || "Ошибка при повторной отправке кода",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!newEmail) {
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
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
      setUpdateEmailLoading(true);

      // If we have firstName, lastName and password (from URL params), we can register directly
      if (firstName && lastName && password && newEmail !== email) {
        // Re-register with the new email
        await register({
          firstName,
          lastName,
          email: newEmail,
          password,
        });

        addToast({
          title: "Новая регистрация выполнена!",
          description: "Пожалуйста, проверьте электронную почту для подтверждения",
          variant: "flat",
          radius: "sm",
          timeout: 5000,
          color: "success",
        });

        // Update the URL and internal state
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("email", newEmail);
        window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);

        setEmail(newEmail);
        setCode(""); // Reset code for new email
      }
      // Exit editing mode
      setEditingEmail(false);
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description: err?.response?.data || err.message || "Ошибка при обновлении email",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
    } finally {
      setUpdateEmailLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h2>Введите код подтверждения</h2>
          <p>
            {!editingEmail
              ? "Пожалуйста, введите 6-значный код, отправленный на ваш электронный адрес."
              : "Пожалуйста, введите новый email адрес для регистрации."}
          </p>

          {!editingEmail ? (
            <div className={styles.emailBlock}>
              <span className={styles.emailDisplay}>{email}</span>
              <button
                type="button"
                onClick={() => setEditingEmail(true)}
                className={styles.changeEmail}
              >
                Изменить email
              </button>
            </div>
          ) : (
            <div className={styles.emailEditBlock}>
              <MyInput
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                type="email"
                label="Email"
                isRequired
              />
              <div className={styles.buttonGroup}>
                <MyButton
                  onClick={handleUpdateEmail}
                  isLoading={updateEmailLoading}
                  className={styles.confirmButton}
                >
                  Сохранить
                </MyButton>
                <MyButton
                  onClick={() => {
                    setEditingEmail(false);
                    setNewEmail(email);
                  }}
                  className={styles.resendButton}
                >
                  Отмена
                </MyButton>
              </div>
            </div>
          )}
        </div>

        {!editingEmail && (
          <Form onSubmit={handleSubmit}>
            <div className={styles.otpContainer}>
              <InputOtp
                length={6}
                value={code}
                onValueChange={setCode}
                size={isSmallMobile ? "sm" : isMobile ? "md" : "lg"}
                classNames={{
                  segmentWrapper: "gap-x-3.5",
                  segment: [
                    "relative border-[#EBEBEB] border-1 bg-white",
                    "data-[active=true]:border-primary",
                    "data-[active=true]:bg-background",
                  ],
                }}
              />
            </div>

            <div className={styles.buttonGroup}>
              <MyButton
                className={styles.resendButton}
                onClick={handleResendCode}
                isLoading={resendLoading}
                isDisabled={!canResend}
              >
                {canResend
                  ? "Отправить код повторно"
                  : `Повторная отправка через ${countdown} сек.`}
              </MyButton>
              <MyButton
                type={"submit"}
                className={styles.confirmButton}
                isLoading={isLoading}
                isDisabled={code.length !== 6}
              >
                Подтвердить
              </MyButton>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
