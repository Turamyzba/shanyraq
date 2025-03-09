"use client";

import React, { useState } from "react";
import { Form } from "@heroui/react";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      email: email,
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-[720px] rounded-2xl py-[70px] px-[100px]">
        <div className="mb-5">
          <h2 className="text-3xl mb-3">Забыли пароль?</h2>
          <p>
            Не волнуйтесь, такое случается со всеми нами. Введите свой адрес электронной почты ниже,
            чтобы восстановить пароль
          </p>
        </div>

        <Form onSubmit={handleSubmit} className={"gap-3.5"}>
          <MyInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email"
            isRequired
          />

          <MyButton type={"submit"} className={"bg-primary text-white w-full rounded font-bold"}>
            Продолжить
          </MyButton>
          <MyButton className={"bg-white text-black w-full rounded font-bold"}>Назад</MyButton>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
