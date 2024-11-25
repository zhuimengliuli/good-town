"use client";
import {ProForm, ProFormText} from "@ant-design/pro-components";
import UserCount from "@/app/admin/count/components/UserCount";

/**
 * 用户统计页面
 *
 * @constructor
 */
const UserCountPage: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <ProForm<{
        year: string;
        town: string;
      }>
        layout="horizontal"
        onFinish={async (values) => {
          return <UserCount year={values.year} />;
        }}
      >
        <ProFormText
          name="year"
          label="年份"
          placeholder="请输入年份"
          initialValue={year}
          width="md"
        />
        <ProFormText
          name="town"
          label="乡镇"
          placeholder="请输入乡镇"
          initialValue="安庆"
          width="md"
        />
      </ProForm>
      <UserCount year={year} />
    </div>
  );
};
export default UserCountPage;
