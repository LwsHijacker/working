import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Drawer, Form, Input, message, Space } from "antd";
import { useRequest } from "ahooks";
import { submeetingSaveHelpInfo } from "@/api/submeeting";
import { RichEditor } from "@/components";

interface SubMeetingFormProps {
    callBack: () => void,
}


interface Ref {
    showWinForm: (id: any, visible: boolean) => void
}

const SubMeetingHelpForm = forwardRef<Ref, SubMeetingFormProps>((props: SubMeetingFormProps, ref) => {


    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm()
    const [richEditorDefaultValue, setRichEditorDefaultValue] = useState('')
    const close = (v: boolean) => {
        setVisible(v)
    }

    useImperativeHandle(ref, () => {
        return {
            showWinForm(record, visible: boolean) {
                debugger
                show(record.id, visible)
                setRichEditorDefaultValue(record.meetingHelper)
            }
        }
    }, [])

    const show = (id: any, v: boolean) => {
        setVisible(v)
        form.setFieldValue("id", id)
    }

    const { loading, run } = useRequest(submeetingSaveHelpInfo, {
        manual: true,
        onSuccess: (_) => {
            message.success('数据保存成功');
            setVisible(false)
            props.callBack
        }
    })

    const submitForm = () => form.validateFields().then(value => {
        run(value)
    })

    return (
        <Drawer
            destroyOnClose={true}
            width={800}
            title="添加子会议帮助"
            placement="right"
            onClose={() => close(false)}
            open={visible}
            extra={
                <Space>
                    <Button type="primary" danger onClick={() => close(false)}>取消</Button>
                    <Button type="primary" loading={loading} onClick={submitForm}>保存</Button>
                </Space>
            }
        >

            <Form labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                form={form}
                preserve={false}
                layout="vertical"
                name="form_in_modal">
                <Form.Item label={"子会议名称"} name={"id"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item label={"子会议帮助内容"} name={"submeetingHelper"} rules={[{ required: true, message: '必填项' }]}>
                    <RichEditor defaultValue={richEditorDefaultValue}
                        onChange={(content) => form.setFieldValue("submeetingHelper", content)} />
                </Form.Item>
            </Form>
        </Drawer>
    )

})


export default SubMeetingHelpForm
