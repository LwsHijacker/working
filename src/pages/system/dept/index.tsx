import {Button, Card, Divider, Input, message, Modal, Select, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {useRequest} from "ahooks";
import {deptDelete, deptTable} from "@/api/dept.ts";
import {ExclamationCircleFilled, PlusOutlined, RedoOutlined} from "@ant-design/icons";
import {DeptCreateDrawer, DeptUpdateDrawer} from "@/pages/system/dept/components";
import styled from "@emotion/styled";
import {Dept} from "@/types";
import useDebounce from "@/hooks/useDebounce.tsx";

const SystemDeptPage = () => {

    const columns: ColumnsType<Dept.DeptTableTreeProp> = [
        {
            title: '部门名称',
            key: 'title',
            dataIndex: 'title',
            align: 'left',
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            width: 180,
            render: (text) => text === 1 ? <Tag color="blue">正常</Tag> : <Tag color="red">禁用</Tag>
        },
        {
            title: '排序',
            key: 'order',
            dataIndex: 'order',
            align: 'center',
            width: 100
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            align: 'center',
            width: 180
        },
        {
            title: '操作',
            key: 'active',
            align: 'center',
            width: 250,
            render: (_, record) => (
                <Space size={'small'}>
                    <Button size="small" type="link" onClick={() => openDrawer('edit', record.key)}>编辑</Button>
                    <Button size="small" type="link" onClick={() => openDrawer('add', record.key)}>增加</Button>
                    <Button size="small" type="link" danger onClick={() => deleteMenu(record.key)}>删除</Button>
                </Space>
            ),
        }
    ];

    const [name, setName] = useState<string>();
    const [expandAll, setExpandAll] = useState<boolean>(false);
    const [tableQuery, setTableQuery] = useState<Dept.DeptTableQueryProp>({status: 0});
    const [expendKey, setExpendKey] = useState<number[]>([]);
    const [drawerProp, setDrawerProp] = useState<Dept.DeptDrawerProp>({createVisible: false, updateVisible: false});
    const [datasource, setDatasource] = useState<Dept.DeptTableTreeProp[]>([]);

    const {run, loading} = useRequest(deptTable, {
        manual: true,
        onSuccess: (data) => {
            setDatasource(data);
            // 展开第一层数据
            setExpendKey(data.map(item => item.key) || []);
        }
    })

    const openDrawer = (types: 'add' | 'edit', id: number) => {
        if (types === 'add') {
            setDrawerProp({...drawerProp, parentId: id, createVisible: true});
        } else if (types === 'edit') {
            setDrawerProp({...drawerProp, updateVisible: true, currId: id});
        }
    }

    const deleteMenu = (deptId: number) => {
        Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleFilled/>,
            content: '确认删除当前部门？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                const msg = await deptDelete(deptId);
                message.success(msg)
            },
            onCancel: () => {
            }
        });
    }


    const closeDrawer = (isLoad: boolean) => {
        setDrawerProp({
            ...drawerProp,
            updateVisible: false,
            createVisible: false,
            currId: undefined,
            parentId: undefined
        })
        if (isLoad) {
            run(tableQuery);
        }
    }

    const expendHandler = (expanded: boolean, record: Dept.DeptTableTreeProp) => {
        let data: number[] = expanded ? [...expendKey, record.key] : (expendKey.filter(item => item !== record.key) || []);
        data = data.reduce((accumulator: number[], currentValue) => {
            if (!accumulator.includes(currentValue)) { accumulator.push(currentValue); }
            return accumulator;
        }, [])
        setExpendKey(data)
    }

    const nameQuery = useDebounce((name: string) => {
        setTableQuery({...tableQuery, name: name})
    }, 500, []);

    const getParentId = (data: Dept.DeptTableTreeProp[]): number[] => {
        return data.filter(item => item.children && item.children.length > 0)
            .map(item => {
                return [item.key, ...getParentId(item.children)]
        }).flat()
    }

    useEffect(() => {
        setExpendKey(expandAll ? getParentId(datasource) : (datasource[0] ? [datasource[0].key] : []));
    }, [expandAll]);


    useEffect(() => {
        run(tableQuery);
        setExpendKey(datasource && datasource[0] ? [datasource[0].key] : []);
        setExpandAll(false);
    }, [tableQuery])

    return <Container>
        <Card className="dept-card-top">
            <Space>
                <Button type='primary' icon={<PlusOutlined />} onClick={() => setDrawerProp({...drawerProp, createVisible: true, parentId: 0})}>创建</Button>
                <Button type='primary' icon={<RedoOutlined />} onClick={() => setExpandAll(!expandAll)}>展开/折叠</Button>
                <Button type='primary' icon={<RedoOutlined />} onClick={() => run(tableQuery)}>刷新</Button>
                <Divider type="vertical" />
                <div>部门名称：</div>
                <Input allowClear style={{ width: 180, marginLeft: -12, marginRight: 12 }} value={name} onChange={e => {
                    setName(e.target.value);
                    nameQuery(e.target.value)
                }} placeholder="请输入要搜索部门名称"/>
                <div>部门状态：</div>
                <Select
                    value={tableQuery.status}
                    placeholder="选择状态"
                    style={{ width: 120, marginLeft: -12 }}
                    onChange={e => setTableQuery({...tableQuery, status: e})}
                    options={[{value: 0, label: '全部'},{ value: 1, label: '正常' }, {value: 2, label: '停用'}]}
                />
            </Space>
        </Card>
        <Card className="dept-card-main">
            <Table
                bordered
                size={'small'}
                loading={loading}
                columns={columns}
                dataSource={datasource}
                rowKey={(record) => record.key}
                expandable={{expandedRowKeys: expendKey, onExpand: expendHandler, indentSize: 30}}
                pagination={false}
            />
        </Card>
        <DeptCreateDrawer
            parentId={drawerProp.parentId!}
            visible={drawerProp.createVisible}
            close={closeDrawer}
        />
        <DeptUpdateDrawer
            deptId={drawerProp.currId!}
            visible={drawerProp.updateVisible}
            close={closeDrawer} />
    </Container>
}

const Container = styled.div`
    .dept-card-top {
        padding: 0;
        margin-bottom: 5px;
        .ant-card-body {
            padding: 10px;
            border-radius: 5px;
        }

    }
    .dept-card-main {
        padding: 0;
        .ant-card-body {
            padding: 10px;
            border-radius: 5px;
            .ant-table-thead > tr > th:first-child {
               text-align: center !important;
            }
            .ant-table-pagination {
                margin: 10px 0 0 0;
            }
        }
    }
`

export default SystemDeptPage;
