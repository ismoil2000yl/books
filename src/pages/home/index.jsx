import { Button, Card, message, Popconfirm, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from '@tanstack/react-query';
import { usePost } from 'crud';
import Create from './create'
import api from 'services/api';

const home = () => {

  const { currentLangCode } = useSelector(state => state.system)
  const { search } = useSelector(state => state.search)

  const [modalData, setModalData] = useState({ isOpen: false, data: null })
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: deletedHandler } = usePost()
  const [data, setData] = useState([])

  const getData = async () => {
    const data = await api.get(`/books/${search}`)
    setData(data?.data)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/books/${id}`,
      method: "delete",
      onSuccess: () => {
        getData(),
          messageApi.open({
            type: 'success',
            content: "Kitob o'chirib yuborildi"
          })
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: "Kitob o'chirilmadi...!"
        })
      }
    })
  };
  return (
    <div className='w-full h-full container'>
      {contextHolder}
      <div className='w-full flex items-center justify-between mt-6'>
        {
          currentLangCode === "uz" ?
            <h1 className='text-[#FEFEFE]'>
              Sizda <span className='text-[#6200EE]'>7 ta kitob</span> bor
            </h1> :
            <h1 className='text-[#FEFEFE]'>
              у вас есть <span className='text-[#6200EE]'>7 книг</span>
            </h1>
        }
        <Button
          onClick={() => setModalData({ isOpen: true, data: null })}
          type='ghost'
          className='bg-[#6200EE] text-white hover:bg-white hover:text-[#6200EE]'
        >
          <PlusOutlined />
          {
            currentLangCode === "uz" ? "Kitob yaratish" : "Создать книгу"
          }
        </Button>
        <Create modalData={modalData} setModalData={setModalData} getData={getData} />
      </div>
      <h4 className='text-[#FEFEFE]'>
        {
          currentLangCode === "uz" ? "Bugungi kitoblaringiz" : "ваши книги сегодня"
        }
      </h4>
      <div className='w-full flex flex-wrap items-center justify-center gap-6 mt-8'>

        {
          data?.length ?
            data?.map((item, ind) => {
              return (
                <Card key={ind} className='min-w-[31%] max-w-[350px] shadow-lg relative group cursor-pointer'>
                  <div className='hidden absolute right-[-2.9rem] z-[99] top-4 group-hover:flex flex-col'>
                    <Tooltip placement='left' title={"O'chirish"}>
                      <Popconfirm
                        placement="topRight"
                        title={"O'chirish"}
                        description={"O'chirishni xoxlaysizmi?"}
                        onConfirm={() => deleteConfirm(item?.id)}
                        onCancel={() => { }}
                        okText="Ha"
                        cancelText="Yo'q"
                      >
                        <Button type='primary' danger className='text-white'>
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>
                    </Tooltip>
                    <Button onClick={() => setModalData({ isOpen: true, data: item })} type='primary' className='text-white'>
                      <EditOutlined />
                    </Button>
                  </div>
                  <h3 className='text-[#151515]'>Raspberry Pi User Guide</h3>
                  <p className='p-0 m-0 text-[#333333] text-[14px]'>Cover: <span>http://url.to.book.cover</span></p>
                  <p className='p-0 m-0 text-[#333333] text-[14px]'>Pages: <span>221</span></p>
                  <p className='p-0 m-0 text-[#333333] text-[14px]'>Published: <span>2012</span></p>
                  <p className='p-0 m-0 text-[#333333] text-[14px]'>ISBN: <span>{item?.isbn}</span></p>
                  <div className='w-full h-[40px] mt-4 flex items-center justify-between'>
                    <p>Eben Upton / 2012</p>
                    <Button
                      type='ghost'
                      className={`text-white font-bold rounded-[8.5px] bg-[#FF0000]`}
                    >
                      New
                    </Button>
                  </div>
                </Card>
              )
            })
            : <span className='text-[#6200EE]'>
              {
                currentLangCode === "uz" ? "Biroz kuting..." : "Подождите минуту..."
              }
            </span> // Bu yerga loader qoyiladi, ma'lumot kelguncha chiqib turishi uchun
        }

        {/* <Card className='min-w-[31%] max-w-[350px] shadow-lg relative group cursor-pointer'>
          <div className='hidden absolute right-[-2.9rem] z-[99] top-4 group-hover:flex flex-col'>
            <Tooltip placement='left' title={"O'chirish"}>
              <Popconfirm
                placement="topRight"
                title={"O'chirish"}
                description={"O'chirishni xoxlaysizmi?"}
                onConfirm={() => deleteConfirm(item?.id)}
                onCancel={() => { }}
                okText="Ha"
                cancelText="Yo'q"
              >
                <Button type='primary' danger className='text-white'>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
            <Button onClick={() => setModalData({ isOpen: true, data: { book: "978118464465" } })} type='primary' className='text-white'>
              <EditOutlined />
            </Button>
          </div>
          <h3 className='text-[#151515]'>Raspberry Pi User Guide</h3>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Cover: <span>http://url.to.book.cover</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Pages: <span>221</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Published: <span>2012</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>ISBN: <span>978118464465</span></p>
          <div className='w-full h-[40px] mt-4 flex items-center justify-between'>
            <p>Eben Upton / 2012</p>
            <Button
              type='ghost'
              className={`text-white font-bold rounded-[8.5px] bg-[#FF0000]`}
            >
              New
            </Button>
          </div>
        </Card>

        <Card className='min-w-[31%] max-w-[350px] shadow-lg relative group cursor-pointer'>
          <div className='hidden absolute right-[-2.9rem] z-[99] top-4 group-hover:flex flex-col'>
            <Tooltip placement='left' title={"O'chirish"}>
              <Popconfirm
                placement="topRight"
                title={"O'chirish"}
                description={"O'chirishni xoxlaysizmi?"}
                onConfirm={() => deleteConfirm(item?.id)}
                onCancel={() => { }}
                okText="Ha"
                cancelText="Yo'q"
              >
                <Button type='primary' danger className='text-white'>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
            <Button onClick={() => setModalData({ isOpen: true, data: { book: "1234567" } })} type='primary' className='text-white'>
              <EditOutlined />
            </Button>
          </div>
          <h3 className='text-[#151515]'>Raspberry Pi User Guide</h3>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Cover: <span>http://url.to.book.cover</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Pages: <span>221</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Published: <span>2012</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>ISBN: <span>978118464465</span></p>
          <div className='w-full h-[40px] mt-4 flex items-center justify-between'>
            <p>Eben Upton / 2012</p>
            <Button
              type='ghost'
              className={`text-white font-bold rounded-[8.5px] bg-[#FFEC43]`}
            >
              Reading
            </Button>
          </div>
        </Card>

        <Card className='min-w-[31%] max-w-[350px] shadow-lg relative group cursor-pointer'>
          <div className='hidden absolute right-[-2.9rem] z-[99] top-4 group-hover:flex flex-col'>
            <Tooltip placement='left' title={"O'chirish"}>
              <Popconfirm
                placement="topRight"
                title={"O'chirish"}
                description={"O'chirishni xoxlaysizmi?"}
                onConfirm={() => deleteConfirm(item?.id)}
                onCancel={() => { }}
                okText="Ha"
                cancelText="Yo'q"
              >
                <Button type='primary' danger className='text-white'>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
            <Button onClick={() => setModalData({ isOpen: true, data: { book: "1234567" } })} type='primary' className='text-white'>
              <EditOutlined />
            </Button>
          </div>
          <h3 className='text-[#151515]'>Raspberry Pi User Guide</h3>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Cover: <span>http://url.to.book.cover</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Pages: <span>221</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>Published: <span>2012</span></p>
          <p className='p-0 m-0 text-[#333333] text-[14px]'>ISBN: <span>978118464465</span></p>
          <div className='w-full h-[40px] mt-4 flex items-center justify-between'>
            <p>Eben Upton / 2012</p>
            <Button
              type='ghost'
              className={`text-white font-bold rounded-[8.5px] bg-[#00FF29]`}
            >
              Finished
            </Button>
          </div>
        </Card> */}

      </div>
    </div>
  )
}

export default home