"use client";
import {Card, Col, Row, List, message, Modal, Typography} from "antd";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import AssistanceVO = API.AssistanceVO;
import PromotionVO = API.PromotionVO;
import {
    getMyAssistanceListByStateUsingGet,
    listMyAssistanceVoByPageUsingPost,
    addAssistanceUsingPost,
    editAssistanceUsingPost,
    deleteAssistanceUsingPost
} from "@/api/assistanceController";
import {
    getPromotionVoByIdUsingGet,
    listPromotionVoByPageUsingPost,
} from "@/api/promotionController"
import { RootState } from "@/stores";
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


const AssistancePage: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>("publish");

    const [myAssistanceList, setMyAssistanceList] = useState<AssistanceVO[]>();
    const [promotionList, setPromotionList] = useState<PromotionVO[]>();
    const fetchMyAssistanceList = async () => {
        try {
            const myGetAssistanceListRes = await getMyAssistanceListByStateUsingGet({ state: 1 });// state为1为已助力
            if (myGetAssistanceListRes.data && myGetAssistanceListRes.data.length > 0) {
                const myGetAssistanceList = myGetAssistanceListRes.data;
                setMyAssistanceList(myGetAssistanceList);

                const myAssistPromotionList = await Promise.all(
                    myGetAssistanceList.map(
                        async (record) => {
                            const promotion = await getPromotionVoByIdUsingGet({ id: record.promotionId });
                            return promotion.data;
                        }));
                
                setPromotionList(myAssistPromotionList);
                console.log("undo", myAssistPromotionList);
            }
        } catch (e: any) {
            message.error('获取宣传信息失败' + e.message());
        }
    }

    const [myUndoAssistanceList, setMyUndoAssistanceList] = useState<AssistanceVO[]>();
    const [undoPromotionList, setUndoPromotionList] = useState<PromotionVO[]>();
    const fetchMyUndoAssistanceList = async () => {
        try {
            const myGetUndoAssistanceList = await getMyAssistanceListByStateUsingGet({ state: 0 }); // state为0为未助力
            
            const myUndoAssistPromotionList = await Promise.all(
                myGetUndoAssistanceList.data.map(
                    async (record) => {
                        const promotion = await getPromotionVoByIdUsingGet({ id: record.promotionId });
                        return promotion.data;
                    }));
            setMyUndoAssistanceList(myGetUndoAssistanceList.data);
            setUndoPromotionList(myUndoAssistPromotionList);
        } catch (e: any) {
            message.error('获取宣传信息失败' + e.message());
        }
    }

    const [allPromotionList, setAllPromotionList] = useState<PromotionVO[]>();
    const fetchOtherPromotionList = async () => {
        const res = await listPromotionVoByPageUsingPost({ pageSize: 15 });
        try {
            if (res.data) {
                const otherPromotionList = res.data.records.filter(record =>
                        !promotionList?.some(item => item.id === record.id) &&
                        !undoPromotionList?.some(item => item.id === record.id));
                setAllPromotionList(otherPromotionList);
            }
        } catch (e: any) {
            message.error('获取宣传信息失败' + e.message());
        }
    }

    const fetchData = async () => {
        try {
            await fetchMyAssistanceList();
            await fetchMyUndoAssistanceList();
            await fetchOtherPromotionList();
        } catch (error) {
            console.error('获取助力信息失败', error);
        }
    }; 
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (allPromotionList && allPromotionList.length > 0) {
            let filteredList = [...allPromotionList];
            if (undoPromotionList && undoPromotionList.length > 0) {
                filteredList = filteredList.filter(record => !undoPromotionList.some(item => item.id === record.id));
            }
            if (promotionList && promotionList.length > 0) {
                filteredList = filteredList.filter(record => !promotionList.some(item => item.id === record.id));
            }
            if (JSON.stringify(filteredList) !== JSON.stringify(allPromotionList)) {
                setAllPromotionList(filteredList);
            }
        }
    }, [undoPromotionList, promotionList, allPromotionList]);

    const ListType1 = () => (
    <List
        bordered dataSource={promotionList}
        renderItem={item => (
                <List.Item>
                <div>{item.themeName}</div>
                </List.Item>)} />);
    
    const [currentUndoIndex, SetCurrentUndoIndex] = useState(0);
    const handleDelete = async (index: number) => {
        try {
            const res = await deleteAssistanceUsingPost({id:myUndoAssistanceList?.[index].id});
            if (res.data) {
                message.success("删除助力成功");
            }

            fetchData();
        } catch (e: any) {
            message.error("删除助力失败，" + e.message);
        }
    }

    const ListType2 = () => (
        <List
            dataSource={undoPromotionList}
            renderItem={
                (item, index) => (
                    <List.Item
                        actions={[
                            <a onClick={() => showEditModal(index)}>修改</a>,
                            <a onClick={() => handleDelete(index) }>删除</a>]}
                    >
                        {item.themeName}
                    </List.Item>)} />);

    const ListType3 = () => (
    <List 
        itemLayout="vertical"
        dataSource={allPromotionList}
        renderItem={(item, index) => (
            <List.Item
                    actions={[<a onClick={() => showModal(index)}>助力</a>]}>
                    <List.Item.Meta
            title={item.themeName} />
            </List.Item>

        )} 
    />);

    // 表单项内容
    const formRef = useRef();
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const handleFinish = async (values:API.AssistanceAddRequest) => {
        try {
            values.userId = loginUser.id;
            values.promotionId = allPromotionList?.[currentIndex].id;
            console.log('Form values:', values);
            const res = await addAssistanceUsingPost(values);
            if (res.data) {
                message.success("发布助力成功");
            }
            fetchData();
        } catch (e: any) {
            message.error("发布助力失败，" + e.message);
        }
        // 处理提交的表单数据 setIsModalVisible(false); 
    };
    const editFormRef = useRef();
    const handleEditFinish = async (values: API.AssistanceEditRequest) => {
        try {
            values.userId = loginUser.id;
            values.promotionId = undoPromotionList?.[currentIndex].id;
            values.id = myUndoAssistanceList?.[currentIndex].id;
            console.log('Form values:', values);
            const res = await editAssistanceUsingPost(values);
            if (res.data) {
                message.success("编辑助力成功");
            }

            fetchData();
        } catch (e: any) {
            message.error("编辑助力失败," + e.message)
        }
    }

    // 显示助力发布页面的Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');     // 区分发布和编辑的Modal
    const showModal = (index: number) => {
        setCurrentIndex(index);
        setModalContent('发布')
        setIsModalVisible(true);
    };
    const showEditModal = (index: number) => {
        setCurrentIndex(index);
        setModalContent('编辑');
        setIsModalVisible(true);
    }
    const handleOk = () => {
        if (formRef.current && modalContent == '发布') {
            formRef.current.submit();
        }
        else if (editFormRef.current && modalContent == '编辑') {
            editFormRef.current.submit();
        }

        setIsModalVisible(false);
    };
    const handleCancel = () => { setIsModalVisible(false); };
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderModalContent = () => {
        switch (modalContent) {
            case '发布':
                return (
                    <div>
                        <Paragraph>
                            <h4>发布</h4>
                        </Paragraph>
                        <Paragraph>
                        <h2>{allPromotionList?.[currentIndex].themeName }</h2>
                    </Paragraph>
                    <Paragraph>
                        <ProForm
                                formRef={formRef}
                                onFinish={handleFinish}
                                submitter={false}
                        >
                        <ProFormTextArea
                                colProps={{ span: 24 }}
                                name="description"
                                label="助力描述"
                            />
                        <ProFormUploadButton
                            name="picture"
                            label="图片"
                            />
                        </ProForm>
                        </Paragraph>
                        </div>
                );
            case '编辑':
                return (
                    <div>
                        <Paragraph>
                            <h4>编辑</h4>
                        </Paragraph>
                        <Paragraph>
                            
                            <h2>{undoPromotionList?.[currentIndex].themeName }</h2>
                        </Paragraph>
                    <Paragraph>
                        <ProForm
                            formRef={editFormRef}
                            onFinish={handleEditFinish}
                                submitter={false}
                        >
                        <ProFormTextArea
                                colProps={{ span: 24 }}
                                name="description"
                                label="助力描述"
                            />
                        <ProFormUploadButton
                            name="picture"
                            label="图片"
                            />
                        </ProForm>
                        </Paragraph>
                    </div>
                );
            // 添加更多内容情况 
            default: return <p>无内容</p>;
        }
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
                { renderModalContent()}
            </Modal>

        </div>
    );
};
export default AssistancePage;
