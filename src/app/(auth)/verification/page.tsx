"use client";

import { useState } from "react";
import { Form, InputOtp } from "@heroui/react";
import MyButton from "@/components/ui/MyButton";

export default function VerificationPage() {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      code: code,
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-[720px] rounded-2xl py-[70px] px-[100px]">
        <div className="mb-5 text-center">
          <h2 className="text-3xl mb-3">Введите код подтверждения</h2>
          <p className="text-[#B5B7C0] text-base">
            Пожалуйста, введите 6-значный код, отправленный на ваш электронный адрес.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className={"gap-3.5"}>
          <div className="w-full flex justify-center">
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

          <MyButton type={"submit"} className={"bg-primary text-white w-full rounded font-bold"}>
            Потвердить
          </MyButton>
          <MyButton className={"bg-white text-black w-full rounded font-bold"}>
            Отправить код повторно
          </MyButton>
        </Form>
      </div>
    </div>
  );
}
