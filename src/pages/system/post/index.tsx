import {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {postChangeStatus, postDelete, postExport, postPage} from "@/api/post.ts";
import {PostDrawerProp, PostPageProp, PostPageQueryProp} from "@/pages/system/post/modules.ts";
import {Button, Card, Divider, Input, message, Modal, Select, Space, Switch, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {
    DeleteOutlined,
    DownloadOutlined,
    ExclamationCircleFilled,
    PlusOutlined, RedoOutlined
} from "@ant-design/icons";
import {PostCreateDrawer, PostUpdateDrawer} from "@/pages/system/post/components";
import styled from "@emotion/styled";

const SystemPostPage = () => {

    const columns: ColumnsType<PostPageProp> = [
        {
            title: '岗位名称',
            key: 'postName',
            dataIndex: 'postName',
            align: 'center'
        },
        {
            title: '岗位编码',
            key: 'postCode',
            dataIndex: 'postCode',
            align: 'center'
        },
        {
            title: '显示顺序',
            key: 'postSort',
            dataIndex: 'postSort',
            align: 'center',
            width: 160,
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            width: 160,
            render: (_, record, index) => <Switch checkedChildren="正常" unCheckedChildren="停用" checked={record.status === 1} onChange={e => changePostStatus(e, record.postId, index)} />
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
            render: (_, record) => (
                <Space size={'small'}>
                    <Button type="link" size='small' onClick={() => openDrawer('update', record.postId)}>修改</Button>
                    <Button type="link" size='small' danger onClick={() => deleteRoleHandler(record.postId)}>删除</Button>
                </Space>
            ),
        },
    ]

    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [datasource, setDatasource] = useState<PostPageProp[]>([]);
    const [pageQuery, setPageQuery] = useState<PostPageQueryProp>({page: 1, size: 10, status: 0});
    const [postDrawer, setPostDrawer] = useState<PostDrawerProp>({createVisible: false, updateVisible: false});

    const openDrawer = (types: 'create' | 'update', postId?: number) => {
        switch (types) {
            case 'create':
                setPostDrawer({createVisible: true, updateVisible: false});
                break;
            case 'update':
                setPostDrawer({createVisible: false, updateVisible: true, postId: postId});
                break;
            default:
                break
        }
    }

    const closeDrawer = (types: 'create' | 'update', isLoad: boolean) => {
        switch (types) {
            case 'create':
            case 'update':
                setPostDrawer({createVisible: false, updateVisible: false});
                break;
            default:
                break
        }
        if (isLoad) {
            run(pageQuery)
        }
    }

    const deleteRoleHandler = async (id?: number) => {
        if (id === undefined && selectedRowKeys.length <= 0) {
            message.warning("请先选中岗位在执行删除操作");
            return;
        }
        Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleFilled />,
            content: '确认删除岗位数据？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                await postDelete(id ? [id] : selectedRowKeys);
                run(pageQuery)
                message.success('删除成功')
                setSelectedRowKeys([]);
            },
            onCancel: () => {}
        });
    }

    const {loading, run} = useRequest(postPage, {
        manual: true,
        onSuccess: (data)=> {
            setDatasource(data.records);
            setTotal(data.total)
        }
    })

    const downPosts = async () => {
        const result = await postExport();
        let url = window.URL.createObjectURL(new Blob([result.data], { type: 'application/vnd.ms-excel' }));
        let link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', decodeURI(result.headers['content-disposition'].substring(20)));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);//销毁url对象
    }

    const changePostStatus = async (status: boolean, postId: number, index: number) => {
        const result = await postChangeStatus(postId, status)
        let copy = [...datasource];
        copy[index] = {...datasource[index], status: status ? 1 : 2};
        setDatasource(copy);
        message.success(result)
    }

    useEffect(() => {
        run(pageQuery)
    }, [pageQuery]);

    useEffect(() => run(pageQuery), []);

    return <Container>
        <Card className="post-card-top">
            <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => openDrawer('create')}>新增</Button>
                {/*<Button type="primary" icon={<UploadOutlined />} >导入</Button>*/}
                <Button type="primary" icon={<DownloadOutlined />} onClick={downPosts}>导出</Button>
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteRoleHandler()}>删除</Button>
                <Divider type='vertical' />
                <Button type="primary" icon={<RedoOutlined />} onClick={() => run(pageQuery)}>刷新</Button>
                <Divider type='vertical' />
                <div>状态：</div>
                <Select
                    defaultValue={0}
                    value={pageQuery.status}
                    style={{ width: 100 }}
                    onChange={e => setPageQuery({...pageQuery, status: e})}
                    options={[
                        { value: 0, label: '全部' },
                        { value: 1, label: '正常' },
                        { value: 2, label: '停用' },
                    ]}
                />
                <div>名称：</div>
                <Input style={{ width: 180 }} placeholder="请输入搜索的岗位名称" allowClear value={pageQuery.postName} onChange={e => setPageQuery({...pageQuery, postName: e.target.value})}/>
            </Space>
        </Card>
        <Card className="post-card-main">
            <Table
                bordered
                size={'small'}
                columns={columns}
                loading={loading}
                dataSource={datasource}
                rowKey={(record) => record.postId}
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
        </Card>
        <PostCreateDrawer visible={postDrawer.createVisible} close={(isLoad) => closeDrawer('create', isLoad)} />
        <PostUpdateDrawer visible={postDrawer.updateVisible} close={(isLoad) => closeDrawer('update', isLoad)} postId={postDrawer.postId} />
    </Container>
}

const Container = styled.div`
  .post-card-top {
    padding: 0;
    margin-bottom: 5px;
    .ant-card-body {
      padding: 10px;
      border-radius: 5px;
    }

  }
  .post-card-main {
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

export default SystemPostPage;
