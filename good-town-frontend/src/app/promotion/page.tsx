"use client";
import { Card, Col, Row } from "antd";
import { useState } from "react";
import PromotionPublish from "@/app/promotion/components/PromotionPublish";
import MyPublish from "@/app/promotion/components/MyPublish";

/**
 * 我宣传页面
 *
 * @constructor
 */
const PromotionPage: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("publish");
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
