"use client";
import {IdcardOutlined, LockOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {LoginForm, ProForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {Image, message} from "antd";
import {userRegisterUsingPost} from "@/api/userController";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import {useRouter} from "next/navigation";
import Link from "next/link";
import React from "react";

/**
 * 用户注册界面
 * @param props
 * @constructor
 */
const UserRegisterPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const doSubmit = async (values: any) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功");
        router.push("/user/login");
      }
    } catch (e: any) {
      message.error("注册失败，" + e.message);
    }
  };
  return (
    <div id="userRegisterPage">
      <LoginForm
        form={form}
        logo={<Image src={"/assets/logo.png"} width={42} height={42} />}
        title="好乡镇 - 用户注册"
        subTitle="开发网站"
        onFinish={doSubmit}
        submitter={{
            searchConfig: {
                submitText: "注册",
            },
        }}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"确认密码"}
            rules={[
              {
                required: true,
                message: "请确认密码！",
              },
            ]}
        />
          <ProFormText
              name="userName"
              fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
              }}
              placeholder={"请输入姓名"}
              rules={[
                  {
                      required: true,
                      message: "请输入姓名!",
                  },
              ]}
          />
          <ProFormText
              name="userIDCard"
              fieldProps={{
                  size: "large",
                  prefix: <IdcardOutlined />,
              }}
              placeholder={"请输入证件号码"}
              rules={[
                  {
                      required: true,
                      message: "请输入证件号码！",
                  },
              ]}
          />
          <ProFormSelect
              name="userIDCardType"
              fieldProps={{
                  size: "large",
                  prefix: <IdcardOutlined />,
              }}
              placeholder={"请选择证件类型"}
              rules={[
                  {
                      required: true,
                      message: "请选择证件类型！",
                  },
              ]}
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
          <ProFormText
              name="phone"
              fieldProps={{
                  size: "large",
                  prefix: <PhoneOutlined />,
              }}
              placeholder={"请输入电话"}
              rules={[
                  {
                      required: true,
                      message: "请输入电话!",
                  },
              ]}
          />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有账号？
            <Link href="/user/login">去登录</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
