import { Formik, Form, Field } from 'formik'
import React, { useEffect, useLayoutEffect } from 'react'
import { signIn } from 'store/auth'
import { Fields } from 'components'
import { Button, Card, message } from 'antd'
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { changeMyUser } from "store/myuser";
import storage from 'services/storage'
import api from 'services/api'
import { useState } from 'react'
import { LoginOutlined, LoadingOutlined } from "@ant-design/icons";
import IconUz from 'assets/images/png/uz.png'
import IconRu from 'assets/images/png/ru.png'
import { changeLanguage } from 'store/system'


const Index = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const { currentLangCode } = useSelector(state => state.system)
    const [disable, setDisable] = useState(false)

    const validate = Yup.object({
        name: Yup.string()
            .max(30, 'Xarflar soni 30 dan oshmasin...!')
            .required("Username kiritilmagan...!"),
        email: Yup.string()
            .max(30, 'Xarflar soni 30 dan oshmasin...!')
            .required("Email kiritilmagan...!"),
        key: Yup.string()
            .min(1, "Kalit uzunligi 1 ta dan ko'p bo'lsin...!")
            .required("Kalit kiritilmagan...!"),
        secret: Yup.string()
            .min(1, "Parol uzunligi 1 ta dan ko'p bo'lsin...!")
            .required("Parol kiritilmagan...!"),
    })

    const mutation = useMutation({
        mutationFn: (newTodo) => {
            return api.post(
                "/signup",
                newTodo
            );
        },
        onSuccess: (data) => {
            console.log(data?.data);
            dispatch(changeMyUser(data.data));
            navigate("/");
            dispatch(signIn(data.data));
            setDisable(false)
        },
        onError: (error) => {
            setDisable(false)
            console.log(error);
        }
    });

    const changeLang = () => {
        if (currentLangCode === "uz") {
            dispatch(changeLanguage("ru"))
        }
        else {
            dispatch(changeLanguage("uz"))
        }
    }

    return (
        <div className="w-full bg-contain bg-no-repeat bg-left h-[100vh]" style={{ backgroundImage: "url('/bg.png')" }}>
            <div className='w-full h-full flex items-center justify-center'>
                <Card className='w-[330px]'>
                    <h1 className='text-[#151515] text-center'>
                        {
                            currentLangCode === "uz" ? "Ro'yhatdan o'tish" : "Регистрация"
                        }
                    </h1>
                    <div className='my-4'>
                        <div>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    key: '',
                                    secret: ''
                                }}
                                onSubmit={(data) => {
                                    signIn(data)
                                }}
                                validationSchema={validate}
                            >
                                {({ values, setFieldValue }) => {
                                    return (
                                        <Form>
                                            {contextHolder}
                                            <Field
                                                name='name'
                                                label={`${currentLangCode === "uz" ? "Login" : "Логин"}`}
                                                component={Fields.Input}
                                                errorMessage={`${currentLangCode === "uz" ? "Login kiriting" : "Введите свой логин"}`}
                                            />
                                            <Field
                                                name='email'
                                                label={`${currentLangCode === "uz" ? "Email" : "Email"}`}
                                                component={Fields.Input}
                                                errorMessage={`${currentLangCode === "uz" ? "Email kiriting" : "Введите свой email"}`}
                                            />
                                            <Field
                                                name='key'
                                                label={`${currentLangCode === "uz" ? "Kalit" : "ключ"}`}
                                                component={Fields.Input}
                                                errorMessage={`${currentLangCode === "uz" ? "Kalit kiriting" : "Введите свой ключ"}`}
                                            />
                                            <Field
                                                name='secret'
                                                label={`${currentLangCode === "uz" ? "Parol" : "Пароль"}`}
                                                type="password"
                                                component={Fields.Input}
                                                hasPassword={true}
                                                errorMessage={`${currentLangCode === "uz" ? "Parol kiriting" : "Введите свой Пароль"}`}
                                            />
                                            <div className='w-full h-[40px] mx-auto mt-8'>
                                                <Button
                                                    className="w-full h-full uppercase rounded-[4px] text-white bg-[#6200EE]"
                                                    type='ghost'
                                                    onClick={() => { mutation.mutate(values), setDisable(true) }}
                                                    disabled={disable}
                                                >
                                                    {disable ? <LoadingOutlined /> : <LoginOutlined />}
                                                    {
                                                        disable ?
                                                            `${currentLangCode === "uz" ? "Biroz kuting..." : "Ждать..."}` :
                                                            `${currentLangCode === "uz" ? "Royhatdan o'tish" : "Регистрация"}`
                                                    }
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                        <button onClick={() => navigate("/auth/sign-in")} className='w-full text-center mt-4 text-[#000000] text-[14px] cursor-pointer bg-transparent outline-none border-none'>
                            {
                                currentLangCode === "uz" ? " Hisobingiz bormi?" : "У вас есть учетная запись?"
                            }
                            <span className='text-[#6200EE] cursor-pointer'>
                                {
                                    currentLangCode === "uz" ? " Tizimga kirish" : " Вход в систему"
                                }
                            </span>
                        </button>
                    </div>
                    <div className='w-full flex items-center justify-between px-4'>
                        <span className='text-[#6200EE] text-sm'>
                            {
                                currentLangCode === "uz" ? "Tilni tanlang:" : "Выберите язык:"
                            }
                        </span>
                        <span className='relative w-[35px] h-[35px]' onClick={() => changeLang()}>
                            <img src={currentLangCode === "uz" ? IconUz : IconRu} className='absolute w-full h-full object-contain' alt="" />
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Index;