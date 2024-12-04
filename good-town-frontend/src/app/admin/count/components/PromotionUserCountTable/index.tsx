"use client";

import React, { useEffect, useState } from "react";
import { getPromotionUserCountUsingGet } from "@/api/promotionController";
import { message, Table } from "antd";
import Column from "antd/es/table/Column";

interface UserCount {
  month: number;
  count: number;
}

interface Props {
  year: number;
  townName: string;
}
/**
 * 宣传用户计数（表）
 *
 * @constructor
 */
const PromotionUserCountTable = (props: Props) => {
  const [monthList, setMonthList] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [promotionUserCountList, setPromotionUserCountList] = useState<
    number[]
  >([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const {year, townName} = props;

  const fetchUserCountList = async (year: number) => {
    try {
      const promotionUserCount = await getPromotionUserCountUsingGet({
        year: year,
        townName: townName,
      });
      setPromotionUserCountList(promotionUserCount.data);
    } catch (e: any) {
      message.error("获取宣传用户表统计失败" + e.message);
    }
  };

  useEffect(() => {
    fetchUserCountList(year);
  }, [year, townName]);

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
      <Column title="月份" dataIndex="month" key="month" />
      <Column title="人数" dataIndex="count" key="count" />
    </Table>
  );
};
export default PromotionUserCountTable;
