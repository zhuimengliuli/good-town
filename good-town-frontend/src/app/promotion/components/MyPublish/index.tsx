"use client";

import {
    Col, message, Row,
    Space, Carousel, Segmented,
    Button, Typography, Drawer,
    List, Skeleton, Popconfirm, Card
} from "antd";
import {
    ProForm,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
    ProFormUploadDragger,
    PageContainer
} from "@ant-design/pro-components";
import React, { useState }  from "react";
import { addPromotionUsingPost } from "@/api/promotionController";
import type { PopconfirmProps } from 'antd';

/**
 * 我的宣传
 *
 * @constructor
 */

const { Title, Paragraph, Text, Link } = Typography;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const data = [
  {
    title: '助力1',
  },
  {
    title: '助力2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  console.log(e);
  message.success('Click on Yes');
};


const Content2 = () => (
        <ProForm<API.PromotionAddRequest>
            layout="horizontal"
            onFinish={async (values) => {
                console.log('Form values:', values); // 添加日志记录
                try {
                    const res = addPromotionUsingPost(values);
                    if (res.data) {
                        message.success("编辑宣传成功");
                    }
                } catch (e: any) {
                    message.error("编辑宣传失败，" + e.message);
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

const MyPublish: React.FC = () => {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);


    const ListTypeAssistMsg = () => (
        <List
            className="check-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">详情</a>, <a key="list-loadmore-edit">同意</a>, <a key="list-loadmore-more">拒绝</a>]}
                >
                    {item.title}

                </List.Item>
            )}
        />
    );

    const ListTypeAssistMember = () => (
        <List
            className="check-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    {item.title}
                </List.Item>
            )}
        />
    );


    const [listContent, setListContent] = useState<React.ReactNode>(null);
    const showDrawer = (listType: String) => {
        switch (listType) {
            case 'msgList':
                setListContent(<ListTypeAssistMsg/>);
                break;
            case 'memberList':
                setListContent(<ListTypeAssistMember/>);
                break;
            default: setListContent(null);
        } setOpen(true);
    };

    const [currentSegment, setCurrentSegment] = useState('Segment 1');
    const handleSegmentChange = (value: string) => { setCurrentSegment(value); };
    const renderContent = () => {
        switch (currentSegment) {
            case '查看': return <Content1 />;
            case '编辑': return <Content2 />;
            default: return null;
        }
    };

    const Content1 = () => (
    <div>
            <Paragraph>
                <h3>
                    宣传标题
                </h3>
                <h5>
                    宣传类型
                </h5>
                <p>
                    宣传描述
                </p>
                
                <Carousel>
                    <div>
                        <h3 style={contentStyle}>图片1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>视频2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
        
            </Paragraph>

            <Space size={[16, 16]} wrap>
                <Popconfirm
                    title="删除"
                    description="确定删除这个宣传吗？"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>删除</Button>
                </Popconfirm>
                <Button color="primary" variant="solid" onClick={() => showDrawer('memberList')}>
                    助力成员
                </Button>
                <Button color="primary" variant="solid" onClick={() => showDrawer('msgList')}>
                    助力消息
                </Button>
                <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                    {listContent}
                </Drawer>
        </Space>
        </div>

    );

    return (

        <PageContainer>
            
            <Segmented 
                options={['查看', '编辑']} 
                onChange={handleSegmentChange} 
                value={currentSegment}
            /> 
            <div style={{ marginTop: 16 }}> 
                {renderContent()} 
            </div>

            
            </PageContainer>
    );
};
export default MyPublish;
