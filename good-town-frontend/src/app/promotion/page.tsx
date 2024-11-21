"use client";
import { PlusOutlined } from "@ant-design/icons";
import {
    ActionType,
    PageContainer,
    ProColumns,
    ProTable,
} from "@ant-design/pro-components";
import { Button, message, Space, Typography } from "antd";
import { useRef, useState } from "react";
import {
    deleteAssistanceUsingPost,
    listAssistanceByPageUsingPost,
} from "@/api/assistanceController";
import CreateModal from "@/app/admin/assistance/components/CreateModal";
import UpdateModal from "@/app/admin/assistance/components/UpdateModal";

/**
 * 用户管理页面
 *
 * @constructor
 */
const AssistanceAdminPage: React.FC = () => {
    // 是否显示新建窗口
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    // 是否显示更新窗口
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    // 当前用户点击的数据
    const [currentRow, setCurrentRow] = useState<API.Assistance>();

    /**
     * 删除节点
     *
     * @param row
     */
    const handleDelete = async (row: API.Assistance) => {
        const hide = message.loading("正在删除");
        if (!row) return true;
        try {
            await deleteAssistanceUsingPost({
                id: row.id as any,
            });
            hide();
            message.success("删除成功");
            actionRef?.current?.reload();
            return true;
        } catch (error: any) {
            hide();
            message.error("删除失败，" + error.message);
            return false;
        }
    };

    const columns: ProColumns<API.Assistance>[] = [
        {
            title: "id",
            dataIndex: "id",
            valueType: "text",
            hideInForm: true,
        },
        {
            title: "助力描述",
            dataIndex: "description",
            valueType: "textarea",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            valueType: "dateTime",
            sorter: true,
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: "操作",
            dataIndex: "option",
            valueType: "option",
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link
                        onClick={() => {
                            setCurrentRow(record);
                            setUpdateModalVisible(true);
                        }}
                    >
                        修改
                    </Typography.Link>
                    <Typography.Link type="danger" onClick={() => handleDelete(record)}>
                        删除
                    </Typography.Link>
                </Space>
            ),
        },
    ];
    return (
        <></>
    );
};
export default AssistanceAdminPage;
