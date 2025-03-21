"use client";

import { useState, useEffect } from "react";
import { Form, InputOtp } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import MyButton from "@/components/ui/MyButton";
import { verifyEmail, verifyResetCode, resendVerificationCode } from "@/lib/api/authService";
import { addToast } from "@heroui/react";
import styles from "./Verification.module.scss";

export default function VerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [verificationType, setVerificationType] = useState<"register" | "reset">("register");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Initialize from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const typeParam = searchParams.get("type");

    if (emailParam) {
      setEmail(emailParam);
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
        description: err.message || "Неверный код подтверждения",
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
    } catch (err: any) {
      addToast({
        title: "Ошибка",
        description: err.message || "Ошибка при повторной отправке кода",
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h2>Введите код подтверждения</h2>
          <p>
            Пожалуйста, введите 6-значный код, отправленный на ваш электронный адрес.
            {email && <div className={styles.emailDisplay}>{email}</div>}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className={styles.otpContainer}>
            <InputOtp
              length={6}
              value={code}
              onValueChange={setCode}
              size={"lg"}
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
              type={"submit"}
              className={styles.confirmButton}
              isLoading={isLoading}
              isDisabled={code.length !== 6}
            >
              Потвердить
            </MyButton>
            <MyButton
              className={styles.resendButton}
              onClick={handleResendCode}
              isLoading={resendLoading}
            >
              Отправить код повторно
            </MyButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
