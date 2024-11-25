"use client";

import React, {useEffect, useState} from "react";
import {getPromotionUserCountUsingGet} from "@/api/promotionController";
import EChartsReact from "echarts-for-react";
import {getAssistanceUserCountUsingGet} from "@/api/assistanceController";
import {message} from "antd";

/**
 * 用户计数（图）
 *
 * @constructor
 */
const UserCountChart= () => {
    const [monthList, setMonthList] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [promotionUserCountList, setPromotionUserCountList] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [assistanceUserCountList, setAssistanceUserCountList] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const year = new Date().getFullYear();

    const fetchUserCountList = async (year: number) => {
        try {
            const promotionUserCount = await getPromotionUserCountUsingGet({year : year});
            const assistanceUserCount = await getAssistanceUserCountUsingGet({year : year});
            setPromotionUserCountList(promotionUserCount.data);
            setAssistanceUserCountList(assistanceUserCount.data);
        } catch (e: any) {
            message.error('获取用户统计失败' + e.message());
        }
    }
    useEffect(() => {
        fetchUserCountList(year);
    }, []);

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
