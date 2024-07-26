import styled from "@emotion/styled";
import {Button, Card, Input, message, Space, Table} from "antd";
import {ExportOutlined, ReloadOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import Meeting from "@/types/meeting.ts";
import {useRequest} from "ahooks";
import {meetingMakeInvoicePageQuery, meetingMakeInvoiceUserExport} from "@/api/meetinguser.ts";
import CheckUserRegStatusPage from "@/pages/meeting/user/check";

const MakeInvoice = () => {
    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState([]);
    const [pageQuery, setPageQuery] = useState<Meeting.MeetingUserPageProp>(Meeting.DefaultPageProp);
    const [userName, setUserName] = useState("");
    const [meetingName, setMeetingName] = useState("");
    const checkUserRef = useRef(null)

    const queryData = () => {
        run({...pageQuery, userName, meetingName})
    }

    const exportAllData = () => {
        meetingMakeInvoiceUserExport({meetingName, userName}).then((result: any) => {
            debugger
            console.log(result);
            const blob = new Blob([result.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
            let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
            // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
            let a = document.createElement("a");
            a.href = url;
            a.download = "开票人员清单.xlsx";
            a.click();
            // 5.释放这个临时的对象url
            window.URL.revokeObjectURL(url);

        }).catch((err: any) => {
            message.error(err.message);
        })
    }

    const {loading, run} = useRequest(meetingMakeInvoicePageQuery, {
        manual: true,
        onSuccess: (data) => {
            setDatasource(data.records);
            setTotal(data.total)
        }
    })

    const showPayInfo = (record: any) => {
        if (checkUserRef.current) {
            debugger
            checkUserRef.current.showWinForm(record.userId, true, 1)
        }
    }

    useEffect(() => {
        run(pageQuery)
    }, [pageQuery]);

    const sendMailInvoice = (record: any) => {
        message.info("邮件发送功能暂时还没有开通！" + record.userEmail)
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
            title: '会议名称',
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
            title: '交费金额',
            key: 'userPostType',
            dataIndex: 'userPostType',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text === '1') {
                    return '500.00'
                } else {
                    return '1000.00'
                }
            }
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
            title: '发票类型',
            key: 'invoiceType',
            dataIndex: 'invoiceType',
            align: 'center',
            render: (text: any, _record: any, _index: number) => {
                if (text === '1') {
                    return '增值税普通发票'
                }
            }

        },
        {
            title: '工作单位',
            key: 'invoiceHeader',
            dataIndex: 'invoiceHeader',
            align: 'center',

        },
        {
            title: '税号',
            key: 'taxNum',
            dataIndex: 'taxNum',
            align: 'center',

        },
        {
            title: '开票单位地址',
            key: 'invoiceUnitAddr',
            dataIndex: 'invoiceUnitAddr',
            align: 'center',

        },
        {
            title: '开票单位电话',
            key: 'invoiceUnitPhone',
            dataIndex: 'invoiceUnitPhone',
            align: 'center',

        },
        {
            title: '操作',
            key: 'active',
            align: 'center',
            width: 120,
            render: (_: any, record: any) => {
                return (
                    <Space size={'small'}>
                        <Button type="link" size='small' style={{padding: 4}}
                                onClick={() => showPayInfo(record)}>查看交费消息</Button>
                        <Button type="link" size='small' style={{padding: 4}}
                                onClick={() => sendMailInvoice(record)}>发送邮件</Button>
                    </Space>
                )

            }
        },
    ]

    return (
        <Container>
            <Card className="dict-card-top">
                <Space>
                    <div>会议名称</div>
                    <Input placeholder={"会议名称"} name={"meetingName"} onChange={(e) => {
                        setMeetingName(e.target.value)
                    }}></Input>
                    <div>用户姓名</div>
                    <Input placeholder={"用户姓名"} name={"userName"} onChange={(e) => {
                        setUserName(e.target.value)
                    }}></Input>

                    <Button type="primary" icon={<ReloadOutlined/>} onClick={() => queryData()}>查询</Button>
                    <Button type="primary" icon={<ExportOutlined/>} onClick={() => exportAllData()}>导出数据</Button>
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

export default MakeInvoice