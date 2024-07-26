import {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {ColumnsType} from "antd/es/table";
import {loginLoggerPage} from "@/api/logger.ts";
import type { Dayjs } from 'dayjs';
import {Button, Card, DatePicker, Form, Input, Select, Space, Table, Tag} from "antd";
import {LoginLoggerQueryProp, LoginLoggerTableProp} from "@/pages/logger/modules.ts";
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import styled from "@emotion/styled";

const LoggerLoginPage = () => {

    const columns: ColumnsType<LoginLoggerTableProp> = [
        {
            title: '用户名称',
            key: 'userName',
            dataIndex: 'userName',
            align: 'center'
        },
        {
            title: '登录地址',
            key: 'ip',
            dataIndex: 'ip',
            align: 'center'
        },
        {
            title: '登录地点',
            key: 'address',
            dataIndex: 'address',
            align: 'center',
        },
        {
            title: '浏览器',
            key: 'browser',
            dataIndex: 'browser',
            align: 'center'
        },
        {
            title: '操作系统',
            key: 'os',
            dataIndex: 'os',
            align: 'center'
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            width: 80,
            render: (_, record) => record.status === 1 ? <Tag color="success">成功</Tag> : <Tag color="error">失败</Tag>
        },
        {
            title: '登录信息',
            key: 'msg',
            dataIndex: 'msg',
            align: 'center'
        },
        {
            title: '登录时间',
            key: 'loginTime',
            dataIndex: 'loginTime',
            align: 'center',
            width: 180,
        }
    ]

    const [times, setTimes] = useState<[Dayjs, Dayjs] | null>(null);
    const [query, setQuery] = useState<LoginLoggerQueryProp>({page: 1, size: 10, status: 0})
    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState<LoginLoggerTableProp[]>([]);

    const {loading, run} = useRequest(loginLoggerPage, {
        manual: true,
        onSuccess: (data)=> {
            setDatasource(data.records);
            setTotal(data.total)
        }
    })

    const resetForm = () => {
        setTimes(null);
        setQuery({page: query.page, size: query.size, status: 0, address: undefined, userName: undefined, endTime: undefined, startTime: undefined, times: undefined})
    }

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setTimes([dates[0] as Dayjs, dates[1] as Dayjs])
            setQuery({...query, startTime: dateStrings[0], endTime: dateStrings[1]})
        }
    };

    useEffect(() => {
        run(query)
    }, [query]);

    useEffect(() => {
        run(query)
    }, []);

    return <Container>
        <Card className="login-card-top">
            <Space>
                <Form layout={'inline'} style={{ maxWidth: 'none' }}>
                    <Form.Item name="address" label="登录地址">
                        <Input placeholder="请输入登录地址" onChange={e => setQuery({...query, address: e.target.value})} />
                    </Form.Item>
                    <Form.Item name="userName" label="用户名称">
                        <Input placeholder="请输入用户名称" onChange={e => setQuery({...query, userName: e.target.value})} />
                    </Form.Item>
                    <Form.Item name="status" label="登录状态" initialValue={0}>
                        <Select style={{width: 100}} defaultValue={query.status} onChange={e => setQuery({...query, status: e})}>
                            <Select.Option value={0}>全部</Select.Option>
                            <Select.Option value={1}>成功</Select.Option>
                            <Select.Option value={2}>失败</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="登录时间">
                        <DatePicker.RangePicker value={times} locale={locale} onChange={onRangeChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{marginLeft: 10}} type='primary' onClick={resetForm}>重置</Button>
                    </Form.Item>
                </Form>
            </Space>
        </Card>
        <Card className="login-card-main">
            <Table
                bordered
                size={'small'}
                columns={columns}
                loading={loading}
                dataSource={datasource}
                rowKey={(record) => record.id}
                pagination={{
                    onShowSizeChange: (current, size) => setQuery({...query, page: current, size: size}),
                    onChange: (page, pageSize) => setQuery({...query, page: page, size: pageSize}),
                    showTotal: () => `共 ${total} 个`,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSize: query.size,
                    current: query.page,
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
    </Container>
}

const Container = styled.div`
    .login-card-top {
        padding: 0;
        margin-bottom: 5px;
        .ant-card-body {
            padding: 10px;
            border-radius: 5px;
        }

    }
    .login-card-main {
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

export default LoggerLoginPage;