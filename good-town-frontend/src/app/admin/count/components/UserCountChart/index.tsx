"use client";

import React, {useEffect, useState} from "react";
import {getPromotionUserCountUsingGet} from "@/api/promotionController";
import EChartsReact from "echarts-for-react";
import {getAssistanceUserCountUsingGet} from "@/api/assistanceController";
import {message} from "antd";

interface Props {
    year: number,
    townName: string,
}

/**
 * 用户计数（图）
 *
 * @constructor
 */
const UserCountChart= (props: Props) => {
    const [monthList, setMonthList] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [promotionUserCountList, setPromotionUserCountList] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [assistanceUserCountList, setAssistanceUserCountList] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const { year, townName } = props;

    const fetchUserCountList = async (year: number, townName: string) => {
        try {
            const promotionUserCount = await getPromotionUserCountUsingGet({year : year, townName: townName});
            setPromotionUserCountList(promotionUserCount.data);
            console.log(promotionUserCount);
        } catch (e: any) {
            message.error('获取宣传用户图统计失败' + e.message);
        }
        try {
            const assistanceUserCount = await getAssistanceUserCountUsingGet({year : year, townName: townName});
            setAssistanceUserCountList(assistanceUserCount.data);
            console.log(assistanceUserCount);
        } catch (e: any) {
            message.error('获取助力用户图统计失败' + e.message);
        }
    }
    useEffect(() => {
        fetchUserCountList(year, townName);
    }, [year, townName]);
    const option = {
        title: {
            text: '数据统计'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['月累计宣传用户数', '月累计助力用户数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: monthList,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '月累计宣传用户数',
                type: 'line',
                stack: 'Total',
                data: promotionUserCountList,
            },
            {
                name: '月累计助力用户数',
                type: 'line',
                stack: 'Total',
                data: assistanceUserCountList,
            },
        ]
    };
    return <EChartsReact option={option} className="user-count-chart"/>
};
export default UserCountChart;
