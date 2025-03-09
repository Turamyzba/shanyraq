'use client'
import React, {useState} from 'react';
import {Form} from "@heroui/react";
import {MyPasswordInput} from "@/components/ui/MyPasswordInput";
import MyButton from "@/components/ui/MyButton";

export default function Page() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            password: password,
            passwordConfirm: passwordConfirm,
        });
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="max-w-[720px] rounded-2xl py-[70px] px-[100px]">
                <div className="mb-5">
                    <h2 className="text-3xl mb-3">Восстановление пароля</h2>
                    <p>Пожалуйста, установите новый пароль для своей учетной записи.</p>
                </div>

                <Form onSubmit={handleSubmit} className={'gap-3.5'}>
                    <MyPasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Создайте новый пароль"
                        isRequired
                    />

                    <MyPasswordInput
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        label="Потвердите новый пароль"
                        isRequired
                    />

                    <MyButton type={'submit'}
                              className={"bg-primary text-white w-full rounded font-bold"}>Продолжить</MyButton>
                    <MyButton className={"bg-white text-black w-full rounded font-bold"}>Назад</MyButton>
                </Form>
            </div>
        </div>
    )
}

