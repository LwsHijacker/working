import {forwardRef, useImperativeHandle, useState} from "react";
import {Button, TimePicker, Drawer, Form, Input, message, Space,Radio} from "antd";
import {useRequest} from "ahooks";
import {meetingSave} from "@/api/meeting.ts";
import dayjs from "dayjs";

dayjs.locale('zh-cn')

interface MeetingFormProps {
    callBack: () => void,
}

interface Ref {
    showWinForm: (ata: any, op: number, visible: boolean) => void
}

const SubMeetingForm = forwardRef<Ref, MeetingFormProps>((props: MeetingFormProps, ref) => {

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm()
    useImperativeHandle(ref, () => {
        return {
            showWinForm(data: any, op: number, visible: boolean) {
                show(data, op, visible)
            }
        }
    }, [])
    const {loading, run} = useRequest(meetingSave, {
        manual: true,
        onSuccess: (_) => {
            message.success('数据保存成功');
            props.callBack()
            setVisible(false)
        }
    })

    const submitForm = () => form.validateFields().then(value => {
        run(value)
    })

    const show = (data: any, op: number, visible: boolean) => {
        if (op == 1) {
            setVisible(visible)
        } else if (op == 2) {
            setVisible(visible)
            data.meetingBeginDate = data.meetingBeginDate ? dayjs(data.meetingBeginDate, "YYYY-HH-DD") : null
            data.meetingEndDate = data.meetingEndDate ? dayjs(data.meetingEndDate, "YYYY-HH-DD") : null
            data.meetingRegDate = data.meetingRegDate ? dayjs(data.meetingRegDate, "YYYY-HH-DD") : null
            form.setFieldsValue(data)
        }

    }

    const close = (v: boolean) => {
        setVisible(v);
    }

    return (
        <Drawer
            destroyOnClose={true}
            width={800}
            title="创建会议内容"
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

            <Form labelCol={{span: 5}}
                  wrapperCol={{span: 19}}
                  form={form}
                  preserve={false}
                  layout="vertical"
                  name="form_in_modal">
                {/* <Form.Item label={"子会议帮助"} name={"submeetingHelper"} hidden={true}>
                    <Input/>
                </Form.Item> */}
                <Form.Item label={"子会议编码"} name={"id"} hidden={true}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"分组编码"} name={"submeetingCategory"} rules={[{required: true, message: '必填项'}]}>   
                    <Input/>  
                </Form.Item>
                <Form.Item label={"分论坛名称"} name={"submeetingName"} rules={[{required: true, message: '必填项'}]}>
                    <Input/>
                </Form.Item>
                   

                {/* <Form.Item label={"子会议英文名称"} name={"submeetingNameEn"} rules={[{required: true, message: '必填项'}]}>
                    <Input/>
                </Form.Item> */}
                {/* <Form.Item label={"举办单位"} name={"submeetingHost"}>
                    <Input/>
                </Form.Item> */}
                {/* <Form.Item label={"承办单位"} name={"submeetingOrganizer"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"协办单位"} name={"submeetingCoOrganizer"}>
                    <Input/>
                </Form.Item> */}
                <Form.Item label={"开始时间"} name={"submeetingBeginDate"}>
                    <TimePicker style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item label={"结束时间"} name={"meetingEndDate"}>
                    <TimePicker style={{width: '100%'}}/>
                </Form.Item>
                {/* <Form.Item label={"报名截止时间"} name={"meetingRegDate"}>
                    <DatePicker style={{width: '100%'}}/>
                </Form.Item> */}
                <Form.Item label={"会议说明"} name={"meetingRemark"}>
                    <Input.TextArea/>
                </Form.Item>
            </Form>
        </Drawer>
    )

})

export default SubMeetingForm;