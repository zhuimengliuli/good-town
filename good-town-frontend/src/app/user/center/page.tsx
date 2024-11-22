"use client";
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import {Avatar, Card, Col, message, Row, Space, Upload} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import React from "react";
import { updateMyUserUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import useForm = ProForm.useForm;

/**
 * 用户中心页面
 * @constructor
 */
const UserCenterPage: React.FC = () => {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const router = useRouter();
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Upload>
              <Avatar src={loginUser.userAvatar} size={288} />
            </Upload>
            <div style={{ marginBottom: 16 }} />
            <Card.Meta
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  {loginUser.userName}
                </Title>
              }
              description={
                <Paragraph type="secondary">{loginUser.userProfile}</Paragraph>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={1} />
        <Col xs={24} md={12}>
          <div
            style={{
              margin: 24,
            }}
          >
            <ProForm<API.UserVO>
              layout="horizontal"
              onFinish={async (values) => {
                try {
                  const res = updateMyUserUsingPost(values);
                  if (res.data) {
                    message.success("提交成功");
                    dispatch(setLoginUser(values));
                  }
                  router.push("/user/center");
                } catch (e: any) {
                  message.error("修改用户信息失败，" + e.message);
                }
              }}
              submitter={{
                render: (props, doms) => {
                  return (
                    <Row>
                      <Col span={14} offset={4}>
                        <Space>{doms}</Space>
                      </Col>
                    </Row>
                  );
                },
              }}
              autoFocusFirstInput
              form={form}
              initialValues={loginUser}
            >
              <ProFormText
                width="md"
                name="userName"
                label="姓名"
                initialValue={loginUser.userName}
              />
              <ProFormText
                width="md"
                name="phone"
                label="电话"
                initialValue={loginUser.phone}
              />
              <ProFormText
                width="md"
                name="userNickName"
                label="用户昵称"
                placeholder="请输入名称"
                initialValue={loginUser.userNickName}
              />
              <ProFormText
                name="userIDCard"
                width="md"
                label="证件号码"
                disabled
                initialValue={loginUser.userIDCard}
              />
              <ProFormSelect
                initialValue={loginUser.userIDCardType}
                name="userIDCardType"
                label="证件类型"
                disabled
                width="md"
                options={[
                  {
                    value: "身份证",
                    label: "身份证",
                  },
                  {
                    value: "护照",
                    label: "护照",
                  },
                  {
                    value: "港澳通行证",
                    label: "港澳通行证",
                  },
                ]}
              />
              <ProFormTextArea
                colProps={{ span: 24 }}
                name="userProfile"
                label="用户简介"
                initialValue={loginUser.userProfile}
              />
            </ProForm>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserCenterPage;
