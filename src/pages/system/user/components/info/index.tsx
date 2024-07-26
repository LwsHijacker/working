import React, {useEffect, useState} from "react";
import {User} from "@/types";
import {Button, Drawer, Form, Input, Space, Spin, Tag} from "antd";
import {useRequest} from "ahooks";
import {getUserInfo} from "@/api/user.ts";
import {color} from "@/utils/color.ts";

const UserInfoDrawer: React.FC<User.UserInfoDrawerProp> = ({visible, userId, close}) => {

	const [form] = Form.useForm<User.UserInfoPropResponse>();
	const [posts, setPosts] = useState<string[]>([]);
	const [roles, setRoles] = useState<string[]>([]);
	const loadUserInfo = useRequest(
		getUserInfo,
		{
			manual: true,
			onSuccess: (data) => {
				form.setFieldsValue({...data})
				setPosts(data.posts ?? [])
				setRoles(data.roles ?? [])
			}
		});

	useEffect(() => {
		if (visible) {
			loadUserInfo.run(userId!)
		}
	}, [visible]);

	return <Drawer
		width={500}
		title="用户详情"
		placement="right"
		onClose={close}
		maskClosable={false}
		open={visible}
		extra={
			<Space>
				<Button type="primary" danger onClick={close}>关闭</Button>
			</Space>
		}
	>
		<Spin spinning={loadUserInfo.loading} tip="加载中......">
			<Form labelCol={{ span: 4 }}
				  wrapperCol={{ span: 20 }}
				  form={form}
				  layout="horizontal"
				  name="form_in_modal"
			>
				<Form.Item name="userName" label="用户名称">
					<Input placeholder="请输入用户名称" readOnly />
				</Form.Item>
				<Form.Item name="nickName" label="用户昵称">
					<Input placeholder="请输入用户昵称" readOnly />
				</Form.Item>
				<Form.Item name="deptName" label="所属部门">
					<Input placeholder="请选择所属部门" readOnly/>
				</Form.Item>
				<Form.Item name="posts" label="归属岗位">
					{posts.length > 0 ? posts.map((item, index) => <Tag color={color(index)}>{item}</Tag>) : <div>暂无岗位</div>}
				</Form.Item>
				<Form.Item name="phone" label="手机号码">
					<Input readOnly />
				</Form.Item>
				<Form.Item name="email" label="邮箱">
					<Input readOnly />
				</Form.Item>
				<Form.Item name="sex" label="性别">
					<Input readOnly/>
				</Form.Item>
				<Form.Item name="status" label="状态">
					<Input readOnly/>
				</Form.Item>
				<Form.Item name="roleId" label="角色">
					{roles.length > 0 ? roles.map((item, index) => <Tag color={color(index)}>{item}</Tag>) : <div>暂无角色</div>}
				</Form.Item>
				<Form.Item name="remark" label="备注">
					<Input.TextArea rows={3} placeholder="请输入备注" readOnly />
				</Form.Item>
			</Form>
		</Spin>
	</Drawer>
}

export default UserInfoDrawer;