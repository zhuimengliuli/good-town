"use client";
import {Card, Col, Row, List, message, Modal, Typography} from "antd";
import { useState, useEffect, useRef  } from "react";
import AssistanceVO = API.AssistanceVO;
import {
    listMyAssistanceVoByPageUsingPost
} from "@/api/assistanceController";
import {
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormUploadDragger,
} from "@ant-design/pro-components";

/**
 * 我助力界面
 *
 * @constructor
 */

const { Title, Paragraph, Text, Link } = Typography;

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

    const [myUndoAssistanceList, setMyUndoAssistanceList] = useState<AssistanceVO[]>();
    const fetchMyUndoAssistanceList = async (pageSize: number) => {
        try {
            const myGetUndoAssistanceList = await listMyAssistanceVoByPageUsingPost({pageSize : pageSize});
            setMyUndoAssistanceList(myGetUndoAssistanceList.data.records);
        } catch (e: any) {
            message.error('获取宣传信息失败' + e.message());
        }
    }


    const ListType1 = () => (
    <List
        bordered dataSource={myAssistanceList}
        renderItem={item => (
                <List.Item>
                <div>{item.description}</div>
            </List.Item>)} />);

    const ListType3 = () => (
    <List 
        itemLayout="vertical"
        dataSource={["乡镇1", "乡镇2", "乡镇3"]}
        renderItem={item => (
            <List.Item
                    actions={[<a onClick={showModal}>助力</a>]}
                >
                    <List.Item.Meta
            title={item} />
            </List.Item>

        )} 
    />);


    // 显示助力发布页面的Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => { setIsModalVisible(true); };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };

        // 表单项内容
    const formRef = useRef();
    const handleFinish = async (values:API.AssistanceAddRequest) => {
        console.log('Form values:', values);
        // 处理提交的表单数据 setIsModalVisible(false); 
    };

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
            
            <Modal
              title="助力"
              visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Paragraph>
                    <h2>宣传主题名称</h2>
                </Paragraph>
              <Paragraph>
                  <ProFormTextArea
                    colProps={{ span: 24 }}
                    name="description"
                    label="宣传描述"
                    />

                    {/*<ProFormUploadButton*/}
                    {/*    name="picture"*/}
                    {/*    label="图片"*/}
                    {/*/>*/}
              </Paragraph>
          </Modal>

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
