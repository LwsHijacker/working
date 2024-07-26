import {Button, Drawer, Form, Input, InputNumber, message, Radio, Space, Spin, TreeSelect} from "antd";
import React, {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {menuCreate, menuTree} from "@/api/menu.ts";
import Menu from "@/types/menu.ts";

const MenuCreateDrawer: React.FC<Menu.MenuCreateDrawerProp> = ({visible, parentId, close}) => {

    const [menuType, setMenuType] = useState<number>(1);
    const [form] = Form.useForm<Menu.MenuCreateFormProp>();
    const [tree, setTree] = useState<Menu.MenuTreeProp[]>([]);
    const loadTree = useRequest(menuTree, {manual: true, onSuccess: (data) => {
            setTree([{key: 0, title: '主类目', children: data}]);
        }
    });

    const createTree = useRequest(menuCreate, {manual: true, onSuccess: (_) => {
            message.success('创建菜单成功')
            close(true)
        }
    });


    const changeMenuType = (e: number) => {
        setMenuType(e);
        form.setFieldsValue({menuType: e})
    }

    const submitForm = () => {
        form.validateFields().then(value => {
            createTree.run(value)
        })
    }

    useEffect(() => {
        console.log("pId", parentId)
        if (visible) {
            loadTree.run();
            form.setFieldValue("parentId", parentId)
            form.setFieldValue("menuSort", 1)
        }
        return () => {
            form.resetFields();
            setTree([]);
        }
    }, [visible])


    return <Drawer
        width={500}
        title="添加菜单"
        placement="right"
        maskClosable={false}
        onClose={() => close(false)}
        open={visible}
        extra={
            <Space>
                <Button type="primary" danger onClick={()=> close(false)}>取消</Button>
                <Button type="primary" loading={createTree.loading} onClick={submitForm}>保存</Button>
            </Space>
        }
    >
        <Spin tip="加载中......" spinning={loadTree.loading}>
            <Form labelCol={{ span: 5 }}
                  wrapperCol={{ span: 19 }}
                  form={form}
                  layout="horizontal"
                  name="form_in_modal">
                <Form.Item name="parentId" label="上级菜单" rules={[{ required: true, message: '请选择上级菜单' }]}>
                    <TreeSelect
                        allowClear
                        treeData={tree}
                        placeholder="请选择上级菜单"
                        fieldNames={{label: 'title', value: 'key', children: 'children'}}
                    />
                </Form.Item>
                <Form.Item name="menuName" label="菜单名称" rules={[{ required: true, message: '请输入菜单名称' }]}>
                    <Input placeholder="请输入菜单名称" />
                </Form.Item>
                <Form.Item name="menuCode" label="菜单编码" rules={[{ required: true, message: '请输入菜单编码' }]}>
                    <Input placeholder="请输入菜单编码" />
                </Form.Item>
                <Form.Item name="menuType" label="菜单类型">
                    <Radio.Group onChange={e => changeMenuType(e.target.value as number)}>
                        <Radio value={1}>目录</Radio>
                        <Radio value={2}>菜单</Radio>
                        <Radio value={3}>按钮</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="icon" label="图标">
                    <Input placeholder="请输入图标" />
                </Form.Item>
                {menuType === 2 && <Form.Item name="menuPath" label="地址" rules={[{ required: true, message: '请输入地址' }]}>
                    <Input placeholder="请输入地址" />
                </Form.Item>}
                <Form.Item name="orderNum" label="显示顺序" rules={[{ required: true, message: '请输入实现顺序' }]}>
                    <InputNumber min={1} placeholder="请输入实现顺序" style={{width: '100%'}} />
                </Form.Item>
                <Form.Item name="isShow" label="是否显示">
                    <Radio.Group>
                        <Radio value={1}>显示</Radio>
                        <Radio value={2}>隐藏</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="isPublic" label="是否公开">
                    <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Spin>
    </Drawer>
}

export default MenuCreateDrawer;
