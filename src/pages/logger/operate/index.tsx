import {ColumnsType} from "antd/es/table";
import {
    OperateLoggerQueryProp,
    OperateLoggerTableProp
} from "@/pages/logger/modules.ts";
import {Space, Table} from "antd";
import {useState} from "react";
import {useRequest} from "ahooks";
import {operateLoggerPage} from "@/api/logger.ts";
import styled from "@emotion/styled";

const LoggerOperatePage = () => {
    const columns: ColumnsType<OperateLoggerTableProp> = [
        {
            title: '模块名称',
            key: 'title',
            dataIndex: 'title',
            align: 'center'
        },
        {
            title: '业务类型',
            key: 'businessType',
            dataIndex: 'businessType',
            align: 'center'
        },
        {
            title: '操作类型',
            key: 'operatorType',
            dataIndex: 'roleSort',
            align: 'center',
            width: 160,
        },
        {
            title: 'IP地址',
            key: 'ip',
            dataIndex: 'ip',
            align: 'center',
            width: 160
        },
        {
            title: '地理区域',
            key: 'address',
            dataIndex: 'address',
            align: 'center',
            width: 160
        },
        {
            title: '操作时间',
            key: 'operTime',
            dataIndex: 'operTime',
            align: 'center',
            width: 160,
        },
        {
            title: '耗时',
            key: 'costTime',
            dataIndex: 'costTime',
            align: 'center',
            width: 160,
        },
        {
            title: '结果',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            width: 160,
        }
    ]

    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState<OperateLoggerTableProp[]>([]);
    const [pageQuery] = useState<OperateLoggerQueryProp>({page: 1, size: 10});

    const {loading, run} = useRequest(operateLoggerPage, {
        manual: true,
        onSuccess: (data)=> {
            setDatasource(data.records);
            setTotal(data.total)
        }
    })

    return <Container>
        <Space></Space>
        <Table
            bordered
            size={'small'}
            columns={columns}
            loading={loading}
            dataSource={datasource}
            style={{ marginTop: 10 }}
            rowKey={(record) => record.id}
            pagination={{
                onShowSizeChange: (current, size) => run({...pageQuery, page: current, size: size}),
                onChange: (page, pageSize) => run({...pageQuery, page: page, size: pageSize}),
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
    </Container>
}

const Container = styled.div`
    background-color: #ffffff;
    padding: 16px;
    border-radius: 5px;
`

export default LoggerOperatePage;
