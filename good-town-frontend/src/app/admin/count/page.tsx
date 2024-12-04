"use client";
import {ProForm, ProFormCascader, ProFormText} from "@ant-design/pro-components";
import UserCount from "@/app/admin/count/components/UserCount";
import React, {useState} from "react";
import {TOWN_LIST} from "@/app/constants/town";

/**
 * 用户统计页面
 *
 * @constructor
 */
const UserCountPage: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
    const [townName, setTownName] = useState<string>("");
  return (
    <div>
      <ProForm<{
        year: string;
        townName: string;
      }>
        layout="horizontal"
        onFinish={async (values) => {
            setYear(values.year);
        }}
      >
        <ProFormText
          name="year"
          label="年份"
          placeholder="请输入年份"
          initialValue={year}
          width="md"
        />
          <ProFormCascader
              name="townName"
              width="md"
              request={async () => TOWN_LIST}
              label="区域"
              initialValue={['北京市', '北京市', '海淀区']}
              fieldProps={{
                  onChange: (value, selectedOptions) => {
                      setTownName(value?.length > 0 ? value[value.length - 1] : "");
                  },
              }}
          />
      </ProForm>
      <UserCount year={year} townName={townName}/>
    </div>
  );
};
export default UserCountPage;
