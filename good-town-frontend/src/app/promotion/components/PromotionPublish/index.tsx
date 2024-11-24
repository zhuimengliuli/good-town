"use client";

import {Col, message, Row, Space} from "antd";
import {
    ProForm,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
    ProFormUploadDragger
} from "@ant-design/pro-components";
import React from "react";
import {addPromotionUsingPost} from "@/api/promotionController";

/**
 * 发布宣传
 *
 * @constructor
 */
const PromotionPublish= () => {

    return (
        <ProForm<API.PromotionAddRequest>
            layout="horizontal"
            onFinish={async (values) => {
                try {
                    console.log(values);
                    const res = addPromotionUsingPost(values);
                    if (res.data) {
                        message.success("发布宣传成功");
                    }
                } catch (e: any) {
                    message.error("发布宣传失败，" + e.message);
                }
            }}
            submitter={{
                render: (props, doms) => {
                    return  (
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
                    {
                        value: "农家院",
                        label: "农家院",
                    },
                    {
                        value: "自然风光秀丽",
                        label: "护照",
                    },
                    {
                        value: "古建筑",
                        label: "古建筑",
                    },
                    {
                        value: "土特产",
                        label: "土特产",
                    },
                    {
                        value: "特色小吃",
                        label: "特色小吃",
                    },
                    {
                        value: "民宿活动",
                        label: "民宿活动",
                    },
                ]}
            />
            <ProFormTextArea
                colProps={{ span: 24 }}
                name="description"
                label="宣传描述"
            />
            <ProFormUploadButton
                name="picture"
                label="图片"
            />
            <ProFormUploadDragger
                name="video"
                label="视频"
            />
        </ProForm>
    );
};
export default PromotionPublish;
