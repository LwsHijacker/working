import {Button, Form, Input, message} from "antd";
import {useRequest} from "ahooks";
import {userBaseInfoUpdate} from "@/api/user.ts";
import {UpdateBaseInfoProp} from "@/pages/user/modules.ts";


const BaseInfoForm = () => {

    const buttonItemLayout = {wrapperCol: {span: 14, offset: 3}};
    const [form] = Form.useForm<UpdateBaseInfoProp>()

    const {loading, run} = useRequest(userBaseInfoUpdate, {
        manual: true, onSuccess: (data => {
            form.resetFields()
            message.info(data)
        })
    })

    const saveData = () => {
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
        <Form.Item name="phone" label="手机号码" rules={[{required: true, message: '请输入手机号码'}]}>
            <Input style={{width: 400}} placeholder="请输入手机号码"/>
        </Form.Item>
        <Form.Item name="email" label="邮箱地址" rules={[{required: true, message: '请输入邮箱地址'}]}>
            <Input style={{width: 400}} placeholder="请输入邮箱地址"/>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
            <Button type="primary" loading={loading} onClick={() => saveData()}>保存</Button>
        </Form.Item>
    </Form>
}

export default BaseInfoForm;