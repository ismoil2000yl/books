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

const index = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch()
  const { currentLangCode } = useSelector(state => state.system)


  const [disable, setDisable] = useState(false)

  const validate = Yup.object({
    username: Yup.string()
      .max(30, 'Xarflar soni 30 dan oshmasin...!')
      .required("Username kiritilmagan...!"),
    password: Yup.string()
      .min(1, "Parol uzunligi 1 ta dan ko'p bo'lsin...!")
      .required("Parol kiritilmagan...!"),
  })

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return api.post(
        "/myself",
        newTodo
      );
    },
    onSuccess: (data) => {
      console.log(data?.data);
      dispatch(changeMyUser(data.data));
      // storage.set("token", data.data.access)
      // storage.set("refresh-token", data.data.refresh)
      navigate("/");
      dispatch(signIn(data.data));
      setDisable(false)
    },
    onError: (error) => {
      setDisable(false)
      console.log(error);
      if (error?.response?.data?.detail) {
        messageApi.open({
          type: 'error',
          content: "Username yoki parol xato!",
        });
      }
      if (error?.response?.data?.password) {
        messageApi.open({
          type: 'error',
          content: "Parol kiritilmagan!",
        });
      }
      if (error?.response?.data?.username) {
        messageApi.open({
          type: 'error',
          content: "Login kiritilmagan!",
        });
      }
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
              currentLangCode === "uz" ? "Kirish" : "Вход"
            }
          </h1>
          <div className='my-4'>
            <Formik
              initialValues={{
                name: '',
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
                      errorMessage={`${currentLangCode==="uz"?"Login kiriting":"Введите свой логин"}`}
                    />
                    <Field
                      name='secret'
                      label={`${currentLangCode === "uz" ? "Parol" : "Пароль"}`}
                      type="password"
                      component={Fields.Input}
                      hasPassword={true}
                      errorMessage={`${currentLangCode==="uz"?"Parol kiriting":"Введите свой Пароль"}`}
                    />
                    <div className='w-full h-[40px] mx-auto mt-8'>
                      <Button
                        className="w-full h-full uppercase rounded-[4px] text-white bg-[#6200EE]"
                        type='ghost'
                        // onDoubleClick={() => dispatch(signIn({}))}
                        onClick={() => { mutation.mutate(values), setDisable(true) }}
                        disabled={disable}
                      >
                        {disable ? <LoadingOutlined /> : <LoginOutlined />}
                        {
                          disable ?
                            `${currentLangCode === "uz" ? "Biroz kuting..." : "Ждать..."}` :
                            `${currentLangCode === "uz" ? "Kirish" : "Вход"}`
                        }
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <button onClick={() => navigate("/auth/sign-up")} className='w-full text-center mt-4 text-[#000000] text-[14px] cursor-pointer bg-transparent outline-none border-none'>
              {
                currentLangCode === "uz" ? " Hisobingiz yo'qmi?" : "У вас нет учетной записи?"
              }
              <span className='text-[#6200EE] cursor-pointer'>
              {
                currentLangCode === "uz" ? " Ro'yhatdan o'tish" : " Регистрация"
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
  )
}

export default index