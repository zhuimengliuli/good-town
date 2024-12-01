"use client";

import React from "react";
import { Props } from "next/script";
import {
    ProForm, ProFormCascader,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
    ProFormUploadDragger
} from "@ant-design/pro-components";
import { addPromotionUsingPost } from "@/api/promotionController";
import { Col, message, Row, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { TOWN_LIST } from "@/app/constants/town";

/**
 * 发布宣传
 *
 * @constructor
 */
const PromotionPublish: React.FC<Props> = (props) => {

    const [townName, setTownName] = React.useState<string>("海淀"); // 城镇名称
    const loginUser = useSelector((state: RootState) => state.loginUser);

    return (
        <ProForm<API.addPromotionUsingPOSTParams>
            layout="horizontal"
            onFinish={async (values) => {
                const { picture, video, ...formDataValues } = values; // 拆分文件字段和其他字段

                // 将普通字段（API.addPromotionUsingPOSTParams字段）保留为JSON对象
                const params: API.addAssistanceUsingPOSTParams = { ...formDataValues, townName };

                // 获取实际的 File 对象
                const pictureFile = picture?.[0]?.originFileObj;
                const videoFile = video?.[0]?.originFileObj;

                try {
                    const res = await addPromotionUsingPost(params, {}, pictureFile, videoFile);

                    if (res.data) {
                        message.success("发布宣传成功");
                    }
                } catch (e: any) {
                    message.error("发布宣传失败，" + e.message);
                }
            }}
            submitter={{
                render: (props, doms) => {
                    return (
                        <Row>
                            <Col span={14} offset={4}>
                                <Space>{doms}</Space>
                            </Col>
                        </Row>
                    );
                },
            }}
            autoFocusFirstInput
        >
            <ProFormText
                width="md"
                name="themeName"
                label="宣传主题名称"
            />
            <ProFormSelect
                name="type"
                label="宣传类型"
                width="md"
                options={[
                    { value: "农家院", label: "农家院" },
                    { value: "自然风光秀丽", label: "自然风光秀丽" },
                    { value: "古建筑", label: "古建筑" },
                    { value: "土特产", label: "土特产" },
                    { value: "特色小吃", label: "特色小吃" },
                    { value: "民宿活动", label: "民宿活动" },
                ]}
            />
            <ProFormTextArea
                colProps={{ span: 24 }}
                name="description"
                label="宣传描述"
            />
            <ProFormCascader
                width="md"
                request={async () => TOWN_LIST}
                name="townName"
                label="区域"
                initialValue={['北京市', '北京市', '海淀区']}
                fieldProps={{
                    onChange: (value, selectedOptions) => {
                        setTownName(value[value.length - 1]);
                    },
                }}
            />
            <ProFormUploadButton
                name="picture"
                label="图片"
                maxCount={1}
            />
            <ProFormUploadDragger
                name="video"
                label="视频"
                maxCount={1}
            />
        </ProForm>
    );
};

export default PromotionPublish;