"use client";

import React from "react";
import {ProCard} from "@ant-design/pro-components";
import UserCountChart from "@/app/admin/count/components/UserCountChart";
import PromotionUserCountTable from "@/app/admin/count/components/PromotionUserCountTable";
import AssistanceUserCountTable from "@/app/admin/count/components/AssistanceUserCountTable";
import {Col, Row} from "antd";

interface Props{
    year: number,
    townName: string,
}

/**
 * 用户计数
 *
 * @constructor
 */
const UserCount= (props: Props) => {
    const { year, townName } = props;
    return (
      <div>
        <ProCard>
          <UserCountChart year={year} townName={townName}></UserCountChart>
        </ProCard>
        <div style={{ marginBottom: 16 }} />
        <ProCard>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={11}>
              <div>宣传用户统计表</div>
              <PromotionUserCountTable year={year} townName={townName}></PromotionUserCountTable>
            </Col>
            <Col xs={24} md={2}></Col>
            <Col xs={24} md={11}>
              <div>助力用户统计表</div>
              <AssistanceUserCountTable year={year} townName={townName}></AssistanceUserCountTable>
            </Col>
          </Row>
        </ProCard>
      </div>
    );
};
export default UserCount;
