"use client";

import React, { useEffect, useState } from "react";
import { getPromotionUserCountUsingGet } from "@/api/promotionController";
import { message, Table } from "antd";
import Column from "antd/es/table/Column";

interface UserCount {
  month: number;
  count: number;
}

/**
 * 宣传用户计数（表）
 *
 * @constructor
 */
const PromotionUserCountTable = () => {
  const [monthList, setMonthList] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [promotionUserCountList, setPromotionUserCountList] = useState<
    number[]
  >([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const year = new Date().getFullYear();

  const fetchUserCountList = async (year: number) => {
    try {
      const promotionUserCount = await getPromotionUserCountUsingGet({
        year: year,
      });
      setPromotionUserCountList(promotionUserCount.data);
    } catch (e: any) {
      message.error("获取用户统计失败" + e.message());
    }
  };

  useEffect(() => {
    fetchUserCountList(year);
  }, []);

  const promotionUserCountListTable: UserCount[] = monthList.map(
    (month, index) => {
      return {
        month: month,
        count: promotionUserCountList[index],
      };
    },
  );

  return (
    <Table<UserCount[]>
      dataSource={promotionUserCountListTable}
      pagination={false}
    >
      <Column title="Month" dataIndex="month" key="month" />
      <Column title="Count" dataIndex="count" key="count" />
    </Table>
  );
};
export default PromotionUserCountTable;