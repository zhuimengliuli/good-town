"use client";

import React from "react";
import {ProCard} from "@ant-design/pro-components";
import UserCountChart from "@/app/admin/count/components/UserCountChart";
import PromotionUserCountTable from "@/app/admin/count/components/PromotionUserCountTable";
import AssistanceUserCountTable from "@/app/admin/count/components/AssistanceUserCountTable";

interface Props{
    year: number,
}

/**
 * 用户计数
 *
 * @constructor
 */
const UserCount= (props: Props) => {
    const year = props.year;
    return (
        <div>
            <ProCard>
                <UserCountChart></UserCountChart>
            </ProCard>
            <div style={{ marginBottom: 16 }} />
            <ProCard title={"宣传用户统计表"}>
                <PromotionUserCountTable></PromotionUserCountTable>
            </ProCard>
            <div style={{ marginBottom: 16 }} />
            <ProCard title={"助力用户统计表"}>
                <AssistanceUserCountTable></AssistanceUserCountTable>
            </ProCard>
        </div>
    )
};
export default UserCount;
