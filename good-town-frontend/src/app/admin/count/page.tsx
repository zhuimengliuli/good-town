"use client";
import {ProCard} from "@ant-design/pro-components";
import UserCountChart from "@/app/admin/count/components/UserCountChart";

import PromotionUserCountTable from "@/app/admin/count/components/PromotionUserCountTable";
import AssistanceUserCountTable from "@/app/admin/count/components/AssistanceUserCountTable";

/**
 * 用户统计页面
 *
 * @constructor
 */
const UserCountPage: React.FC = () => {
  return (
      <div>
          <ProCard>
              <UserCountChart></UserCountChart>
          </ProCard>
          <ProCard title={"宣传用户统计表"}>
              <PromotionUserCountTable></PromotionUserCountTable>
          </ProCard>
          <ProCard title={"助力用户统计表"}>
              <AssistanceUserCountTable></AssistanceUserCountTable>
          </ProCard>
      </div>

  );
};
export default UserCountPage;
