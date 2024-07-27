import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, DatePicker, Drawer, Form, Input, message, Space, Select } from "antd";
import { useRequest } from "ahooks";
import 'dayjs/locale/zh-cn';
import { submeetingSave } from "@/api/submeeting";
import dayjs from "dayjs";

dayjs.locale('zh-cn')

interface SubMeetingFormProps {
    callBack: () => void,
    mainMeetingId: number
}

interface Ref {
    showWinForm: (ata: any, op: number, visible: boolean) => void
}

const SubMeetingForm = forwardRef<Ref, SubMeetingFormProps>((props: SubMeetingFormProps, ref) => {
    const { mainMeetingId } = props;
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm()
    useImperativeHandle(ref, () => {
        return {
            showWinForm(data: any, op: number, visible: boolean) {
                show(data, op, visible)
            }
        }
    }, [])
    const { loading, run } = useRequest(submeetingSave, {
        manual: true,
        onSuccess: (_) => {
            message.success('数据保存成功');
            props.callBack()
            setVisible(false)
        }
    })

    const submitForm = () => form.validateFields().then(value => {
        run({ ...value, mainId: mainMeetingId })
    })

    const show = (data: any, op: number, visible: boolean) => {
        if (op == 1) {
            setVisible(visible)
        } else if (op == 2) {
            setVisible(visible)
            data.subMeetingBeginDate = data.subMeetingBeginDate ? dayjs(data.subMeetingBeginDate, "YYYY-HH-DD HH:mm:ss") : null
            data.subMeetingEndDate = data.subMeetingEndDate ? dayjs(data.subMeetingEndDate, "YYYY-HH-DD HH:mm:ss") : null
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
            title="创建会议"
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
                <Form.Item label={"论坛名称"} name={"id"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item label={"论坛名称"} name={"submeetingHelper"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item label={"论坛名称"} name={"submeetingName"} rules={[{ required: true, message: '必填项' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={"分组编码"} name={"groupCode"} rules={[{ required: true, message: '必填项' }]}>
                    {/* <Input /> */}
                    <Select
                        defaultValue="--请选择--"
                        style={{ width: 120 }}
                        options={[{ value: '主旨主题类', label: '主旨主题类' }, { value: '分论坛类', label: '分论坛类' }]}
                    />
                </Form.Item>

                <Form.Item label={"开始时间"} name={"subMeetingBeginDate"}>
                    <DatePicker showTime />
                </Form.Item>

                <Form.Item label={"结束时间"} name={"subMeetingEndDate"}>
                    <DatePicker showTime />
                </Form.Item>

                <Form.Item label={"会议说明"} name={"submeetingRemark"}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Drawer>
    )

})

export default SubMeetingForm;