import React, { useEffect, useRef, useState } from "react";
import { Button, Card, message, Modal, Space, Table } from "antd";
import styled from "@emotion/styled";
import { ExclamationCircleFilled, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import SubMeetingForm from "@/pages/meeting/form/submeetingform.tsx";
import { useRequest } from "ahooks";
import { submeetingDelete, submeetingPage } from "@/api/submeeting.ts";
import dayjs from "dayjs";
import MeetingHelpForm from "@/pages/meeting/form/meetinghelpform.tsx";

const SubMeetingPage = ({ backToMainMeeting }) => {
    const formRef = useRef(null);
    const helpRef = useRef(null);
    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState([]);
    const [pageQuery, setPageQuery] = useState({ page: 1, size: 10 });
    const openDrawer = (types: number, data: any) => {
        if (formRef.current != null) {
            if (types === 1) {
                formRef.current.showWinForm(data, 1, true)
            } else if (types === 2) {
                formRef.current.showWinForm(data, 2, true)
            }
        }
    }
    const openHelpDrawer = (record: any) => {
        if (helpRef.current != null) {
            helpRef.current.showWinForm(record, true)
        }
    }
    const deleteData = (subMeetingId: number) => {
        Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleFilled />,
            content: '确认删除子会议数据？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                await submeetingDelete({ id: subMeetingId });
                run(pageQuery) // TODO
                message.success('删除成功')
                setSelectedRowKeys([]);
            },
            onCancel: () => {
            }
        });
    }

    const { loading, run } = useRequest(submeetingPage, {
        manual: true,
        onSuccess: (data) => {
            setDatasource(data.records);
            setTotal(data.total)
        }
    })

    const reload = () => {
        run(pageQuery)
    }

    useEffect(() => {
        run(pageQuery)
    }, [pageQuery]);

    const columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (_text: any, _record: any, index: number) => {
                return `${index + 1}`
            },

        },
        {
            title: '分组编码',
            key: 'submeetingCategory',
            dataIndex: 'submeetingCategory',
            align: 'center',
        },
        {
            title: '分论坛名称',
            key: 'submeetingName',
            dataIndex: 'submeetingName',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                return (<Button size='small' type="link" onClick={() => { alert("Hello,world") }}>{text}</Button>)
            }
        },
        // {
        //     title: '英文名称',
        //     key: 'meetingNameEn',
        //     dataIndex: 'meetingNameEn',
        //     align: 'center',
        // },
        // {
        //     title: '举办单位',
        //     key: 'submeetingHost',
        //     dataIndex: 'submeetingHost',
        //     align: 'center',
        // },
        {
            title: '开始时间',
            key: 'submeetingBeginDate',
            dataIndex: 'submeetingBeginDate',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text) {
                    return dayjs(text).format("HH:mm:ss");
                } else {
                    return text
                }
            }
        },
        {
            title: '结束时间',
            key: 'submeetingEndDate',
            dataIndex: 'submeetingEndDate',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text) {
                    return dayjs(text).format("HH:mm:ss");
                } else {
                    return text
                }
            }
        },
        // {
        //     title: '报名截止时间',
        //     key: 'meetingRegDate',
        //     dataIndex: 'meetingRegDate',
        //     align: 'center',
        //     render: (text: any, _record: any, _index: number) => {
        //         if (text) {
        //             return dayjs(text).format("YYYY-MM-DD");
        //         } else {
        //             return text
        //         }
        //     }
        // },
        {
            title: '会议说明',
            key: 'submeetingRemaker',
            dataIndex: 'submeetingEndDate',
            align: 'center',
        },
        {
            title: '操作',
            key: 'active',
            align: 'center',
            width: 160,
            render: (_: any, record: any) => (
                <Space size={'small'}>
                    <Button type="link" size='small' style={{ padding: 4 }}
                        onClick={() => openDrawer(2, record)}>修改</Button>
                    <Button type="link" size='small' style={{ padding: 4 }}
                        onClick={() => openHelpDrawer(record)}>添加帮助</Button>
                    <Button type="link" size='small' danger style={{ padding: 4 }}
                        onClick={() => deleteData(record.id)}>删除</Button>
                </Space>
            ),
        },

    ]

    return (
        <Container>
            <Card className="dict-card-top">
                <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => openDrawer(1, null)}>新增</Button>
                    <Button type="primary" icon={<ReloadOutlined />} onClick={() => reload()}>刷新列表</Button>
                    <Button type="primary" icon={<ReloadOutlined />} onClick={backToMainMeeting}>返回</Button>
                </Space>
            </Card>
            <Card className="dict-card-main">
                <Table
                    bordered
                    size={'small'}
                    columns={columns}
                    loading={loading}
                    dataSource={datasource}
                    rowKey={(record: any) => record.id}
                    pagination={{
                        onShowSizeChange: (current, size) => setPageQuery({ ...pageQuery, page: current, size: size }),
                        onChange: (page, pageSize) => setPageQuery({ ...pageQuery, page: page, size: pageSize }),
                        showTotal: () => `共 ${total} 个`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSize: pageQuery.size,
                        current: pageQuery.page,
                        size: 'default',
                        total: total,
                    }}
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: selectedRowKeys,
                        onChange: (selectedRowKeys: React.Key[]) => {
                            setSelectedRowKeys([...selectedRowKeys.map(item => item as number)])
                        }
                    }}
                />
            </Card>
            <SubMeetingForm callBack={() => reload()} ref={formRef} />
            <MeetingHelpForm ref={helpRef} callBack={() => reload()} />
        </Container>
    )
}

const Container = styled.div`
    .dict-card-top {
        padding: 0;
        margin-bottom: 5px;

        .ant-card-body {
            padding: 10px;
            border-radius: 5px;
        }

    }

    .dict-card-main {
        padding: 0;

        .ant-card-body {
            padding: 10px;
            border-radius: 5px;

            .ant-table-pagination {
                margin: 10px 0 0 0;
            }
        }
    }
`

export default SubMeetingPage;