"use client";
import {Card, Col, Row} from "antd";
import {useState} from "react";

/**
 * 我助力界面
 *
 * @constructor
 */
const AssistancePage: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>("publish");
    return (
        <div>
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
