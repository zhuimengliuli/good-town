import { MenuDataItem } from "@ant-design/pro-layout";
import {CrownOutlined} from "@ant-design/icons";

export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/promotions",
    name: "我宣传",
  },
  {
    path: "/assistances",
    name: "我助力",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
      },
      {
        path: "/admin/promotion",
        name: "宣传管理",
      },
      {
        path: "/admin/assistance",
        name: "助力管理",
      },
      {
        path: "/admin/count",
        name: "数据统计",
      },
    ],
  },
] as MenuDataItem[];
