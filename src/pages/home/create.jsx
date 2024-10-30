import React, { useEffect, useState } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { get } from 'lodash'
import api from 'services/api';
import { useQueryClient } from '@tanstack/react-query';

const create = ({ modalData, setModalData, getData }) => {

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        if (modalData?.data?.isbn) {
            try {
                return (await api.put(`/books/${modalData?.data?.id}`, values),
                    messageApi.open({
                        type: 'success',
                        content: "Kitob tahrirlandi"
                    }),
                    setModalData({ isOpen: false, data: null }),
                    getData(),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Kitob tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/books', values),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi kitob qo'shildi"
                    }),
                    setModalData({ isOpen: false, data: null }),
                    getData(),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Kitob qo'shilmadi!",
                });
            }
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            name: modalData?.data?.isbn || ''
        });
    }, [modalData?.data]);

    return (
        <Modal
            destroyOnClose
            title={get(modalData, "data") ? "Tahrirlash" : "Kitob yaratish"}
            open={modalData.isOpen}
            footer={false}
            // onCancel={() => setModalData({ isOpen: false, data: null })}
            closable={false}
            closeIcon={null}
            className='w-[350px]'
        >
            {contextHolder}
            <Form
                form={form}
                className={"w-full "}
                name="horizontal_login"
                layout="inline"
                onFinish={onFinish}
            >
                <Form.Item
                    name="isbn"
                    className='w-full'
                    rules={[
                        {
                            required: true,
                            message: 'Kitob kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        value={modalData?.data?.isbn}
                        defaultValue={modalData?.data?.isbn}
                        // prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="ISBN"
                        className='py-3'
                    />
                </Form.Item>
                <div className='w-full flex items-center justify-center gap-4 mt-6'>
                    <Button
                        type='ghost'
                        onClick={() => setModalData({ isOpen: false, data: null })}
                        className='w-[50%] border border-solid border-[#6200EE] text-[#6200EE] rounded-[4px] bg-white'
                    >
                        <CloseOutlined />
                        Bekor qilish
                    </Button>
                    <Form.Item shouldUpdate className='w-[50%]'>
                        {() => (
                            <Button
                                type="ghost"
                                htmlType="submit"
                                className='w-full bg-[#6200EE] rounded-[4px] text-white'
                            >
                                <PlusOutlined />
                                {modalData?.data ? "Yangilash" : "Qo'shish"}
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default create