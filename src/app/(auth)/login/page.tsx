'use client'

import MyInput from "@/components/ui/MyInput";
import {Checkbox, Form} from "@heroui/react";
import Link from "next/link";
import {useState} from "react";
import MyButton from "@/components/ui/MyButton";
import {MyPasswordInput} from "@/components/ui/MyPasswordInput";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            email: email,
            password: password,
            rememberMe: rememberMe
        });
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="max-w-[600px] rounded-2xl py-[70px] px-[100px]">
                <h2 className="text-3xl text-center mb-10">Войдите в аккаунт Shanyraq!</h2>

                <Form onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-3.5">
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
                    <div className="flex w-full justify-between items-center my-4">
                        <Checkbox
                            isSelected={rememberMe}
                            onValueChange={setRememberMe}
                        >
                            Запомнить меня
                        </Checkbox>
                        <Link href={'#'} className={"text-primary hover:underline"}>Забыли пароль?</Link>
                    </div>

                    <MyButton type={'submit'}
                              className={"bg-primary text-white w-full rounded font-bold"}>Войти</MyButton>
                </Form>
            </div>
        </div>
    )
}