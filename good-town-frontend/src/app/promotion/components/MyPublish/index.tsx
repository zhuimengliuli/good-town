"use client";

import type { PopconfirmProps } from "antd";
import {
  Button,
  Carousel,
  Col,
  Drawer,
  Empty,
  List,
  message,
  Pagination,
  Popconfirm,
  Row,
  Segmented,
  Space,
  Typography,
  Modal,
} from "antd";
import {
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormUploadDragger,
} from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import {
  addPromotionUsingPost,
  deletePromotionUsingPost,
  editPromotionUsingPost,
  listMyPromotionVoByPageUsingPost,
} from "@/api/promotionController";
import { editAssistanceUsingPost } from "@/api/assistanceController";
import PromotionVO = API.PromotionVO;
import UserVO = API.UserVO;

/**
 * 我的宣传
 *
 * @constructor
 */

const { Paragraph } = Typography;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};


const Content2 = () => (
  <ProForm<API.PromotionAddRequest>
    layout="horizontal"
    onFinish={async (values) => {
      console.log("Form values:", values); // 添加日志记录
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
    <ProFormText width="md" name="themeName" label="宣传主题名称" />
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

const MyPublish: React.FC = () => {
  const [myPromotionList, setMyPromotionList] = useState<PromotionVO[]>();
    const [myAssistUserList, setMyAssistUserList] = useState<UserVO[]>();
    const [myAssistanceList, setMyAssistanceList] = useState<API.AssistanceVO[]>();
    const [myUndoAssistanceList, setMyUndoAssistanceList] = useState<API.AssistanceVO[]>();
  const fetchMyPromotionList = async (pageSize: number) => {
    try {
      const myGetPromotionList = await listMyPromotionVoByPageUsingPost({
        pageSize: pageSize,
      });
        console.log("item", myGetPromotionList.data.records[0]);
        setMyAssistanceList(myGetPromotionList.data.records[0].assistanceList
            .filter((item: API.AssistanceVO) => item.state === 1)
            .map((item: API.AssistanceVO) => item)
        );
        setMyUndoAssistanceList(myGetPromotionList.data.records[0].assistanceList
            .filter((item: API.AssistanceVO) => item.state === 0)
            .map((item: API.AssistanceVO) => item)
        );
      setMyPromotionList(myGetPromotionList.data.records);
    console.log(myGetPromotionList.data.records[0].assistanceList);
    } catch (e: any) {
      message.error("获取宣传信息失败" + e.message);
    }
  };
  useEffect(() => {
    fetchMyPromotionList(15);
  }, []);

  const confirm: PopconfirmProps["onConfirm"] = async (e) => {
    console.log(e);

    try {
      const res = await deletePromotionUsingPost({
        id: myPromotionList?.[currentPage - 1].id,
      });
      if (res.data) {
        message.success("删除成功");
        fetchMyPromotionList(15);
        setCurrentPage(1);
      }
    } catch (e: any) {
      message.error("删除失败" + e.message());
    }
  };

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = async (page: number) => {
        const myGetPromotionList = await listMyPromotionVoByPageUsingPost({
            pageSize: 15,
        });
        setMyPromotionList(myGetPromotionList.data.records);
        
      setMyAssistanceList(myPromotionList?.[page - 1].assistanceList
            ?.filter((item: API.AssistanceVO) => item.state === 1)
            .map((item: API.AssistanceVO) => item)
        );
        setMyUndoAssistanceList(myPromotionList?.[page - 1].assistanceList
            ?.filter((item: API.AssistanceVO) => item.state === 0)
            .map((item: API.AssistanceVO) => item)
        );
    //   setMyAssistUserList(myPromotionList?.[page - 1].assistanceList?.map((item: API.AssistanceVO) => {
    //       return item.user || {};
    //   }));
      console.log(myPromotionList?.[page - 1].assistanceList);
        setCurrentPage(page);
        setCurrentUserIndex(0);
    };

    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const onAgree = async (index: number) => {
        try {
            const res = await editAssistanceUsingPost({
                id: myUndoAssistanceList?.[index].id,
                state: 1,
            });
            if (res.data) {
                message.success("确认同意");
            }
            handlePageChange(currentPage);
        } catch (e: any) {
            message.error("同意失败，" + e.message);
        }
        onClose();
        
    };
    const onReject = async (index: number) => {
        try {
            const res = await editAssistanceUsingPost({
                id: myUndoAssistanceList?.[index].id,
                state: 2,
            });
            if (res.data) {
                message.success("确认同意");
            }
            handlePageChange(currentPage);
        } catch (e: any) {
            message.error("同意失败，" + e.message);
        }
        onClose();
        
    };
    // 助力消息队列
  const ListTypeAssistMsg = () => (
    <List
      className="check-list"
      itemLayout="horizontal"
      dataSource={myUndoAssistanceList?.map((item) => {
          return {
              title: item.user?.userName,
          };
      })}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <a onClick={() => showModal(index)}>详情</a>,
            <a onClick={() => onAgree(index)}>同意</a>,
            <a onClick={() => onReject(index)}>拒绝</a>,
          ]}
        >
          {item.title}
        </List.Item>
      )}
    />
  );
  // 已助力者队列
  const ListTypeAssistMember = () => (
    <List
      className="check-list"
      itemLayout="horizontal"
      dataSource={myAssistanceList?.map((item) => {
          return {
              title: item.user?.userName,
          };
      })}
      renderItem={(item) => <List.Item>{item.title}</List.Item>}
    />
  );

  const [listContent, setListContent] = useState<React.ReactNode>(null);
  const showDrawer = (listType: String) => {
    switch (listType) {
      case "msgList":
        setListContent(<ListTypeAssistMsg />);
        break;
      case "memberList":
        setListContent(<ListTypeAssistMember />);
        break;
      default:
        setListContent(null);
    }
    setOpen(true);
  };
    
   

  const [currentSegment, setCurrentSegment] = useState("查看");
  const handleSegmentChange = (value: string) => {
    setCurrentSegment(value);
  };
  const renderContent = () => {
    switch (currentSegment) {
      case "查看":
        return <Content1 />;
      case "编辑":
        return <Content2 />;
      default:
        return null;
    }
  };
    // 显示助力消息详情的Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (index: number) => {
        setCurrentUserIndex(index);
        onClose();
        setIsModalVisible(true);
    };
    const handleOk = () => { setIsModalVisible(false); };



  const Content1 = () => (
    <div>
      <Paragraph>
        <h3>{myPromotionList?.[currentPage - 1].themeName ?? "暂无数据"}</h3>
        <h5>{myPromotionList?.[currentPage - 1].type ?? "暂无数据"}</h5>
        <p>{myPromotionList?.[currentPage - 1].description ?? "暂无数据"}</p>

        <Carousel>
          <div>
            <h3 style={contentStyle}>
              {myPromotionList?.[currentPage - 1].picture ?? "暂无数据"}{" "}
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              {myPromotionList?.[currentPage - 1].video ?? "暂无数据"}{" "}
            </h3>
          </div>
        </Carousel>
      </Paragraph>

      <Space size={[16, 16]} wrap>
        <Popconfirm
          title="删除"
          description="确定删除这个宣传吗？"
          onConfirm={confirm}
          okText="确定"
          cancelText="取消"
        >
          <Button danger>删除</Button>
        </Popconfirm>
        <Button
          color="primary"
          variant="solid"
          onClick={() => showDrawer("memberList")}
        >
          助力成员
        </Button>
        <Button
          color="primary"
          variant="solid"
          onClick={() => showDrawer("msgList")}
        >
          助力消息
        </Button>
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          {listContent}
        </Drawer>
      </Space>
    </div>
  );

  const Content2 = () => (
    <ProForm<API.PromotionEditRequest>
      layout="horizontal"
      onFinish={async (values) => {
        values.id = myPromotionList?.[currentPage - 1].id;
        console.log("Form values:", values); // 添加日志记录
        try {
          const res = editPromotionUsingPost(values);
          if (res.data) {
            message.success("编辑宣传成功");
          }
        } catch (e: any) {
          message.error("编辑宣传失败，" + e.message);
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
        initialValue={
          myPromotionList?.[currentPage - 1].themeName ?? "暂无数据"
        }
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
        initialValue={
          myPromotionList?.[currentPage - 1].description ?? "暂无数据"
        }
      />
      <ProFormUploadButton name="picture" label="图片" />
      <ProFormUploadDragger name="video" label="视频" />
    </ProForm>
  );

  return (
    <PageContainer>
      <Segmented
        options={["查看", "编辑"]}
        onChange={handleSegmentChange}
        value={currentSegment}
      />
      <div style={{ marginTop: 16 }}>
        {myPromotionList?.length === 0 ? (
          <Empty description="暂无宣传数据" />
        ) : (
          renderContent()
        )}
      </div>

      <Pagination
        current={currentPage}
        pageSize={1}
        total={myPromotionList?.length}
        onChange={handlePageChange}
        style={{ marginTop: 16 }}
          />
          
          <Modal
              title="Promotion Details"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleOk}
              footer={[
                  <Button key="ok" type="primary" onClick={handleOk}> 确认 </Button>,]} >
              <Paragraph>
                  <h3>
                      {myPromotionList?.[currentPage - 1].themeName ?? "暂无数据"}
                  </h3>
                  <h5>
                      {myUndoAssistanceList && myUndoAssistanceList.length > 0 ?
                          myUndoAssistanceList[currentUserIndex]?.user?.userName ?? "暂无数据" : "无数据"}
                  </h5>
                  <p>
                      {myUndoAssistanceList && myUndoAssistanceList.length > 0 ?
                          myUndoAssistanceList[currentUserIndex]?.description ?? "暂无数据" : "无数据"}
                  </p>
                  <Carousel>
                      <div>
                          <h3 style={contentStyle}> {myPromotionList?.[currentPage - 1].picture ?? "暂无数据"}
                          </h3>
                      </div>
                  </Carousel>
              </Paragraph>
          </Modal>
    </PageContainer>
  );
};
export default MyPublish;
