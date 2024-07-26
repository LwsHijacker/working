import {Button, Card, Form, Input, message} from "antd";
import {meetingUserSign} from "@/api/meetinguser.ts";

const MeetingUserSignFormPage = () => {
    const [form] = Form.useForm();

    const sign = () => {
        form.validateFields().then(values => {
            meetingUserSign(values).then(res => {
                console.log(res)
                form.resetFields()
            }).catch(err => {
                message.error(err.message)
            })
        })
    }

    return (
        <Card>
            <Card>
                <Form form={form} layout={"vertical"}>
                    <Form.Item name={"meetingId"} hidden={true} initialValue={1}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"phone"} label={"输入手机号"} required={true}
                               rules={[{required: true, message: "必填"}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Card>
            <Button type={"primary"} style={{marginTop: "10px", width: "100%"}} onClick={() => sign()}>签到</Button>
        </Card>
    )

}
export default MeetingUserSignFormPage