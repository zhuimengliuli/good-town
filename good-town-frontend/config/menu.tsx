import { MenuDataItem } from "@ant-design/pro-layout";
import {CrownOutlined} from "@ant-design/icons";
import {ACCESS_ENUM} from "@/access/accessEnum";

export const menus = [
  // {
  //   path: "/",
  //   name: "主页",
  //   access: ACCESS_ENUM.NOT_LOGIN,
  // },
  {
    path: "/promotion",
    name: "我宣传",
    access: ACCESS_ENUM.USER,
  },
  {
    path: "/assistance",
    name: "我助力",
    access: ACCESS_ENUM.USER,
  },
  {
    path: "/admin",
    name: "管理",
    access: ACCESS_ENUM.ADMIN,
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/promotion",
        name: "宣传管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/assistance",
        name: "助力管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/count",
        name: "数据统计",
        access: ACCESS_ENUM.ADMIN,
      },
    ],
  },
] as MenuDataItem[];


export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
}

export const findMenuItemByPath = (menus: MenuDataItem[], path: string): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const res = findMenuItemByPath(menu.children, path);
      if (res) {
        return res;
      }
    }
  }
  return null;
}