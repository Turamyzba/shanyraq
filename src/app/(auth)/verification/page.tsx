"use client";

import { useState, useEffect } from "react";
import { Form, InputOtp } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import styles from "./Verification.module.scss";
import { useMediaQuery } from "react-responsive";
import {
  useVerifyEmailMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
  useRegisterMutation,
} from "@/store/features/auth/authApi";
import { showToast } from "@/utils/notification";

export default function VerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });

  const [verifyEmail, { isLoading: verifyEmailLoading }] = useVerifyEmailMutation();
  const [verifyCode, { isLoading: verifyCodeLoading }] = useVerifyCodeMutation();
  const [resendCode, { isLoading: resendApiLoading }] = useResendCodeMutation();
  const [register, { isLoading: registerApiLoading }] = useRegisterMutation();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [verificationType, setVerificationType] = useState<"register" | "reset">("register");

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
      showToast({
        title: "Ошибка",
        description: "Email не указан. Вернитесь на предыдущую страницу.",
        color: "danger",
      });
    }

    if (typeParam === "reset") {
      setVerificationType("reset");
    }

    // Start countdown for resend button
    if (emailParam) {
      setCountdown(30);
      setCanResend(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.length !== 6) {
      showToast({
        title: "Ошибка",
        description: "Пожалуйста, введите 6-значный код",
        color: "danger",
      });
      return;
    }

    if (!email) {
      showToast({
        title: "Ошибка",
        description: "Email не найден, пожалуйста, начните процесс заново",
        color: "danger",
      });
      return;
    }

    try {
      if (verificationType === "reset") {
        await verifyCode({ email, code }).unwrap();
        router.push(`/reset-password?email=${encodeURIComponent(email)}&token=${code}`);
      } else {
        await verifyEmail({ email, code }).unwrap();
        showToast({
          title: "Успешно",
          description: "Email успешно подтвержден. Теперь вы можете войти в систему.",
          color: "success",
        });
        router.push("/login");
      }
    } catch (error) {
      // Error is handled by middleware
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      showToast({
        title: "Ошибка",
        description: "Email не найден, пожалуйста, начните процесс заново",
        color: "danger",
      });
      return;
    }

    try {
      await resendCode({ email }).unwrap();
      setCountdown(30);
      setCanResend(false);
      showToast({
        title: "Успешно",
        description: "Код успешно отправлен повторно на ваш email",
        color: "success",
      });
    } catch (error) {
      // Error is handled by middleware
    }
  };

  const handleUpdateEmail = async () => {
    if (!newEmail) {
      showToast({
        title: "Ошибка",
        description: "Пожалуйста, введите email",
        color: "danger",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      showToast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        color: "danger",
      });
      return;
    }

    if (firstName && lastName && password && newEmail !== email) {
      try {
        await register({
          firstName,
          lastName,
          email: newEmail,
          password,
        }).unwrap();

        // Update URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("email", newEmail);
        window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);

        setEmail(newEmail);
        setCode("");
        setEditingEmail(false);
        setCountdown(30);
        setCanResend(false);

        showToast({
          title: "Успешно",
          description: "Email успешно изменен. Код подтверждения отправлен на новый адрес.",
          color: "success",
        });
      } catch (error) {
        // Error is handled by middleware
      }
    } else {
      setEditingEmail(false);
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
                  isLoading={registerApiLoading}
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
                isLoading={resendApiLoading}
                isDisabled={!canResend}
              >
                {canResend
                  ? "Отправить код повторно"
                  : `Повторная отправка через ${countdown} сек.`}
              </MyButton>
              <MyButton
                type={"submit"}
                className={styles.confirmButton}
                isLoading={verifyEmailLoading || verifyCodeLoading}
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
