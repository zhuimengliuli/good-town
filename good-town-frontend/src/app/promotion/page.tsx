"use client";
import {Card, Col, message, Row} from "antd";
import {useEffect, useState} from "react";
import PromotionPublish from "@/app/promotion/components/PromotionPublish";
import MyPublish from "@/app/promotion/components/MyPublish";
import {listMyPromotionVoByPageUsingPost} from "@/api/promotionController";

/**
 * 我宣传页面
 *
 * @constructor
 */
const PromotionPage: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("publish");

    const [promotionList, setPromotionList] = useState<API.PromotionVO[]>([]);
    let list = undefined;
    const fetchMyPromotionList = async (pageSize: number) => {
        try {
            const res = await listMyPromotionVoByPageUsingPost({
                pageSize: pageSize,
            });
            list = res.data.records;
            setPromotionList(list);
            console.log(res.data?.records);
            console.log(promotionList);
        } catch (e: any) {
            message.error("获取宣传信息失败" + e.message());
        }
    };
    useEffect(() => {
        fetchMyPromotionList(10);
    }, []);
  return (
    <div>
      <Row>
        <Col>
          <Card
            tabList={[
              {
                key: "publish",
                label: "发布宣传",
              },
              {
                key: "select",
                label: "查询",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          >
              {activeTabKey === "publish" && <><PromotionPublish></PromotionPublish></>}
            {activeTabKey === "select" && <><MyPublish></MyPublish></>}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default PromotionPage;
