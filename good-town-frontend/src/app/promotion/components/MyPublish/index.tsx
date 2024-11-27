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
import PromotionVO = API.PromotionVO;
import UserVO = API.UserVO;

/**
 * 我的宣传
 *
 * @constructor
 */

const { Title, Paragraph, Text, Link } = Typography;

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
  const fetchMyPromotionList = async (pageSize: number) => {
    try {
      const myGetPromotionList = await listMyPromotionVoByPageUsingPost({
        pageSize: pageSize,
      });
        setMyAssistUserList(myGetPromotionList.data.records[0].assistanceUserList);
      setMyPromotionList(myGetPromotionList.data.records);
    console.log(myGetPromotionList.data.records[0].assistanceUserList);
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
  const handlePageChange = (page: number) => {
      setMyAssistUserList(myPromotionList?.[page - 1].assistanceUserList);
      console.log(myPromotionList?.[page - 1].assistanceUserList);
    setCurrentPage(page);
  };

  const ListTypeAssistMsg = () => (
    <List
      className="check-list"
      itemLayout="horizontal"
      dataSource={myAssistUserList?.map((item) => {
          console.log(item.userName);
          return {
              title: item.userName,
          };
      })}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">详情</a>,
            <a key="list-loadmore-edit">同意</a>,
            <a key="list-loadmore-more">拒绝</a>,
          ]}
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
      dataSource={myAssistUserList?.map((item) => {
          console.log(item.userName);
          return {
              title: item.userName,
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
    const showModal = () => { setIsModalVisible(true); };
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
              footer={[
                  <Button key="ok" type="primary" onClick={handleOk}> 确认 </Button>,]} >
              <Paragraph>
                  <h3>
                      {myPromotionList?.[currentPage - 1].themeName ?? "暂无数据"}
                  </h3>
                  <h5>
                      {myPromotionList?.[currentPage - 1].type ?? "暂无数据"}
                  </h5>
                  <p>
                      {myPromotionList?.[currentPage - 1].description ?? "暂无数据"}
                  </p>
                  <Carousel>
                      <div>
                          <h3 style={contentStyle}> {myPromotionList?.[currentPage - 1].picture ?? "暂无数据"}
                          </h3>
                      </div>
                      <div> <h3 style={contentStyle}> {myPromotionList?.[currentPage - 1].video ?? "暂无数据"}
                      </h3>
                      </div>
                  </Carousel>
              </Paragraph>
          </Modal>
    </PageContainer>
  );
};
export default MyPublish;
