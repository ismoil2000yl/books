import React from 'react'
import IconLogo from 'assets/images/png/logo.png'
import { useNavigate } from 'react-router-dom'
import IconSearch from 'assets/images/png/search.png'
import { Avatar, Button, Input } from 'antd'
import { BellOutlined } from "@ant-design/icons";
import ImgAvatar from 'assets/images/jpg/avatar.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from 'store/system'
import IconUz from 'assets/images/png/uz.png'
import IconRu from 'assets/images/png/ru.png'
import { setSearch } from 'store/search'

const header = () => {

  const navigate = useNavigate("/")
  const dispatch = useDispatch()
  const { currentLangCode } = useSelector(state => state.system)
  const { search } = useSelector(state => state.search)

  const changeLang = () => {
    if (currentLangCode === "uz") {
      dispatch(changeLanguage("ru"))
    }
    else {
      dispatch(changeLanguage("uz"))
    }
  }

  const changeValue = (e) => {
    dispatch(setSearch(e))
  }

  return (
    <div className='w-full h-[72px] container'>
      <div className='w-full h-full flex items-center justify-between'>
        <div className='flex gap-4 items-center'>
          <div onClick={(() => navigate("/"))} className='w-[150px] h-[36px] relative cursor-pointer border border-solid border-transparent hover:border-b-[#6200EE]'>
            <img src={IconLogo} className='absolute w-full h-full object-contain' alt="" />
          </div>
          <div className='flex items-center gap-2'>
            <img src={IconSearch} className='w-[18px] h-[18px] object-contain' alt="" />
            <input value={search} onChange={(e) => changeValue(e.target.value)} type="text" placeholder={`${currentLangCode === "uz" ? "Istagan har qanday treningni qidiring" : "Найдите любое обучение, которое вам нужно"}`} className='w-[350px] placeholder-[#FEFEFE] text-base text-white bg-transparent outline-none border-none' />
          </div>
        </div>
        <div className='flex items-center justify-end gap-4'>
          <span className='relative w-[30px] h-[30px] cursor-pointer' onClick={() => changeLang()}>
            <img src={currentLangCode === "uz" ? IconUz : IconRu} className='absolute w-full h-full object-contain' alt="" />
          </span>
          <Button className='cursor-pointer outline-none border-none bg-transparent'>
            <BellOutlined style={{ fontSize: '24px' }} />
          </Button>
          <div className='cursor-pointer'>
            <Avatar size={40} src={ImgAvatar} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default header