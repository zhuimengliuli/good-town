"use client";
import {Card, Col, Row, List} from "antd";
import {useState} from "react";

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
const ListType3 = () => (
    <List 
        itemLayout="vertical"
        dataSource={[{ title: 'Title 1', content: 'Content 1' }, { title: 'Title 2', content: 'Content 2' }, { title: 'Title 3', content: 'Content 3' },]}
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

const AssistancePage: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>("publish");
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
