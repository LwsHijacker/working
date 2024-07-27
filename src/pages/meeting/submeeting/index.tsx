import React, { useEffect, useRef, useState } from "react";
import { Button, Card, message, Modal, Space, Table } from "antd";
import styled from "@emotion/styled";
import { ExclamationCircleFilled, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import SubMeetingForm from "@/pages/meeting/form/submeetingform.tsx";
import { useRequest } from "ahooks";
import { submeetingDelete, submeetingPageByMainId } from "@/api/submeeting.ts";
import dayjs from "dayjs";
import SubMeetingHelpForm from "@/pages/meeting/form/submeetinghelpform.tsx";


const SubMeetingPage = ({ mainMeetingId, backToMainMeeting }: { mainMeetingId: number, backToMainMeeting: () => void }) => {
    const formRef = useRef(null);
    const helpRef = useRef(null);
    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState([]);
    const [pageQuery, setPageQuery] = useState({ page: 1, size: 10, mainId: mainMeetingId });
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
            content: '确认删除分论坛数据？',
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

    const { loading, run } = useRequest(submeetingPageByMainId, {
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
            title: '论坛名称',
            key: 'subMeetingName',
            dataIndex: 'subMeetingName',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                return (<Button size='small' type="link">{text}</Button>)
            }
        },
        {
            title: '分组编码',
            key: 'groupCode',
            dataIndex: 'groupCode',
            align: 'center',
        },
        {
            title: '开始时间',
            key: 'subMeetingBeginDate',
            dataIndex: 'subMeetingBeginDate',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text) {
                    return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
                } else {
                    return text
                }
            }
        },
        {
            title: '结束时间',
            key: 'subMeetingEndDate',
            dataIndex: 'subMeetingEndDate',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text) {
                    return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
                } else {
                    return text
                }
            }
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
                        onShowSizeChange: (current, size) => setPageQuery({ ...pageQuery, page: current, size: size, mainId: mainMeetingId }),
                        onChange: (page, pageSize) => setPageQuery({ ...pageQuery, page: page, size: pageSize, mainId: mainMeetingId }),
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
            <SubMeetingForm callBack={() => reload()} ref={formRef} mainMeetingId={mainMeetingId} />
            <SubMeetingHelpForm ref={helpRef} callBack={() => reload()} />
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