"use client";

import React, { useEffect, useState } from "react";
import { getAssistanceUserCountUsingGet } from "@/api/assistanceController";
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
 * 用户计数（表）
 *
 * @constructor
 */
const AssistanceUserCountTable = (props: Props) => {
  const [monthList, setMonthList] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [assistanceUserCountList, setAssistanceUserCountList] = useState<
    number[]
  >([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const { year, townName } = props;

  const fetchUserCountList = async (year: number) => {
    try {
      const assistanceUserCount = await getAssistanceUserCountUsingGet({
        year: year,
        townName: townName,
      });
      setAssistanceUserCountList(assistanceUserCount.data);
    } catch (e: any) {
      message.error("获取助力用户表统计失败" + e.message);
    }
  };

  useEffect(() => {
    fetchUserCountList(year);
  }, [year, townName]);

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
