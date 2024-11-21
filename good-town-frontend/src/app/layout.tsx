"use client";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import store, { AppDispatch } from "@/stores";
import { Provider, useDispatch } from "react-redux";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import AccessLayout from "@/access/AccessLayout";
import {DEFAULT_USER} from "@/app/constants/user";

const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const doInitLoginUser = useCallback(async () => {
    dispatch(setLoginUser(DEFAULT_USER));
    // todo 全局初始化暂时关闭
    // const res = await getLoginUserUsingGet();
    // if (res.data) {
    //   // todo
    //   dispatch(setLoginUser(res.data));
    // } else {
    //   dispatch(setLoginUser(DEFAULT_USER));
    // }
  }, []);

  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
