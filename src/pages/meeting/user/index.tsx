import styled from "@emotion/styled";
import {Button, Card, Input, Space, Table, Tag} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {ReloadOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import Meeting from "@/types/meeting";
import {meetingUserPage} from "@/api/meetinguser.ts";
import CheckUserRegStatusPage from "@/pages/meeting/user/check";

const MeetingUserPage = () => {

    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState([]);
    const [pageQuery, setPageQuery] = useState<Meeting.MeetingUserPageProp>(Meeting.DefaultPageProp);
    const [meetingName, setMeetingName] = useState("");
    const [userName, setUserName] = useState("");
    const checkUserRef = useRef(null)

    const checkUserStatus = (record: any) => {
        if (checkUserRef.current) {
            checkUserRef.current.showWinForm(record.id, true, 0)
        }
    }

    const queryData = () => {
        run({...pageQuery, meetingName, userName})
    }

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
            title: '参加会议',
            key: 'meetingName',
            dataIndex: 'meetingName',
            align: 'center',
        },
        {
            title: '用户姓名',
            key: 'userName',
            dataIndex: 'userName',
            align: 'center',
        },
        {
            title: '手机号',
            key: 'userPhone',
            dataIndex: 'userPhone',
            align: 'center',
        },
        {
            title: '邮箱',
            key: 'userEmail',
            dataIndex: 'userEmail',
            align: 'center',
        },
        {
            title: '工作单位',
            key: 'userWorkUnit',
            dataIndex: 'userWorkUnit',
            align: 'center',
        },
        {
            title: '职位',
            key: 'userJob',
            dataIndex: 'userJob',
            align: 'center',

        },
        {
            title: '研究领域',
            key: 'userResearchArea',
            dataIndex: 'userResearchArea',
            align: 'center',

        },

        {
            title: '职业',
            key: 'userPostType',
            dataIndex: 'userPostType',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text === "1") {
                    return '学生'
                } else if (text === "2") {
                    return '科研人员'
                } else if (text === "3") {
                    return '工程技术人员'
                }
            }

        },
        {
            title: '注册状态',
            key: 'userRegStatus',
            dataIndex: 'userRegStatus',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text === -1) {
                    return <Tag color={"red"}>信息未填报</Tag>
                } else if (text === 0) {
                    return <Tag color={"volcano"}>信息已填报</Tag>
                } else if (text === 1) {
                    return <Tag color={"orange"}>已上传缴费凭证</Tag>
                } else if (text === 2) {
                    return <Tag color={"green"}>通过审核</Tag>
                } else {
                    return <Tag color={"blue"}>未通过审核</Tag>
                }
            }

        },
        {
            title: '操作',
            key: 'active',
            align: 'center',
            width: 160,
            render: (_: any, record: any) => {
                if (record.userRegStatus === 1) {
                    return (
                        <Space size={'small'}>
                            <Button type="link" size='small' style={{padding: 4}}
                                    onClick={() => checkUserStatus(record)}>核对报名消息</Button>
                        </Space>
                    )
                }
            }
        },
    ]
    const {loading, run} = useRequest(meetingUserPage, {
        manual: true,
        onSuccess: (data) => {
            setDatasource(data.records);
            setTotal(data.total)
        }
    })

    useEffect(() => {
        run(pageQuery)
    }, [pageQuery]);

    return (
        <Container>
            <Card className="dict-card-top">
                <Space>
                    <div>会议名称</div>
                    <Input placeholder={"会议名称"} name={"meetingName"}
                           onChange={(e) => setMeetingName(e.target.value)}></Input>
                    <div>用户姓名</div>
                    <Input placeholder={"用户姓名"} name={"userName"} onChange={(e) => {
                        setUserName(e.target.value)
                    }}></Input>
                    <Button type="primary" icon={<ReloadOutlined/>} onClick={() => queryData()}>查询</Button>
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
                        onShowSizeChange: (current, size) => setPageQuery({...pageQuery, page: current, size: size}),
                        onChange: (page, pageSize) => setPageQuery({...pageQuery, page: page, size: pageSize}),
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
            <CheckUserRegStatusPage callBack={() => {
                run(pageQuery)
            }} ref={checkUserRef}/>
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

export default MeetingUserPage