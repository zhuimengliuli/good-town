"use client";

import React, { useEffect, useState } from "react";
import { getAssistanceUserCountUsingGet } from "@/api/assistanceController";
import { message, Table } from "antd";
import Column from "antd/es/table/Column";

interface UserCount {
  month: number;
  count: number;
}

/**
 * 用户计数（表）
 *
 * @constructor
 */
const AssistanceUserCountTable = () => {
  const [monthList, setMonthList] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [assistanceUserCountList, setAssistanceUserCountList] = useState<
    number[]
  >([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const year = new Date().getFullYear();

  const fetchUserCountList = async (year: number) => {
    try {
      const assistanceUserCount = await getAssistanceUserCountUsingGet({
        year: year,
      });
      setAssistanceUserCountList(assistanceUserCount.data);
    } catch (e: any) {
      message.error("获取用户统计失败" + e.message());
    }
  };

  useEffect(() => {
    fetchUserCountList(year);
  }, []);

  const assistanceUserCountListTable: UserCount[] = monthList.map(
    (month, index) => {
      return {
        month: month,
        count: assistanceUserCountList[index],
      };
    },
  );

  return (
    <Table<UserCount[]> dataSource={assistanceUserCountListTable} pagination={false}>
      <Column title="月份" dataIndex="month" key="month" />
      <Column title="人数" dataIndex="count" key="count" />
    </Table>
  );
};
export default AssistanceUserCountTable;
