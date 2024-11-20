"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {updateUserUsingPost} from "@/api/userController";

const UserInfo = () => {
    const loginUser = useSelector((state: RootState) => state.loginUser);

    const onFinish = (values: any) => {
        try {
            const res = updateUserUsingPost(values);
            if (res.data) {
                message.success('信息已更新！');
            }
        } catch(e: any) {
            message.error('信息更新失败！' + e.message());
        }


    };

    return (
        <div>
            <h2>个人信息</h2>
            <Form
                layout="vertical"
                initialValues={loginUser}
                onFinish={onFinish}
                style={{ maxWidth: '400px' }}
            >
                <Form.Item label="用户昵称" name="userNickName">
                    <Input />
                </Form.Item>
                <Form.Item label="电话" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="姓名" name="userName">
                    <Input />
                </Form.Item>
                <Form.Item label="证件号码" name="userIDCard">
                    <Input />
                </Form.Item>
                <Form.Item label="证件类型" name="userIDCardType">
                    <Input />
                </Form.Item>
                <Form.Item label="用户简介" name="userProfile">
                    <Input />
                </Form.Item>
                <Form.Item label="头像">
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                            updateUserUsingPost({...loginUser, userAvatar: URL.createObjectURL(file) });
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>上传头像</Button>
                    </Upload>
                    {loginUser.userAvatar && <img src={loginUser.userAvatar} alt="avatar" style={{ width: 100, marginTop: 10 }} />}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserInfo;
