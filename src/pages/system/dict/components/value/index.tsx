import {Button, Drawer, Space, Spin, Switch, Table} from "antd";
import React, {useEffect, useState} from "react";
import {DictTypes} from "@/types/index.ts";
import {ColumnsType} from "antd/es/table";
import {useRequest} from "ahooks";
import {dictValuePage} from "@/api/dict.ts";

const DictValueDrawer: React.FC<DictTypes.DictValueDrawerProp> = ({dictName, visible, close}) => {



    const columns: ColumnsType<DictTypes.DictValueTableProp> = [
        {
            title: '字典标签',
            key: 'dataLabel',
            dataIndex: 'dataLabel',
            align: 'center'
        },
        {
            title: '字典键值',
            key: 'dataValue',
            dataIndex: 'dataValue',
            align: 'center'
        },
        {
            title: '字典排序',
            key: 'dataSort',
            dataIndex: 'dataSort',
            align: 'center'
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            width: 160,
            render: (_, record) => <Switch checkedChildren="正常" unCheckedChildren="停用" checked={record.status === 1} />
        },
        {
            title: '备注',
            key: 'remark',
            dataIndex: 'remark',
            align: 'center'
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            align: 'center',
            width: 160,
        },
        {
            title: '操作',
            key: 'active',
            align: 'center',
            width: 160,
            render: () => (
                <Space size={'small'}>
                    <Button type="link" size='small' style={{padding: 4}}>修改</Button>
                    <Button type="link" size='small' danger style={{padding: 4}}>删除</Button>
                </Space>
            ),
        },
    ]

    const [loading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState<DictTypes.DictValueTableProp[]>([]);
    const [total, setTotal] = useState(0);
    const [pageQuery, setPageQuery] = useState<DictTypes.DictValuePageProp>({page: 1, size: 10});

    const dictValueRequest = useRequest(dictValuePage, {
        manual: true,
        onSuccess: (data)=> {
            setDatasource(data.records);
            setTotal(data.total)
        }
    })

    useEffect(() => {
        if (visible) {
            dictValueRequest.run(pageQuery);
        }
    }, [visible]);

    return <Drawer
        width={500}
        title="字典数据"
        placement="right"
        onClose={close}
        open={visible}
        extra={
            <Space>
                <Button type="primary" danger onClick={close}>关闭</Button>
            </Space>
        }
    >
        <Spin tip="加载中......" spinning={dictValueRequest.loading}>
            <Table
                bordered
                size={'small'}
                columns={columns}
                loading={loading}
                dataSource={datasource}
                style={{ marginTop: 10 }}
                rowKey={(record) => record.dataId}
                pagination={{
                    onShowSizeChange: (current, size) => dictValueRequest.run({...pageQuery, page: current, size: size}),
                    onChange: (page, pageSize) => dictValueRequest.run({...pageQuery, page: page, size: pageSize}),
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
        </Spin>
    </Drawer>
}

export default DictValueDrawer;
