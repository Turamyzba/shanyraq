'use client'

import MyInput from "@/components/ui/MyInput";
import {Form} from "@heroui/react";
import Link from "next/link";
import {useState} from "react";
import MyButton from "@/components/ui/MyButton";
import {MyPasswordInput} from "@/components/ui/MyPasswordInput";


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
        });
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="max-w-[600px] rounded-2xl py-[70px] px-[100px]">
                <h2 className="text-3xl text-center mb-10">Присоединяйтесь к Shanyraq! </h2>

                <Form onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-3.5">
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

                    <MyButton type={'submit'}
                              className={"bg-primary text-white w-full rounded font-bold py-6"}>Зарегистрироваться</MyButton>

                </Form>
                <p className={"text-center mt-5"}>Уже есть учетная запись?
                    <Link className={"hover:underline text-primary"} href={"#"}>Войдите</Link></p>
            </div>
        </div>
    )
}