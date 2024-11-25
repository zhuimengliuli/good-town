"use client";
import {Card, Col, Row, List, message} from "antd";
import { useState, useEffect  } from "react";
import AssistanceVO = API.AssistanceVO;
import {
    listMyAssistanceVoByPageUsingPost
} from "@/api/assistanceController";

/**
 * 我助力界面
 *
 * @constructor
 */

const ListType1 = () => (
    <List
        bordered dataSource={['乡镇1', '乡镇2', 'Item 3']}
        renderItem={item => (
                <List.Item>
                <div>{item}</div>
            </List.Item>)} />);
const ListType2 = () => (
    <List
        dataSource={['Item 1', 'Item 2', 'Item 3', 'Item 4']}
        
        renderItem={
            item => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">修改</a>, <a key="list-loadmore-edit">删除</a>]}
                >
                    {item}
                </List.Item>)} />);


const AssistancePage: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>("publish");

    const [myAssistanceList, setMyAssistanceList] = useState<AssistanceVO[]>();
    const fetchMyAssistanceList = async (pageSize: number) => {
        try {
            const myGetAssistanceList = await listMyAssistanceVoByPageUsingPost({pageSize : pageSize});
            setMyAssistanceList(myGetAssistanceList.data.records);
        } catch (e: any) {
            message.error('获取宣传信息失败' + e.message());
        }
    }
    useEffect(() => {
        fetchMyAssistanceList(15);
    }, []);

    const ListType3 = () => (
    <List 
        itemLayout="vertical"
        dataSource={myAssistanceList}
        renderItem={item => (
            <List.Item
                    actions={[<a key="list-loadmore-edit">助力</a>]}
                >
                    <List.Item.Meta
            title={item.title}
                description={item.content} />
            </List.Item>

        )} 
    />);


    return (
        <div>
            <Row gutter={[0, 16]}>
                <Col span={24}>
                    <Card title="已助力乡镇">
                        <ListType1 />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="待接受助力">
                        <ListType2 />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="其他乡镇">
                        <ListType3 />
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card tabList={[
                        {
                            key: "publish",
                            label: "发布助力",
                        },
                        {
                            key: "select",
                            label: "查询",
                        },
                    ]}
                          activeTabKey={activeTabKey}
                          onTabChange={(key: string)=> {
                              setActiveTabKey(key);
                          }}
                    >
                        {activeTabKey==="publish" && <>aaa</>}
                        {activeTabKey==="select" && <>bbb</>}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default AssistancePage;
