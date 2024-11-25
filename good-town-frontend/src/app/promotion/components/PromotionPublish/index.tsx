"use client";

import React from "react";
import {Props} from "next/script";
import {
  ProForm, ProFormCascader,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormUploadDragger
} from "@ant-design/pro-components";
import {addPromotionUsingPost} from "@/api/promotionController";
import {Col, message, Row, Space} from "antd";

/**
 * 发布宣传
 *
 * @constructor
 */
const PromotionPublish: React.FC<Props> = (props) => {

    const [townName, setTownName] = React.useState<string>(""); // 城镇名称

    return (
        <ProForm<API.PromotionAddRequest>
            layout="horizontal"
            onFinish={async (values) => {
                console.log('Form values:', values); // 添加日志记录
                try {
                    values.townName = townName;
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
                        label: "自然风光秀丽",
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
          <ProFormCascader
              width="md"
              request={async () => [
                {
                  value: '安徽',
                  label: '安徽',
                  children: [
                    {
                      value: '安庆',
                      label: '安庆',
                      children: [
                        {
                          value: '潜山',
                          label: '潜山',
                        },
                        {
                          value: '望江',
                          label: '望江',
                        },
                      ],
                    },
                  ],
                },
                {
                  value: '北京',
                  label: '北京',
                  children: [
                    {
                      value: '海淀',
                      label: '海淀',
                      children: [
                        {
                          value: '西土城',
                          label: '西土城',
                        },
                      ],
                    },
                  ],
                },
              ]}
              name="townName"
              label="区域"
              initialValue={['安徽', '安庆', '潜山']}
              fieldProps={{
                  onChange: (value, selectedOptions) => {
                      setTownName(value[value.length - 1]);
                      console.log(value[value.length - 1]);
                  },
              }}
          />
            {/*<ProFormUploadButton*/}
            {/*    name="picture"*/}
            {/*    label="图片"*/}
            {/*/>*/}
            {/*<ProFormUploadDragger*/}
            {/*    name="video"*/}
            {/*    label="视频"*/}
            {/*/>*/}
        </ProForm>
    );
};
export default PromotionPublish;
