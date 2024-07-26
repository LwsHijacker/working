import {Button, Form, Input, message} from "antd";
import {UpdatePasswordProp} from "@/pages/user/modules.ts";
import {useRequest} from "ahooks";
import {userResetPassword} from "@/api/user.ts";

const PasswordForm = () => {

    const buttonItemLayout = {wrapperCol: {span: 14, offset: 3}};
    const [form] = Form.useForm<UpdatePasswordProp>();

    const {loading, run} = useRequest(userResetPassword, {
        manual: true,
        onSuccess: (data: any) => {
            form.resetFields()
            message.info(data)
        }
    })

    const submit = () => {
        form.validateFields().then(values => {
            run(values);
        }).catch(e => {
            message.error(e.message)
        })
    }

    return <Form labelCol={{span: 3}}
                 wrapperCol={{span: 21}}
                 form={form}
                 layout="horizontal"
                 name="form_in_modal">
        <Form.Item name="oldPassword" label="旧密码" rules={[{required: true, message: '请输入旧密码'}]}>
            <Input.Password style={{width: 400}} placeholder="请输入旧密码"/>
        </Form.Item>
        <Form.Item name="newPassword" label="新密码" rules={[{required: true, message: '请输入新密码'}]}>
            <Input.Password style={{width: 400}} placeholder="请输入新密码"/>
        </Form.Item>
        <Form.Item name="confirmPassword" label="确认密码" dependencies={["newPassword"]}
                   rules={[{required: true, message: '请再次输入新密码'}, ({getFieldValue}) => ({
                       validator(_, value) {
                           if (!value || getFieldValue('newPassword') === value) {
                               return Promise.resolve();
                           }
                           return Promise.reject(new Error('二次密码输入不致'));
                       },
                   }),]}>
            <Input.Password style={{width: 400}} placeholder="请再次输入新密码"/>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
            <Button type="primary" danger style={{marginRight: 10}} loading={loading}
                    onClick={() => submit()}>重置</Button>

        </Form.Item>
    </Form>
}

export default PasswordForm;