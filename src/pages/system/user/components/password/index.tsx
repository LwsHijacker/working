import {Button, Drawer, Form, Input, message, Radio, Space} from "antd";
import React, {useEffect} from "react";
import {User} from "@/types";
import {useRequest} from "ahooks";
import {userResetPassword} from "@/api/user.ts";

const UserPasswordDrawer: React.FC<User.UserPwdDrawerProp> = ({visible, userId, close}) => {

	const [form] = Form.useForm<User.UserPasswordProp>();

	const updateHandler = useRequest(userResetPassword, {
		manual: true,
		onSuccess: (_)=> {
			message.success('重置用户密码成功');
			form.resetFields();
			close();
		}
	})

	useEffect(() => {
		if (visible) {
			form.setFieldsValue({isSendEmail: true, userId: userId})
		}
	}, [visible]);

	const submitForm = () => form.validateFields().then(value => updateHandler.run({...value}));

	return <Drawer
		width={500}
		title="重置密码"
		placement="right"
		onClose={close}
		open={visible}
		extra={
			<Space>
				<Button type="primary" danger onClick={close}>取消</Button>
				<Button type="primary" onClick={submitForm}>保存</Button>
			</Space>
		}
	>
		<Form labelCol={{ span: 10 }}
			  form={form}
			  layout="vertical"
			  name="form_in_modal"
		>
			<Form.Item name="userId" label="主键" style={{display: 'none'}}>
				<Input />
			</Form.Item>
			<Form.Item name="password" label="新密码" rules={[{ required: true, message: '请输入新密码' }]}>
				<Input.Password placeholder="请输入新密码" />
			</Form.Item>
			<Form.Item name="isSendEmail" label="是否发送邮件">
				<Radio.Group>
					<Radio value={true}>发送</Radio>
					<Radio value={false}>忽略</Radio>
				</Radio.Group>
			</Form.Item>
		</Form>
	</Drawer>
}

export default UserPasswordDrawer;