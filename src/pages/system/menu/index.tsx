import {Button, Card, message, Modal, Space, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {menuDelete, menuTable} from "@/api/menu.ts";
import {useRequest} from "ahooks";
import {MenuCreateDrawer, MenuUpdateDrawer} from "@/pages/system/menu/components";
import IconFont from "@/components/IconFont";
import {ExclamationCircleFilled} from "@ant-design/icons";
import styled from "@emotion/styled";
import {Menus} from "@/types";


const AuthorityPermissionPage = () => {

    const columns: ColumnsType<Menus.MenuTableTreeProp> = [
        {
            title: '菜单名称',
            key: 'title',
            dataIndex: 'title',
            align: 'left',
        },
        {
            title: '图标',
            key: 'icon',
            dataIndex: 'icon',
            align: 'center',
            width: 50,
            render: (_, record) => record.icon ? <IconFont type={record.icon}/> : null
        },

        {
            title: '权限标识',
            key: 'menuCode',
            dataIndex: 'menuCode',
            align: 'center',
            width: 150,
            render: (text) => text ? <Tag color="red">{text}</Tag> : null
        },
        {
            title: '路由',
            key: 'menuPath',
            dataIndex: 'menuPath',
            align: 'center',
            width: 150,
            render: (text) => text ? <Tag color='success'>{text}</Tag> : null
        },
        {
            title: '公共',
            key: 'isPublic',
            dataIndex: 'isPublic',
            align: 'center',
            width: 60,
            render: (text) => text === 1 ? <Tag color="blue">公共</Tag> : <Tag color="red">私有</Tag>
        },
        {
            title: '展示',
            key: 'isShow',
            dataIndex: 'isShow',
            align: 'center',
            width: 60,
            render: (text) => text === 1 ? <Tag color="blue">展示</Tag> : <Tag color="red">隐藏</Tag>
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
            width: 100,
            render: (_, record) => (
                <Space size={'small'}>
                    <Button size="small" type="link" onClick={() => openDrawer('edit', record.key)}>编辑</Button>
                    <Button size="small" type="link" onClick={() => openDrawer('add', record.key)}>增加</Button>
                    <Button size="small" type="link" danger onClick={() => deleteMenu(record.key)}>删除</Button>
                </Space>
            ),
        }
    ];

    const [tableQuery] = useState<Menus.MenuTableTreeQueryProp>({});
    const [expendKey, setExpendKey] = useState<number[]>([]);
    const [drawerProp, setDrawerProp] = useState<Menus.DrawerProp>({createVisible: false, updateVisible: false});
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState<Menus.MenuTableTreeProp[]>([]);
    const [expandAll, setExpandAll] = useState(false);

    const {run, loading} = useRequest(menuTable, {
        manual: true,
        onSuccess: (data) => {
            setDatasource(data);
        }
    })

    const openDrawer = (types: 'add' | 'edit', id: number) => {
        if (types === 'add') {
            setDrawerProp({...drawerProp, parentId: id, createVisible: true});
        } else if (types === 'edit') {
            setDrawerProp({...drawerProp, updateVisible: true, currId: id});
        }
    }

    const deleteMenu = (menuId: number) => {
        Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleFilled/>,
            content: '确认删除当前菜单？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                const msg = await menuDelete(menuId);
                message.success(msg)
                run(tableQuery)
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

    const expendHandler = (expanded: boolean, record: Menus.MenuTableTreeProp) => {
        let data: number[] = expanded ? [...expendKey, record.key] : (expendKey.filter(item => item !== record.key) || []);
        data = data.reduce((accumulator: number[], currentValue) => {
            if (!accumulator.includes(currentValue)) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, [])
        setExpendKey(data)
    }

    const getParentId = (data: Menus.MenuTableTreeProp[]): number[] => {
        return data.filter(item => item.children && item.children.length > 0)
            .map(item => {
                return [item.key, ...getParentId(item.children)]
            }).flat()
    }

    useEffect(() => {
        setExpendKey(expandAll ? getParentId(datasource) : []);
    }, [expandAll]);

    useEffect(() => {
        run(tableQuery)
    }, [])


    return <Container>
        <Card className="menu-card-top">
            <Space>
                <Button type='primary'
                        onClick={() => setDrawerProp({...drawerProp, createVisible: true, parentId: 0})}>创建</Button>
                <Button type='primary' onClick={() => setExpandAll(!expandAll)}>展开/折叠</Button>
                <Button type='primary' onClick={() => run(tableQuery)}>刷新</Button>
            </Space>
        </Card>
        <Card className="menu-card-main">
            <Table
                bordered
                size={'small'}
                loading={loading}
                columns={columns}
                dataSource={datasource}
                expandable={{expandedRowKeys: expendKey, onExpand: expendHandler, indentSize: 30}}
                rowKey={(record) => record.key}
                pagination={false}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRowKeys: React.Key[]) => {
                        setSelectedRowKeys([...selectedRowKeys.map(item => item as number)])
                    }
                }}
            />
        </Card>
        <MenuCreateDrawer
            parentId={drawerProp.parentId!}
            visible={drawerProp.createVisible}
            close={closeDrawer}
        />
        <MenuUpdateDrawer
            menuId={drawerProp.currId!}
            visible={drawerProp.updateVisible}
            close={closeDrawer}/>
    </Container>
}

const Container = styled.div`
    .menu-card-top {
        padding: 0;
        margin-bottom: 5px;

        .ant-card-body {
            padding: 10px;
            border-radius: 5px;
        }

    }

    .menu-card-main {
        padding: 0;

        .ant-card-body {
            padding: 10px;
            border-radius: 5px;

            .ant-table-thead > tr > th:nth-child(2) {
                text-align: center !important;
            }

            .ant-table-pagination {
                margin: 10px 0 0 0;
            }
        }
    }
`

export default AuthorityPermissionPage;
